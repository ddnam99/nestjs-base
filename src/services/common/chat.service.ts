import { EmitterConstant } from '$constants/emitter.constant';
import { EventAction } from '$constants/EventAction';
import { ConversationEntity } from '$entities/Conversation.entity';
import { ConversationLastMessageEntity } from '$entities/ConversationLastMessage.entity';
import { ConversationMemberEntity } from '$entities/ConversationMember.entity';
import { ConversationMessageEntity } from '$entities/ConversationMessage.entity';
import { MessageType } from '$enums/chat.enum';
import { CreateConversationDto } from '$models/chat/createConversation.dto';
import { SendMessageDto } from '$models/chat/sendMessage.dto';
import { SetNicknameDto } from '$models/chat/setNickname.dto';
import { PagingQuery } from '$models/common/pagingQuery.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { auth, messaging } from 'firebase-admin';
import { Brackets, Connection, EntityManager, Repository } from 'typeorm';
import { EmitterService } from './emitter.service';
import { UserService } from './user.service';

@Injectable()
export class ChatService {
  private readonly logger: Logger = new Logger(ChatService.name);
  private readonly conversationRepository: Repository<ConversationEntity>;
  private readonly conversationMemberRepository: Repository<ConversationMemberEntity>;
  private readonly conversationMessageRepository: Repository<ConversationMessageEntity>;

  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
    private readonly emitterService: EmitterService,
  ) {
    this.conversationRepository = connection.getRepository(ConversationEntity);
    this.conversationMemberRepository = connection.getRepository(ConversationMemberEntity);
    this.conversationMessageRepository = connection.getRepository(ConversationMessageEntity);
  }

  async createConversation(currentMemberId: string, data: CreateConversationDto) {
    return await this.connection.transaction(async transaction => {
      const conversationRepository = transaction.getRepository(ConversationEntity);
      const conversationMemberRepository = transaction.getRepository(ConversationMemberEntity);

      const members = [...new Set([currentMemberId, ...data.members])];

      const conversationExist = await conversationRepository
        .createQueryBuilder('c')
        .select('c.id as id, count(cm.user_id) as numberOfMembers')
        .leftJoin(
          'conversation_member',
          'cm',
          'cm.conversation_id = c.id and cm.user_id in (:members)',
          { members },
        )
        .groupBy('c.id')
        .having('numberOfMembers = :count', { count: members.length })
        .getRawOne();

      if (conversationExist) return { conversationId: conversationExist.id };

      const conversation = await conversationRepository.save(<ConversationEntity>{
        name: data.name || '',
        thumbnail: data.thumbnail || '',
        direct: members.length === 2,
      });

      await conversationMemberRepository.save([
        <ConversationMemberEntity>{
          userId: currentMemberId,
          master: !conversation.direct,
          conversation: conversation,
        },
        ...data.members.map(memberId => {
          return <ConversationMemberEntity>{
            userId: memberId,
            conversation: conversation,
          };
        }),
      ]);

      return { conversationId: conversation.id };
    });
  }

  async sendMessage(currentUserId: string, conversationId: string, data: SendMessageDto) {
    return await this.connection.transaction(async transaction => {
      const ConversationRepository = transaction.getRepository(ConversationEntity);
      const ConversationMemberRepository = transaction.getRepository(ConversationMemberEntity);
      const ConversationMessageRepository = transaction.getRepository(ConversationMessageEntity);
      const ConversationLastMessageRepository = transaction.getRepository(
        ConversationLastMessageEntity,
      );

      const conversationMember = await ConversationMemberRepository.findOne({
        conversationId: conversationId,
        userId: currentUserId,
      });

      if (!conversationMember) throw new BadRequestException('error.ConversationNotFound');

      const conversation = await ConversationRepository.findOne({ id: conversationId });

      const conversationMessage = await ConversationMessageRepository.save(<
        ConversationMessageEntity
      >{
        ...data,
        userId: currentUserId,
        conversationId: conversationId,
      });

      conversation.lastMessage = <ConversationLastMessageEntity>{
        message: conversationMessage.message,
        messageType: MessageType.MESSAGE,
        mimeType: conversationMessage.mimeType,
        lastSent: conversationMessage.createdDate,
        userId: currentUserId,
        conversationId: conversationId,
      };

      conversationMember.lastSeen = conversationMessage.createdDate;

      await ConversationRepository.save(conversation);
      await ConversationMemberRepository.save(conversationMember);

      await this.emitterService.emitToConversation({
        conversationId: conversationId,
        event: EventAction.server_send_message_to_conversation,
        payload: conversationMessage,
      });

      return { conversationMessageId: conversationMessage.id };
    });
  }

  async getConversations(currentUserId: string, query: PagingQuery) {
    const queryBuilder = this.conversationRepository
      .createQueryBuilder('c')
      .select(
        'c.id id, clm.message lastMessage, clm.mime_type mimeType, clm.message_type messageType, clm.last_sent lastSent, c.direct direct',
      )
      .addSelect(
        `if(c.direct, if(cm1.nickname is not null, cm1.nickname, concat(u.first_name, ' ', u.last_name)), c.name) as conversationName`,
      )
      .addSelect(`if(c.direct, u.profile_image_url, c.thumbnail) as thumbnail`)
      .addSelect(
        'if(cm.receive_notification is null, false, cm.receive_notification) receiveNotification, cm.last_seen lastSeen, if(cm.pined is null, false, cm.pined) pined',
      )
      .addSelect('cm.last_seen >= clm.last_sent as isSeen')
      .addSelect('u.is_online isOnline, u.last_online_date lastOnlineDate')
      .innerJoin('conversation_last_message', 'clm', 'clm.conversation_id = c.id')
      .innerJoin(
        'conversation_member',
        'cm',
        'cm.conversation_id = c.id and cm.user_id = :currentUserId',
        { currentUserId },
      )
      .leftJoin(
        'conversation_member',
        'cm1',
        'c.direct and cm1.conversation_id = c.id and cm1.user_id != cm.user_id',
      )
      .leftJoin('users', 'u', 'u.id = cm1.user_id')
      .where('c.deleted <> true')
      .orderBy('cm.pined', 'DESC')
      .addOrderBy('clm.last_sent', 'DESC');

    if (query.search) {
      queryBuilder.andWhere(
        `position(lower(:search) in lower(if(c.direct, if(cm1.nickname is not null, cm1.nickname, concat(u.first_name, ' ', u.last_name)), c.name))) != 0`,
        {
          search: query.search,
        },
      );
    }

    const count = await queryBuilder.getCount();
    const items = await queryBuilder.skip(query.skip).take(query.take).getRawMany();

    return { count, items };
  }

  async getConversationMessages(currentUserId: string, conversationId: string, query: PagingQuery) {
    const conversationMember = await this.conversationMemberRepository.findOne({
      userId: currentUserId,
      conversationId: conversationId,
    });

    if (!conversationMember) throw new BadRequestException('error.ConversationNotFound');

    const queryBuilder = this.conversationMessageRepository
      .createQueryBuilder('cme')
      .select(
        'cme.id id, cme.message message, cme.height height, cme.width width, cme.mime_type mimeType',
      )
      .addSelect('cme.url_meta urlMeta, cme.message_type messageType, cme.created_date createdDate')
      .addSelect(
        `cme.user_id senderId, if(cm.nickname is not null, cm.nickname, concat(u.first_name, ' ', u.last_name)) senderName, u.profile_image_url profileImageUrl`,
      )
      .leftJoin(
        'conversation_member',
        'cm',
        'cm.user_id = cme.user_id and cm.conversation_id = cme.conversation_id',
      )
      .leftJoin('users', 'u', 'u.id = cme.user_id')
      .where('cme.conversation_id = :conversationId', { conversationId })
      .orderBy('cme.created_date', 'DESC');

    if (query.search) {
      queryBuilder.andWhere('position(lower(:search) in lower(cme.message)) != 0', {
        search: query.search,
      });
    }

    const count = await queryBuilder.getCount();
    const items = await queryBuilder.skip(query.skip).take(query.take).getRawMany();

    return { count, items };
  }

  async getConversationMembers(currentUserId: string, conversationId: string, query: PagingQuery) {
    const conversationMember = await this.conversationMemberRepository.findOne({
      userId: currentUserId,
      conversationId: conversationId,
    });

    if (!conversationMember) throw new BadRequestException('error.ConversationNotFound');

    const queryBuilder = this.conversationMemberRepository
      .createQueryBuilder('cm')
      .select(
        'u.id id, u.first_name firstName, u.last_name lastName, u.profile_image_url profileImageUrl',
      )
      .addSelect(
        'cm.nickname nickname, cm.join_date joinDate, if(cm.master is null, false, cm.master) master',
      )
      .addSelect('u.is_online isOnline, u.last_online_date lastOnlineDate')
      .leftJoin('users', 'u', 'u.id = cm.user_id')
      .where('cm.conversation_id = :conversationId', { conversationId });

    if (query.search) {
      queryBuilder.andWhere(
        new Brackets(qb =>
          qb
            .where(
              `position(lower(:search) in lower(concat(u.first_name, ' ', u.last_name))) != 0`,
              { search: query.search },
            )
            .orWhere(`position(lower(:search) in lower(cm.nickname)) != 0`, {
              search: query.search,
            }),
        ),
      );
    }

    const count = await queryBuilder.getCount();
    const items = await queryBuilder.skip(query.skip).take(query.take).getRawMany();

    return { count, items };
  }

  async setNickname(currentUserId: string, conversationId: string, data: SetNicknameDto) {
    return this.connection.transaction(async transaction => {
      const ConversationMemberRepository = transaction.getRepository(ConversationMemberEntity);
      const ConversationMessageRepository = transaction.getRepository(ConversationMessageEntity);
      const isMine = currentUserId === data.userId;

      const conversationMember = await ConversationMemberRepository.findOne({
        relations: ['user'],
        where: {
          userId: currentUserId,
          conversationId: conversationId,
        },
      });

      if (!conversationMember) throw new BadRequestException('error.ConversationNotFound');

      const conversationTargetMember = isMine
        ? conversationMember
        : await ConversationMemberRepository.findOne({
            relations: ['user'],
            where: {
              userId: data.userId,
              conversationId: conversationId,
            },
          });

      if (!conversationTargetMember) throw new BadRequestException('error.TargetUserNotFound');

      conversationTargetMember.nickname = data.nickname;
      await ConversationMemberRepository.save(conversationTargetMember);

      const message = !data.nickname
        ? `${conversationMember.user.firstName} đã xoá nickname của ${
            isMine ? 'mình' : conversationTargetMember.user.firstName
          }`
        : `${conversationMember.user.firstName} đã đặt nickname của ${
            isMine ? 'mình' : conversationTargetMember.user.firstName
          } thành ${data.nickname}`;

      const conversationMessage = await ConversationMessageRepository.save(<
        ConversationMessageEntity
      >{
        message: message,
        messageType: MessageType.SYSTEM,
        userId: currentUserId,
        conversationId: conversationId,
      });

      conversationMember.lastSeen = conversationMessage.createdDate;
      await ConversationMemberRepository.save(conversationMember);

      await this.emitterService.emitToConversation({
        conversationId: conversationId,
        event: EventAction.server_send_message_to_conversation,
        payload: conversationMessage,
      });
    });
  }
}

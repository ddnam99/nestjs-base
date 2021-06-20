import * as _ from 'lodash';

import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RedisService } from '$connections/redis.provider';
import { UserService } from '$services/common/user.service';
import { IOnlineUser } from '$interfaces/IOnlineUser';
import { OnEvent } from '@nestjs/event-emitter';
import { EmitterConstant } from '$constants/emitter.constant';
import { EventAction } from '$constants/EventAction';

@WebSocketGateway({ namespace: 'chat' })
@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly onlineUsers: IOnlineUser[];
  private readonly logger: Logger = new Logger(ChatGateway.name);
  private readonly userService: UserService;
  private readonly redisService: RedisService;

  constructor(userService: UserService, redisService: RedisService) {
    this.userService = userService;
    this.redisService = redisService;
    this.onlineUsers = new Array<IOnlineUser>();
  }

  afterInit(server: Server) {}

  @SubscribeMessage(EventAction.client_join_conversation)
  handleLoadConversationMembers(client: Socket, payload: { conversationId: string }): void {
    this.logger.log(`Client join conversation: ${payload.conversationId}`);
    client.join(`conversation:${payload.conversationId}`);
  }

  @OnEvent(EmitterConstant.EMIT_TO_CONVERSATION)
  handleEmitToConversation(data: { conversationId: string; event: string; payload: any }) {
    return this.server
      .to(`conversation:${data.conversationId}`)
      .emit(data.event, JSON.stringify(data.payload));
  }

  @OnEvent(EmitterConstant.EMIT_TO_CLIENT)
  handleEmitToClient(data: { userId: string; event: string; payload: any }) {
    return this.server.to(`user:${data.userId}`).emit(data.event, JSON.stringify(data.payload));
  }

  async handleDisconnect(client: Socket) {
    try {
      const { userId } = this.onlineUsers.find(u => u.socketId === client.id);
      const numberOfUserSocketConnected = this.onlineUsers.filter(u => u.userId === userId).length;

      if (numberOfUserSocketConnected === 0) {
        await this.userService.setOnlineStatus(userId, false);
        this.server.emit('user-offline', { userId });
      }

      this.logger.log(`Client disconnected: ${client.id}`);
    } catch (err) {
      this.logger.error(`Error handle client ${client.id} disconnect: ${err.message}`);
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const accessToken = client.handshake.query.token;
      const user = await this.userService.findUserByAccessToken(accessToken);

      if (!user) client.disconnect();

      await this.userService.setOnlineStatus(user.id, true);
      this.onlineUsers.push({ socketId: client.id, userId: user.id });
      client.join(`user:${user.id}`);

      this.server.emit('user-online', { userId: user.id });

      this.logger.log(`Client connected: ${client.id}`);
    } catch (err) {
      this.logger.error(`Error handle client ${client.id} connect: ${err.message}`);
    }
  }
}

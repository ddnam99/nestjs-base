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

import { EventAction } from '$events/EventAction';
import { RedisService } from '$connections/redis.provider';
import { UserService } from '$services/common/user.service';
import { IOnlineUser } from '$interfaces/IOnlineUser';
import { OnEvent } from '@nestjs/event-emitter';
import { EmitterConstant } from '$constants/emitter.constant';

@WebSocketGateway({ namespace: 'test-gateway' })
@Injectable()
export class TestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger: Logger = new Logger(TestGateway.name);
  private readonly userService: UserService;
  private readonly redisService: RedisService;

  constructor(userService: UserService, redisService: RedisService) {
    this.userService = userService;
    this.redisService = redisService;
  }

  afterInit(server: Server) {}

  @SubscribeMessage(EventAction.test_action)
  handleLoadConversationMembers(client: Socket, payload: string): void {
    this.logger.log(`${client.id} send payload: ${JSON.parse(payload)}`);
  }

  @OnEvent(EmitterConstant.EMIT_TO_CLIENT)
  handleEmitToClient(data: { userId: string; event: string; payload: any }) {
    return this.emitToSpecificUser(data.userId, data.event, data.payload);
  }

  emitToSpecificUser(userId: string, event: string, payload: any) {
    return this.server.to(`user:${userId}`).emit(event, JSON.stringify(payload));
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const accessToken = client.handshake.query.token;
    const user = await this.userService.findUserByAccessToken(accessToken);

    if (!user) client.disconnect();

    client.join(`user:${user.id}`);

    this.logger.log(`Client connected: ${client.id}`);
  }
}

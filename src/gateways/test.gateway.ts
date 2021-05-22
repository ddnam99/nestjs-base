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

@WebSocketGateway({ path: '/test-gateway' })
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

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}

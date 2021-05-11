import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as _ from 'lodash';
import { UserService } from '$services/user.service';
import { RedisService } from '$connections/redis.provider';
import { EventAction } from '$events/EventAction';

@WebSocketGateway()
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

import { EmitterConstant } from '$constants/emitter.constant';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { auth, messaging } from 'firebase-admin';

@Injectable()
export class EmitterService {
  private readonly logger: Logger = new Logger(EmitterService.name);
  public readonly messaging: messaging.Messaging;
  public readonly auth: auth.Auth;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitToClient(payload: { userId: string; event: string; payload: any }) {
    return await this.eventEmitter.emitAsync(EmitterConstant.EMIT_TO_CLIENT, payload);
  }

  async emit(event: string, payload: any) {
    return await this.eventEmitter.emitAsync(event, payload);
  }
}

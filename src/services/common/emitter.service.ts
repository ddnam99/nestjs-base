import { EmitterConstant } from '$constants/emitter.constant';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmitterService {
  private readonly logger: Logger = new Logger(EmitterService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitToClient(data: { userId: string; event: string; payload: any }) {
    return await this.eventEmitter.emitAsync(EmitterConstant.EMIT_TO_CLIENT, data);
  }

  async emitToConversation(data: { conversationId: string; event: string; payload: any }) {
    return await this.eventEmitter.emitAsync(EmitterConstant.EMIT_TO_CONVERSATION, data);
  }

  async emit(event: string, payload: any) {
    return await this.eventEmitter.emitAsync(event, payload);
  }
}

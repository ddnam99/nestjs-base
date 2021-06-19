import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AllowAnonymous, CommonController } from '$helpers/decorator.helper';
import { CreateConversationDto } from '$models/chat/createConversation.dto';
import { ChatService } from '$services/common/chat.service';
import { SendMessageDto } from '$models/chat/sendMessage.dto';
import { PagingQuery } from '$models/common/pagingQuery.dto';

@CommonController('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('conversation')
  async createConversation(@Req() req: Request, @Body() body: CreateConversationDto) {
    return await this.chatService.createConversation(req.currentUserId, body);
  }

  @Post('conversation/:conversationId/message')
  async sendMessage(
    @Req() req: Request,
    @Param('conversationId') conversationId: string,
    @Body() body: SendMessageDto,
  ) {
    return await this.chatService.sendMessage(req.currentUserId, conversationId, body);
  }

  @Get('/conversation')
  async getConversations(@Req() req: Request, @Query() query: PagingQuery) {
    return this.chatService.getConversations(req.currentUserId, query);
  }

  @Get('/conversation/:conversationId/message')
  async getConversationMessages(
    @Req() req: Request,
    @Param('conversationId') conversationId: string,
    @Query() query: PagingQuery,
  ) {
    return await this.chatService.getConversationMessages(req.currentUserId, conversationId, query);
  }

  @Get('/conversation/:conversationId/member')
  async getConversationMembers(
    @Req() req: Request,
    @Param('conversationId') conversationId: string,
    @Query() query: PagingQuery,
  ) {
    return await this.chatService.getConversationMembers(req.currentUserId, conversationId, query);
  }
}

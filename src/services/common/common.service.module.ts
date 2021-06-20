import { ConnectionsModule } from '$connections/connections.module';
import { Module } from '@nestjs/common';
import { TokenEntity } from '$entities/Token.entity';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '$entities/User.entity';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';
import { EmitterService } from './emitter.service';
import { ChatService } from './chat.service';
import { ConversationEntity } from '$entities/Conversation.entity';
import { TwilioService } from './twilio.service';
import { AwsS3Service } from './awsS3.service';
import { SendGridService } from './sendGrid.service';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity, ConversationEntity]),
    ConnectionsModule,
  ],
  providers: [
    UserService,
    TokenService,
    FirebaseService,
    EmitterService,
    ChatService,
    TwilioService,
    AwsS3Service,
    SendGridService,
    StripeService,
  ],
  exports: [
    UserService,
    TokenService,
    FirebaseService,
    EmitterService,
    ChatService,
    TwilioService,
    AwsS3Service,
    SendGridService,
    StripeService,
  ],
})
export class CommonServiceModule {}

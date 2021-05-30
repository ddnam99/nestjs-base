import { Injectable, Logger } from '@nestjs/common';
import { auth, messaging } from 'firebase-admin';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class FirebaseService {
  private readonly logger: Logger = new Logger(FirebaseService.name);
  public readonly messaging: messaging.Messaging;
  public readonly auth: auth.Auth;

  constructor(
    @InjectFirebaseAdmin()
    private readonly firebase: FirebaseAdmin,
  ) {
    this.messaging = firebase.messaging;
    this.auth = firebase.auth;
  }
}

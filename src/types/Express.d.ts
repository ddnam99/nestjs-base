declare namespace Express {
  /**
   * Middleware verify the access token & assign more information to the Request params.
   */
  interface Request {
    currentUserId?: string;
    currentUser?: import('$models/auth.dto').CurrentUser;
  }
}

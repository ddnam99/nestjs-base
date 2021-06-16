declare namespace Express {
  /**
   * Middleware verify the access token & assign more information to the Request params.
   */
  interface Request {
    accessToken?: string;
    currentUserId?: string;
    currentUser?: import('$models/auth/CurrentUser.dto').UserDto;
  }
}

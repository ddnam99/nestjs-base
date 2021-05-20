import { LINK } from '../utils/linkApp';

export const accountPasswordReset = (deepLinkCreate: any) => {
  const urlResetPassword = deepLinkCreate;
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style type="text/css">
          .content {
            background-color: #ffffff;
            font-family: "Space Grotesk", sans-serif;
            max-width: 600px;
            text-align: center;
            margin: 0px auto;
            padding: 0;
          }
          .browser {
            line-height: 16px;
            align-items: center;
            font-size: 11px;
            padding: 16px 32px;
            color: #111111;
            font-weight: 300;
          }
          .logo {
            text-align: center;
          }
          .title {
            padding-top: 1.5rem;
            text-align: center;
            font-weight: 300;
            font-size: 45px;
          }
          .text {
            width: 500px;
            margin: 0px auto;
            font-weight: 400;
            font-size: 16px;
            color: black;
            text-align: center;
            padding-top: 2rem;
            padding-bottom: 1.5rem;
          }
          .description {
            margin: 0px auto;
            max-width: 100%;
            color: black;
            font-size: 11px;
            line-height: 16px;
            text-align: center;
            font-weight: 700;
            padding-top: 1rem;
            padding-bottom: 2rem;
          }
          .button {
            margin: 0px auto;
            border-radius: 100px;
            padding: 16px 32px;
            background: black;
            width: 200px;
            height: 22px;
            font-size: 16px;
            font-weight: 400;
          }
          .image {
            width: 600;
            height: 400;
          }
          .text_footer {
            width: 500px;
            font-weight: 300;
            font-size: 13px;
            line-height: 16px;
            color: #888888;
            text-align: center;
            max-width: 100%;
            margin: 0px auto;
            margin-top: 2rem;
          }
          .icon_app {
            margin: 0px auto;
            display: inline-flex;
            padding: 1rem;
          }
          .contact {
            display: flex;
            justify-content: space-around;
            width: 450px;
            margin: 0px auto;
            font-size: 11px;
            line-height: 16px;
            font-weight: 700;
          }
          .icon {
            margin: 0px 20px;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0">
        <div class="content">
          <div class="browser">
            Reset password.
            <a
              href="${LINK.GMAIL}"
              style="font-weight: 700; color: black; text-decoration: none"
              >View in browser.</a
            >
          </div>
          <div class="logo">
            <img
              src="${LINK.LOGO}"
              alt="elfieLogo"
              width="136px"
              height="48px"
              style="padding: 0.5rem"
            />
          </div>
          <div class="title">Reset password</div>
          <div class="text">
            Can you confirm it was you who requested to reset your password?
          </div>
          <div class="button">
            <a
              href="${urlResetPassword}"
              style="color: #ffffff; text-align: center; text-decoration: none"
              >Yes, reset my password</a
            >
          </div>
          <div class="description">
            If you didn’t request to reset your password but received this email,
            let us know
            <span style="color: darkgrey">help@elfie.app</span>.
          </div>
          <div class="image">
            <img
              style="display: block; max-width: 100%; max-height: 100%"
              src="${LINK.MAIN_IMG}"
              alt="main-image"
            />
          </div>
          <div class="text_footer">
          The most user-friendly app to explore and create travel plans. You know you thrive elsewhere.
          </div>
          <div class="icon_app">
            <div>
              <a href="${LINK.WEB}">
                <img
                  src="https://elfieapp-dev.s3.amazonaws.com/1611547910494%20-%20AppIcon.png"
                  alt="elfie"
                  style="width: 40px; height: 40px"
                />
              </a>
            </div>
            <div style="padding-right: 1rem; padding-left: 1rem">
              <a href="${LINK.APP}">
                <img
                  src="https://elfieapp-dev.s3.amazonaws.com/1611548150999%20-%20badgeAppStore.png"
                  alt="ios"
                  style="width: 105px; height: 40px"
                />
              </a>
            </div>
            <div>
              <a href="${LINK.APP}">
                <img
                  src="https://elfieapp-dev.s3.amazonaws.com/1611548286129%20-%20badgeGooglePlay.png"
                  alt="android"
                  style="width: 112px; height: 40px"
                />
              </a>
            </div>
          </div>
          <div class="contact">
            <div>
              <a
                href="${LINK.HELP}"
                style="color: black; text-decoration: none"
                >Help</a
              >
            </div>
            <div class="icon">
              <a
                href="${LINK.TERMS}"
                style="color: black; text-decoration: none"
                >Terms</a
              >
            </div>
            <div class="icon">
              <a
                href="${LINK.PRIVACY}"
                style="color: black; text-decoration: none"
                >Privacy</a
              >
            </div>
            <div class="icon">
              <a
                href="${LINK.FACEBOOK}"
                style="color: black; text-decoration: none"
                >Facebook</a
              >
            </div>
            <div class="icon">
              <a
                href="${LINK.REDDIT}"
                style="color: black; text-decoration: none"
                >Reddit</a
              >
            </div>
            <div class="icon">
              <a
                href="${LINK.LIKEDIN}"
                style="color: black; text-decoration: none"
                >Likedin</a
              >
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
};

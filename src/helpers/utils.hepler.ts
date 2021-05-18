import axios from 'axios';
import request from 'request';

export function verifyFacebook(token) {
    return new Promise((resolve, reject) => {
      const userFieldSet = 'id, name, email';
      const options = {
        method: 'GET',
        uri: `https://graph.facebook.com/me`,
        qs: {
          access_token: token,
          fields: userFieldSet,
        },
      };
  
      request(options, (err, res, body) => {
        if (err) reject(err);
        body = JSON.parse(body);
        if (res.statusCode != 200) {
          return reject(body.error.message);
        }
        return resolve({ ...body, id: body.id, email: body.email || null });
      });
    });
  }
  
  export async function verifyGoogle(accessToken: string) {
    try {
      const URL = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken;
      const responseBody = await axios({
        method: 'GET',
        url: URL,
        params: {
          access_token: accessToken,
        },
      });
  
      const profile = responseBody.data;
      return { ...profile, id: profile.id, email: profile.email };
    } catch (error) {}
  }
  
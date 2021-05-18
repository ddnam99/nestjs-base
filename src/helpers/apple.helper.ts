import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const APPLE_BASE_URL = 'https://appleid.apple.com';

export interface AppleProfile {
  id: string;
  email: string;
}

export const getApplePublicKey = async (kid: string) => {
  const client = jwksClient({
    cache: true,
    jwksUri: `${APPLE_BASE_URL}/auth/keys`,
  });
  const key: any = await new Promise((resolve, reject) => {
    client.getSigningKey(kid, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
  return key.publicKey || key.rsaPublicKey;
};

const verifyAppleToken = async (idToken: string, clientId: string) => {
  const decoded = jwt.decode(idToken, { complete: true }) as any;
  const { kid, alg } = decoded.header;
  const applePublicKey = await getApplePublicKey(kid);
  const jwtClaims = jwt.verify(idToken, applePublicKey, { algorithms: [alg] }) as any;
  if (clientId && jwtClaims.aud !== clientId) {
    throw new Error(
      `The aud parameter does not include this client - is: ${jwtClaims.aud} | expected: ${clientId}`,
    );
  }
  return {
    id: jwtClaims.sub,
    email: jwtClaims.email,
  };
};

export default verifyAppleToken;

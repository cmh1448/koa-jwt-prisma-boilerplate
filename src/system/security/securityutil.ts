import crypto from 'crypto';
import jwt from 'jsonwebtoken'
export const createHashedPassword = (password: string) => {
  const salt = createSalt();
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('base64');
  return { salt, hash };
};

export const getHashedPassword = (password: string, salt: string) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('base64');
  return hash;
};


export const createSalt = () => crypto.randomBytes(64).toString('base64');

export const createAccessToken = (user: any) => {
  const tokenContent = user;
  tokenContent.type = 'access';

  const token = jwt.sign(tokenContent, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  });

  return token;
};

export const createRefreshToken = (user: any) => {
  const tokenContent = user;
  tokenContent.type = 'refresh';

  const token = jwt.sign(tokenContent, process.env.JWT_SECRET ?? '', {
    expiresIn: '7d',
  });

  return token;
};
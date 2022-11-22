import jwt from 'jsonwebtoken';
import tokenConfig from './tokenConfig';

export default function verifyJwtToken(token) {
  const secretKey = tokenConfig.secret;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}

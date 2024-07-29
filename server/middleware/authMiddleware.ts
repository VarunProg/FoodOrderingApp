import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header: jwt.JwtHeader, callback: (err: Error | null, key?: jwt.Secret) => void) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      console.error('Error getting signing key:', err);
      callback(err || new Error('Key not found'));
    } else {
      const signingKey = key.getPublicKey ? key.getPublicKey() : (key as any).rsaPublicKey;
      callback(null, signingKey);
    }
  });
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  console.log('checkJwt middleware called');
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('No Authorization header present');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token present in Authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log('Token received:', token);

  jwt.verify(token, getKey, {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
    console.log('Token successfully verified:', decoded);
    req.user = decoded as jwt.JwtPayload;
    next();
  });
};

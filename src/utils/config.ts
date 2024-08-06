import dotenv from 'dotenv';
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 60;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '20h';
export const PORT= process.env.PORT||3000

  


import { SignJWT, jwtVerify } from 'jose';
import type { User } from '../types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function createToken(user: User): Promise<string> {
  const jwt = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(JWT_SECRET);
  
  return jwt;
}

export async function verifyToken(token: string): Promise<User> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as User;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function removeAuthToken(): void {
  localStorage.removeItem('auth_token');
}
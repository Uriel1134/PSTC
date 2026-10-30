import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'pstc_admin_session';
const SESSION_SECRET =
  process.env.SUPABASE_JWT_SECRET ||
  process.env.ADMIN_SESSION_SECRET ||
  'pstc_super_secure_admin_jwt_secret_key_2026';

// 8 heures de session
const SESSION_MAX_AGE = 8 * 60 * 60;

export interface AdminSession {
  email: string;
  role: 'admin';
  exp: number;
}

/**
 * Signe un payload avec HMAC-SHA256
 */
export function signSession(payload: AdminSession): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Vérifie et décode un token de session
 */
export function verifySession(token: string): AdminSession | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [data, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(data)
      .digest('base64url');

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload: AdminSession = JSON.parse(
      Buffer.from(data, 'base64url').toString('utf8')
    );

    // Vérifier l'expiration
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Récupère la session courante depuis les cookies
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * Enregistre la session dans un cookie HTTP-Only sécurisé
 */
export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  const session: AdminSession = {
    email,
    role: 'admin',
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };

  const token = signSession(session);

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Supprime le cookie de session
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}


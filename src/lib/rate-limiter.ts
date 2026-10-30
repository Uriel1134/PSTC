// Protection mémoire contre les attaques par force brute (Brute-Force Rate Limiter)

interface AttemptRecord {
  count: number;
  blockedUntil: number;
}

const loginAttempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes de blocage

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  // Si l'IP est bloquée
  if (record.blockedUntil > now) {
    const retryAfterSec = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  // Si le blocage est expiré, réinitialiser
  if (record.blockedUntil > 0 && record.blockedUntil <= now) {
    loginAttempts.delete(ip);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return { allowed: remaining > 0, remaining };
}

export function recordFailedAttempt(ip: string): { blocked: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };

  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    loginAttempts.set(ip, record);
    return { blocked: true, retryAfterSec: Math.ceil(BLOCK_DURATION_MS / 1000) };
  }

  loginAttempts.set(ip, record);
  return { blocked: false };
}

export function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}


import crypto from 'crypto';

const COOKIE_NAME = 'lockedout_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'gdg51-winforms-secret-key-salt-987654';

export function getExpectedPassword(): string {
  // Support either LOCKEDOUT or lowercase lockedout env variables, with default fallback
  return process.env.LOCKEDOUT || process.env.lockedout || 'lockedout';
}

export function verifyPassword(providedPassword: string): boolean {
  if (!providedPassword || typeof providedPassword !== 'string') {
    return false;
  }

  const expected = getExpectedPassword();

  // Timing safe comparison via SHA-256 digests
  const hashProvided = crypto.createHash('sha256').update(providedPassword.trim()).digest();
  const hashExpected = crypto.createHash('sha256').update(expected.trim()).digest();

  return crypto.timingSafeEqual(hashProvided, hashExpected);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}:${nonce}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [timestampStr, nonce, expectedHmac] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Reject tokens older than 7 days
    if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const payload = `${timestampStr}:${nonce}`;
    const calculatedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    const bufExpected = Buffer.from(expectedHmac, 'hex');
    const bufCalculated = Buffer.from(calculatedHmac, 'hex');

    if (bufExpected.length !== bufCalculated.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufExpected, bufCalculated);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };

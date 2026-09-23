import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE = "wkt_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "wkt-preview-secret-change-before-production"
);

export type Session = { email: string; name?: string };

export async function createSession(session: Session) {
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { email: String(payload.email), name: payload.name ? String(payload.name) : undefined };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

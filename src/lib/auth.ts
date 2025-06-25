import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { logEvent} from "@/utils/sentry";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "default_secret");
const cookieName = "auth_token";

// Encrypt and sign token using HS256 algorithm
export async function signAuthToken(payload: any, ) {
    try {
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        return token;
    } catch (error) {
        logEvent("Error signing JWT", 'auth', {payload}, 'error', error);
        throw new Error("Failed to sign JWT");
    }
}

// Decrypt and verify token
export async function verifyAuthToken<T>(token: string): Promise<T> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    } catch (error) {
        logEvent("Error verifying JWT", 'auth', {tokenSnippet: token.slice(0,10)}, 'error', error);
        throw new Error("Invalid or expired token");
    }
}

// Set the ault cookie with the signed token
export async function setAuthCookie(token: string) {
    try {
        const cookieStore = await cookies();
        await cookieStore.set(cookieName, token,{
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })
    }
   catch (error) {
        logEvent("Error setting auth cookie", 'auth', {token}, 'error', error);
        throw new Error("Failed to set auth cookie"); 
      }
    }

// Get auth token from cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}

// Remove auth token cookie
export async function removeAuthCookie() {
  try{
    const cookieStore = await cookies();
    await cookieStore.delete(cookieName);
  } catch (error) {
    logEvent("Error removing auth cookie", 'auth', {}, 'error', error);
    throw new Error("Failed to remove auth cookie");
  }
}
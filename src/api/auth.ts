import { jwtDecode, type JwtPayload } from "jwt-decode";
import { request } from "./client";
import type { LoginResponse, User } from "./types";

export interface LoginRequest {
  username: string;
  password: string;
}

type JwtPayloadWithRole = JwtPayload  & Record<"role", string>

const ACCESS_TOKEN_KEY = "accessToken";

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const token = await request<string>("/login", {
    method: "POST",
    body: {
      userName: username,
      password,
    },
  });

  const payload = decodeAccessToken(token)

  return {
    accessToken: token,
    user: {
      username: payload?.sub!,
      role: payload?.role!
    }
  }
}

export async function getMyInfo(): Promise<User> {
  return request<User>("/token");
}

export function saveAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function decodeAccessToken(token: string): JwtPayloadWithRole | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload as JwtPayloadWithRole
  } catch {
    return null;
  }
}

export function getUserFromToken(token: string): User | null {
  const payload = decodeAccessToken(token);

  if (!payload) return null;

  return {
    username: payload.sub!,
    role: payload.role,
  };
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeAccessToken(token);

  if (!payload?.exp) return false;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export function getValidUserFromStorage(): User | null {
  const token = getAccessToken();

  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAccessToken();
    return null;
  }

  return getUserFromToken(token);
}

import { jwtDecode, type JwtPayload } from "jwt-decode";
import { request } from "./client";
import type { LoginResponse, User } from "./types";

export interface LoginRequest {
  username: string;
  password: string;
}

type JwtPayloadWithRole = JwtPayload  & Record<"role", string>

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const res = await request<string>("/login", {
    method: "POST",
    body: {
      userName: username,
      password,
    },
  });

  const payload = decodeAccessToken(res)

  return {
    accessToken: res,
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
  localStorage.setItem("accessToken", token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function clearAccessToken(): void {
  localStorage.removeItem("accessToken");
}

export function decodeAccessToken(token: string): JwtPayloadWithRole | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload as JwtPayloadWithRole
  } catch {
    return null;
  }
}

export function getUserFromToken(): User | null {
  const token = getAccessToken();

  if (!token) return null;

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

export function getValidUserFromToken(): User | null {
  const token = getAccessToken();

  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAccessToken();
    return null;
  }

  return getUserFromToken();
}
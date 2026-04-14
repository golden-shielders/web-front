import { request } from "./client";
import type { LoginResponse, User } from "./types";

export interface LoginRequest {
  username: string;
  password: string;
}

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });
}

export async function getMyInfo(): Promise<User> {
  return request<User>("/auth/me");
}

export function saveAccessToken(token: string): void {
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken(): void {
  localStorage.removeItem("accessToken");
}
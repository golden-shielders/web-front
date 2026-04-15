import { getAccessToken } from "./auth";

const BASE_URL = "http://192.168.0.34:8080/api/v1";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
};

export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = getAccessToken();

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body: BodyInit | Record<string, unknown> | null | undefined = options.body;

  if (
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer)
  ) {
    body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body,
  });

  const contentType = response.headers.get("content-type");
  let data: unknown;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: unknown }).message ?? "요청에 실패했습니다.")
        : typeof data === "string"
        ? data
        : "요청에 실패했습니다.";

    throw new Error(message);
  }

  return data as T;
}

export async function downloadFile(
  path: string,
  suggestedFilename?: string
): Promise<void> {
  const token = getAccessToken();

  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("파일 다운로드에 실패했습니다.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = suggestedFilename || "download";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

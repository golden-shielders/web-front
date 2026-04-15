import { downloadFile, request } from "./client";
import type {
  CreatePostRequest,
  PostDetail,
  PostSummary,
  UpdatePostRequest,
} from "./types";

export async function getPosts(): Promise<PostSummary[]> {
  const response = await request<PostSummary[]>("/posts");
  return response;
}

export async function getPostById(postId: string | number): Promise<PostDetail> {
  return request<PostDetail>(`/posts/${postId}`);
}

export async function createPost(
  data: CreatePostRequest,
  files: File[]
): Promise<number> {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);

  files.forEach((file) => {
    formData.append("files", file);
  });

  return request<number>("/posts", {
    method: "POST",
    body: formData,
  });
}

export async function updatePost(
  postId: string | number,
  { title, content }: UpdatePostRequest
): Promise<PostDetail> {
  return request<PostDetail>(`/posts/${postId}`, {
    method: "PUT",
    body: {
      title,
      content,
    },
  });
}

export async function deletePost(postId: string | number): Promise<void> {
  return request<void>(`/posts/${postId}`, {
    method: "DELETE",
  });
}

export async function downloadAttachment(
  fullPath: string,
  originalName: string,
): Promise<void> {
  await downloadFile(`/file?filePath=${fullPath}`, originalName);
}

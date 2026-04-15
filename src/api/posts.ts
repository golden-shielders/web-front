import { downloadFile, request } from "./client";
import type {
  CreatePostRequest,
  PostDetail,
  PostSummary,
  UpdatePostRequest,
} from "./types";

export async function getPosts(): Promise<PostSummary[]> {
  return request<PostSummary[]>("/posts");
}

export async function getPostById(postId: string | number): Promise<PostDetail> {
  return request<PostDetail>(`/posts/${postId}`);
}

export async function createPost(
  data: CreatePostRequest,
  files: File[]
): Promise<PostDetail> {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);

  files.forEach((file) => {
    formData.append("files", file);
  });

  return request<PostDetail>("/posts", {
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
  attachmentId: string | number,
  originalFilename: string
): Promise<void> {
  await downloadFile(`/attachments/${attachmentId}/download`, originalFilename);
}

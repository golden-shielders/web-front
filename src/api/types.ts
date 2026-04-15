export interface User {
  username: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface PostSummary {
  id: number;
  title: string;
  authorName: string;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  authorName: string;
  attachments: Attachment[];
}

export interface Attachment {
  id: number;
  originalName: string;
  fullPath: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}
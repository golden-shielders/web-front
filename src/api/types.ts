export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface Attachment {
  id: number;
  originalFilename: string;
  size: number;
  downloadUrl?: string;
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

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}
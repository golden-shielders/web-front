import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById } from "../api/posts";
import type { PostDetail } from "../api/types";

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function fetchPost() {
      if (!postId) {
        setError("잘못된 접근입니다.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPostById(postId);

        if (!mounted) return;

        setPost(data);
      } catch (err: unknown) {
        if (!mounted) return;

        const message =
          err instanceof Error ? err.message : "게시글을 불러오지 못했습니다.";
        setError(message);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchPost();

    return () => {
      mounted = false;
    };
  }, [postId]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러: {error}</p>;
  }

  if (!post) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <div>
      <h1>게시글 상세</h1>

      <div style={{ border: "1px solid #ddd", padding: "16px" }}>
        <h2>{post.title}</h2>
        <p>작성자: {post.authorName}</p>
        <hr />
        <p>{post.content}</p>
      </div>
    </div>
  );
}
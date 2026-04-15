import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deletePost, downloadAttachment, getPostById } from "../api/posts";
import type { PostDetail } from "../api/types";
import useAuth from "../hooks/useAuth";

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
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

  async function handleDownload(
    fullPath: string,
    originalName: string
  ): Promise<void> {
    try {
      await downloadAttachment(fullPath, originalName);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "다운로드에 실패했습니다.";
      alert(message);
    }
  }

    async function handleDelete(): Promise<void> {
    if (!postId) return;

    const confirmed = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deletePost(postId);
      navigate("/posts", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "게시글 삭제에 실패했습니다.";
      alert(message);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러: {error}</p>;
  }

  if (!post) {
    return <p>게시글이 없습니다.</p>;
  }

  const isAuthor = isAuthenticated && user?.username === post.authorName;

  return (
    <div>
      <h1>게시글 상세</h1>

      <div style={{ border: "1px solid #ddd", padding: "16px" }}>
        <h2>{post.title}</h2>
        <p>작성자: {post.authorName}</p>
        <hr />
        <p>{post.content}</p>

        {isAuthor && (
          <div style={{ marginTop: "16px" }}>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        )}

        {post.attachments.length > 0 && (
          <>
            <h3>첨부파일</h3>
            <ul>
              {post.attachments.map((attachment) => (
                <li key={attachment.id}>
                  {attachment.originalName}{" "}
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        attachment.fullPath,
                        attachment.originalName
                      )
                    }
                  >
                    다운로드
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

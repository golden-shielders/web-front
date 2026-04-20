import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deletePost, downloadAttachment, getPostById } from "../api/posts";
import type { PostDetail } from "../api/types";
import useAuth from "../hooks/useAuth";
import activateScripts from "../utils/activateScripts";

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (post && contentRef.current) {
      console.log(post.content);
      contentRef.current.innerHTML = post.content;

      activateScripts(contentRef.current);
    }
  }, [post]);

  async function handleDownload(
    fullPath: string,
    originalName: string,
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
    return <p className="loading-state">게시글을 불러오는 중...</p>;
  }

  if (error) {
    return <p className="error-state">에러: {error}</p>;
  }

  if (!post) {
    return <p className="empty-state">게시글이 없습니다.</p>;
  }

  const isAuthor = isAuthenticated && user?.username === post.authorName;
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="page detail-shell">
      <div className="inline-actions">
        <Link className="btn btn--secondary" to="/posts">
          목록으로
        </Link>
      </div>

      <article className="glass-card post-card stack">
        <div className="stack" style={{ gap: "10px" }}>
          <span className="eyebrow">
            <span className="eyebrow__dot" /> Post Overview
          </span>
          <h1 className="page-title">{post.title}</h1>
          <div className="post-meta">
            <span className="tag">작성자 {post.authorName}</span>
            <span className="tag">Post #{post.id}</span>
            {isAuthor && <span className="tag">작성자 권한</span>}
          </div>
        </div>

        <hr className="divider" />

        <div className="post-content" ref={contentRef} />

        {(isAuthor || isAdmin) && (
          <div className="inline-actions">
            <button
              type="button"
              className="btn btn--danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        )}
      </article>

      {post.attachments.length > 0 && (
        <section className="glass-card stack">
          <div>
            <h2 className="section-title">첨부파일</h2>
            <p className="section-copy">
              게시글에 연결된 파일을 바로 다운로드할 수 있어.
            </p>
          </div>
          <ul className="file-list">
            {post.attachments.map((attachment) => (
              <li key={attachment.id} className="file-item">
                <div className="file-item__name">
                  <span className="file-item__icon">📎</span>
                  <span className="file-name-text">
                    {attachment.originalName}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() =>
                    handleDownload(attachment.fullPath, attachment.originalName)
                  }
                >
                  다운로드
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

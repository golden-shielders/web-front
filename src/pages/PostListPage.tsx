import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPosts } from "../api/posts";
import type { PostSummary } from "../api/types";

export default function PostListPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      try {
        const data = await getPosts();

        if (!mounted) return;

        setPosts(data);
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

    void fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <p className="loading-state">게시글 목록을 불러오는 중...</p>;
  }

  if (error) {
    return <p className="error-state">에러: {error}</p>;
  }

  return (
    <div className="page">
      <section className="glass-card stack">
        <div className="section-head">
          <div>
            <h1 className="page-title">게시글 관리</h1>
            <p className="section-copy">
              등록된 게시글을 표 형태로 빠르게 확인할 수 있도록 운영 대시보드 스타일로 정리했어.
            </p>
          </div>
          <div className="inline-actions">
            <span className="tag">총 {posts.length}건</span>
            <Link to="/write" className="btn btn--primary">
              새 글 작성
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">아직 등록된 게시글이 없습니다.</div>
        ) : (
          <div className="board-table-wrap">
            <table className="board-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>제목</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td data-label="ID">
                      <span className="id-chip">#{post.id}</span>
                    </td>
                    <td data-label="제목">
                      <Link className="post-link" to={`/posts/${post.id}`}>
                        {post.title}
                        <span className="post-link__arrow">↗</span>
                      </Link>
                    </td>
                    <td data-label="작성자">{post.authorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

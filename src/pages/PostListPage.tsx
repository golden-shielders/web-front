const defaultPosts: PostSummary[] = [
  { id: 1, title: "첫 번째 글", authorName: "admin" },
  { id: 2, title: "두 번째 글", authorName: "guest" },
  { id: 3, title: "세 번째 글", authorName: "test" },
];

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPosts } from "../api/posts";
import type { PostSummary } from "../api/types";

export default function PostListPage() {
  const [posts, setPosts] = useState<PostSummary[]>(defaultPosts);
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
        // setError(message);
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
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러: {error}</p>;
  }

  return (
    <div>
      <h1>게시글 목록</h1>

      <table
        width="100%"
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse" }}
      >
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
              <td>{post.id}</td>
              <td>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.authorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
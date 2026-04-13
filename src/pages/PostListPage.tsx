import { Link } from "react-router";

const posts = [
  { id: 1, title: "첫 번째 글", author: "admin" },
  { id: 2, title: "두 번째 글", author: "guest" },
  { id: 3, title: "세 번째 글", author: "test" },
];

export default function PostListPage() {
  return (
    <div>
      <h1>게시글 목록</h1>

      <table width="100%" border={1} cellPadding="8" style={{ borderCollapse: "collapse" }}>
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
              <td>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
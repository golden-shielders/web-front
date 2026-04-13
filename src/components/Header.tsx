import { Link } from "react-router";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">홈</Link>
      <Link to="/login">로그인</Link>
      <Link to="/posts">게시판</Link>
      <Link to="/write">글쓰기</Link>
    </header>
  );
}

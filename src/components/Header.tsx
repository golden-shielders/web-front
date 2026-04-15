import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { clearAccessToken } from "../api/auth";

export default function Header() {
  const { isLoading, isAuthenticated, user } = useAuth();

  function handleLogout(): void {
    clearAccessToken();
    window.location.href = "/login";
  }

  return (
    <header
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
        alignItems: "center",
      }}
    >
      <Link to="/">홈</Link>
      <Link to="/posts">게시판</Link>

      {isAuthenticated && <Link to="/write">글쓰기</Link>}

      <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
        {isLoading ? (
          <span>확인 중...</span>
        ) : isAuthenticated ? (
          <>
            <span>{user?.username}님</span>
            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </header>
  );
}

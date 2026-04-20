import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user, logout } = useAuth();

  function handleLogout(): void {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="site-header-wrap">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Sentinel Board 홈으로 이동">
          <span className="brand__mark">SB</span>
          <span className="brand__text">
            <span className="brand__title">Sentinel Board</span>
            <span className="brand__subtitle">Operations Dashboard</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="주요 메뉴">
          <Link className="nav-link" to="/">
            Overview
          </Link>
          <Link
            className="nav-link"
            to={{
              pathname: "/posts",
              search: "?page=0&size=10&sort=id",
            }}
          >
            Posts
          </Link>
          {isAuthenticated && (
            <Link className="nav-link" to="/write">
              Create
            </Link>
          )}
        </nav>

        <div className="header-spacer" />

        <div className="user-panel">
          {isLoading ? (
            <span className="user-badge">
              <span className="user-badge__dot" /> 세션 확인 중
            </span>
          ) : isAuthenticated ? (
            <>
              <span className="user-badge">
                <span className="user-badge__dot" /> {user?.username} 계정
                활성화
              </span>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link className="btn btn--secondary" to="/login">
              로그인
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

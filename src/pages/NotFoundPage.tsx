import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="center-message">
      <section className="glass-card not-found stack">
        <p className="not-found__code">404</p>
        <div className="stack" style={{ gap: "8px" }}>
          <h1 className="page-title">페이지를 찾을 수 없습니다.</h1>
          <p className="page-subtitle">
            요청한 주소가 잘못되었거나, 삭제되었거나, 접근 경로가 변경되었을 수 있어.
          </p>
        </div>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn--primary">
            홈으로 이동
          </Link>
          <Link to="/posts" className="btn btn--secondary">
            게시판 보기
          </Link>
        </div>
      </section>
    </div>
  );
}

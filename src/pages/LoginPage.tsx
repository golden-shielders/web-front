import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

interface LoginForm {
  username: string;
  password: string;
}

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const state = location.state as LocationState | null;
  const redirectPath = state?.from || "/posts";

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "로그인에 실패했습니다.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page login-layout">
      <section className="hero">
        <div className="hero__inner stack">
          <span className="eyebrow">
            <span className="eyebrow__dot" /> Secure Access
          </span>
          <div className="stack" style={{ gap: "12px" }}>
            <h1>운영 보드 접근을 위한 로그인</h1>
            <p className="page-subtitle">
              관리자 기능과 게시글 작성 권한은 인증된 사용자에게만 제공돼.
              입력 흐름이 한눈에 보이도록 폼 위계와 버튼 배치를 업무 시스템 스타일로 정리했어.
            </p>
          </div>

          <div className="login-points">
            <div className="login-point">
              <span className="login-point__badge">A</span>
              <div>
                <strong>명확한 접근 흐름</strong>
                <p className="body-copy">주요 액션과 보조 액션을 구분해서 운영 화면처럼 단정하게 구성.</p>
              </div>
            </div>
            <div className="login-point">
              <span className="login-point__badge">B</span>
              <div>
                <strong>집중되는 입력 영역</strong>
                <p className="body-copy">포커스와 상태 변화가 명확해서 실무형 폼 경험에 더 가깝게 조정.</p>
              </div>
            </div>
            <div className="login-point">
              <span className="login-point__badge">C</span>
              <div>
                <strong>기존 기능 유지</strong>
                <p className="body-copy">로직은 바꾸지 않고도 화면 인상만 확실히 달라지도록 손봤어.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card stack">
        <div>
          <h2 className="section-title">로그인</h2>
          <p className="section-copy">인증에 성공하면 요청한 화면 또는 게시판 목록으로 이동해.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label className="form-row">
            <span className="form-label">아이디</span>
            <input
              className="input"
              name="username"
              type="text"
              placeholder="아이디를 입력하세요"
              value={form.username}
              onChange={handleChange}
            />
          </label>

          <label className="form-row">
            <span className="form-label">비밀번호</span>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <div className="inline-actions">
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
            <Link to="/posts" className="btn btn--secondary">
              게시판 먼저 보기
            </Link>
          </div>
        </form>

        {error && <p className="alert alert--error">{error}</p>}
      </section>
    </div>
  );
}

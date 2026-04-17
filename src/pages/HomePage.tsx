export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero__inner stack">
          <span className="eyebrow">
            <span className="eyebrow__dot" /> Enterprise Workspace
          </span>
          <div className="stack" style={{ gap: "12px" }}>
            <h1>차분하고 정돈된 기업형 대시보드 톤으로 재구성.</h1>
            <p className="page-subtitle">
              실습용 게시판 구조는 그대로 두고, 화면은 운영 포털처럼 보이도록
              다시 정리했어. 헤더, 카드, 데이터 영역, 폼 간격을 통일해서 실제
              내부 업무 시스템에 가까운 인상으로 맞췄어.
            </p>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="metric-card">
          <p className="metric-card__label">Theme</p>
          <p className="metric-card__value">Corporate</p>
          <p className="metric-card__hint">
            밝은 배경과 네이비 포인트 중심의 운영형 UI
          </p>
        </article>
        <article className="metric-card">
          <p className="metric-card__label">Experience</p>
          <p className="metric-card__value">Structured</p>
          <p className="metric-card__hint">
            카드, 표, 폼의 간격과 위계를 정돈해 정보 파악 속도 개선
          </p>
        </article>
        <article className="metric-card">
          <p className="metric-card__label">Purpose</p>
          <p className="metric-card__value">Dashboard</p>
          <p className="metric-card__hint">
            실습 페이지보다 업무 포털에 가까운 인상으로 조정
          </p>
        </article>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <div className="feature-card__icon">01</div>
          <h3>상단 네비게이션 정돈</h3>
          <p>
            브랜드 영역과 주요 메뉴, 사용자 상태를 한 줄에서 안정적으로 읽히게
            정리했어.
          </p>
        </article>
        <article className="feature-card">
          <div className="feature-card__icon">02</div>
          <h3>데이터 카드형 구성</h3>
          <p>
            핵심 지표, 안내 블록, 게시판을 동일한 카드 시스템 안에서 볼 수 있게
            맞췄어.
          </p>
        </article>
        <article className="feature-card">
          <div className="feature-card__icon">03</div>
          <h3>업무 시스템다운 가독성</h3>
          <p>
            장식은 줄이고 문장, 표, 입력 폼의 구분을 명확히 해서 실제 업무
            화면처럼 다듬었어.
          </p>
        </article>
      </section>

      <section className="two-col-grid">
        <article className="glass-card stack">
          <div>
            <h2 className="section-title">이번 버전에서 바뀐 포인트</h2>
            <p className="section-copy">
              장난스러운 분위기를 줄이고, 더 신뢰감 있는 업무용 인터페이스처럼
              보이도록 전반적인 시각 톤을 조정했어.
            </p>
          </div>
          <div className="info-grid">
            <div className="card">
              <h3 className="card-title">Visual Tone</h3>
              <p>
                화이트 카드와 블루 계열 포인트를 사용해 사내 포털에 가까운
                인상으로 변경.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Forms</h3>
              <p>
                입력창, 버튼, 에러 상태를 더 차분하고 명확하게 보여주도록
                재정리.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Board</h3>
              <p>
                테이블과 상태 배지를 운영 화면에서 자주 보는 형태로 단정하게
                조정.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Responsive</h3>
              <p>
                작은 화면에서는 카드형 읽기 흐름을 유지하도록 반응형 구조는
                그대로 살렸어.
              </p>
            </div>
          </div>
        </article>

        <aside className="glass-card stack">
          <div>
            <h2 className="section-title">권장 확인 순서</h2>
            <p className="section-copy">
              아래 순서로 보면 기업형 대시보드 느낌이 가장 잘 보여.
            </p>
          </div>
          <ol className="list-tight">
            <li>홈 화면에서 전체 톤과 카드 시스템 확인</li>
            <li>게시판 목록에서 표와 배지 스타일 확인</li>
            <li>상세 페이지에서 본문과 첨부파일 영역 확인</li>
            <li>로그인/글쓰기 페이지에서 폼 스타일 확인</li>
          </ol>
          <div className="notice-box">
            다음 단계에서는{" "}
            <span className="mono">사이드바형 관리자 페이지</span>나
            <span className="mono"> KPI 위젯 추가</span> 같은 방향으로 더 확장할
            수도 있어.
          </div>
        </aside>
      </section>
    </div>
  );
}

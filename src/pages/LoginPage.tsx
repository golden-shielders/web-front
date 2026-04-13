export default function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>

      <form style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
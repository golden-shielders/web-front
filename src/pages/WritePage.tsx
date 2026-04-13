export default function WritePage() {
  return (
    <div>
      <h1>글쓰기</h1>

      <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="text" placeholder="제목" />
        <textarea placeholder="내용" rows={10} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
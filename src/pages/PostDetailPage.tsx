import { useParams } from "react-router";

export default function PostDetailPage() {
  const { postId } = useParams();

  return (
    <div>
      <h1>게시글 상세</h1>
      <p>현재 글 번호: {postId}</p>

      <div style={{ marginTop: "16px", padding: "16px", border: "1px solid #ddd" }}>
        <h2>제목 예시</h2>
        <p>게시글 내용 예시입니다.</p>
      </div>
    </div>
  );
}
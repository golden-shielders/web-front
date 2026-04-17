import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { createPost } from "../api/posts";

interface WriteForm {
  title: string;
  content: string;
}

export default function WritePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<WriteForm>({
    title: "",
    content: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];

    setFiles(selectedFiles);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const postId = await createPost(form, files);
      navigate(`/posts/${postId}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "게시글 등록에 실패했습니다.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__inner stack">
          <span className="eyebrow">
            <span className="eyebrow__dot" /> Content Management
          </span>
          <h1>새 게시글 등록</h1>
          <p className="page-subtitle">
            제목, 본문, 첨부파일을 업무용 입력 화면처럼 단정하게 정리했어.
            작성 흐름이 자연스럽게 이어지도록 라벨, 버튼, 보조 문구 위계를 다시 맞췄어.
          </p>
        </div>
      </section>

      <section className="glass-card stack">
        <div>
          <h2 className="section-title">작성 폼</h2>
          <p className="section-copy">본문에는 HTML이 들어갈 수 있으니 실습 시 주의해서 사용해.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label className="form-row">
            <span className="form-label">제목</span>
            <input
              className="input"
              name="title"
              type="text"
              placeholder="게시글 제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
            />
          </label>

          <label className="form-row">
            <span className="form-label">내용</span>
            <textarea
              className="textarea"
              name="content"
              rows={10}
              placeholder="게시글 내용을 입력하세요"
              value={form.content}
              onChange={handleChange}
            />
            <span className="helper-text">실습용 페이지라면 HTML 조각을 넣어 테스트할 수도 있어.</span>
          </label>

          <label className="form-row">
            <span className="form-label">첨부파일</span>
            <input className="file-input" type="file" multiple onChange={handleFileChange} />
          </label>

          {files.length > 0 && (
            <ul className="upload-list">
              {files.map((file) => (
                <li className="upload-chip" key={`${file.name}-${file.size}`}>
                  <span>{file.name}</span>
                  <span className="tag">{file.size.toLocaleString()} bytes</span>
                </li>
              ))}
            </ul>
          )}

          <div className="inline-actions">
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>

        {error && <p className="alert alert--error">{error}</p>}
      </section>
    </div>
  );
}

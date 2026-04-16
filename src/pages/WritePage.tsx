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
    <div>
      <h1>글쓰기</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          name="title"
          type="text"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          rows={10}
          placeholder="내용"
          value={form.content}
          onChange={handleChange}
        />

        <input type="file" multiple onChange={handleFileChange} />

        {files.length > 0 && (
          <ul>
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`}>
                {file.name} ({file.size} bytes)
              </li>
            ))}
          </ul>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

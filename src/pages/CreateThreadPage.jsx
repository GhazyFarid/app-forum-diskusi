import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createThread } from "../reducer/threadReducer";
import TextInput from "../components/TextInput";
import TextAreaInput from "../components/TextAreaInput";
import Button from "../components/Button";

export default function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.profile.data?.id);

  const [form, setForm] = useState({
    title: "",
    category: "",
    body: "",
  });

  const canSubmit = form.title.trim() && form.body.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("userId", userId);
    if (!userId) {
      alert("Please login first!");
      return;
    }

    const dataInput = {
      title: form.title,
      category: form.category,
      body: form.body,
    };

    await dispatch(createThread(dataInput));
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "24px 16px",
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2>Buat Diskusi Baru</h2>
          <TextInput
            label="Title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div style={{ marginTop: 16 }} />

          <TextInput
            label="Category"
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <div style={{ marginTop: 16 }} />

          <TextAreaInput
            label="Body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="..."
            rows={6}
          />

          <Button disabled={!canSubmit} type="submit">
            Buat Diskusi
          </Button>
        </div>
      </form>
    </div>
  );
}

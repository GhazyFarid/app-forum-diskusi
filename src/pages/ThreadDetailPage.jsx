import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getThreadById } from "../reducer/threadReducer";
import { daysAgo } from "../utils/date";
import VoteButton from "../components/VoteButton";
import { safeHtml } from "../utils/textUtils";
import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
} from "../reducer/voteThreadReducer";
import CommentItem from "../components/CommentItem";
import {
  downVoteComment,
  neutralVoteComment,
  upVoteComment,
} from "../reducer/voteCommentReducer";
import { createComment } from "../reducer/commetReducer";
import TextAreaInput from "../components/TextAreaInput";
import Button from "../components/Button";

export default function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: dataProfile } = useSelector((i) => i.auth.profile);
  const { data: detail, status } = useSelector((i) => i.threads.getThreadById);
  const [localDetail, setLocalDetail] = useState(null);
  const userId = dataProfile?.id ?? "";
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (detail) {
      setLocalDetail(detail);
    }
  }, [detail]);

  useEffect(() => {
    dispatch(getThreadById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
  }

  if (!detail) return null;
  if (!localDetail) return null;

  const hasUpVoted = localDetail.upVotesBy.includes(userId);
  const hasDownVoted = localDetail.downVotesBy.includes(userId);

  const handleUpVote = () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    // Sudah upvote
    if (hasUpVoted) {
      setLocalDetail((prev) => ({
        ...prev,
        upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
      }));

      dispatch(neutralVoteThread(localDetail.id));
      return;
    }

    setLocalDetail((prev) => ({
      ...prev,
      upVotesBy: [...prev.upVotesBy, userId],
      downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
    }));

    dispatch(upVoteThread(localDetail.id));
  };

  const handleDownVote = () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    // Sudah downvote
    if (hasDownVoted) {
      setLocalDetail((prev) => ({
        ...prev,
        downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
      }));

      dispatch(neutralVoteThread(localDetail.id));
      return;
    }

    // Belum downvote
    setLocalDetail((prev) => ({
      ...prev,
      downVotesBy: [...prev.downVotesBy, userId],
      upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
    }));
    dispatch(downVoteThread(localDetail.id));
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await dispatch(
        createComment({
          threadId: localDetail.id,
          content: commentText,
        }),
      ).unwrap();

      // langsung tambahkan comment ke local state
      setLocalDetail((prev) => ({
        ...prev,
        comments: [response, ...prev.comments],
      }));

      setCommentText("");
    } catch (error) {
      console.error("Create comment failed:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "24px 16px",
      }}
    >
      {/* THREAD CARD */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
        }}
      >
        {/* Category */}
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            fontSize: 12,
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          #{localDetail.category}
        </div>
        <h1 style={{ margin: "8px 0 16px", color: "#111827" }}>
          {localDetail.title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          <img
            src={localDetail.owner.avatar}
            alt={localDetail.owner.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          />
          <div>
            <div style={{ fontWeight: 500, color: "#111827" }}>
              {localDetail.owner.name}
            </div>
            <div>{daysAgo(localDetail.createdAt)}</div>
          </div>
        </div>
        <div
          style={{
            lineHeight: 1.5,
            fontSize: 16,
            color: "#374151",
            whiteSpace: "pre-line",
          }}
          dangerouslySetInnerHTML={safeHtml(localDetail.body)}
        />
        {/* Thread Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 24,
            borderTop: "1px solid #e5e7eb",
            paddingTop: 16,
          }}
        >
          <VoteButton
            type="up"
            count={localDetail.upVotesBy.length}
            isActive={hasUpVoted}
            onClick={handleUpVote}
          />
          <VoteButton
            type="down"
            count={localDetail.downVotesBy.length}
            isActive={hasDownVoted}
            onClick={handleDownVote}
          />
        </div>
        {/* Comment */}
        {userId ? (
          <form onSubmit={handleCreateComment}>
            <div
              style={{
                marginTop: 24,
                borderTop: "1px solid #e5e7eb",
                paddingTop: 16,
              }}
            >
              <TextAreaInput
                label="Body"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar..."
                rows={4}
              />

              <div>
                <Button disabled={!commentText.trim()} type="submit">
                  Kirim Komentar
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <p
            style={{
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Login
            </span>{" "}
            untuk memberi komentar
          </p>
        )}
      </div>

      {/* COMMENTS */}
      <h3 style={{ marginBottom: 16 }}>Komentar ({detail.comments.length})</h3>

      {detail.comments.length === 0 && (
        <p style={{ color: "#6b7280" }}>Belum ada komentar</p>
      )}

      {localDetail.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          userId={userId}
          onUpVote={() =>
            dispatch(
              upVoteComment({
                threadId: localDetail.id,
                commentId: comment.id,
              }),
            )
          }
          onDownVote={() =>
            dispatch(
              downVoteComment({
                threadId: localDetail.id,
                commentId: comment.id,
              }),
            )
          }
          onNeutralVote={() =>
            dispatch(
              neutralVoteComment({
                threadId: localDetail.id,
                commentId: comment.id,
              }),
            )
          }
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumb";
import PageTransition from "@/components/PageTransition";

import { supabase } from "@/lib/supabase";
import { getAnonUser } from "@/lib/anonUser";

/* ================= COMMENT ITEM ================= */

function CommentItem({
  comment,
  allComments,
  onReply,
  onReact,
}: {
  comment: any;
  allComments: any[];
  onReply: (id: string) => void;
  onReact: (id: string, type: "like" | "dislike") => void;
}) {
  const replies = allComments.filter(
    (c) => c.parent_id === comment.id
  );

  const reactions = Array.isArray(comment.reactions)
  ? comment.reactions
  : [];

  const likes = reactions.filter(
    (r: any) => r.type === "like"
  ).length;

  const dislikes = reactions.filter(
    (r: any) => r.type === "dislike"
  ).length;

  return (
    <div
      className={`comment-card ${
        comment.parent_id ? "reply-card" : ""
      }`}
    >
      {/* HEADER */}
      <div className="comment-header">
        <span className="avatar">{comment.avatar}</span>

        <strong>{comment.username}</strong>

        <small>
          {new Date(comment.created_at).toLocaleString()}
        </small>
      </div>

      {/* CONTENT */}
      <p>{comment.content}</p>

      {/* ACTION */}
      <div className="comment-actions">
        <button onClick={() => onReact(comment.id, "like")}>
          👍 {likes}
        </button>

        <button onClick={() => onReact(comment.id, "dislike")}>
          👎 {dislikes}
        </button>

        <button onClick={() => onReply(comment.id)}>
          Reply
        </button>
      </div>

      {/* REPLIES */}
      {replies.map((r) => (
        <CommentItem
          key={r.id}
          comment={r}
          allComments={allComments}
          onReply={onReply}
          onReact={onReact}
        />
      ))}
    </div>
  );
}

/* ================= PAGE ================= */

export default function Introduction() {

  const params = useParams();
  const slug = params.slug as string;

  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  /* ================= LOAD ================= */

  async function loadComments() {
    try {
      setLoading(true);

      const { data: commentsData, error: cErr } = await supabase
        .from("education_comments")
        .select("*")
        .eq("content_id", slug)
        .order("created_at", { ascending: false });

      if (cErr) throw cErr;

      if (!commentsData?.length) {
        setComments([]);
        return;
      }

      const ids = commentsData.map((c) => c.id);

      const { data: reactionsData, error: rErr } = await supabase
        .from("comment_reactions")
        .select("*")
        .in("comment_id", ids);

      if (rErr) throw rErr;

      const merged = commentsData.map((c) => ({
        ...c,
        reactions: reactionsData.filter(
          (r) => r.comment_id === c.id
        ) || [],
      }));

      setComments(merged);

    } catch (err) {
      console.error("Load comments failed:", err);

    } finally {
      setLoading(false);
    }
  }

  const rootComments = comments.filter(
    (c) => !c.parent_id
  );

  /* ================= POST ================= */

  async function postComments() {

    if (!text.trim() || !slug) return;

    const user = getAnonUser();
    if (!user) return;

    const { error } = await supabase
      .from("education_comments")
      .insert({
        content_id: slug,
        content: text,
        user_id: user.id,
        username: user.name,
        avatar: user.avatar,
        parent_id: replyTo,
      });

    if (error) {
      console.error("Post error:", error);
      return;
    }

    setText("");
    setReplyTo(null);

    await loadComments();
  }

  /* ================= REACT ================= */

  async function react(
    id: string,
    type: "like" | "dislike"
  ) {

    const user = getAnonUser();
    if (!user) return;

    const { data: existing } = await supabase
      .from("comment_reactions")
      .select("id,type")
      .eq("comment_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {

      if (existing.type === type) {
        await supabase
          .from("comment_reactions")
          .delete()
          .eq("id", existing.id);

      } else {
        await supabase
          .from("comment_reactions")
          .update({ type })
          .eq("id", existing.id);
      }

    } else {

      await supabase
        .from("comment_reactions")
        .insert({
          comment_id: id,
          user_id: user.id,
          type,
        });
    }

    await loadComments();
  }

  /* ================= EFFECT ================= */

  useEffect(() => {

    if (!slug) return;

    loadComments();

    const commentChannel = supabase
      .channel("education-comments-" + slug)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "education_comments",
          filter: `content_id=eq.${slug}`,
        },
        () => loadComments()
      )
      .subscribe();

    const reactionChannel = supabase
      .channel("comment-reactions-" + slug)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comment_reactions",
        },
        () => loadComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentChannel);
      supabase.removeChannel(reactionChannel);
    };

  }, [slug]);

  /* ================= UI ================= */

  return (
    <PageTransition>
      <Breadcrumb />
    <main className="whitepaper">
      <h1>Introduction</h1>
      <p>
        Character is the fundamental foundation of a person’s traits and attitudes, 
        it serves as a guide to determine whether we are moving along the right path, 
        have deviated from it, or have become lost. A life without strong and good character 
        is like a powerless spinning wheel, moving without direction.
        To improve our character, we must have clear and well-directed guidance. 
        From there, we are able to evaluate ourselves objectively and 
        identify the specific areas that require improvement.
      </p>

      <section className="wp-card">
      <h2>Character Principles :</h2>
      <ul>
        <li><strong>Morality :</strong>  Disciplined, caring, and courteous</li>
        <li><strong>Vision :</strong> Grateful, consistent, and committed to visualizing goals</li>
        <li><strong>Mindset :</strong> Thinking positively in all aspects, having strong self-belief, 
          and maintaining aligned thinking</li>
      </ul>
      </section>

      {/* ===== COMMENT FORM ===== */} 
      <section className="comment-box"> 
        <p><strong>Community thoughts</strong></p> 

        <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder={ 
          replyTo ? "Replying..." : "Share your reflection..." 
          } /> 

        {replyTo && ( 
          <button className="btn ghost"
          onClick={() => setReplyTo(null)}> 
          Cancel Reply 
        </button> 
        )} 

        <button className="btn primary" 
        onClick={postComments}> 
        Post 
        </button> 

      </section>

        {/* LIST */}

        <section className="comments-list">

          {loading && <p>Loading...</p>}

          {!loading && comments.length === 0 && (
            <p>No comments yet.</p>
          )}

          {rootComments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              allComments={comments}
              onReply={setReplyTo}
              onReact={react}
            />
          ))}

        </section>

      </main>
    </PageTransition>
  );
}
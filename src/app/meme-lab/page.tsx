"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumb";
import PageTransition from "@/components/PageTransition";

import { supabase } from "@/lib/supabase";
import { getAnonUser } from "@/lib/anonUser";

/* ================= TYPES ================= */

type Meme = {
  id: string;
  image_url: string;
  prompt?: string;
  username: string;
  avatar: string;
  created_at: string;
  reactions?: Reaction[];
};

type Reaction = {
  id: string;
  meme_id: string;
  user_id: string;
  type: "like" | "dislike";
};

/* ================= PAGE ================= */

export default function MemeLab() {

  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const [prompt, setPrompt] = useState("");

  /* ================= LOAD ================= */

  async function loadMemes() {
    try {
      setLoading(true);

      // Load memes
      const { data: memesData, error: mErr } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false });
      
      console.log("STEP 4 - DB MEMES:", memesData);

      if (mErr) throw mErr;

      // Load reactions
      const { data: reactionsData, error: rErr } = await supabase
        .from("meme_reactions")
        .select("*");

      if (rErr) throw rErr;

      // Merge
      const merged = (memesData || []).map((m) => ({
        ...m,
        reactions: (reactionsData || []).filter(
          (r) => r.meme_id === m.id
        ),
      }));

      setMemes(merged);

    } catch (err) {
      console.error("Load memes error:", err);

    } finally {
      setLoading(false);
    }
  }

  /* ================= UPLOAD ================= */

  async function uploadMeme(file: File) {

    const user = getAnonUser();
    if (!user) return;

    const ext = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("memes")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("memes")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function saveMeme(url: string, prompt?: string) {

    const user = getAnonUser();
    if (!user) return;

    await supabase.from("memes").insert({
      image_url: url,
      prompt,
      user_id: user.id,
      username: user.name,
      avatar: user.avatar,
    });
  }

  /* ================= REACT ================= */

  async function reactMeme(
    memeId: string,
    type: "like" | "dislike"
  ) {

    const user = getAnonUser();
    if (!user) return;

    const { data: existing } = await supabase
      .from("meme_reactions")
      .select("id,type")
      .eq("meme_id", memeId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {

      if (existing.type === type) {

        await supabase
          .from("meme_reactions")
          .delete()
          .eq("id", existing.id);

      } else {

        await supabase
          .from("meme_reactions")
          .update({ type })
          .eq("id", existing.id);
      }

    } else {

      await supabase
        .from("meme_reactions")
        .insert({
          meme_id: memeId,
          user_id: user.id,
          type,
        });
    }

    await loadMemes();
  }

  /* ================= AI ================= */

  async function generateMeme() {

  if (!prompt.trim()) return;

  setIsGenerating(true);

  try {

    const res = await fetch("/api/generate-meme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!data.imageBase64) return;

    // convert base64 to file
    const blob = await fetch(
      `data:image/png;base64,${data.imageBase64}`
    ).then(r => r.blob());

    const file = new File(
      [blob],
      `ai-${Date.now()}.png`,
      { type: "image/png" }
    );

    // upload
    const url = await uploadMeme(file);

    if (!url) return;

    await saveMeme(url, prompt);

    setPrompt("");
    await loadMemes();

  } catch (err) {
    console.error("Generate meme failed:", err);
  } finally {
    setIsGenerating(false);
  }
}

  /* ================= EFFECT ================= */

  useEffect(() => {

    loadMemes();

    const memeChannel = supabase
      .channel("memes-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "memes",
        },
        () => loadMemes()
      )
      .subscribe();

    const reactChannel = supabase
      .channel("meme-reactions-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "meme_reactions",
        },
        () => loadMemes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(memeChannel);
      supabase.removeChannel(reactChannel);
    };
  }, []);

  /* ================= UI ================= */

  return (
    <PageTransition>
      <Breadcrumb />

      <main className="whitepaper">

        <h1>🎨 Meme Lab</h1>

        <p className="subtitle">
          Upload your meme and let the community react.
        </p>

        {/* AI BOX */}
        <section className="ai-box">

          <h3>AI Meme Generator</h3>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your meme idea..."
          />

          <button className="btn primary"
            onClick={generateMeme}
            disabled={!prompt.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Meme ✨"}
          </button>

        </section>

        {/* UPLOAD */}
        <section className="upload-box">

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {

              const file = e.target.files?.[0];
              if (!file) return;

              console.log("STEP 1 - FILE:", file);

              try {
              const url = await uploadMeme(file);
              console.log("STEP 2 - URL:", url);

              if (!url) return;
                await saveMeme(url);
                console.log("STEP 3 - saved");

                await loadMemes();

              } catch (err){
                console.error("upload failed", err);
              }
            }
          }
          />

        </section>

        {/* LIST */}
        <section className="meme-grid">

          {loading && <p>Loading...</p>}

          {!loading && memes.length === 0 && (
            <p>No memes yet.</p>
          )}

          {memes.map((m) => {

            const reactions = Array.isArray(m.reactions)
              ? m.reactions
              : [];

            const likes = reactions.filter(
              (r) => r.type === "like"
            ).length;

            const dislikes = reactions.filter(
              (r) => r.type === "dislike"
            ).length;

            console.log("STEP 5 - RENDER:", memes);

            return (
              <div key={m.id} className="meme-card">

                {/*Header*/}
                <div className="meme-header">
                  <span className="avatar">{m.avatar}</span>
                  <strong>{m.username}</strong>
                </div>

                {/*Image*/}
                <img
                  src={m.image_url}
                  alt="meme"
                  className="meme-image"
                />

                {m.prompt && (
                  <p className="meme-prompt">
                    {m.prompt}
                  </p>
                )}

                <div className="meme-actions">

                  <button
                    onClick={() =>
                      reactMeme(m.id, "like")
                    }
                  >
                    👍 {likes}
                  </button>

                  <button
                    onClick={() =>
                      reactMeme(m.id, "dislike")
                    }
                  >
                    👎 {dislikes}
                  </button>

                </div>

              </div>
            );
          })}

        </section>

      </main>

    </PageTransition>
  );
}
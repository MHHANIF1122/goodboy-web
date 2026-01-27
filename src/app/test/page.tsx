"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("education_comments")
        .select("*")

      if (error) {
        setStatus("Failed ❌" + error.message);
        setError(error.message);
      } else {
        setStatus("Connected ✅" + data.length + "rows");
      }
    }

    test();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase Connection Test</h1>
      <p>Status: {status}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
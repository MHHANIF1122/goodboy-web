import { supabase } from "./supabase";

export async function getComments() {
  const { data, error } = await supabase
    .from("education_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch comments error:", error);
    return [];
  }

  return data;
}
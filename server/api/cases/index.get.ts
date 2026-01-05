import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const limit = Number(getQuery(event).limit) || 1000;

  const { data: cases, error } = await client
    .from("cases")
    .select("id, image_url")
    .order("sort_order")
    .limit(limit);

  if (error) {
    console.error("Error fetching cases:", error);
    return [];
  }

  return cases;
});

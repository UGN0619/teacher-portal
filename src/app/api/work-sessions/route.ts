import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const teacher_id = searchParams.get("teacher_id");
  const status = searchParams.get("status");

  let query = supabase
    .from("work_sessions")
    .select(
      `
      *,
      teacher:teachers(*)
    `
    )
    .order("start_time", { ascending: false });

  if (teacher_id) {
    query = query.eq("teacher_id", teacher_id);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: sessions, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const body = await request.json();

  const { data: session, error } = await supabase
    .from("work_sessions")
    .insert({
      ...body,
      start_time: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(session);
}

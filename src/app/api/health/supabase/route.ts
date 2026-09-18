import { NextResponse } from "next/server";
import { testSupabaseConnection } from "@/lib/supabase/test-connection";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await testSupabaseConnection();
  return NextResponse.json(result, { status: result.success ? 200 : 503 });
}

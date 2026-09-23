import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), code: z.string().min(3) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const expected = process.env.DEMO_ACCESS_CODE || "WKT2026";
  if (parsed.data.code !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await createSession({ email: parsed.data.email, name: parsed.data.email.split("@")[0] });
  return NextResponse.json({ ok: true });
}

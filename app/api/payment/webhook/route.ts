import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createServerClient } from "@/lib/supabase";
import { getCurrentDay } from "@/lib/utils";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") return NextResponse.json({ ok: true });

    const paymentId = body.data?.id;
    if (!paymentId) return NextResponse.json({ error: "Sin payment id" }, { status: 400 });

    const paymentClient = new Payment(mp);
    const payment = await paymentClient.get({ id: paymentId });

    if (payment.status !== "approved") return NextResponse.json({ ok: true });

    const meta = payment.metadata as Record<string, unknown> | null;
    const weekId = meta?.week_id as string | undefined;    // MP convierte camelCase a snake_case
    const optionId = meta?.option_id as string | undefined;
    const optionText = meta?.option_text as string | null ?? null;
    const votes = Number(meta?.votes ?? 1);
    const voterName = meta?.voter_name as string | null ?? null;
    const voterEmail = meta?.voter_email as string | null ?? null;
    const voterCity = meta?.voter_city as string | null ?? null;

    if (!weekId || !optionId) {
      return NextResponse.json({ error: "Metadata incompleta" }, { status: 400 });
    }

    const supabase = createServerClient();

    // Idempotencia
    const { data: existing } = await supabase
      .from("votes")
      .select("id")
      .eq("payment_id", String(paymentId))
      .limit(1)
      .single();

    if (existing) return NextResponse.json({ ok: true });

    const day = getCurrentDay();

    await supabase.from("votes").insert({
      week_id: weekId,
      option_id: optionId,
      option_text: optionText,
      day,
      payment_id: String(paymentId),
      amount: payment.transaction_amount,
      vote_count: votes,
      voter_name: voterName,
      voter_email: voterEmail,
      voter_city: voterCity,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { weekConfig } from "@/config/week.config";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { optionId, optionText, votes, price, voterName, voterEmail, voterCity } =
      await req.json();

    if (!optionId || !votes || !price) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const validPack = weekConfig.payment.packs.find(
      (p) => p.votes === votes && p.price === price
    );
    if (!validPack) {
      return NextResponse.json({ error: "Pack inválido" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const isLocal = appUrl.includes("localhost") || appUrl.includes("127.0.0.1");

    const optionLabel =
      optionText ??
      weekConfig.options.find((o) => o.id === optionId)?.text ??
      optionId;

    const preference = new Preference(mp);

    const result = await preference.create({
      body: {
        items: [
          {
            id: `${weekConfig.weekId}-${optionId}-${votes}v`,
            title: `${validPack.label} para "${optionLabel}" — RecreoArgento`,
            quantity: 1,
            unit_price: price,
            currency_id: weekConfig.payment.currency,
          },
        ],
        payer: {
          name: voterName ?? "",
          email: voterEmail ?? "",
        },
        metadata: {
          weekId: weekConfig.weekId,
          optionId,
          optionText: optionText ?? null,
          votes,
          voterName: voterName ?? null,
          voterEmail: voterEmail ?? null,
          voterCity: voterCity ?? null,
        },
        back_urls: {
          success: `${appUrl}/voto/exitoso`,
          failure: `${appUrl}/voto/error`,
          pending: `${appUrl}/voto/pendiente`,
        },
        ...(isLocal ? {} : { auto_return: "approved" as const }),
        notification_url: `${appUrl}/api/payment/webhook`,
        statement_descriptor: "RecreoArgento",
      },
    });

    return NextResponse.json({ checkoutUrl: result.init_point });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const detail = (err as Record<string, unknown>)?.cause ?? (err as Record<string, unknown>)?.message ?? err;
    console.error("MP create error:", JSON.stringify(detail, null, 2));
    return NextResponse.json({ error: "Error al crear el pago", detail: msg }, { status: 500 });
  }
}

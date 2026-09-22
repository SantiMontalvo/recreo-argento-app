import Link from "next/link";

export default function VotoError() {
  return (
    <main className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-5 text-center">
      <div className="text-5xl mb-5">😕</div>
      <h1 className="text-white text-2xl font-bold mb-2">
        Algo salió mal
      </h1>
      <p className="text-white/40 text-sm max-w-xs leading-relaxed mb-8">
        El pago no pudo procesarse. Tu voto no fue registrado. Podés intentarlo de nuevo.
      </p>
      <Link
        href="/"
        className="bg-[#ffdd4a] text-[#141414] font-bold text-sm px-6 py-3 rounded-xl"
      >
        Volver e intentar de nuevo
      </Link>
    </main>
  );
}

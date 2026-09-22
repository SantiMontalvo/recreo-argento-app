import Link from "next/link";

export default function VotoExitoso() {
  return (
    <main className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-5 text-center">
      <div className="text-5xl mb-5">🎉</div>
      <span className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">
        ¡Voto registrado!
      </span>
      <h1 className="text-white text-2xl font-bold mb-2">
        Tu voto fue confirmado
      </h1>
      <p className="text-white/40 text-sm max-w-xs leading-relaxed mb-8">
        Gracias por participar. El resultado se revela a las 22:00 hs.
      </p>
      <Link
        href="/"
        className="bg-[#ffdd4a] text-[#141414] font-bold text-sm px-6 py-3 rounded-xl"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Elegí tu candidato",
    description:
      "Elegí una opción de la lista o escribí la tuya si no aparece.",
    color: "#77b6ea",
  },
  {
    number: "02",
    title: "Poné tus votos",
    description:
      "Elegí cuántos votos querés darle, pagá y participá. Sin registro ni contraseñas.",
    color: "#ffdd4a",
  },
  {
    number: "03",
    title: "El más votado entra",
    description:
      "Al cierre del día, el más votado entra en la imagen y ya no puede volver a votarse. Mañana, arrancamos de nuevo.",
    color: "#141414",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white rounded-2xl border border-[#141414]/6 overflow-hidden">
      <div className="px-5 py-4 border-b border-[#141414]/6">
        <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
          ¿Cómo funciona?
        </h3>
      </div>
      <div className="divide-y divide-[#141414]/4">
        {STEPS.map((step) => (
          <div key={step.number} className="px-5 py-4 flex items-start gap-4">
            <span
              className="text-2xl font-black leading-none flex-shrink-0 mt-0.5"
              style={{ color: step.color }}
            >
              {step.number}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#141414]">
                {step.title}
              </p>
              <p className="text-xs text-[#141414]/50 mt-0.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

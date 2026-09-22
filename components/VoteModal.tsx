"use client";

import { useEffect, useState } from "react";
import { VoteOption, PaymentStatus } from "@/lib/types";
import { weekConfig } from "@/config/week.config";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, Check, Star } from "lucide-react";

type Pack = (typeof weekConfig.payment.packs)[number];

type FormData = {
  nombre: string;
  mail: string;
  ciudad: string;
};

type Step = "packs" | "form";

type Props = {
  option: VoteOption;
  onClose: () => void;
};

export function VoteModal({ option, onClose }: Props) {
  const [step, setStep] = useState<Step>("packs");
  const [pack, setPack] = useState<Pack | null>(null);
  const [form, setForm] = useState<FormData>({ nombre: "", mail: "", ciudad: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<PaymentStatus>("idle");

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function validate() {
    const e: Partial<FormData> = {};
    if (form.nombre.trim().length < 2) e.nombre = "Ingresá tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail.trim())) e.mail = "Mail inválido";
    if (form.ciudad.trim().length < 2) e.ciudad = "Ingresá tu ciudad";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    if (!pack || !validate()) return;
    setStatus("processing");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          optionId: option.id,
          optionText: option.isCustom ? option.text : undefined,
          votes: pack.votes,
          price: pack.price,
          voterName: form.nombre.trim(),
          voterEmail: form.mail.trim(),
          voterCity: form.ciudad.trim(),
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet en mobile, centrado en desktop */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4 pointer-events-none">
        <div className="pointer-events-auto w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col">

          {step === "packs" && (
            <PackStep
              option={option}
              selected={pack}
              onSelect={setPack}
              onClose={onClose}
              onNext={() => pack && setStep("form")}
            />
          )}

          {step === "form" && pack && (
            <FormStep
              option={option}
              pack={pack}
              form={form}
              errors={errors}
              status={status}
              onChange={(field, val) => {
                setForm((f) => ({ ...f, [field]: val }));
                setErrors((e) => ({ ...e, [field]: undefined }));
              }}
              onBack={() => setStep("packs")}
              onPay={handlePay}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* ── Paso 1: selección de pack ─────────────────────────── */

function PackStep({
  option, selected, onSelect, onClose, onNext,
}: {
  option: VoteOption;
  selected: Pack | null;
  onSelect: (p: Pack) => void;
  onClose: () => void;
  onNext: () => void;
}) {
  const packs = weekConfig.payment.packs;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#141414]/6">
        <div>
          <p className="text-xs text-[#141414]/40 uppercase tracking-wider">Elegiste</p>
          <h2 className="text-base font-bold text-[#141414] leading-snug">{option.text}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#141414]/6 text-[#141414]/40 hover:bg-[#141414]/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Packs */}
      <div className="px-5 py-5 flex flex-col gap-3 overflow-y-auto">
        <p className="text-sm font-semibold text-[#141414] mb-1">¿Cuántos votos?</p>

        {packs.map((p) => {
          const isSelected = selected?.votes === p.votes;
          return (
            <button
              key={p.votes}
              onClick={() => onSelect(p as Pack)}
              className={cn(
                "relative w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-150 active:scale-[0.98]",
                isSelected
                  ? "border-[#141414] bg-[#141414]"
                  : "border-[#141414]/10 bg-[#f8f8f5]"
              )}
            >
              {p.badge && (
                <span className="absolute -top-2.5 right-4 bg-[#ffdd4a] text-[#141414] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={9} fill="currentColor" /> {p.badge}
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn("font-bold text-base", isSelected ? "text-white" : "text-[#141414]")}>
                    {p.label}
                  </p>
                  <p className={cn("text-xs mt-0.5", isSelected ? "text-white/50" : "text-[#141414]/40")}>
                    ${p.price / p.votes} por voto
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("text-xl font-black", isSelected ? "text-[#ffdd4a]" : "text-[#141414]")}>
                    ${p.price}
                  </span>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected ? "bg-[#ffdd4a] border-[#ffdd4a]" : "border-[#141414]/20"
                  )}>
                    {isSelected && <Check size={11} strokeWidth={3} className="text-[#141414]" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-2">
        <button
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all",
            selected
              ? "bg-[#ffdd4a] text-[#141414] active:scale-[0.98]"
              : "bg-[#141414]/8 text-[#141414]/30 cursor-not-allowed"
          )}
        >
          Continuar
        </button>
      </div>
    </>
  );
}

/* ── Paso 2: resumen + formulario ──────────────────────── */

function FormStep({
  option, pack, form, errors, status, onChange, onBack, onPay,
}: {
  option: VoteOption;
  pack: Pack;
  form: FormData;
  errors: Partial<FormData>;
  status: PaymentStatus;
  onChange: (field: keyof FormData, val: string) => void;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#141414]/6">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#141414]/6 text-[#141414]/50"
        >
          <ChevronLeft size={16} />
        </button>
        <h2 className="text-base font-bold text-[#141414]">Confirmá tu voto</h2>
      </div>

      <div className="px-5 py-5 overflow-y-auto flex flex-col gap-5">
        {/* Resumen */}
        <div className="bg-[#141414] rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs uppercase tracking-wider">Tu voto</span>
            <span className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {pack.label} · ${pack.price}
            </span>
          </div>
          <p className="text-white font-bold text-lg leading-snug">{option.text}</p>
          {option.description && (
            <p className="text-white/40 text-xs mt-1.5 leading-relaxed italic">
              {option.description}
            </p>
          )}
          <p className="text-white/30 text-xs mt-3">
            {pack.votes === 1
              ? "Tu voto contará 1 vez en el total de hoy."
              : `Tus ${pack.votes} votos se suman al total de hoy.`}
          </p>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-[#141414]">Tus datos</p>

          <Field
            label="Nombre"
            value={form.nombre}
            error={errors.nombre}
            placeholder="¿Cómo te llamás?"
            onChange={(v) => onChange("nombre", v)}
          />
          <Field
            label="Mail"
            type="email"
            value={form.mail}
            error={errors.mail}
            placeholder="tu@mail.com"
            onChange={(v) => onChange("mail", v)}
          />
          <Field
            label="Ciudad"
            value={form.ciudad}
            error={errors.ciudad}
            placeholder="¿De dónde votás?"
            onChange={(v) => onChange("ciudad", v)}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-2">
        <button
          onClick={onPay}
          disabled={status === "processing"}
          className="w-full rounded-2xl py-4 text-sm font-bold tracking-wide bg-[#ffdd4a] text-[#141414] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "processing" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#141414]/20 border-t-[#141414] rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            `Pagar $${pack.price} y votar`
          )}
        </button>
        {status === "error" && (
          <p className="text-center text-red-500 text-xs mt-2">
            Hubo un error. Intentá de nuevo.
          </p>
        )}
      </div>
    </>
  );
}

function Field({
  label, value, error, placeholder, type = "text", onChange,
}: {
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#141414]/60 uppercase tracking-wide block mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all",
          "bg-[#f8f8f5] placeholder:text-[#141414]/30 text-[#141414]",
          error
            ? "ring-2 ring-red-400"
            : "ring-1 ring-[#141414]/10 focus:ring-2 focus:ring-[#141414]"
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

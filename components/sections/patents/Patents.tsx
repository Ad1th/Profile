"use client";

export default function Patents() {
  return (
    <section
      data-section="patents"
      className="relative w-full bg-[#111] text-[#ECE7DF] px-8 py-20"
      style={{ isolation: "isolate" }}
    >
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-[12px] font-black tracking-[0.12em] text-[#FF5A1F]">
          + PATENTS
        </span>
        <h2 className="mt-4 text-[clamp(44px,6vw,84px)] font-extrabold leading-[0.92] tracking-[-0.06em] uppercase">
          COMING SOON
        </h2>
        <p className="mt-4 text-[#C8C0B4] text-[16px] leading-[1.6]">
          Placeholder section. Add your patents archive here.
        </p>
      </div>
    </section>
  );
}

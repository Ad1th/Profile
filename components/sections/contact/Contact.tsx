export default function Contact() {
  return (
    <section
      data-section="contact"
      className="relative w-full bg-[#111] text-[#ECE7DF] px-8 py-20"
      style={{ isolation: "isolate" }}
    >
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-[12px] font-black tracking-[0.12em] text-[#FF5A1F]">
          + CONTACT
        </span>
        <h2 className="mt-4 text-[clamp(44px,6vw,84px)] font-extrabold leading-[0.92] tracking-[-0.06em] uppercase">
          LET&apos;S BUILD
        </h2>
        <p className="mt-4 text-[#C8C0B4] text-[16px] leading-[1.6]">
          This section is a placeholder for now. Hook up your email/links as
          soon as you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 rounded border-[3px] border-[#111] bg-[#F0EBE0] px-5 py-3 font-archivo font-black text-[#111]"
          >
            EMAIL
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded border-[3px] border-[#333] bg-transparent px-5 py-3 font-archivo font-black text-[#ECE7DF]"
          >
            SOCIALS (SOON)
          </a>
        </div>
      </div>
    </section>
  );
}

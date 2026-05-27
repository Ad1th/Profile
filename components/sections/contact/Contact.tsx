export default function Contact() {
  return (
    <section
      data-section="contact"
      className="relative w-full overflow-hidden bg-[#2E2230] px-6 py-28 text-[#E8DDD0] sm:px-10 lg:px-16"
      style={{ isolation: "isolate" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(232,221,208,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(232,221,208,.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#B9827E]">
            - Contact
          </span>
          <h2 className="mt-6 font-serif text-[clamp(56px,8vw,128px)] font-semibold leading-[0.86] tracking-[-0.05em]">
            Final frame.
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-[clamp(20px,2.1vw,34px)] leading-[1.18] text-[#E8DDD0]/88">
            Open to backend systems, research prototypes, editorial web
            experiments, and teams that care about how the work feels.
          </p>

          <div className="mt-12 grid gap-4 border-t border-[#E8DDD0]/16 pt-8 font-mono text-[12px] font-bold uppercase tracking-[0.12em] sm:grid-cols-2">
            <a
              href="mailto:your.email@example.com"
              className="group border-b border-[#E8DDD0]/16 pb-4 text-[#E8DDD0] transition-colors hover:text-[#B9827E]"
            >
              Email
              <span className="mt-2 block text-[11px] text-[#8B9278] transition-transform group-hover:translate-x-1">
                your.email@example.com
              </span>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group border-b border-[#E8DDD0]/16 pb-4 text-[#E8DDD0] transition-colors hover:text-[#B9827E]"
            >
              Socials
              <span className="mt-2 block text-[11px] text-[#8B9278] transition-transform group-hover:translate-x-1">
                Links soon
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

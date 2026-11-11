export default function Contact() {
  return (
    <section
      data-section="contact"
      className="relative w-full overflow-hidden bg-[#111111] px-6 pt-8 pb-2 text-[#F0EBE0] sm:px-10 sm:pt-14 lg:px-16"
      style={{ isolation: "isolate" }}
    >
      {/* grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,.24)_0.7px,transparent_0.7px)] [background-size:16px_16px]" />

      {/* grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(232,221,208,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(232,221,208,.08)_1px,transparent_1px)] [background-size:88px_88px]" />

      {/* ambient glows */}
      {/* <div className="pointer-events-none absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#E8420A]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#8A8B6D]/10 blur-3xl" /> */}

      <div className="relative mx-auto flex max-w-7xl flex-col pt-[30px]">
        {/* top bar */}
        <div className="flex items-start justify-between border-b border-[#F0EBE0]/10 pb-5">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#F0EBE0]/82">
              ADITH
            </span>

            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E8420A]/70">
              //
            </span>

            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#F0EBE0]/55">
              PORTFOLIO
            </span>
          </div>

          <div className="hidden md:block">
            <span className="font-mono text-[11px] uppercase leading-[1.6] tracking-[0.16em] text-[#F0EBE0]/62">
              BUILDING SYSTEMS
              <br />
              AND EXPERIMENTS
            </span>
          </div>
        </div>

        {/* main */}
        <div className="grid gap-8 py-8 sm:gap-16 sm:py-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-12 w-px bg-[#F0EBE0]/10" />
            <div className="absolute left-[-1px] top-0 h-px w-12 bg-[#F0EBE0]/10" />

            <p className="ml-4 font-mono text-[13px] uppercase tracking-[0.14em] text-[#6C8EAD]">
              LET’S
              <br />
              BUILD
              <br />
              SOMETHING <span className="italic">REAL.</span>
            </p>

            {/* CONTACT */}
            <div className="group relative mt-10 w-full overflow-hidden sm:inline-block sm:w-auto sm:overflow-visible">
              <h2
                className="
      relative
      select-none
      font-serif
                  text-[clamp(3.25rem,18vw,9rem)]
                  sm:text-[clamp(6rem,10vw,15rem)]
      font-light
      uppercase
      leading-[0.84]
      tracking-[-0.08em]

      text-transparent
      bg-clip-text
      transition-[background-image]
      duration-100
    "
                style={{
                  fontFamily: 'var(--font-bodoni), "Bodoni Moda", Didot, serif',

                  backgroundImage: `
        linear-gradient(
          to top,
          #E8420A 0%,
          #E8420A 0%,
          #F0EBE0 0%,
          #F0EBE0 100%
        )
      `,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  const y = ((e.clientY - rect.top) / rect.height) * 100;

                  e.currentTarget.style.backgroundImage = `
        linear-gradient(
          to top,
          #E8420A 0%,
          #E8420A ${100 - y}%,
          #F0EBE0 ${100 - y}%,
          #F0EBE0 100%
        )
      `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = `
        linear-gradient(
          to top,
          #F0EBE0 0%,
          #F0EBE0 100%
        )
      `;
                }}
              >
                CONTACT
              </h2>

              {/* Paper grain overlay on text fill */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,.15)_0.5px,transparent_0.5px)",
                  backgroundSize: "14px 14px",
                }}
              />
            </div>

            <div className="mt-6 sm:mt-8 flex items-end gap-6">
              <div className="h-12 w-px bg-[#F0EBE0]/10" />

              <div className="rotate-[-4deg] font-mono text-[13px] leading-[1.8] tracking-[0.04em] text-[#8A8B6D]">
                currently
                <br />
                building
                <br />
                things.
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex flex-col justify-start border-l border-[#F0EBE0]/10 pl-0 pt-2 lg:pl-16 lg:pt-4">
            <div className="space-y-3 sm:space-y-5">
              {/* EMAIL 1 */}
              <a
                href="mailto:hello@adith.xyz"
                className="group flex items-center justify-between border-b border-[#F0EBE0]/10 pb-5 sm:pb-7 transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 hover:border-[#E8420A]/35"
              >
                <div className="flex items-start gap-8">
                  <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#E8420A]">
                    01
                  </span>

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A8B6D]">
                      PRIMARY EMAIL
                    </div>

                    <div
                      className="
                        mt-4
                        text-[clamp(1.6rem,2vw,2.5rem)]
                        tracking-[-0.04em]
                        text-[#F0EBE0]
                        transition-[transform,box-shadow,background-color,border-color,color,opacity]
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-white
                      "
                      style={{
                        fontFamily:
                          'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                      }}
                    >
                      hello@adith.xyz
                    </div>
                  </div>
                </div>

                <span className="translate-x-0 text-3xl text-[#E8420A] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>

              {/* EMAIL 2 */}
              <a
                href="mailto:madith2505@gmail.com"
                className="group flex items-center justify-between border-b border-[#F0EBE0]/10 pb-5 sm:pb-7 transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 hover:border-[#E8420A]/35"
              >
                <div className="flex items-start gap-8">
                  <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#E8420A]">
                    02
                  </span>

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A8B6D]">
                      SECONDARY EMAIL
                    </div>

                    <div
                      className="
                        mt-4
                        text-[clamp(1.6rem,2vw,2.5rem)]
                        tracking-[-0.04em]
                        text-[#F0EBE0]
                        transition-[transform,box-shadow,background-color,border-color,color,opacity]
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-white
                      "
                      style={{
                        fontFamily:
                          'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                      }}
                    >
                      madith2505@gmail.com
                    </div>
                  </div>
                </div>

                <span className="translate-x-0 text-3xl text-[#E8420A] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/Ad1th"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-[#F0EBE0]/10 pb-5 sm:pb-7 transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 hover:border-[#E8420A]/35"
              >
                <div className="flex items-start gap-8">
                  <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#E8420A]">
                    03
                  </span>

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A8B6D]">
                      GITHUB
                    </div>

                    <div
                      className="
                        mt-4
                        text-[clamp(1.6rem,2vw,2.5rem)]
                        tracking-[-0.04em]
                        text-[#F0EBE0]
                        transition-[transform,box-shadow,background-color,border-color,color,opacity]
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-white
                      "
                      style={{
                        fontFamily:
                          'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                      }}
                    >
                      github.com/Ad1th
                    </div>
                  </div>
                </div>

                <span className="translate-x-0 text-3xl text-[#E8420A] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/adith-manikonda/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-[#F0EBE0]/10 pb-5 sm:pb-7 transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 hover:border-[#E8420A]/35"
              >
                <div className="flex items-start gap-8">
                  <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#E8420A]">
                    04
                  </span>

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A8B6D]">
                      LINKEDIN
                    </div>

                    <div
                      className="
                          mt-4
                          text-[clamp(1.6rem,2vw,2.5rem)]
                          tracking-[-0.04em]
                          text-[#F0EBE0]
                          transition-[transform,box-shadow,background-color,border-color,color,opacity]
                          duration-500
                          group-hover:translate-x-1
                          group-hover:text-white
                        "
                      style={{
                        fontFamily:
                          'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                      }}
                    >
                      linkedin.com/in/adith-manikonda
                    </div>
                  </div>
                </div>

                <span className="translate-x-0 text-3xl text-[#E8420A] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

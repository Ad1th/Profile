"use client";

export default function Navbar() {
  const links = ["WORK", "ABOUT", "CONTACT"];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[72px] items-center justify-between border-b-[4px] border-[#111] bg-[#F0EBE0] px-[16px] pointer-events-none md:px-[24px]">
      <div className="pointer-events-auto flex items-center gap-[16px]">
        <div className="flex h-[48px] w-[48px] items-center justify-center border-[3px] border-[#111] bg-[#F45113] shadow-[4px_4px_0_#111] md:h-[52px] md:w-[52px]">
          <span className="pt-[1px] font-archivo text-[24px] font-[900] leading-none tracking-[-0.08em] text-[#111] md:text-[28px]">
            A.
          </span>
        </div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-[28px] md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-archivo text-[16px] font-[900] uppercase leading-none tracking-[-0.04em] text-[#111]"
          >
            {link}
          </a>
        ))}
        <span className="h-[22px] w-[2px] bg-[#111]" />
        <div className="grid h-[36px] w-[36px] grid-cols-3 place-items-center bg-[#111] p-[7px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] w-[3px] rounded-full bg-[#EEE7DC]"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client";

export default function Navbar() {
  const links = ["WORK", "ABOUT", "CONTACT"];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[72px] items-center justify-between border-b-[4px] border-[#111] bg-[#F0EBE0] px-[14px] pointer-events-none md:px-[20px]">
      <div className="pointer-events-auto flex items-center gap-[14px]">
        <div className="flex h-[42px] w-[42px] items-center justify-center border-[3px] border-[#111] bg-[#F45113] shadow-[4px_4px_0_#111] md:h-[46px] md:w-[46px]">
          <span className="pt-[1px] font-archivo text-[22px] font-[900] leading-none tracking-[-0.08em] text-[#111] md:text-[25px]">
            A.
          </span>
        </div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-[24px] md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-archivo text-[20px] font-[900] uppercase leading-none tracking-[-0.04em] text-[#111] transition-opacity duration-200 hover:opacity-50"
          >
            {link}
          </a>
        ))}
        <span className="h-[22px] w-[2px] bg-[#111]" />
        <div className="grid h-[32px] w-[32px] grid-cols-3 place-items-center bg-[#111] p-[6px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-[2px] w-[2px] rounded-full bg-[#EEE7DC]"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

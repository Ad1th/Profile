"use client";

export default function Navbar() {
  const links = ["WORK", "ABOUT", "CONTACT"];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[56px] items-center justify-between border-b-[3px] border-[#111] bg-[#F0EBE0] px-[12px] pointer-events-none md:px-[16px]">
      <div className="pointer-events-auto flex items-center gap-[12px]">
        <div className="flex h-[36px] w-[36px] items-center justify-center border-[3px] border-[#111] bg-[#F45113] shadow-[3px_3px_0_#111] md:h-[40px] md:w-[40px]">
          <span className="pt-[1px] font-archivo text-[20px] font-[900] leading-none tracking-[-0.08em] text-[#111] md:text-[22px]">
            A.
          </span>
        </div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-[20px] md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-archivo text-[14px] font-[900] uppercase leading-none tracking-[-0.04em] text-[#111] transition-opacity duration-200 hover:opacity-50"
          >
            {link}
          </a>
        ))}
        <span className="h-[18px] w-[2px] bg-[#111]" />
        <div className="grid h-[28px] w-[28px] grid-cols-3 place-items-center bg-[#111] p-[5px]">
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

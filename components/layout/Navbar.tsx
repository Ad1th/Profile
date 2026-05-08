"use client";

export default function Navbar() {
  const links = ["WORK", "ABOUT", "CONTACT"];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[80px] items-center justify-between border-b-[5px] border-[#111] bg-[#F0EBE0] px-[24px] pointer-events-none md:px-[28px]">
      <div className="pointer-events-auto">
        <div className="flex h-[62px] w-[62px] items-center justify-center border-[4px] border-[#111] bg-[#F45113] shadow-[6px_6px_0_#111] md:h-[70px] md:w-[70px]">
          <span className="pt-[2px] font-archivo text-[36px] font-[900] leading-none tracking-[-0.08em] text-[#111] md:text-[42px]">
            A.
          </span>
        </div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-[44px] md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-archivo text-[20px] font-[900] uppercase leading-none tracking-[-0.04em] text-[#111] transition-colors hover:text-[#F45113]"
          >
            {link}
          </a>
        ))}
        <span className="h-[26px] w-[2px] bg-[#111]" />
        <div className="grid h-[50px] w-[50px] grid-cols-3 place-items-center bg-[#111] p-[9px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-[4px] w-[4px] rounded-full bg-[#EEE7DC]"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

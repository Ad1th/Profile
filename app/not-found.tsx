import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          404 / No such page
        </p>
        <h1
          className="mt-5 text-7xl uppercase leading-none sm:text-9xl"
          style={{
            fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Nothing
          <br />
          <span className="text-[#E8420A]">here.</span>
        </h1>
        <div className="mt-8 h-1 w-16 bg-[#CFDE00]" />
        <p className="mt-6 max-w-md text-lg leading-7 text-[#111]/75">
          The address is wrong or the page moved. Everything that exists is
          reachable from the home page or the project archive.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-block border-[3px] border-[#111] bg-[#CFDE00] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] text-[#111] hover:bg-[#111] hover:text-[#CFDE00]"
            style={{ boxShadow: "4px 4px 0 0 #111" }}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="inline-block border-[3px] border-[#111] bg-[#F0EBE0] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] text-[#111] hover:bg-[#111] hover:text-[#F0EBE0]"
            style={{ boxShadow: "4px 4px 0 0 #111" }}
          >
            All projects
          </Link>
        </div>
      </div>
    </main>
  );
}

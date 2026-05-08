import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";

export default function Page() {
  return (
    <main className="relative w-full bg-[#F4EFE6] min-h-screen overflow-hidden selection:bg-[#F24A05] selection:text-white">
      <Hero />
      <About />
    </main>
  );
}

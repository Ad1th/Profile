import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";

export default function Page() {
  return (
    <main className="relative w-full bg-[#EEE7DC] min-h-screen overflow-x-hidden selection:bg-[#F05A24] selection:text-white">
      <Hero />
      <About viewportTransition />
      <Skills />
      <Experience />
    </main>
  );
}

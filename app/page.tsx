import HeroAboutTransition from "@/components/cinematic/HeroAboutTransition";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";

export default function Page() {
  return (
    <main className="relative w-full bg-[#EEE7DC] min-h-screen overflow-x-hidden selection:bg-[#F05A24] selection:text-white">
      {/* Cinematic Hero → About transition */}
      <HeroAboutTransition />

      {/* Rest of the page */}
      <Skills />
      <Experience />

      {/* Additional sections can be added here */}
      {/* <Projects /> */}
      {/* <Contact /> */}
    </main>
  );
}

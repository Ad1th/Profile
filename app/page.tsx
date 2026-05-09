import HeroAboutTransition from "@/components/sections/HeroAboutTransition";
import AboutSkillsTransition from "@/components/sections/AboutSkillsTransition";

export default function Page() {
  return (
    <main className="relative w-full bg-[#EEE7DC] min-h-screen overflow-x-hidden selection:bg-[#F05A24] selection:text-white">
      <HeroAboutTransition />
      <AboutSkillsTransition />
    </main>
  );
}

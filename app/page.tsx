import CinematicSequence from "@/components/cinematic/CinematicSequence";
import Experience from "@/components/sections/experience/Experience";

export default function Page() {
  return (
    <main className="relative w-full bg-[#EEE7DC] min-h-screen overflow-x-hidden selection:bg-[#F05A24] selection:text-white">
      {/* Cinematic sequence: Hero → About → Skills */}
      <CinematicSequence />

      {/* Normal scrolling resumes after cinematic sequence */}
      <Experience />

      {/* Additional sections can be added here */}
      {/* <Projects /> */}
      {/* <Contact /> */}
    </main>
  );
}

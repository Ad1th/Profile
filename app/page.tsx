import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";

export default function Page() {
  return (
    <main className="relative w-full bg-[#EEE7DC] min-h-screen overflow-hidden selection:bg-[#F05A24] selection:text-white">
      <Navbar />
      <Hero />
    </main>
  );
}

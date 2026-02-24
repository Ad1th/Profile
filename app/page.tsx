"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  ChevronDown,
  Sparkles,
  Code,
  Zap,
  Rocket,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileNav } from "@/components/mobile-nav";
import { Timeline } from "@/components/timeline";
import { KonamiCode } from "@/components/konami-code";
import { DisableDevTools } from "@/components/disable-devtools";
import {
  ScrollProgress,
  ScrollIndicator,
} from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { TextScramble, SplitText } from "@/components/ui/text-scramble";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightCard } from "@/components/ui/tilt-card";
import { Reveal, Float } from "@/components/ui/reveal";
import { LoadingScreen } from "@/components/loading-screen";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { GradientMesh } from "@/components/backgrounds/gradient-mesh";
import { AdvancedCursor } from "@/components/ui/advanced-cursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutMe() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsScrollRef = useRef<HTMLDivElement>(null);
  const skillsInnerRef = useRef<HTMLDivElement>(null);

  const [blobs, setBlobs] = useState<
    {
      width: number;
      height: number;
      top: number;
      left: number;
      opacity: number;
      scale: number;
      duration: number;
    }[]
  >([]);
  // Function to handle scroll animations
  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0);

    setBlobs(
      Array.from({ length: 20 }).map(() => ({
        width: Math.random() * 300 + 50,
        height: Math.random() * 300 + 50,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.5,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 10,
      }))
    );
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    gsap.registerPlugin(ScrollTrigger);
    const outer = skillsScrollRef.current;
    const inner = skillsInnerRef.current;
    if (outer && inner) {
      const panels = inner.querySelectorAll(".horiscroll");
      const numPanels = panels.length;
      const panelWidth = outer.offsetWidth;

      // Set each panel to be the width of the container
      panels.forEach((panel) => {
        (panel as HTMLElement).style.minWidth = `${panelWidth}px`;
        (panel as HTMLElement).style.maxWidth = `${panelWidth}px`;
      });

      gsap.to(inner, {
        x: () => `-${panelWidth * (numPanels - 1)}px`,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${panelWidth * (numPanels - 1)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animatedElements.forEach((el) => observer.unobserve(el));
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      <SmoothScroll>
        <div className="min-h-screen relative overflow-hidden">
          {/* Gradient Mesh Background - static, lightweight */}
          <GradientMesh />

          {/* Custom Cursor */}
          <AdvancedCursor />

          {/* Theme Customizer */}
          <ThemeCustomizer />

          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Scroll Indicator Dots */}
          <ScrollIndicator />

          {/* Noise Overlay for texture */}
          <div className="noise-overlay" />

          {/* Konami Code Easter Eggs */}
          <KonamiCode />

          {/* Disable Dev Tools */}
          <DisableDevTools />

          {/* Navigation */}
          <motion.nav
            className="sticky top-0 z-50 glass border-b border-purple-900/20"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
              <MagneticButton>
                <Link
                  href="#"
                  className="text-xl font-bold text-gradient-animate"
                >
                  Adith
                </Link>
              </MagneticButton>
              <div className="hidden md:flex items-center space-x-6">
                {[
                  "about",
                  "experience",
                  "skills",
                  "projects",
                  "patents",
                  "achievements",
                  "hackathons",
                  "hobbies",
                ].map((item, i) => (
                  <MagneticButton key={item}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                    >
                      <Link
                        href={`#${item}`}
                        className="text-sm font-medium hover:text-purple-500 transition-colors capitalize"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  </MagneticButton>
                ))}
              </div>
              <MobileNav />
            </div>
          </motion.nav>

          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
          >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="container px-4 py-24 md:px-6 md:py-32 z-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <motion.div
                  className="flex flex-col justify-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="space-y-4">
                    <motion.div
                      className="inline-flex items-center px-4 py-2 text-sm rounded-full glass text-purple-400 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <span className="relative flex h-2 w-2 mr-2 pulse-dot">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Available for new opportunities
                    </motion.div>

                    <motion.h1
                      className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <span className="block text-foreground">Hi, I'm</span>
                      <span className="text-gradient-animate">
                        <TextScramble
                          text="Adith Manikonda"
                          scrambleSpeed={30}
                          revealDelay={800}
                        />
                      </span>
                    </motion.h1>

                    <motion.p
                      className="max-w-[600px] text-xl text-muted-foreground md:text-2xl mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <SplitText delay={0.6} staggerDelay={0.05}>
                        Software Developer | Engineering Student | Tech
                        Enthusiast
                      </SplitText>
                    </motion.p>

                    <motion.div
                      className="flex items-center space-x-2 text-muted-foreground mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <MapPin className="h-4 w-4" />
                      <span>VIT, Vellore, India</span>
                    </motion.div>
                  </div>
                  <motion.div
                    className="flex flex-col gap-3 min-[400px]:flex-row mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <MagneticButton>
                      <Link
                        href="#projects"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring relative overflow-hidden group"
                      >
                        <span className="relative z-10">View Projects</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </MagneticButton>
                    <MagneticButton>
                      <Link
                        href="#about"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-purple-500/30 bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-all hover:bg-purple-500/10 hover:border-purple-500/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        About Me
                      </Link>
                    </MagneticButton>
                  </motion.div>
                  <motion.div
                    className="flex space-x-6 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <MagneticButton strength={0.3}>
                      <Link
                        href="https://github.com/Ad1th"
                        className="text-muted-foreground hover:text-purple-400 transition-all duration-300 transform hover:scale-125"
                        target="_blank"
                      >
                        <Github className="h-7 w-7" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </MagneticButton>
                    <MagneticButton strength={0.3}>
                      <Link
                        href="https://www.linkedin.com/in/adith-manikonda/"
                        className="text-muted-foreground hover:text-purple-400 transition-all duration-300 transform hover:scale-125"
                        target="_blank"
                      >
                        <Linkedin className="h-7 w-7" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </MagneticButton>
                    <MagneticButton strength={0.3}>
                      <Link
                        href="mailto: adith2505@outlook.com"
                        className="text-muted-foreground hover:text-purple-400 transition-all duration-300 transform hover:scale-125"
                      >
                        <Mail className="h-7 w-7" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </MagneticButton>
                  </motion.div>
                </motion.div>
              </div>
              <div
                className="flex items-center justify-center animate-on-scroll"
                data-animation="fade-left"
              >
                {/* <div
                className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-purple-500/20 bg-muted md:h-[400px] md:w-[400px] transform transition-all hover:rotate-3 hover:scale-105"
                style={{
                  boxShadow: "0 0 60px rgba(139, 92, 246, 0.2)",
                  transform: `rotate(${scrollY * 0.02}deg) scale(${
                    1 - scrollY * 0.0002
                  })`,
                }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div> */}
              </div>
            </div>
            <div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
              onClick={scrollToContent}
            >
              <ChevronDown className="h-8 w-8 text-purple-500" />
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
              <Reveal>
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Hey, I'm Adith 👋
                  </h2>
                  <div className="mt-8 text-left space-y-4">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      I like building things, breaking them, and then figuring
                      out why they broke.
                    </p>
                    <p className="text-lg leading-relaxed">
                      I'm a CSE student who enjoys backend-heavy projects that
                      feel real: multiplayer games with actual users, AI tools
                      that do something useful, anonymous forums, productivity
                      extensions, and apps that bridge gaps outside the screen
                      (like farmers texting laborers directly).
                    </p>
                    <p className="text-lg leading-relaxed">
                      Sometimes I dip into hardware to keep myself honest:
                      running edge ML on Raspberry Pi for assistive tech, or
                      wiring up wave energy experiments with sensors and
                      telemetry. Turns out when latency, power limits, and
                      physics fight back, your software design improves fast.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Mostly, I care about shipping systems that run, scale, and
                      survive real usage. Buzzwords don't interest me much, but
                      behavior does.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground/80 italic">
                      Scroll around for things I've built. If you like working
                      on systems that break in interesting ways (and then get
                      fixed properly), we'll probably get along.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Experience
                </h2>
              </Reveal>
              <div className="mt-16 space-y-8">
                {[
                  {
                    title: "Intern",
                    company: "IIT Hyderabad",
                    period: "Dec 2025 - present",
                    description: "",
                    skills: ["Databases", "", ""],
                  },
                  {
                    title: "Software Developer Intern",
                    company: "Matrix Capital",
                    period: "May 2025 - June 2025",
                    description: "",
                    skills: ["Web Development", "", ""],
                  },
                  {
                    title: "Technical Core",
                    company: "Mozilla Firefox Club, VIT Vellore",
                    period: "March 2025 - Present",
                    description:
                      "Contributing to technical projects and initiatives at the Mozilla Firefox Club, promoting open-source technologies and collaborative development among students.",
                    skills: [
                      "Backend Development",
                      "Open Source",
                      "Technical Projects",
                    ],
                  },
                ].map((job, index) => (
                  <Reveal key={index}>
                    <SpotlightCard className="rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-purple-500/40">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          <p className="text-lg text-purple-500">
                            {job.company}
                          </p>
                          <p className="text-muted-foreground">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.skills.filter(Boolean).map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-400 border border-purple-500/20">
                            {job.period}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="pt-32 pb-0 md:pt-40 md:pb-0">
            <section id="horizontal">
              <div
                ref={skillsScrollRef}
                className="skills-scroll"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div
                  ref={skillsInnerRef}
                  className="skills-scroll-inner"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "max-content",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  {/* Title Panel */}
                  <div className="horiscroll flex items-center justify-center">
                    <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                      Skills
                    </h2>
                  </div>

                  {/* Software Development & Engineering */}
                  <div className="horiscroll flex items-center justify-center p-8">
                    <div className="rounded-lg border border-purple-500/20 bg-card p-10 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 w-[90%] max-w-2xl">
                      <h3 className="text-3xl font-bold mb-8">
                        Software Development & Engineering
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Python",
                          "Java",
                          "C, C++ Basics",
                          "HTML, CSS, Tailwind CSS",
                          "JavaScript, Express js",
                          "SQL, DBMS",
                          "API Development (Fast API, Gemini API)",
                          "Web Hosting",
                          "Git/GitHub",
                          "Chrome Extension Development",
                        ].map((skill) => (
                          <li
                            key={skill}
                            className="text-xl flex items-center space-x-3"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AI, Robotics & Emerging Tech */}
                  <div className="horiscroll flex items-center justify-center p-8">
                    <div className="rounded-lg border border-purple-500/20 bg-card p-10 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 w-[90%] max-w-2xl">
                      <h3 className="text-3xl font-bold mb-8">
                        AI, Robotics & Emerging Tech
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "AI Builder",
                          "Low Code Development",
                          "Research",
                          "Robotics",
                          "Arduino",
                          "Mindstorms EV3",
                          "Automation",
                          "AI Integration in Web Apps",
                          "Task Automation",
                          "UI/UX Basics",
                        ].map((skill) => (
                          <li
                            key={skill}
                            className="text-xl flex items-center space-x-3"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Creativity & Personal Interests */}
                  <div className="horiscroll flex items-center justify-center p-8">
                    <div className="rounded-lg border border-purple-500/20 bg-card p-10 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 w-[90%] max-w-2xl">
                      <h3 className="text-3xl font-bold mb-8">
                        Creativity & Personal Interests
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Audio Editing Basics",
                          "Photo Editing Basics",
                          "Video Editing Basics",
                          "Electronics and Soldering",
                          "Cycling",
                          "Gardening",
                          "Cubing",
                          "PC Building",
                          "Basic UI/UX Design (Figma, Canva)",
                        ].map((skill) => (
                          <li
                            key={skill}
                            className="text-xl flex items-center space-x-3"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          {/* Languages Section */}
          <section
            id="languages"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2
                className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
                data-animation="fade-up"
              >
                Languages
              </h2>
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { name: "English", level: "Native", proficiency: 5 },
                  { name: "Hindi", level: "Fluent", proficiency: 4 },
                  { name: "Telugu", level: "Intermediate", proficiency: 3 },
                  { name: "Kannada", level: "Intermediate", proficiency: 3 },
                  { name: "French", level: "Basic", proficiency: 2 },
                ].map((language, index) => (
                  <div
                    key={language.name}
                    className="rounded-lg border border-purple-500/20 bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-1 animate-on-scroll"
                    data-animation="zoom-in"
                  >
                    <h3 className="text-xl font-bold">{language.name}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {language.level}
                    </p>
                    <div className="mt-4 flex justify-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-8 rounded-full ${
                            i < language.proficiency
                              ? "bg-purple-500"
                              : "bg-muted"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="py-20 md:py-32 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Projects
                </h2>
              </Reveal>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Coming Soon - Research & AI */}
                <Reveal delay={0.02}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-dashed border-purple-500/30 bg-card/30 backdrop-blur-sm h-full transition-all hover:border-purple-500/50">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 flex items-center justify-center">
                      <span className="text-4xl opacity-60">📚</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-muted-foreground/80">
                          Coming Soon
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/30 animate-pulse">
                          85% Complete
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground/60 text-sm">
                        A research-grade system exploring the intersection of
                        NLP, document analysis, and trust verification in
                        academic content. Fighting misinformation, one citation
                        at a time.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["ML/NLP", "Research Integrity", "Python"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400/70 border border-emerald-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Coming Soon - Systems & Databases */}
                <Reveal delay={0.035}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-dashed border-purple-500/30 bg-card/30 backdrop-blur-sm h-full transition-all hover:border-purple-500/50">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-amber-900/20 to-orange-900/20 flex items-center justify-center">
                      <span className="text-4xl opacity-60">⚡</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-muted-foreground/80">
                          Coming Soon
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/30 animate-pulse">
                          In Progress
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground/60 text-sm">
                        Deep-diving into database internals and query
                        optimization. A systems-focused project exploring
                        execution plans, performance analysis, and optimizer
                        behavior.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Systems", "Databases", "Performance"].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400/70 border border-amber-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Scotland Yard */}
                <Reveal delay={0.05}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-red-900/30 to-orange-900/30 flex items-center justify-center">
                      <span className="text-4xl">🎮</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">Scotland Yard</h3>
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400 border border-green-500/30">
                            100+ Users
                          </span>
                        </div>
                        <Link
                          href="https://github.com/Ad1th/Gravitas-Backend-25-Complete"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Architected real-time multiplayer backend for a digital
                        adaptation of Scotland Yard board game for Gravitas tech
                        fest. Built 200-node graph-based map with multi-modal
                        transport, supporting 6-team lobbies with turn-based
                        asymmetric gameplay (1 fugitive vs 5 detectives).
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Node.js", "Express", "PostgreSQL", "Redis"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* BlindSpot */}
                <Reveal delay={0.1}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center">
                      <span className="text-4xl">👁️</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">BlindSpot</h3>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Led edge integration & deployment of a spatio-temporal
                        assistive device for the visually impaired. Deployed
                        YOLOv8-seg and CNN-LSTM models on Raspberry Pi 5 for
                        real-time object detection and motion classification
                        with LLM-powered audio narration.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "Raspberry Pi",
                          "YOLOv8",
                          "CNN-LSTM",
                          "Edge AI",
                          "Python",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* OWC Wave Energy */}
                <Reveal delay={0.15}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-teal-900/30 to-blue-900/30 flex items-center justify-center">
                      <span className="text-4xl">🌊💨</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">
                        OWC Wave Energy Harvester
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Adapted point-source oscillator circuitry for
                        Oscillating Water Column energy harvesting. Modified
                        power conditioning stages with ACS712 current sensors
                        and voltage dividers for air-pressure-driven turbine
                        output regulation.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "ACS712",
                          "Voltage Dividers",
                          "Power Electronics",
                          "Signal Conditioning",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Point Wave Energy */}
                <Reveal delay={0.2}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-900/30 to-cyan-900/30 relative">
                      <div className="grid grid-cols-2 w-full h-full gap-0.5">
                        {/* Left side - Full view */}
                        <div className="relative overflow-hidden row-span-1">
                          <Image
                            src="/wave-energy-3.jpg"
                            alt="Wave Harvester Full View"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        {/* Right side - Circuits stacked */}
                        <div className="flex flex-col gap-0.5 h-full">
                          <div className="relative overflow-hidden flex-1">
                            <Image
                              src="/wave-energy-1.jpg"
                              alt="Arduino UNO Controller"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="relative overflow-hidden flex-1">
                            <Image
                              src="/wave-energy-2.jpg"
                              alt="Power Conditioning Circuit"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">
                        Point Wave Energy Harvester
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Designed power conditioning circuitry for buoy-based
                        wave energy harvesting. Built full-wave rectifier, DC-DC
                        boost converter with Op-AMP 741 ICs, and implemented
                        MPPT algorithm with IoT telemetry via ESP8266 &
                        ThingSpeak dashboard.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "Op-AMP 741",
                          "Boost Converter",
                          "Arduino",
                          "ESP8266",
                          "MPPT",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Cloudify */}
                <Reveal delay={0.25}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/cloudify.png"
                        alt="Cloudify - Cloud Storage Platform"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Cloudify</h3>
                        <Link
                          href="https://github.com/Ad1th/file-mgmt"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        A cloud storage platform inspired by Google Drive,
                        designed for seamless file management with secure
                        uploads and structured folder organization. Features
                        AI-driven search and data insights.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Postgresql", "Express.JS", "Vercel"].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* CropLink */}
                <Reveal delay={0.3}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/images.jpeg"
                        alt="CropLink"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">CropLink</h3>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Created CropLink, a Farm to labourer sms based
                        application that enables direct communication between
                        farmers and labourers. Also provides detailed crop data
                        tailored to farms, soil type, climate.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "PostgreSQL/Supabase",
                          "Gemini API",
                          "Twilio SMS",
                          "HTML/CSS/JS",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Portfolio Website */}
                <Reveal delay={0.35}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/profile.png"
                        alt="Profile/Portfolio Website"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">
                          Profile/Portfolio Website
                        </h3>
                        <Link
                          href="https://github.com/Ad1th/Profile"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Designed and developed this portfolio site with Next.js
                        and Tailwind CSS to showcase my projects, skills, and
                        journey. Features responsive layouts, smooth animations,
                        and a modern UI.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Next.js", "React", "Tailwind CSS", "GSAP"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* SevaVerse */}
                <Reveal delay={0.4}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/sevaverse.png"
                        alt="SevaVerse"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">SevaVerse</h3>
                        <Link
                          href="https://github.com/Ad1th/SevaVerse"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Developed SevaVerse, a platform connecting NGOs,
                        volunteers, and donors to enhance child welfare with
                        task management and dashboards. Used Node.js with Prisma
                        and SQLite for backend.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Node.js", "Prisma + SQLite", "Tailwind CSS"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* EcoSync */}
                <Reveal delay={0.45}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/EcoSync.png"
                        alt="EcoSync"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">EcoSync</h3>
                        <Link
                          href="https://github.com/Ad1th/OptiSync"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Built Powerpal By EcoSync AI in a 2-day hackathon to
                        provide smart sustainability solutions in logistics and
                        energy. Integrated a Supabase backend with Python
                        (FastAPI).
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Supabase", "FastAPI", "HTML/CSS/JS"].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Threddit */}
                <Reveal delay={0.5}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden bg-black/20 flex items-center justify-center">
                      <Image
                        src="/threddit.png"
                        alt="Threddit"
                        width={500}
                        height={300}
                        className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Threddit</h3>
                        <Link
                          href="https://github.com/Ad1th/3braincells_DevJams-24"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Built a productivity-focused Chrome extension using
                        React, FastAPI, and Gemini API in a 2-day hackathon;
                        analyzed web usage and delivered personalized nudges.
                        Saved users 36–48 minutes daily by reducing distractions
                        with time insights.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "React",
                          "FastAPI",
                          "PostgreSQL",
                          "Gemini API",
                          "Chrome Extensions",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* EchoChamber */}
                <Reveal delay={0.55}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/echochamber.png"
                        alt="EchoChamber"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">EchoChamber</h3>
                        <Link
                          href="https://github.com/Ad1th/EchoChamber"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Built an anonymous forum web app enabling users to post
                        confessions, chat, and share thoughts freely. Used
                        Supabase for real-time data handling and user-generated
                        content storage.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["HTML", "CSS", "JavaScript", "PostgreSQL"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* HOSPITECH */}
                <Reveal delay={0.6}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/lhospital.png"
                        alt="HOSPITECH"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">HOSPITECH</h3>
                        <Link
                          href="https://github.com/Ad1th/Hospitech--Hospital-Management-System"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Developed a lightweight clinic management system using
                        Python and SQL to digitize patient records,
                        appointments, and doctor profiles for small clinics.
                        Designed an intuitive interface with secure admin/doctor
                        logins.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Python", "SQL/MySQL", "Tkinter"].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
                {/* Snek */}
                <Reveal delay={0.65}>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src="/snek.png"
                        alt="Snek"
                        width={500}
                        height={300}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Snek</h3>
                        <Link
                          href="https://github.com/Ad1th/Snek---Snake_Game"
                          target="_blank"
                          className="text-muted-foreground hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Built a retro-style snake game using Python and Pygame
                        with a clean UI, menu screen, and dynamic difficulty. My
                        first project from grade 12, submitted as my high school
                        project.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Python", "Pygame"].map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Patents Section */}
          <section
            id="patents"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Patents
                </h2>
              </Reveal>

              <div className="mt-16 max-w-4xl mx-auto">
                <Reveal>
                  <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm transition-all hover:border-purple-500/40">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <h3 className="text-2xl font-bold leading-tight">
                          "A system for real time environmental perception and assistance for a visually impaired user"
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm mt-3 border-y border-border/10 py-3">
                          <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 font-medium text-green-400 border border-green-500/20">
                            Published
                          </span>
                          <span className="flex items-center bg-card/50 border border-border/50 rounded-md px-3 py-1 text-muted-foreground">
                            <span className="font-semibold text-foreground mr-2">App No:</span> 202641010249
                          </span>
                          <span className="flex items-center bg-card/50 border border-border/50 rounded-md px-3 py-1 text-muted-foreground">
                            <span className="font-semibold text-foreground mr-2">Published:</span> 13/02/2026
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Filed through Vellore Institute of Technology. This ordinary application in the field of Computer Science details an advanced predictive and assistive system providing real-time environmental perception to aid visually impaired individuals.
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-5xl opacity-80 mt-4 md:mt-0 flex items-center justify-center bg-purple-500/10 w-24 h-24 rounded-2xl border border-purple-500/20 shadow-inner">
                        📜
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section
            id="achievements"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Achievements & Certifications
                </h2>
              </Reveal>
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title:
                      "AI solutions Track Winner - Code 2 Create (C2C) Hackathon",
                    year: "2025",
                    description:
                      " Won the AI solutions track at Code 2 Create (C2C) Hackathon held at VIT Vellore, organized by ACM, by building a blind assistance tool using image recognition and Raspberry Pi for real-time audio feedback.",
                  },
                  {
                    title:
                      "Cent Percent Attendance – Vellore Institute of Technology (2024–25)",
                    year: "2024-25",
                    description:
                      "Awarded a Certificate of Appreciation for achieving 100% attendance in the academic year 2024–25 in B.Tech. Computer Science and Engineering (Information Security).",
                  },
                  {
                    title: "First Place in Hackathon – CodeWars",
                    year: "2024",
                    description:
                      "Won a hackathon - CodeWars - Conducted by NPS KRM.",
                  },
                  {
                    title: "PC Building Competition - Second Place",
                    year: "2023",
                    description:
                      "Achieved second place in a competitive PC building event, hosted by NPS HSR.",
                  },
                  {
                    title: "OCI Foundations Certification",
                    year: "2025",
                    description:
                      "Obtained the Oracle Cloud Infrastructure (OCI) Foundations certification, demonstrating foundational knowledge of OCI services and cloud concepts.",
                  },
                  {
                    title: "Python Certification",
                    year: "2025",
                    description:
                      "Recieved a certification in Python programming from HackerRank.",
                  },
                  {
                    title: "SQL Basic Skill Certification",
                    year: "2025",
                    description:
                      "Received a certification in SQL (Basic) from HackerRank.",
                  },
                  {
                    title: "SQL Intermeddiate Skill certification",
                    year: "2025",
                    description:
                      "Received a certification in SQL (Intermediate) from HackerRank.",
                  },
                  {
                    title:
                      "Use AI Builder and Power Apps to Process Invoice Data",
                    year: "2020",
                    description:
                      "Received a Certificate of Completion for a course on using AI Builder and Power Apps to process invoice data from Coursera.",
                  },
                  {
                    title: "Virtual Internship in Mechanical Engineering",
                    year: "2019",
                    description:
                      "Completed a virtual internship in Mechanical Engineering by Mindler.",
                  },
                ].map((achievement, index) => (
                  <Reveal key={index}>
                    <SpotlightCard className="rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm p-6 h-full transition-all hover:border-purple-500/40">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                            <Award className="h-8 w-8 text-purple-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-purple-400">
                            {achievement.year}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Hackathons Section */}
          <section id="hackathons" className="py-20 md:py-32 perspective">
            <div className="container px-4 md:px-6">
              <h2
                className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
                data-animation="fade-up"
              >
                Hackathons
              </h2>

              <div className="mt-16 space-y-8">
                {/* Hackathon 1 */}
                <div
                  className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                  data-animation="apple-zoom-spin"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0 perspective-element"></div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-2xl font-bold">
                            Code 2 Create (C2C) - AI solutions Track Winner
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            September 2025 • VIT Vellore, India
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-lg">
                        Built a blind assistance tool which uses image
                        recognition to analyze surroundings and provide
                        real-time feedback to visually impaired users via audio
                        in their local dialect.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Python + ML
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Raspberry Pi (edge computing)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hackathon 2 */}
                <div
                  className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                  data-animation="apple-zoom-spin"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0 perspective-element"></div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-2xl font-bold">
                            Women Techies'25
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            April 2025 • VIT Vellore, India
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-lg">
                        Built SevaVerse at Women Techies'25 – a collaborative
                        platform connecting NGOs, volunteers, and well-wishers
                        to streamline child welfare initiatives. It features
                        role-based access, secure authentication, task
                        management, and dashboards for both NGOs and volunteers,
                        using Node.js, Prisma, and SQLite.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Node.js + Express Backend
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Prisma ORM + SQLite
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Tailwind CSS Frontend
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hackathon 3 */}
                <div
                  className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                  data-animation="apple-zoom-spin"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0 perspective-element"></div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-2xl font-bold break-words">
                            Yantra Central Hack
                          </h3>
                          <p className="text-sm text-muted-foreground break-words">
                            January 2025 • VIT Vellore, India
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-lg break-words">
                        Built OptiSync at Yantra Central Hack – a sustainability
                        platform tailored for the textile industry, using an ML
                        model to optimize water and electricity usage, reduce
                        operational costs, and promote eco-efficiency. Powered
                        by a Python backend, Supabase, and real-time analytics.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Python with ML
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Supabase / SQL / PostgreSQL
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          HTML / CSS / JS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hackathon 4 */}
                <div
                  className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                  data-animation="apple-zoom-spin"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0 perspective-element"></div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-2xl font-bold">DevJams</h3>
                          <p className="text-sm text-muted-foreground">
                            September 2024 • VIT Vellore, India
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-lg">
                        Built Therddit at DevJams – a smart Chrome extension
                        that uses the Gemini API to analyze browsing patterns,
                        detect distractions, and deliver AI-powered nudges to
                        help users stay productive without blocking websites.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Gemini API
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          Chrome Extension (JavaScript + React)
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                          FastAPI (Python backend)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hackathon 5*/}
                <div
                  className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                  data-animation="apple-zoom-spin"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0 perspective-element"></div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-2xl font-bold">CodeWars</h3>
                          <p className="text-sm text-muted-foreground">
                            February 2024 • NPS KRM, Blr, India
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-lg">Won first place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hobbies Section */}
          <section
            id="hobbies"
            className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2
                className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
                data-animation="fade-up"
              >
                Hobbies & Interests
              </h2>
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Robotics",
                  "Photography",
                  "Cycling",
                  "Trekking",
                  "Gaming",
                  "Music",
                  "Traveling",
                  "Gardening",
                ].map((hobby, index) => (
                  <div
                    key={hobby}
                    className="group relative overflow-hidden rounded-lg border border-purple-500/20 animate-on-scroll"
                    data-animation="zoom-in"
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <Image
                        src={`/${hobby.toLowerCase()}.png?height=300&width=300`}
                        alt={hobby}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                      <h3 className="text-xl font-bold">{hobby}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Journey Timeline */}
          <section id="journey" className="py-20 md:py-32">
            <div className="container px-4 md:px-6">
              <h2
                className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-16 animate-on-scroll"
                data-animation="fade-up"
              >
                My Journey
              </h2>
              <Timeline />
            </div>
          </section>

          {/* Contact Section*/}
          <section id="contact" className="py-20 md:py-32">
            <div className="container px-4 md:px-6">
              <Reveal>
                <div className="mx-auto max-w-md text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Let's Connect
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Always open to new opportunities and conversations
                  </p>
                  <div className="mt-8 flex justify-center space-x-8">
                    <MagneticButton strength={0.3}>
                      <Link
                        href="https://github.com/Ad1th"
                        className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-purple-500 transition-all"
                        target="_blank"
                      >
                        <div className="p-4 rounded-xl glass border border-purple-500/20 group-hover:border-purple-500/40 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/10">
                          <Github className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          GitHub
                        </span>
                      </Link>
                    </MagneticButton>
                    <MagneticButton strength={0.3}>
                      <Link
                        href="https://www.linkedin.com/in/adith-manikonda/"
                        className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-purple-500 transition-all"
                        target="_blank"
                      >
                        <div className="p-4 rounded-xl glass border border-purple-500/20 group-hover:border-purple-500/40 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/10">
                          <Linkedin className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          LinkedIn
                        </span>
                      </Link>
                    </MagneticButton>
                    <MagneticButton strength={0.3}>
                      <Link
                        href="mailto:adith2505@outlook.com"
                        className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-purple-500 transition-all"
                      >
                        <div className="p-4 rounded-xl glass border border-purple-500/20 group-hover:border-purple-500/40 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/10">
                          <Mail className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Email
                        </span>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-purple-900/20 bg-background/50 backdrop-blur-sm py-8 md:py-10">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
              <motion.p
                className="text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Designed & Built by{" "}
                <span className="text-purple-400 font-medium">
                  Adith Manikonda
                </span>
              </motion.p>
              <motion.p
                className="text-xs text-muted-foreground/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                &copy; {new Date().getFullYear()} All rights reserved
              </motion.p>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </>
  );
}

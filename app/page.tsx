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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MobileNav } from "@/components/mobile-nav";
import { Timeline } from "@/components/timeline";
import { KonamiCode } from "@/components/konami-code";
import { CustomCursor } from "@/components/ui/custom-cursor";
import {
  ScrollProgress,
  ScrollIndicator,
} from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { TextScramble, SplitText } from "@/components/ui/text-scramble";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightCard } from "@/components/ui/tilt-card";
import { Reveal, Float } from "@/components/ui/reveal";
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
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
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
    <SmoothScroll>
      <div className="min-h-screen mesh-gradient relative">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Scroll Indicator Dots */}
        <ScrollIndicator />

        {/* Noise Overlay for texture */}
        <div className="noise-overlay" />

        {/* Konami Code Easter Eggs */}
        <KonamiCode />

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
                        revealDelay={500}
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
                      Software Developer | Engineering Student | Tech Enthusiast
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
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
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
                  About Me
                </h2>
                <div className="mt-8 text-left space-y-4">
                  <p className="text-2xl leading-relaxed">
                    Hey there! I’m Adith — a CSE student at VIT Vellore who
                    likes to break stuff (intentionally) and then build it back
                    better. I’m super into creating cool things with code,
                    whether it's a web app, a Chrome extension that keeps you
                    productive, or even a Google Drive clone that actually makes
                    sense. I’m also dipping my toes into the world of robotics,
                    because why stop at software when you can make things move?{" "}
                  </p>
                  <p className="text-2xl leading-relaxed">
                    I’ve built everything from anonymous forums to hackathon
                    projects powered by AI, working with stacks like React,
                    FastAPI, Supabase, and a sprinkle of Python magic. I enjoy
                    late-night debugging sessions (not really, but they build
                    character), working with awesome teams, and dreaming up
                    solutions that make tech more human.
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
                  period: "Dec 2024 - Present",
                  description:
                    "Contributing to technical projects and initiatives at the Mozilla Firefox Club, promoting open-source technologies and collaborative development among students.",
                  skills: [
                    "Backend Development",
                    "Open Source",
                    "Technical Projects",
                  ],
                },
              ].map((job, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <SpotlightCard className="rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-purple-500/40">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{job.title}</h3>
                        <p className="text-lg text-purple-500">{job.company}</p>
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
                  data-delay={100 * index}
                >
                  <h3 className="text-xl font-bold">{language.name}</h3>
                  <p className="mt-2 text-muted-foreground">{language.level}</p>
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
              {/* Project 1 */}
              <Reveal delay={0.1}>
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
                    <h3 className="text-xl font-bold">Cloudify</h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      A cloud storage platform inspired by Google Drive,
                      designed for seamless file management with secure uploads
                      and structured folder organization. Features AI-driven
                      search and data insights.
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
              {/* Project 2 */}
              <Reveal delay={0.2}>
                <SpotlightCard className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-card/50 backdrop-blur-sm h-full transition-all hover:border-purple-500/40">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/threddit.png"
                      alt="Threddit"
                      width={500}
                      height={300}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Threddit</h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      Built a productivity-focused Chrome extension using React,
                      FastAPI, and Gemini API in a 2-day hackathon; analyzed web
                      usage and delivered personalized nudges. Saved users 36–48
                      minutes daily by reducing distractions with time insights.
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
              {/* Project 3 */}
              <Reveal delay={0.3}>
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
                    <h3 className="text-xl font-bold">HOSPITECH</h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      Developed a lightweight clinic management system using
                      Python and SQL to digitize patient records, appointments,
                      and doctor profiles for small clinics. Designed an
                      intuitive interface with secure admin/doctor logins.
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
              {/* Project 4 */}
              <Reveal delay={0.4}>
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
                    <h3 className="text-xl font-bold">EchoChamber</h3>
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
              {/* Project 5 */}
              <Reveal delay={0.5}>
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
                    <h3 className="text-xl font-bold">Snek</h3>
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
              {/* Project 6 */}
              <Reveal delay={0.6}>
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
                    <h3 className="text-xl font-bold">
                      Profile/Portfolio Website
                    </h3>
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

              {/* Project 7 */}
              <Reveal delay={0.7}>
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
                    <h3 className="text-xl font-bold">EcoSync</h3>
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
              {/* Project 8 */}
              <Reveal delay={0.8}>
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
                    <h3 className="text-xl font-bold">SevaVerse</h3>
                    <p className="mt-2 text-muted-foreground text-sm">
                      Developed SevaVerse, a platform connecting NGOs,
                      volunteers, and donors to enhance child welfare with task
                      management and dashboards. Used Node.js with Prisma and
                      SQLite for backend.
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
              {/* Project 9 */}
              <Reveal delay={0.9}>
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
                      Created CropLink, a Farm to labourer sms based application
                      that enables direct communication between farmers and
                      labourers. Also provides detailed crop data tailored to
                      farms, soil type, climate.
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
                <Reveal key={index} delay={index * 0.1}>
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
                data-delay={100}
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
                      Built a blind assistance tool which uses image recognition
                      to analyze surroundings and provide real-time feedback to
                      visually impaired users via audio in their local dialect.
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
                data-delay={200}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0 perspective-element"></div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                      <div>
                        <h3 className="text-2xl font-bold">Women Techies'25</h3>
                        <p className="text-sm text-muted-foreground">
                          April 2025 • VIT Vellore, India
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-lg">
                      Built SevaVerse at Women Techies'25 – a collaborative
                      platform connecting NGOs, volunteers, and well-wishers to
                      streamline child welfare initiatives. It features
                      role-based access, secure authentication, task management,
                      and dashboards for both NGOs and volunteers, using
                      Node.js, Prisma, and SQLite.
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
                data-delay={300}
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
                      operational costs, and promote eco-efficiency. Powered by
                      a Python backend, Supabase, and real-time analytics.
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
                data-delay={400}
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
                      Built Therddit at DevJams – a smart Chrome extension that
                      uses the Gemini API to analyze browsing patterns, detect
                      distractions, and deliver AI-powered nudges to help users
                      stay productive without blocking websites.
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
                data-delay={500}
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
                  data-delay={100 * index}
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
            <div
              className="mx-auto max-w-md text-center animate-on-scroll"
              data-animation="fade-up"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Connect With Me
              </h2>
              <div className="mt-8 flex justify-center space-x-6">
                <Link
                  href="https://github.com/Ad1th"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Github className="h-8 w-8" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/adith-manikonda/"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Linkedin className="h-8 w-8" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto: adith2505@outlook.com"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Mail className="h-8 w-8" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
              <div className="mt-6 space-y-2">
                <p className="flex items-center justify-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  adith2505@outlook.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-900/20 bg-background py-6 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <p className="text-center text-sm text-muted-foreground md:text-">
              &copy; {new Date().getFullYear()} Adith Manikonda. All rights
              reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
              {/* <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-purple-500 hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-purple-500 hover:underline underline-offset-4"
            >
              Terms of Service
            </Link> */}
            </nav>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

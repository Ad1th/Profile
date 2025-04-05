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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "../components/mobile-nav";
import { Timeline } from "../components/timeline";
import { KonamiCode } from "../components/konami-code";

export default function AboutMe() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Function to handle scroll animations
  useEffect(() => {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Konami Code Easter Eggs */}
      <KonamiCode />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-purple-900/20">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="#"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            Adith
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#achievements"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Achievements
            </Link>
            <Link
              href="#hackathons"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Hackathons
            </Link>
            <Link
              href="#hobbies"
              className="text-sm font-medium hover:text-purple-500 transition-colors"
            >
              Hobbies
            </Link>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section - Taller */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0) 70%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                  filter: "blur(50px)",
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 py-24 md:px-6 md:py-32 z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div
              className="flex flex-col justify-center space-y-6 animate-on-scroll"
              data-animation="fade-right"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600 mb-4">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  Available for new opportunities
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Hi, I'm Adith Manikonda
                </h1>
                <p className="max-w-[600px] text-xl text-muted-foreground md:text-2xl mt-4">
                  Software Developer | Engineering Student | Tech Enthusiast
                </p>
                <div className="flex items-center space-x-2 text-muted-foreground mt-4">
                  <MapPin className="h-4 w-4" />
                  <span>VIT, Vellore, India</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row mt-4">
                <Link
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-sm font-medium text-white shadow transition-all hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  View Projects
                </Link>
                <Link
                  href="#about"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  About Me
                </Link>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="https://github.com/Ad1th"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/adith-manikonda/"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto: adith2505@outlook.com"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div
              className="flex items-center justify-center animate-on-scroll"
              data-animation="fade-left"
            >
              <div
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
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32"
      >
        <div className="container px-4 md:px-6">
          <div
            className="mx-auto max-w-3xl text-center animate-on-scroll"
            data-animation="fade-up"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              About Me
            </h2>
            <div className="mt-8 text-left space-y-4">
              <p className="text-lg">
                Hey there! I’m Adith — a CSE student at VIT Vellore who likes to
                break stuff (intentionally) and then build it back better. I’m
                super into creating cool things with code, whether it's a web
                app, a Chrome extension that keeps you productive, or even a
                Google Drive clone that actually makes sense. I’m also dipping
                my toes into the world of robotics, because why stop at software
                when you can make things move?{" "}
              </p>
              <p className="text-lg">
                I’ve built everything from anonymous forums to hackathon
                projects powered by AI, working with stacks like React, FastAPI,
                Supabase, and a sprinkle of Python magic. I enjoy late-night
                debugging sessions (not really, but they build character),
                working with awesome teams, and dreaming up solutions that make
                tech more human.
              </p>
              <p className="text-lg">
                When I’m not tinkering with circuits or staring at my screen
                with 47 Chrome tabs open, you’ll probably find me cycling,
                listening to random playlists, or planning the next side project
                I may or may not finish. Always up to collaborate, learn
                something new, or just chat tech!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section
      <section
        id="experience"
        className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32"
      >
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
            data-animation="fade-up"
          >
            Experience
          </h2>
          <div className="mt-16 space-y-16">
            {[
              {
                title: "Senior Frontend Developer",
                company: "Tech Innovations Inc.",
                period: "2021 - Present",
                description:
                  "Leading the frontend development team in building responsive and accessible web applications. Implementing modern frontend technologies and best practices.",
              },
              {
                title: "Full Stack Developer",
                company: "Digital Solutions Ltd.",
                period: "2018 - 2021",
                description:
                  "Developed and maintained full-stack applications using React, Node.js, and MongoDB. Collaborated with designers and product managers to deliver high-quality software.",
              },
              {
                title: "Junior Web Developer",
                company: "Creative Web Agency",
                period: "2016 - 2018",
                description:
                  "Built responsive websites and web applications for various clients. Worked with HTML, CSS, JavaScript, and PHP.",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="grid md:grid-cols-[200px_1fr] gap-8 animate-on-scroll"
                data-animation="fade-right"
                data-delay={index * 100}
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600">
                    {job.period}
                  </div>
                  <h3 className="text-xl font-bold">{job.company}</h3>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "MongoDB", "AWS"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
            data-animation="fade-up"
          >
            Skills
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-lg border border-purple-500/20 bg-card p-8 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-1 animate-on-scroll"
              data-animation="fade-up"
              data-delay="100"
            >
              <h3 className="text-xl font-bold">
                Software Development & Engineering
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "Python",
                  "Java",
                  "C, C++ Basics",
                  "HTML, CSS, Tailwind CSS",
                  "JavaScript, Express js",
                  "SQL, DBMS",
                  "API Development (Fast API, Gemini API",
                  "Web Hosting",
                  "Git/GitHub",
                  "Chrome Extension Development",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-lg border border-purple-500/20 bg-card p-8 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-1 animate-on-scroll"
              data-animation="fade-up"
              data-delay="200"
            >
              <h3 className="text-xl font-bold">
                AI, Robotics & Emerging Tech
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
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
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-lg border border-purple-500/20 bg-card p-8 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-1 animate-on-scroll"
              data-animation="fade-up"
              data-delay="300"
            >
              <h3 className="text-xl font-bold">
                Creativity & Personal Interests
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
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
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
                        i < language.proficiency ? "bg-purple-500" : "bg-muted"
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
      <section id="projects" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
            data-animation="fade-up"
          >
            Projects
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project 1 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={100}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/cloudify-thumbnail.jpg"
                  alt="Cloudify - Cloud Storage Platform"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Cloudify</h3>
                <p className="mt-2 text-muted-foreground">
                  A cloud storage platform inspired by Google Drive, designed
                  for seamless file management with secure uploads and
                  structured folder organization. Features AI-driven search and
                  data insights.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Postgresql
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Express.JS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Vercel
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="https://cloudify-mfcpjt.netlify.app/"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  {/* <Link
                    href="https://github.com/yourusername/cloudify"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 2 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={200}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/taskmaster-thumbnail.jpg"
                  alt="Threddit"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Threddit</h3>
                <p className="mt-2 text-muted-foreground">
                  Built a productivity-focused Chrome extension using React,
                  FastAPI, and Gemini API in a 2-day hackathon; analyzed web
                  usage and delivered personalized nudges. Saved users 36–48
                  minutes daily by reducing distractions with time insights and
                  non-intrusive refocusing prompts.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    React
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Fast API
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    PostgreSQL
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Gemini API
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Chrome Extensions
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://taskmaster-app.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link> */}

                  {/* <Link
                    href="https://github.com/yourusername/taskmaster"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 3 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={300}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/fittrack-thumbnail.jpg"
                  alt="HOSPITECH"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">HOSPITECH</h3>
                <p className="mt-2 text-muted-foreground">
                  Developed Hospitech, a lightweight clinic management system
                  using Python and SQL to digitize patient records,
                  appointments, and doctor profiles for small clinics. Designed
                  an intuitive interface with secure admin/doctor logins,
                  streamlining workflows without complex DBMS overhead..
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Python
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    SQL/ MySQL
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Tkinter
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://fittrack-app.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link> */}

                  {/* <Link
                    href="https://github.com/yourusername/fittrack"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 4 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={400}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/cryptotracker-thumbnail.jpg"
                  alt="EchoChamber"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">EchoChamber</h3>
                <p className="mt-2 text-muted-foreground">
                  Built EchoChamber, an anonymous forum web app enabling users
                  to post confessions, chat, and share thoughts freely, with a
                  clean full-screen UI. Used Supabase for real-time data
                  handling and user-generated content storage, optimized for
                  Chrome with a focus on anonymity and simplicity.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    HTML
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    CSS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    JS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    SQL/ PostgreSQL
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600"></span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://cryptotracker-app.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link> */}

                  {/* <Link
                    href="https://github.com/yourusername/cryptotracker"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 5 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={500}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/aiwriter-thumbnail.jpg"
                  alt="Snek"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Snek</h3>
                <p className="mt-2 text-muted-foreground">
                  Built Snek, a retro-style snake game using Python and Pygame
                  with a clean UI, menu screen, and dynamic difficulty via
                  increasing snake length and speed. Handled real-time collision
                  detection, score tracking, and smooth player input for an
                  engaging arcade experience. This was the first project I did,
                  back in grade 12, and was submitted as a part of my high
                  school project.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Python
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Pygame
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Random Module
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://aiwriter-tool.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/aiwriter"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 6 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={600}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/smarthome-thumbnail.jpg"
                  alt="KonectUs"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">KonectUs</h3>
                <p className="mt-2 text-muted-foreground">
                  Developed KonectUs, a social platform connecting users through
                  shared interests via confessions, forums, and real-time
                  chat—fully anonymous and interactive. Used Supabase for user
                  data handling, with scalable backend logic and a responsive
                  frontend optimized for full-screen Chrome experience.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Supabase
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    JavaScript (HTML/CSS)
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Node.js / FastAPI{" "}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://smarthome-demo.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/smarthome"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 7 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={700}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/edulearn-thumbnail.jpg"
                  alt="EcoSync"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">EcoSync</h3>
                <p className="mt-2 text-muted-foreground">
                  Built EcoSync AI in a 2-day hackathon to provide smart
                  sustainability solutions in logistics and energy through a
                  minimalist dark-themed web platform. Integrated a Supabase
                  backend with Python (FastAPI) to process user input and
                  deliver actionable insights—ML integration planned for future
                  iterations.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Supabase
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    FastAPI (Python)
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    HTML/CSS/JS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    CSS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    JS
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://edulearn-platform.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/edulearn"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 8 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={800}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/travelbuddy-thumbnail.jpg"
                  alt="SevaVerse"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">SevaVerse</h3>
                <p className="mt-2 text-muted-foreground">
                  Developed SevaVerse, a platform connecting NGOs, volunteers,
                  and donors to enhance child welfare with task management,
                  dashboards, and secure logins. Used Node.js with Prisma and
                  SQLite for backend, and Tailwind CSS for a clean, responsive
                  UI—future-ready for mobile, maps, and notification
                  integration.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Node.js (Express.js)
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Prisma + SQLite
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Tailwind CSS
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://travelbuddy-app.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/travelbuddy"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 9 */}
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={900}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/musicstudio-thumbnail.jpg"
                  alt="CropLink"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">CropLink</h3>
                <p className="mt-2 text-muted-foreground">
                  Created CropLink, a farm-to-consumer web app that enables
                  direct produce listings, demand tracking, and logistic
                  coordination between farmers and buyers. Focused on
                  transparent supply chains, it uses Supabase for real-time data
                  handling and integrates Gemini API for demand forecasting
                  suggestions.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    SQL / PostgreSQL / Supabase
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Gemini API
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Twilio for sms integration
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    HTML
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    CSS
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    JS
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {/* <Link
                    href="https://musicstudio-app.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/musicstudio"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link> */}
                </div>
              </div>
            </div>
            {/* Project 10
            <div
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
              data-animation="fade-up"
              data-delay={1000}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/projects/ecotrack-thumbnail.jpg"
                  alt="EcoTrack - Environmental Monitoring System"
                  width={500}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">EcoTrack</h3>
                <p className="mt-2 text-muted-foreground">
                  An environmental monitoring system that tracks air quality,
                  water levels, and pollution using IoT sensors. Includes
                  predictive analytics and public awareness dashboards.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Python
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    TensorFlow
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                    Arduino
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="https://ecotrack-project.example.com"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/yourusername/ecotrack"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="bg-gradient-to-b from-indigo-950/5 to-purple-950/10 py-20 md:py-32"
      >
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
            data-animation="fade-up"
          >
            Achievements & Certifications
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
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
                title: "Use AI Builder and Power Apps to Process Invoice Data",
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
              <div
                key={index}
                className="rounded-lg border border-purple-500/20 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-1 animate-on-scroll"
                data-animation="fade-up"
                data-delay={100 * index}
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <Award className="h-9 w-9 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.year}
                    </p>
                    <p className="mt-2">{achievement.description}</p>
                  </div>
                </div>
              </div>
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
          <div className="perspective-wrapper">
            <div className="mt-16 space-y-16">
              {/* Hackathon 1 */}
              <div
                className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                data-animation="apple-zoom-spin"
                data-delay={300}
                style={{
                  transformStyle: "preserve-3d",
                  // Don't set transform and opacity inline - let the CSS and JavaScript handle it
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0 perspective-element">
                    <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted shadow-md">
                      <Image
                        src="/hackathons/techcrunch-disrupt.jpg"
                        alt="TechCrunch Disrupt Hackathon"
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
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
                    <div className="mt-6">
                      <Link
                        href="https://devpost.com/software/carbonfootprint-ar"
                        className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hackathon 2 */}
              <div
                className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                data-animation="apple-zoom-spin"
                data-delay={300}
                style={{
                  transformStyle: "preserve-3d",
                  // Don't set transform and opacity inline - let the CSS and JavaScript handle it
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0 perspective-element">
                    <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted shadow-md">
                      <Image
                        src="/hackathons/techcrunch-disrupt.jpg"
                        alt="TechCrunch Disrupt Hackathon"
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                      <div>
                        <h3 className="text-2xl font-bold">
                          Yantra Central Hack
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          January 2025 • VIT Vellore, India
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-lg">
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
                        {" "}
                        HTML / CSS / JS
                      </span>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="https://github.com/yourusername/mediconnect"
                        className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
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
                  // Don't set transform and opacity inline - let the CSS and JavaScript handle it
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0 perspective-element">
                    <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted shadow-md">
                      <Image
                        src="/hackathons/techcrunch-disrupt.jpg"
                        alt="TechCrunch Disrupt Hackathon"
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
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
                    <div className="mt-6">
                      {/* <Link
                        href="https://cryptobank-project.example.com"
                        className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Hackathon 4 */}
            <div
              className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
              data-animation="apple-zoom-spin"
              data-delay={300}
              style={{
                transformStyle: "preserve-3d",
                // Don't set transform and opacity inline - let the CSS and JavaScript handle it
              }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-shrink-0 perspective-element">
                  <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted shadow-md">
                    <Image
                      src="/hackathons/techcrunch-disrupt.jpg"
                      alt="TechCrunch Disrupt Hackathon"
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-2xl font-bold">CodeWars</h3>
                      <p className="text-sm text-muted-foreground">
                        February 2024 • NPS KRM, Blr, India
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-lg"></p>
                  {/* <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                      Solidity
                    </span>
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                      React
                    </span>
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                      Ethereum
                    </span>
                  </div> */}
                  <div className="mt-6">
                    {/* <Link
                      href="https://cryptobank-project.example.com"
                      className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
                    >
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link> */}
                  </div>
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
                    src={`/placeholder.svg?height=300&width=300&text=${hobby}`}
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
      {/* Contact Section (Social Links Only) */}
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
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Adith Manikonda. All rights
            reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
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
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

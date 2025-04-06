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
import { MobileNav } from "@/components/mobile-nav";
import { Timeline } from "@/components/timeline";
import { KonamiCode } from "@/components/konami-code";

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
                  href="#"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
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
                Hello! I'm John, a passionate Full Stack Developer with a keen
                eye for design and a love for creating intuitive, user-friendly
                applications. With over 5 years of experience in web
                development, I specialize in building responsive and accessible
                web applications using modern technologies.
              </p>
              <p className="text-lg">
                I graduated from the University of Technology with a Bachelor's
                degree in Computer Science. Throughout my career, I've worked
                with various startups and established companies, helping them
                bring their ideas to life through code.
              </p>
              <p className="text-lg">
                My approach to development is centered around solving real-world
                problems with clean, efficient code. I believe in continuous
                learning and staying updated with the latest industry trends and
                technologies.
              </p>
            </div>
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

      {/* Experience Section */}
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
      </section>

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
              <h3 className="text-xl font-bold">Frontend Development</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "HTML5/CSS3",
                  "JavaScript",
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
              <h3 className="text-xl font-bold">Backend Development</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "Node.js",
                  "Express",
                  "Python",
                  "Django",
                  "RESTful APIs",
                  "GraphQL",
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
              <h3 className="text-xl font-bold">Database & DevOps</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "MongoDB",
                  "PostgreSQL",
                  "Firebase",
                  "Docker",
                  "AWS",
                  "CI/CD",
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((project, index) => (
              <div
                key={project}
                className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 hover:-translate-y-2 animate-on-scroll"
                data-animation="fade-up"
                data-delay={100 * index}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Project+${project}`}
                    alt={`Project ${project}`}
                    width={500}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Project Title {project}</h3>
                  <p className="mt-2 text-muted-foreground">
                    A brief description of the project, highlighting key
                    features and technologies used.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                      React
                    </span>
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                      Node.js
                    </span>
                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600">
                      MongoDB
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                    >
                      View Project
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Github className="mr-1 h-4 w-4" />
                      Code
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
            Achievements
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Tech Innovation Award",
                year: "2023",
                description:
                  "Recognized for developing an innovative solution that improved efficiency by 40%.",
              },
              {
                title: "Open Source Contributor",
                year: "2022",
                description:
                  "Contributed to several major open source projects with over 500 commits.",
              },
              {
                title: "Speaker at TechConf",
                year: "2021",
                description:
                  "Delivered a keynote presentation on modern web development practices.",
              },
              {
                title: "Published Research Paper",
                year: "2020",
                description:
                  "Co-authored a research paper on AI applications in web development.",
              },
              {
                title: "Hackathon Winner",
                year: "2019",
                description:
                  "Won first place at the Global Code Challenge for an innovative healthcare solution.",
              },
              {
                title: "Certified Cloud Architect",
                year: "2018",
                description:
                  "Earned advanced certification in cloud architecture and deployment.",
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
                    <Award className="h-6 w-6 text-purple-500" />
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

      {/* Hackathons Section with Apple-style animations */}
      <section id="hackathons" className="py-20 md:py-32 perspective">
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 animate-on-scroll"
            data-animation="fade-up"
          >
            Hackathons
          </h2>
          <div className="mt-16 space-y-16">
            {[1, 2, 3].map((hackathon, index) => (
              <div
                key={hackathon}
                className="hackathon-card rounded-lg border border-purple-500/20 bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-500/20 animate-on-scroll"
                data-animation="apple-zoom-spin"
                data-delay={300 * index}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateY(0deg) scale(0.9)",
                  opacity: 0,
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-shrink-0 perspective-element">
                    <div className="h-32 w-32 overflow-hidden rounded-xl bg-muted shadow-md">
                      <Image
                        src={`/placeholder.svg?height=150&width=150&text=Hackathon+${hackathon}`}
                        alt={`Hackathon ${hackathon}`}
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
                          Hackathon Name {hackathon}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          October 2023 • San Francisco, CA
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-lg">
                      Developed an innovative solution for [problem statement].
                      Our team created a [brief description of the project]
                      using [technologies used].
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                        React
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                        Node.js
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                        MongoDB
                      </span>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="#"
                        className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              "Photography",
              "Hiking",
              "Reading",
              "Cooking",
              "Gaming",
              "Painting",
              "Music",
              "Traveling",
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
                href="#"
                className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
              >
                <Github className="h-8 w-8" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
              >
                <Linkedin className="h-8 w-8" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110"
              >
                <Mail className="h-8 w-8" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="mt-6 space-y-2">
              <p className="flex items-center justify-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                johndoe@example.com
              </p>
              <p className="flex items-center justify-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
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

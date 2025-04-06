"use client";

import { useEffect, useRef } from "react";

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");
      const timelineHeight = timelineRef.current.offsetHeight;
      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const timelineBottom = timelineRef.current.getBoundingClientRect().bottom;

      if (timelineTop < window.innerHeight && timelineBottom > 0) {
        timelineItems.forEach((item, index) => {
          const itemElement = item as HTMLElement;
          const itemTop = itemElement.offsetTop;
          const itemHeight = itemElement.offsetHeight;
          const itemPosition = (itemTop + itemHeight / 2) / timelineHeight;

          // Calculate progress based on scroll position
          const viewportMiddle = window.innerHeight / 2;
          const itemViewportPosition =
            itemElement.getBoundingClientRect().top + itemHeight / 2;
          const distanceFromMiddle = Math.abs(
            viewportMiddle - itemViewportPosition
          );
          const maxDistance = window.innerHeight * 0.6;
          const progress = 1 - Math.min(distanceFromMiddle / maxDistance, 1);

          if (progress > 0) {
            itemElement.style.opacity = Math.min(progress * 1.5, 1).toString();
            itemElement.style.transform = `translateX(${
              (1 - progress) * (index % 2 === 0 ? -20 : 20)
            }px)`;

            const dot = itemElement.querySelector(
              ".timeline-dot"
            ) as HTMLElement;
            if (dot) {
              dot.style.transform = `scale(${Math.max(progress * 1.5, 0.5)})`;
              dot.style.backgroundColor =
                progress > 0.8 ? "rgb(168, 85, 247)" : "rgb(168, 85, 247, 0.5)";
            }

            const line = itemElement.querySelector(
              ".timeline-line"
            ) as HTMLElement;
            if (line) {
              line.style.height = `${progress * 100}%`;
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const timelineData = [
    {
      year: "2006",
      title: "Born in Hyderabad",
      description: "",
    },
    {
      year: "",
      title: "Studied at DPS East, Bangalore",
      description: "",
    },

    {
      year: "",
      title: "Learnt Basic Robotics",
      description:
        "Understood basic robotics principles and programming, built a DPDT robot",
    },
    {
      year: "",
      title: "Learnt MSWlogo, Qbasic ",
      description: "",
    },
    {
      year: "",
      title: "Joined Green Wood High International School, Bengaluru",
      description: "",
    },
    {
      year: "",
      title: "Learnt Intermediate and Advanced Robotics",
      description:
        "Understood deeper robotics principles, worked on EV3, Started discovering electronics",
    },
    {
      year: "",
      title: "Learnt Java, HTML, Scratch",
      description: "",
    },
    {
      year: "2022",
      title: "Attained ICSE Degree",
      description: "at Green Wood High International School, Bangalore.",
    },
    {
      year: "",
      title: "Learnt Python, SQL",
      description: "",
    },
    {
      year: "",
      title: "Dived deeper into Robotics",
      description:
        "Worked on Arduino, circuit electronics, EV3, and non-microcontroller-based robotics. Continued discovering electronics",
    },
    {
      year: "2024",
      title: "Attained CBSE Degree",
      description: "At National Public School, Koramanagala, Bangalore.",
    },
    {
      year: "2024",
      title: "Joined VIT Vellore",
      description: "",
    },
  ];

  return (
    <div ref={timelineRef} className="relative mx-auto max-w-4xl">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-purple-200 dark:bg-purple-900/30"></div>

      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item relative flex items-center justify-between gap-8 py-10 opacity-0 transition-all duration-500 ease-out ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`w-1/2 ${
              index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600 mb-2">
              {item.year}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>

          <div className="timeline-dot absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/50 shadow-md transition-all duration-300 z-10"></div>

          <div className="timeline-line absolute left-1/2 top-0 h-0 w-0.5 -translate-x-1/2 bg-purple-500 transition-all duration-500"></div>

          <div className="w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

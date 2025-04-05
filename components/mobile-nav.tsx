"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button className="p-2 rounded-md hover:bg-muted" onClick={toggleMenu} aria-label="Toggle menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container flex h-full flex-col items-center justify-center">
            <button
              className="absolute right-4 top-4 p-2 rounded-md hover:bg-muted"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col items-center gap-6">
              <Link
                href="#about"
                className="text-lg font-medium hover:text-purple-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#skills"
                className="text-lg font-medium hover:text-purple-500 transition-colors"
                onClick={toggleMenu}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="text-lg font-medium hover:text-purple-500 transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link
                href="#hackathons"
                className="text-lg font-medium hover:text-purple-500 transition-colors"
                onClick={toggleMenu}
              >
                Hackathons
              </Link>
              <Link
                href="#hobbies"
                className="text-lg font-medium hover:text-purple-500 transition-colors"
                onClick={toggleMenu}
              >
                Hobbies
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}


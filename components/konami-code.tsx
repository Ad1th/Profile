"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

export function KonamiCode() {
  const [showInstructions, setShowInstructions] = useState(false)
  const [showQuote1, setShowQuote1] = useState(false)
  const [showQuote2, setShowQuote2] = useState(false)
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [pressedKeys1, setPressedKeys1] = useState<{ [key: string]: boolean }>({})
  const [pressedKeys2, setPressedKeys2] = useState<{ [key: string]: boolean }>({})

  // Konami Code: up, up, down, down, left, right, left, right, b, a
  const konamiCode1 = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  // Second code: down, down, up, up, right, left, right, left, a, b
  const konamiCode2 = [
    "ArrowDown",
    "ArrowDown",
    "ArrowUp",
    "ArrowUp",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "a",
    "b",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show instructions when Shift+K is pressed
      if (e.shiftKey && e.key.toLowerCase() === "k") {
        setShowInstructions(true)
        return
      }

      // Hide instructions when Escape is pressed
      if (e.key === "Escape") {
        setShowInstructions(false)
        setShowQuote1(false)
        setShowQuote2(false)
        return
      }

      // Track keys for Konami code
      const newKeysPressed = [...keysPressed, e.key]
      if (newKeysPressed.length > 10) {
        newKeysPressed.shift()
      }
      setKeysPressed(newKeysPressed)

      // Check for first Konami code
      const isKonami1 = konamiCode1.every((key, index) => {
        return newKeysPressed[newKeysPressed.length - konamiCode1.length + index] === key
      })

      // Check for second Konami code
      const isKonami2 = konamiCode2.every((key, index) => {
        return newKeysPressed[newKeysPressed.length - konamiCode2.length + index] === key
      })

      // Update pressed keys for visualization
      if (konamiCode1.includes(e.key)) {
        setPressedKeys1((prev) => ({ ...prev, [e.key]: true }))
      }

      if (konamiCode2.includes(e.key)) {
        setPressedKeys2((prev) => ({ ...prev, [e.key]: true }))
      }

      // Show quotes if Konami code is entered
      if (isKonami1) {
        setShowQuote1(true)
        setTimeout(() => setShowQuote1(false), 5000)
        setPressedKeys1({})
      }

      if (isKonami2) {
        setShowQuote2(true)
        setTimeout(() => setShowQuote2(false), 5000)
        setPressedKeys2({})
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keysPressed])

  return (
    <>
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-md rounded-lg bg-card p-6 shadow-lg">
            <button
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowInstructions(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold">Secret Konami Codes</h3>
            <p className="mt-2 text-muted-foreground">Press these key sequences to reveal hidden quotes:</p>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-medium">Code 1:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {konamiCode1.map((key, index) => (
                    <div
                      key={`${key}-${index}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                        pressedKeys1[key]
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                          : "border-muted-foreground/20"
                      }`}
                    >
                      {key === "ArrowUp" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : key === "ArrowDown" ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : key === "ArrowLeft" ? (
                        <ArrowLeft className="h-5 w-5" />
                      ) : key === "ArrowRight" ? (
                        <ArrowRight className="h-5 w-5" />
                      ) : (
                        key
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Code 2:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {konamiCode2.map((key, index) => (
                    <div
                      key={`${key}-${index}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                        pressedKeys2[key]
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : "border-muted-foreground/20"
                      }`}
                    >
                      {key === "ArrowUp" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : key === "ArrowDown" ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : key === "ArrowLeft" ? (
                        <ArrowLeft className="h-5 w-5" />
                      ) : key === "ArrowRight" ? (
                        <ArrowRight className="h-5 w-5" />
                      ) : (
                        key
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Press Shift+K anytime to show these instructions again.
            </p>
          </div>
        </div>
      )}

      {/* Quote 1 */}
      {showQuote1 && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-yellow-500 p-4 text-center text-black shadow-lg">
          <p className="text-xl font-bold">"Be good, Be kind, Be Human."</p>
        </div>
      )}

      {/* Quote 2 */}
      {showQuote2 && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-green-500 p-4 text-center text-black shadow-lg">
          <p className="text-xl font-bold">"Enjoy the chaos."</p>
        </div>
      )}

      {/* Hint for Konami code */}
      <div className="fixed bottom-4 right-4 z-40 text-xs text-muted-foreground opacity-50 hover:opacity-100">
        <button onClick={() => setShowInstructions(true)}>Press Shift+K for secret codes</button>
      </div>
    </>
  )
}


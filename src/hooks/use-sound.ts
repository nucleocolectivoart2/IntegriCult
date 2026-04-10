
"use client";

import * as React from "react";

const SOUNDS = {
  click: "https://www.soundjay.com/buttons/sounds/button-16.mp3",
  hover: "https://www.soundjay.com/buttons/sounds/button-20.mp3",
};

export function useSound() {
  const playSound = React.useCallback((type: keyof typeof SOUNDS) => {
    try {
      const audio = new Audio(SOUNDS[type]);
      audio.volume = 0.15;
      audio.play().catch(() => {}); // Ignorar errores de autoplay
    } catch (e) {
      console.warn("Audio context not available");
    }
  }, []);

  return { playSound };
}

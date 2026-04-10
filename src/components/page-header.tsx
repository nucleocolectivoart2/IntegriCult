"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AudioController } from "@/components/audio-controller";
import { useSound } from "@/hooks/use-sound";

interface PageHeaderProps {
  isWhite: boolean;
  onScrollTo: (id: string) => void;
}

export function PageHeader({ isWhite, onScrollTo }: PageHeaderProps) {
  const { playSound } = useSound();

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] py-4 lg:py-6 px-4 lg:px-12 flex justify-between items-center pointer-events-none transition-all duration-700">
      <h1 
        onClick={() => onScrollTo('intro')}
        onMouseEnter={() => playSound('hover')}
        className={cn(
          "text-lg lg:text-2xl font-headline italic pointer-events-auto hover:text-accent transition-all cursor-pointer",
          isWhite ? "text-white" : "text-primary"
        )}
      >
        IntegriCult
      </h1>
      
      <div className="flex items-center gap-4 lg:gap-8 pointer-events-auto">
        <div className="hidden md:flex flex-col items-end gap-0.5 pointer-events-none text-right">
          <span className={cn(
            "text-[9px] lg:text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700",
            isWhite ? "text-white" : "text-primary"
          )}>
            John Darío Cardona Espinosa
          </span>
          <span className={cn(
            "text-[7px] lg:text-[8px] uppercase tracking-[0.2em] font-bold transition-all duration-700 opacity-60",
            isWhite ? "text-white" : "text-primary"
          )}>
            Estratega en Gobernanza & Ética
          </span>
        </div>
        <AudioController />
      </div>
    </header>
  );
}
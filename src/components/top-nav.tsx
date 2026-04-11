
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";
import { ShieldCheck, MessageSquare, Briefcase, Play } from "lucide-react";

interface TopNavProps {
  onScrollTo: (id: string) => void;
}

export function TopNav({ onScrollTo }: TopNavProps) {
  const { playSound } = useSound();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "corporativo", label: "Estrategia", icon: Briefcase },
    { id: "sostenibilidad-accion", label: "Soluciones", icon: ShieldCheck },
    { id: "videos", label: "Pensamiento", icon: Play },
    { id: "contacto-final", label: "Contacto", icon: MessageSquare },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 h-12 lg:h-14 flex items-center px-4 lg:px-12",
      isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div 
          onClick={() => onScrollTo('intro')}
          onMouseEnter={() => playSound('hover')}
          className="flex items-center gap-2 cursor-pointer group pointer-events-auto"
        >
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-headline italic font-bold text-sm lg:text-base">I</span>
          </div>
          <span className={cn(
            "font-headline italic text-base lg:text-lg transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}>
            IntegriCult
          </span>
        </div>

        {/* LINKS */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              onMouseEnter={() => playSound('hover')}
              className={cn(
                "text-[8px] font-bold uppercase tracking-[0.3em] transition-all hover:text-secondary",
                isScrolled ? "text-primary/60" : "text-white/70"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, User, ArrowRightLeft, Share2, Scale, Shield, Menu, X, Video, MessageSquare, Briefcase, Zap, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";

const navItems = [
  { id: "intro", label: "Manifiesto", icon: Home },
  { id: "corporativo", label: "Estrategia", icon: Briefcase },
  { id: "ser", label: "Cultura", icon: User },
  { id: "puente", label: "Mentoría", icon: ArrowRightLeft },
  { id: "conexion", label: "ESG", icon: Share2 },
  { id: "deber", label: "Compliance", icon: Scale },
  { id: "gobernanza", label: "Gobernanza", icon: Shield },
  { id: "gobierno", label: "Individuación", icon: User },
  { id: "sostenibilidad-accion", label: "Soluciones", icon: Briefcase },
  { id: "sello", label: "Sello", icon: Zap },
  { id: "videos", label: "Pensamiento", icon: Video },
  { id: "contacto-final", label: "Contacto", icon: MessageSquare },
];

interface NavigationProps {
  activeSection?: string;
}

export function Navigation({ activeSection: externalActiveSection }: NavigationProps) {
  const [activeSection, setActiveSection] = React.useState("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { playSound } = useSound();

  const currentSection = externalActiveSection || activeSection;

  React.useEffect(() => {
    if (externalActiveSection) return;

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [externalActiveSection]);

  const scrollToSection = (id: string) => {
    playSound('click');
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const isDotsHidden = currentSection === "intro" || currentSection === "corporativo";

  return (
    <>
      <nav className={cn(
        "fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col items-end gap-10 transition-all duration-1000",
        isDotsHidden ? "opacity-0 translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        {navItems.map((item, index) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => playSound('hover')}
              className="group flex items-center gap-6 outline-none h-4"
            >
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.4em] transition-all duration-700 origin-right whitespace-nowrap",
                  isActive ? "text-secondary scale-105 opacity-100 mr-2" : "text-primary/40 opacity-0 group-hover:opacity-80 translate-x-4 group-hover:translate-x-0 mr-4"
                )}>
                  {item.label}
                </span>
              </div>
              <div className="relative flex items-center justify-center w-4 h-4">
                <div className={cn(
                  "w-[1px] h-10 absolute -top-10 transition-all duration-700",
                  index === 0 ? "opacity-0" : "bg-primary/10"
                )} />
                <div className={cn(
                  "w-2 h-2 rounded-none border-2 transition-all duration-700 z-10",
                  isActive 
                    ? "bg-secondary border-secondary scale-110 rotate-45" 
                    : "bg-background border-primary/15 group-hover:border-secondary/30"
                )} />
              </div>
            </button>
          );
        })}
      </nav>

      <div className="fixed top-6 right-6 z-[80] lg:hidden">
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={() => {
            playSound('click');
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="rounded-none shadow-xl bg-white/95 backdrop-blur-3xl border border-primary/5 w-12 h-12"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-secondary" /> : <Menu className="w-5 h-5 text-primary" />}
        </Button>
      </div>

      <div className={cn(
        "fixed inset-0 z-[75] bg-background/98 backdrop-blur-3xl lg:hidden transition-all duration-1000 ease-in-out flex flex-col items-center justify-center gap-8",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-700 group",
                isActive ? "scale-105 text-secondary" : "text-primary/60 hover:text-primary"
              )}
            >
              <div className={cn(
                "p-3 rounded-none transition-all duration-700",
                isActive ? "bg-secondary/10" : "bg-primary/5 group-hover:bg-primary/10"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xl font-headline italic">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

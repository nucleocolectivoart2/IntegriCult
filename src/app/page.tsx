
"use client";

import * as React from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { TopNav } from "@/components/top-nav";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ContactForm } from "@/components/contact-form";
import { DraftTool } from "@/components/draft-tool";
import { ParallaxSection } from "@/components/parallax-section";
import { AudioController } from "@/components/audio-controller";
import { PodcastPlayer } from "@/components/podcast-player";
import { GovernanceSim } from "@/components/governance-sim";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/hooks/use-sound";
import { 
  BookOpen, 
  Activity, 
  Globe, 
  Shield, 
  ChevronDown,
  Play,
  User,
  Mic2,
  Scale,
  CircleDot,
  Target,
  ArrowRight,
  ShieldAlert,
  Zap,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Home() {
  const images = PlaceHolderImages;
  const { playSound } = useSound();
  const [isHeaderWhite, setIsHeaderWhite] = React.useState(false);
  const [isSimOpen, setIsSimOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("intro");

  const podcastUrls = {
    p01: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/01%20el%20circulo%20que%20vuelve%20a%20empezar.mp3",
    p02: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/02%20recorrido%20experiencial.mp3",
    p03: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/03%20cierra%20los%20ojos.mp3"
  };

  const videos = [
    { id: "WtAzaKmhOHs", title: "ABC de Innovación Social: Origen, Ética y Propósito", tag: "WEBINAR ESTRATÉGICO", start: 185 },
    { id: "A7fHwxBJ6Hs", title: "¿Qué pasa cuando no hay sostenibilidad?", tag: "CASO ESTRATÉGICO" },
    { id: "HIhWFFn3NDQ", title: "Sostenibilidad & Liderazgo", tag: "LA CONEXIÓN" },
    { id: "mvn5vXl3Xds", title: "Individuación en la Empresa", tag: "EL SER" }
  ];

  const clientLogos = [
    { name: "Metro de Medellín", url: "https://picsum.photos/seed/metro/200/100" },
    { name: "Pacto Global", url: "https://picsum.photos/seed/pacto/200/100" },
    { name: "Comfenalco", url: "https://picsum.photos/seed/comfenalco/200/100" },
    { name: "Clínica Somer", url: "https://picsum.photos/seed/somer/200/100" },
    { name: "Alcaldía Medellín", url: "https://picsum.photos/seed/alcaldia/200/100" }
  ];

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          const darkSections = ['intro', 'gobierno', 'videos', 'simulador-banner'];
          setIsHeaderWhite(darkSections.includes(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['intro', 'corporativo', 'ser', 'puente', 'conexion', 'deber', 'gobernanza', 'gobierno', 'videos', 'sostenibilidad-accion', 'simulador-banner', 'sello'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    playSound('click');
    const element = document.getElementById(id);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative bg-background overflow-x-hidden font-body">
      <TopNav onScrollTo={scrollTo} onOpenSim={() => setIsSimOpen(true)} />
      <Navigation activeSection={activeSection} />
      <AudioController />
      <DraftTool activeSection={activeSection} />

      <Dialog open={isSimOpen} onOpenChange={setIsSimOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-7xl p-0 border-none bg-transparent rounded-none shadow-none h-[92vh] overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">Simulador de Gobernanza IntegriCult GRC</DialogTitle>
          <GovernanceSim />
        </DialogContent>
      </Dialog>

      {/* MANIFIESTO DE COHERENCIA */}
      <section id="intro" className="relative h-[85vh] lg:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxSection speed={-0.1} className="h-full w-full">
            <Image
              src={images.find(img => img.id === "intro-bg")?.imageUrl || ""}
              alt="IntegriCult Portada"
              fill
              className="object-cover brightness-[0.4] saturate-[0.8] animate-ken-burns"
              priority
              data-ai-hint="abstract nebula"
            />
          </ParallaxSection>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 lg:space-y-6 px-6">
          <ScrollReveal className="space-y-4 lg:space-y-6">
            <span className="text-secondary font-bold tracking-[0.6em] uppercase text-[9px] lg:text-[10px] block">
              Manifiesto de Coherencia
            </span>
            <h2 className="text-fluid-hero font-headline text-white tracking-tighter m-0">
              Integri<span className="italic text-secondary">Cult</span>
            </h2>
            <p className="text-base lg:text-3xl font-headline italic text-white/80 max-w-2xl mx-auto leading-tight">
              "Donde el ser interno se encuentra con el deber ser colectivo"
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col items-center gap-4 lg:gap-6">
              <div className="w-[1px] h-10 lg:h-16 bg-gradient-to-b from-secondary to-transparent" />
              <button 
                onClick={() => scrollTo('corporativo')}
                onMouseEnter={() => playSound('hover')}
                className="group flex flex-col items-center gap-2 text-white/80 hover:text-secondary transition-all duration-700 pointer-events-auto"
              >
                <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.6em] font-bold">Iniciar Viaje</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PUERTA CORPORATIVA */}
      <section id="corporativo" className="relative min-h-[60vh] flex items-center justify-center bg-[#EDEDEB] px-6 py-10 lg:py-14">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mx-auto">
          <ScrollReveal className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/5 text-primary border-primary/10 rounded-none px-4 py-1 uppercase tracking-[0.4em] text-[9px]">Estrategia & Cultura</Badge>
              <h2 className="text-fluid-chapter font-headline text-primary leading-[0.9] tracking-tighter">
                Gobernanza y sostenibilidad convertidas en <span className="italic text-secondary/90">cultura organizacional.</span>
              </h2>
            </div>
            <p className="text-base lg:text-xl text-primary/70 font-normal leading-relaxed max-w-md font-headline italic">
              Estrategia + narrativa para empresas que necesitan actuar con coherencia real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollTo('ser')}
                className="bg-primary text-white h-14 px-10 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold group flex items-center justify-center transition-all hover:bg-primary/90 shadow-lg"
              >
                Ver experiencia
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('simulador-banner')}
                className="border border-primary/20 text-primary h-14 px-10 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all flex items-center justify-center bg-transparent"
              >
                Diagnóstico GRC
              </button>
            </div>

            <div className="pt-8 lg:pt-12 border-t border-primary/5">
              <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 block mb-6">Confianza Institucional</span>
              <div className="flex flex-wrap gap-8 lg:gap-12 opacity-30 grayscale items-center">
                {clientLogos.map((logo, i) => (
                  <div key={i} className="relative w-20 h-8 grayscale hover:grayscale-0 transition-all duration-700">
                    <Image src={logo.url} alt={logo.name} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300} className="relative hidden lg:block aspect-square">
            <div className="relative w-full h-full brochure-shadow p-1 bg-white">
              <Image 
                src={images.find(img => img.id === "corporativo-bg")?.imageUrl || ""} 
                alt="Corporate Strategy High End" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                data-ai-hint="minimalist nature"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CAPÍTULO I: EL SER */}
      <section id="ser" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 z-0 h-full w-full">
          <ParallaxSection speed={-0.05} className="h-full w-full">
            <Image
              src={images.find(img => img.id === "ser-bg")?.imageUrl || ""}
              alt="El Ser"
              fill
              className="object-cover opacity-15 grayscale"
              data-ai-hint="abstract integrity"
            />
          </ParallaxSection>
          <div className="absolute inset-0 bg-background/95 z-10" />
        </div>

        <div className="max-w-5xl px-6 lg:px-12 w-full relative z-30 mx-auto text-center flex flex-col items-center">
          <ScrollReveal className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <span className="text-secondary uppercase tracking-[0.4em] font-bold text-[9px] lg:text-[10px] block">
                Capítulo I: El Ser (Cultura)
              </span>
              <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter">
                El Yo <span className="italic text-secondary/90">Profundo</span>
              </h2>
            </div>
            <p className="text-xl lg:text-3xl font-headline italic text-primary/90 leading-relaxed max-w-3xl">
              "La conciencia personal es el primer acto de transformación organizacional."
            </p>
            <div className="bg-white/60 backdrop-blur-md border-l-2 border-secondary p-8 lg:p-10 max-w-2xl text-left shadow-sm">
              <p className="text-lg lg:text-xl text-primary font-headline italic">Diagnóstico cultural profundo y toma de decisiones éticas desde la raíz.</p>
            </div>
            <div className="w-full max-w-lg py-6 mx-auto">
              <PodcastPlayer src={podcastUrls.p01} title="01 El círculo que vuelve a empezar" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CAPÍTULO II: EL PUENTE */}
      <section id="puente" className="relative min-h-[60vh] py-12 lg:py-16 bg-secondary/5 flex items-center justify-center">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          <ScrollReveal className="hidden lg:block">
            <div className="aspect-[4/5] overflow-hidden brochure-shadow relative p-1 bg-white">
              <Image
                src={images.find(img => img.id === "puente-video")?.imageUrl || ""}
                alt="El Puente"
                fill
                className="object-cover grayscale"
                data-ai-hint="majestic cat"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[9px] block">Capítulo II: Liderazgo</span>
              <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter">El Puente</h2>
            </div>
            <div className="bg-white border-l-2 border-secondary p-8 lg:p-10 shadow-sm">
              <p className="text-lg lg:text-xl text-primary font-headline italic">Mentoría estratégica y comunicación de marca con propósito para directivos.</p>
            </div>
            <div className="max-w-lg">
              <PodcastPlayer src={podcastUrls.p02} title="02 Recorrido experiencial" />
            </div>
            <div className="bg-white/95 p-10 border border-secondary/5 space-y-6 shadow-lg">
              <div className="flex items-center gap-6">
                <Mic2 className="w-8 h-8 text-secondary" />
                <h3 className="text-2xl lg:text-3xl font-headline italic text-primary">Speaker Strategic</h3>
              </div>
              <p className="text-lg lg:text-xl text-primary/80 font-headline italic leading-relaxed">
                "Traduzco el mundo interno en liderazgo tangible para organizaciones que buscan trascender."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CAPÍTULO III: LA CONEXIÓN (ESG) */}
      <section id="conexion" className="relative min-h-[60vh] py-12 lg:py-16 flex flex-col items-center justify-center bg-background overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <ParallaxSection speed={0.1} className="h-full w-full">
            <Image
              src={images.find(img => img.id === "conexion-bg")?.imageUrl || ""}
              alt="La Conexión"
              fill
              className="object-cover saturate-0"
              data-ai-hint="interconnected roots"
            />
          </ParallaxSection>
        </div>
        <ScrollReveal className="text-center max-w-3xl px-6 mb-12 relative z-10">
          <Badge variant="outline" className="mb-8 uppercase tracking-[0.4em] px-8 py-2 text-[9px] border-secondary/30">ESG & Sostenibilidad</Badge>
          <h2 className="text-fluid-chapter font-headline mb-6 text-primary tracking-tighter">La Conexión</h2>
          <p className="text-lg lg:text-xl text-primary/70 font-headline italic">Implementación de criterios Ambientales, Sociales y de Gobernanza con enfoque humano.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-6 relative z-10 mx-auto">
          {[
            { title: "Ética de Origen", icon: User, desc: "Sostenibilidad como ética personal proyectada." },
            { title: "Criterios ASG", icon: Globe, desc: "Ambiental, Social y Gobernanza como pilares." },
            { title: "Decisiones Éticas", icon: BookOpen, desc: "Integridad humana y técnica en política empresarial." }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 100} className="group">
              <div className="bg-white p-8 lg:p-10 h-full flex flex-col items-start space-y-6 border border-secondary/5 brochure-shadow hover:border-secondary transition-all">
                <item.icon className="w-8 h-8 text-secondary" />
                <h3 className="text-2xl font-headline text-primary group-hover:text-secondary transition-colors italic">{item.title}</h3>
                <p className="text-base lg:text-lg text-primary/70 leading-relaxed font-headline italic">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CAPÍTULO IV: EL DEBER SER */}
      <section id="deber" className="relative min-h-[60vh] py-12 lg:py-16 bg-primary/5 flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">
          <ScrollReveal className="space-y-10 lg:space-y-16">
            <div className="space-y-6">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[9px] block">Capítulo IV: Compliance</span>
              <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter leading-tight">
                El Deber <span className="italic text-secondary">Ser</span>
              </h2>
            </div>
            <div className="bg-white border-l-2 border-secondary p-8 lg:p-10 max-w-xl shadow-sm">
              <p className="text-lg lg:text-xl text-primary font-headline italic">Sistemas de gestión de cumplimiento normativo e integridad corporativa SAGRILAFT.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Compliance Ético", icon: Shield },
                { title: "Gestión Riesgos", icon: Activity },
                { title: "Derecho Senior", icon: Scale }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 p-6 bg-white brochure-shadow border border-secondary/5">
                  <item.icon className="w-6 h-6 text-secondary" />
                  <h4 className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">{item.title}</h4>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300} className="relative hidden lg:block aspect-[3/4] max-h-[500px]">
            <div className="relative w-full h-full brochure-shadow p-1 bg-white">
              <Image src={images.find(img => img.id === "deber-bg")?.imageUrl || ""} alt="Guardian" fill className="object-cover grayscale" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CAPÍTULO V: GOBERNANZA */}
      <section id="gobernanza" className="relative min-h-[60vh] py-12 lg:py-16 flex flex-col items-center justify-center bg-background">
        <ScrollReveal className="text-center mb-12 lg:mb-16 px-6">
           <Badge variant="outline" className="mb-8 uppercase tracking-[0.4em] text-[9px] py-2 px-8 rounded-none border-secondary/30">Gobernanza Senior</Badge>
           <h2 className="text-fluid-chapter font-headline text-primary mb-6 tracking-tighter">La Gobernanza</h2>
           <p className="text-xl lg:text-2xl text-primary/70 font-headline italic max-w-2xl mx-auto">Buen gobierno para juntas directivas de alto impacto corporativo.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-6 mx-auto">
          {[
            { company: "Metro de Medellín", project: "Estrategia Integridad", desc: "Oficial de Transparencia Senior." },
            { company: "Comfenalco", project: "Pacto Global & ESG", desc: "Liderazgo en modelos éticos." },
            { company: "Clínica Somer", project: "Consultoría Senior", desc: "Expertise en juntas directivas." }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 100} className="group">
              <div className="bg-white p-8 lg:p-10 border border-secondary/5 brochure-shadow hover:border-secondary transition-all h-full">
                <Badge className="bg-secondary/10 text-secondary rounded-none px-4 py-1.5 text-[8px] uppercase font-bold tracking-[0.3em] mb-6">{item.company}</Badge>
                <h3 className="text-2xl lg:text-3xl font-headline text-primary mb-4 italic">{item.project}</h3>
                <p className="text-base lg:text-lg text-primary/70 font-headline italic leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CAPÍTULO VI: GOBIERNO DE SÍ MISMO - DISEÑO EDITORIAL EXACTO */}
      <section id="gobierno" className="relative min-h-screen w-full flex flex-col items-center justify-start bg-primary overflow-hidden pt-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.find(img => img.id === "gobierno-bg")?.imageUrl || ""}
            alt="La Individuación Background"
            fill
            className="object-cover grayscale brightness-[0.15] animate-ken-burns"
            priority
            data-ai-hint="dark forest"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-primary/80 z-10" />
        </div>
        
        {/* Cabecera de Sección */}
        <div className="relative z-20 w-full flex justify-between px-6 lg:px-12 py-6">
          <span className="font-headline italic text-white/40 text-sm">IntegriCult</span>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-white tracking-[0.4em] uppercase">John Darío Cardona Espinosa</span>
            <span className="block text-[8px] font-bold text-white/40 tracking-[0.2em] uppercase">Estratega en Gobernanza & Ética</span>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-8 lg:mt-16">
          <ScrollReveal className="space-y-4 lg:space-y-8">
            <span className="text-secondary font-bold tracking-[0.5em] uppercase text-[10px] lg:text-[12px] block">
              Capítulo VI: La Individuación
            </span>
            <h2 className="text-fluid-chapter font-headline text-white tracking-tighter leading-[0.85] m-0">
              Gobierno de <br /> <span className="italic text-secondary">Sí Mismo</span>
            </h2>
            
            <div className="flex flex-col items-center space-y-6 pt-8">
              <div className="w-12 h-[1px] bg-secondary/30" />
              <p className="text-xl lg:text-3xl font-headline italic text-white/90 leading-relaxed max-w-2xl">
                "Todo esto que ves afuera, nació adentro."
              </p>
              <span className="text-white/40 font-bold tracking-[0.6em] uppercase text-[9px] lg:text-[10px] block">
                — Carl Gustav Jung
              </span>
            </div>
          </ScrollReveal>

          {/* Reproductor Compacto Estilo Referencia */}
          <ScrollReveal delay={200} className="w-full max-w-lg mt-12">
            <div className="bg-black/20 backdrop-blur-md p-6 border-l-2 border-secondary/50 flex items-center gap-6">
              <button 
                onClick={() => playSound('click')}
                className="w-12 h-12 bg-secondary flex items-center justify-center text-white"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
              <div className="flex-1 text-left">
                <span className="block text-[9px] font-bold text-secondary uppercase tracking-[0.3em] mb-1">Podcast Editorial</span>
                <div className="h-1 bg-white/10 w-full relative">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-secondary" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] font-bold text-white/40 tabular-nums">0:00 / 0:00</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bloque Narrativo Final */}
          <ScrollReveal delay={400} className="w-full max-w-3xl mt-12 lg:mt-20">
            <div className="bg-[#111111]/80 backdrop-blur-xl p-10 lg:p-14 border border-white/5 relative shadow-2xl text-left">
              <p className="text-lg lg:text-2xl font-headline italic text-white/80 leading-relaxed mb-10">
                Mi trayectoria ha sido un retorno constante a la pregunta: ¿quién soy ante el deber ser colectivo? El verdadero liderazgo empieza por gobernarse a uno mismo.
              </p>
              <div className="pt-8 border-t border-white/5">
                <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">
                  Ciclo de Integridad · John Darío Cardona Espinosa
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Mediateca Flotante */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 px-12 opacity-40">
            <span className="rotate-90 text-[10px] font-bold text-white tracking-[0.4em] uppercase whitespace-nowrap mb-8">Mediateca</span>
            <ChevronRight className="w-6 h-6 text-secondary rotate-90" />
          </div>
        </div>
      </section>

      {/* CAPÍTULO VII: SOSTENIBILIDAD EN ACCIÓN */}
      <section id="sostenibilidad-accion" className="bg-[#EDEDEB] py-12 lg:py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">
          <ScrollReveal className="space-y-10 lg:space-y-14">
            <div className="space-y-6">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[9px] block">Capítulo VII</span>
              <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter leading-none">Sostenibilidad <span className="italic text-secondary">en acción.</span></h2>
            </div>
            <div className="space-y-6">
              {[
                { title: "Diagnóstico de Cultura y Ética", icon: Target },
                { title: "Sistemas ISO 37301 (Compliance)", icon: Shield },
                { title: "Estrategias ASG / ESG Senior", icon: Globe },
                { title: "Mentoría Senior C-Level", icon: User }
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-6 text-primary border-b border-primary/10 pb-6 group">
                  <service.icon className="w-6 h-6 text-secondary" />
                  <span className="text-xl lg:text-3xl font-headline italic group-hover:pl-4 transition-all">{service.title}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300} className="bg-primary p-10 lg:p-14 text-white space-y-10 shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-headline italic leading-tight">Portafolio Senior</h3>
            <p className="text-white/70 text-lg lg:text-xl font-headline italic leading-relaxed">Ciclo de Webinars: ABC de Innovación Social con Propósito Corporativo.</p>
            <button 
              onClick={() => document.getElementById('ai-trigger')?.click()}
              className="w-full border border-white/20 text-white h-14 rounded-none text-[9px] uppercase tracking-[0.3em] bg-transparent hover:bg-white/5 transition-all font-bold"
            >
              Abrir Asistente Senior
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* BANNER SIMULADOR ESTRATÉGICO - B/N CON TEXTOS EN COLOR */}
      <section id="simulador-banner" className="relative h-[70vh] lg:h-[80vh] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-y border-white/5 px-6 text-center">
        <div className="absolute inset-0 opacity-20 grayscale">
          <Image src="https://picsum.photos/seed/governance-data/1920/1080" alt="Data" fill className="object-cover" />
        </div>
        <div className="relative z-10 space-y-8 lg:space-y-12 max-w-6xl mx-auto">
          <ScrollReveal className="space-y-6">
             <h2 className="text-fluid-chapter font-headline text-white tracking-tighter leading-[0.85] m-0">
              Simulador de <br /> 
              <span className="italic text-secondary">Riesgos &</span> <br />
              <span className="italic text-secondary">Gobernanza</span>
            </h2>
            <p className="text-white/60 text-lg lg:text-2xl font-headline italic max-w-2xl mx-auto leading-relaxed">
              Tome el control. Enfréntese a dilemas reales de ética y sostenibilidad en un entorno de alta fidelidad técnica.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <button 
              onClick={() => setIsSimOpen(true)}
              className="bg-secondary text-white h-16 lg:h-20 px-12 lg:px-20 rounded-none text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-secondary/90 transition-all shadow-[0_0_40px_rgba(200,122,90,0.3)] flex items-center justify-center mx-auto group"
            >
              Iniciar Diagnóstico GRC <ShieldAlert className="ml-4 w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* CASOS Y PENSAMIENTO ESTRATÉGICO */}
      <section id="videos" className="bg-primary py-12 lg:py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal className="text-center space-y-6">
            <h2 className="text-fluid-chapter font-headline text-white tracking-tighter leading-none">Casos y <span className="italic text-accent">Pensamiento</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <ScrollReveal key={video.id} delay={100 * i}>
                <div onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}` : ''}`, '_blank')} className="group relative aspect-video cursor-pointer overflow-hidden border border-white/5 bg-black/20 hover:border-accent/40 transition-all shadow-lg">
                  <Image src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white/80 group-hover:text-accent transition-colors" />
                  </div>
                  <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black to-transparent">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-2">{video.tag}</span>
                    <h4 className="text-[11px] font-bold text-white uppercase truncate">{video.title}</h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELLO DE COHERENCIA */}
      <section id="sello" className="bg-white py-16 lg:py-24 flex flex-col items-center justify-center px-6 text-center">
        <ScrollReveal className="max-w-4xl space-y-10">
          <div className="w-20 h-20 lg:w-24 lg:h-24 border-2 border-secondary/30 mx-auto flex items-center justify-center rotate-45 group hover:rotate-[135deg] transition-all duration-700">
            <Zap className="w-10 h-10 lg:w-12 lg:h-12 text-secondary -rotate-45 group-hover:rotate-[-135deg] transition-all duration-700" />
          </div>
          <div className="space-y-6">
            <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter leading-none">Sello de Coherencia</h2>
            <p className="text-xl lg:text-2xl font-headline italic text-primary/70 max-w-2xl mx-auto">
              La coherencia no es un estado, es una práctica diaria de integridad corporativa.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* CONTACTO FINAL */}
      <section id="contacto-final" className="bg-white py-12 lg:py-16 px-6 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-center">
          <div className="space-y-8 text-center md:text-left">
            <h3 className="text-fluid-chapter font-headline text-primary italic tracking-tighter leading-[0.9]">Iniciemos la <br/> conversación senior</h3>
            <p className="text-primary/70 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed italic max-w-xs mx-auto md:mx-0">
              Un diálogo de alto nivel basado en la integridad y la cultura de resultados.
            </p>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="relative bg-[#FDFCFB] text-primary py-12 lg:py-16 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="space-y-8 text-center md:text-left">
            <h4 className="text-3xl lg:text-5xl font-headline italic text-primary tracking-tighter leading-none">IntegriCult</h4>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/70 leading-relaxed">
              <p>John Darío Cardona Espinosa</p>
              <p>Estratega en Gobernanza & Ética Senior</p>
            </div>
          </div>
          <div className="space-y-8 text-center md:text-left">
            <h5 className="uppercase tracking-[0.4em] text-[11px] font-bold opacity-60">Conexión</h5>
            <div className="flex justify-center md:justify-start gap-4">
               <button className="h-12 w-12 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                 <a href="https://wa.me/573014319793" target="_blank" rel="noopener noreferrer"><Globe className="w-5 h-5" /></a>
               </button>
               <button className="h-12 w-12 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                 <a href="https://www.linkedin.com/in/john1981/" target="_blank" rel="noopener noreferrer"><CircleDot className="w-5 h-5" /></a>
               </button>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-16">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">© 2026 John Cardona</p>
            <a href="https://nucleocolectivo.com/" target="_blank" className="text-right group">
              <span className="text-[9px] uppercase tracking-[0.4em] opacity-60 block mb-2">Diseño Editorial</span>
              <span className="font-headline italic text-2xl lg:text-3xl text-primary group-hover:text-secondary transition-colors">Núcleo Colectivo</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

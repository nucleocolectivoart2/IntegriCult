
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
  ChevronRight,
  ExternalLink,
  Headphones,
  Maximize2
} from "lucide-react";

export default function Home() {
  const images = PlaceHolderImages;
  const { playSound } = useSound();
  const [activeSection, setActiveSection] = React.useState("intro");

  const podcastUrls = {
    p01: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/01%20el%20circulo%20que%20vuelve%20a%20empezar.mp3",
    p02: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/02%20recorrido%20experiencial.mp3",
    p03: "https://raw.githubusercontent.com/nucleocolectivoart2/IntegriCult/main/podcast/03%20cierra%20los%20ojos.mp3"
  };

  const videos = [
    { id: "xaO9bsA8DtM", title: "Tensiones y tendencias de la Sostenibilidad", tag: "ESCUELA EXPERTOS" },
    { id: "WtAzaKmhOHs", title: "ABC de Innovación Social: Origen, Ética y Propósito", tag: "WEBINAR ESTRATÉGICO", start: 185 },
    { id: "A7fHwxBJ6Hs", title: "¿Qué pasa cuando no hay sostenibilidad?", tag: "CASO ESTRATÉGICO" },
    { id: "HIhWFFn3NDQ", title: "Sostenibilidad & Liderazgo", tag: "LA CONEXIÓN" },
    { id: "mvn5vXl3Xds", title: "Individuación en la Empresa", tag: "EL SER" }
  ];

  const clientLogos = [
    { name: "Pacto Global Colombia", url: "https://picsum.photos/seed/pacto/200/100" },
    { name: "Metro de Medellín", url: "https://picsum.photos/seed/metro/200/100" },
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

  const handleOpenSim = () => {
    playSound('click');
    window.open('/simulador', '_blank');
  };

  const handleOpenLink = (url: string) => {
    playSound('click');
    window.open(url, '_blank');
  };

  return (
    <main className="relative bg-background overflow-x-hidden font-body">
      <TopNav onScrollTo={scrollTo} />
      <Navigation activeSection={activeSection} />
      <AudioController />
      <DraftTool activeSection={activeSection} />

      {/* PORTADA HOME EDITORIAL */}
      <section id="intro" className="relative h-screen w-full flex items-start justify-center overflow-hidden bg-primary pt-[20vh] lg:pt-[28vh]">
        <div className="absolute inset-0 z-0">
          <ParallaxSection speed={-0.08} className="h-full w-full">
            <Image
              src={images.find(img => img.id === "intro-bg")?.imageUrl || ""}
              alt="IntegriCult Portada"
              fill
              className="object-cover brightness-[0.35] saturate-[0.6] animate-ken-burns scale-110"
              priority
              data-ai-hint="abstract nebula"
            />
          </ParallaxSection>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/60" />
        </div>
        
        {/* METADATOS EDITORIALES LATERALES */}
        <div className="absolute top-1/2 left-6 lg:left-12 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-16 items-start opacity-40">
           <div className="flex flex-col gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Concepto</span>
              <span className="text-[10px] font-headline italic text-white/80">Individuación Corporativa</span>
           </div>
           <div className="flex flex-col gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Año</span>
              <span className="text-[10px] font-headline italic text-white/80">Est. 2026</span>
           </div>
           <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-30" />
        </div>

        <div className="absolute top-1/2 right-6 lg:right-12 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-16 items-end opacity-40 text-right">
           <div className="flex flex-col gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Localización</span>
              <span className="text-[10px] font-headline italic text-white/80">Medellín, Colombia</span>
           </div>
           <div className="flex flex-col gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Gobernanza</span>
              <span className="text-[10px] font-headline italic text-white/80">Integridad Técnica</span>
           </div>
           <div className="w-[1px] h-24 bg-gradient-to-t from-white to-transparent opacity-30" />
        </div>

        <div className="relative z-10 text-center space-y-8 lg:space-y-12 px-6 max-w-5xl">
          <ScrollReveal className="space-y-6 lg:space-y-10">
            <div className="flex flex-col items-center gap-4">
              <span className="text-secondary font-bold tracking-[0.8em] uppercase text-[9px] lg:text-[11px] block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Manifiesto de Coherencia
              </span>
              <div className="w-12 h-[1px] bg-secondary/30" />
            </div>

            <h1 className="text-fluid-hero font-headline text-white tracking-tighter m-0 leading-[0.85]">
              Integri<span className="italic text-secondary">Cult</span>
            </h1>

            <div className="space-y-4">
              <p className="text-lg lg:text-3xl font-headline italic text-white/90 max-w-2xl mx-auto leading-tight">
                "Donde el ser interno se encuentra con el deber ser colectivo"
              </p>
              <div className="flex items-center justify-center gap-4 text-white/40 uppercase tracking-[0.4em] text-[8px] lg:text-[9px] font-bold">
                 <span>Estrategia</span>
                 <CircleDot className="w-2 h-2 text-secondary" />
                 <span>Gobernanza</span>
                 <CircleDot className="w-2 h-2 text-secondary" />
                 <span>Ética</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="flex flex-col items-center gap-6 lg:gap-10">
              <div className="h-20 lg:h-32 w-[1px] bg-gradient-to-b from-secondary via-secondary/20 to-transparent" />
              <button 
                onClick={() => scrollTo('corporativo')}
                onMouseEnter={() => playSound('hover')}
                className="group flex flex-col items-center gap-4 text-white hover:text-secondary transition-all duration-700 pointer-events-auto"
              >
                <div className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 border border-white/10 group-hover:border-secondary transition-colors duration-700">
                   <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 animate-bounce" />
                </div>
                <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.6em] font-bold opacity-60 group-hover:opacity-100 transition-opacity">Ingresar</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* NOMBRE DEL AUTOR EN LA BASE */}
        <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-20 flex flex-col items-center text-center opacity-60 pointer-events-none">
           <span className="text-[9px] lg:text-[10px] font-bold text-white uppercase tracking-[0.5em] mb-1">John Darío Cardona Espinosa</span>
           <span className="text-[7px] lg:text-[8px] text-white/50 uppercase tracking-[0.3em]">Estratega en Gobernanza, Ética & Sostenibilidad</span>
        </div>
      </section>

      {/* SIGUIENTES SECCIONES IGUAL... */}
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
                onClick={handleOpenSim}
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
              <PodcastPlayer podcastId="p01" src={podcastUrls.p01} title="01 El círculo que vuelve a empezar" />
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
              <PodcastPlayer podcastId="p02" src={podcastUrls.p02} title="02 Recorrido experiencial" />
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

        {/* MATERIAL DE APOYO: PACTO GLOBAL PODCAST */}
        <ScrollReveal delay={400} className="w-full max-w-5xl px-6 mt-16 relative z-10 mx-auto">
          <div className="bg-primary p-10 lg:p-14 border border-secondary/20 shadow-2xl flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 relative flex-shrink-0 border-2 border-secondary/30">
              <Image src="https://picsum.photos/seed/pactoglobal/400/400" alt="Pacto Global" fill className="object-cover" />
            </div>
            <div className="space-y-6 flex-1">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[9px] block">Podcast: Planeta Sostenible</span>
              <h3 className="text-2xl lg:text-4xl font-headline text-white italic leading-tight">Mesa de Trabajo 2026: Una nueva mirada a la sostenibilidad ética.</h3>
              <p className="text-white/60 font-headline italic text-lg leading-relaxed">Presentado por Pacto Global Colombia. John Darío Cardona analiza las tensiones del futuro corporativo.</p>
              <button 
                onClick={() => handleOpenLink("https://open.spotify.com/episode/6sh47qe32PsT15dyCsWBo9")}
                className="flex items-center gap-4 text-white hover:text-secondary transition-colors group"
              >
                <Headphones className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white/20 pb-1 group-hover:border-secondary transition-all">Escuchar en Spotify</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
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

      {/* CAPÍTULO VI: GOBIERNO DE SÍ MISMO */}
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
        </div>
      </section>

      {/* CAPÍTULO VII: SOSTENIBILIDAD EN ACCIÓN */}
      <section id="sostenibilidad-accion" className="bg-[#EDEDEB] py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-start">
          <ScrollReveal className="space-y-12 lg:space-y-20">
            <div className="space-y-6">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[9px] block">Capítulo VII</span>
              <h2 className="text-fluid-chapter font-headline text-primary tracking-tighter leading-[0.85] m-0">
                Sostenibilidad <br /> 
                <span className="italic text-secondary">en acción.</span>
              </h2>
            </div>
            <div className="space-y-6 pl-6 lg:pl-16">
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
          <ScrollReveal delay={300} className="bg-primary p-10 lg:p-14 text-white space-y-10 shadow-2xl mt-12 lg:mt-32">
            <div className="space-y-2">
              <h3 className="text-3xl lg:text-4xl font-headline italic leading-tight">Portafolio Senior</h3>
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[8px] block opacity-60">Individuación</span>
            </div>
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

      {/* BANNER SIMULADOR */}
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
              onClick={handleOpenSim}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <button 
                onClick={() => handleOpenLink("https://www.pactoglobal-colombia.org/conferencistas-congreso/john-dario-cardona-espinosa.html")}
                className="mt-4 flex items-center gap-2 text-secondary hover:text-secondary/80 transition-all font-bold tracking-widest text-[8px] uppercase"
              >
                Conferencista Pacto Global <ExternalLink className="w-3 h-3" />
              </button>
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

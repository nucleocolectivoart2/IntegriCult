
"use client";

import * as React from "react";
import { Play, Pause, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PodcastPlayerProps {
  src: string;
  title: string;
  className?: string;
}

export function PodcastPlayer({ src, title, className }: PodcastPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  // Sistema de sincronización global: solo un audio suena a la vez
  React.useEffect(() => {
    const handleGlobalPlay = (e: any) => {
      // Si el evento de reproducción no viene de este componente, pausar
      if (e.detail?.src !== src) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    const handleStopAll = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("integricult-play", handleGlobalPlay);
    window.addEventListener("integricult-stop-all", handleStopAll);
    
    return () => {
      window.removeEventListener("integricult-play", handleGlobalPlay);
      window.removeEventListener("integricult-stop-all", handleStopAll);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Notificar a todos los demás componentes de audio que se detengan
      window.dispatchEvent(new CustomEvent("integricult-play", { detail: { src } }));
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn(
      "group relative bg-accent/10 border-l-4 border-accent p-4 lg:p-5 flex flex-col gap-3 animate-in fade-in duration-1000 max-w-lg rounded-none",
      className
    )}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />
      
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          size="icon"
          className="w-10 h-10 bg-accent hover:bg-accent/90 text-white rounded-none shadow-sm transition-transform active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </Button>
        
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-accent mb-0.5 flex items-center gap-1.5">
            <Headphones className="w-2.5 h-2.5" /> Podcast Editorial
          </span>
          <h4 className="text-sm font-headline italic text-primary truncate">
            {title}
          </h4>
        </div>

        <div className="text-[9px] font-bold text-accent/60 uppercase tracking-widest whitespace-nowrap tabular-nums">
          {formatTime((progress / 100) * duration)} / {formatTime(duration)}
        </div>
      </div>

      <div className="relative w-full px-1">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

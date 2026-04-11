
"use client";

import * as React from "react";
import { Volume2, VolumeX, SkipForward, Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const PLAYLIST = [
  { id: 1, title: "Drone Zone (Introspección)", url: "https://ice1.somafm.com/dronezone-128-mp3" },
  { id: 2, title: "Groove Salad (Chill)", url: "https://ice1.somafm.com/groovesalad-128-mp3" },
  { id: 3, title: "SUN Jazz (Rigor)", url: "https://diffusion.lafrap.fr/sun-jazz.mp3" },
  { id: 4, title: "FIP (Ecléctica Culta)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3" }
];

export function AudioController() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.2); 
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const handleGlobalPlay = (e: any) => {
      if (e.detail?.src !== "radio-integricult") {
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
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent("integricult-play", { detail: { src: "radio-integricult" } }));
      setIsLoading(true);
      audioRef.current.play().then(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true));
        }
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-[112px] lg:bottom-[128px] left-4 lg:left-8 z-[100] group">
      <div className={cn(
        "relative flex items-center bg-primary text-white border border-white/10 shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out rounded-none",
        "w-12 h-12 lg:w-14 lg:h-14 lg:group-hover:w-auto brochure-shadow"
      )}>
        <audio ref={audioRef} src={PLAYLIST[currentTrackIndex].url} preload="none" />
        
        <div 
          onClick={togglePlay}
          className={cn(
            "min-w-[48px] min-h-[48px] lg:min-w-[56px] lg:min-h-[56px] flex items-center justify-center cursor-pointer transition-colors duration-700",
            isPlaying ? "bg-secondary" : "bg-primary"
          )}
        >
          <Music className={cn("w-5 h-5", isPlaying ? "text-white animate-pulse" : "text-secondary")} />
        </div>

        <div className="hidden lg:flex items-center gap-0 h-14 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-nowrap overflow-hidden">
          <Button variant="ghost" size="icon" onClick={togglePlay} disabled={isLoading} className="w-10 h-10 rounded-none hover:bg-white/10 text-accent">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack} className="w-10 h-10 rounded-none hover:bg-white/10 text-accent">
            <SkipForward className="w-4 h-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-none hover:bg-white/10 text-accent">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-12 p-3 bg-primary border border-white/10 rounded-none shadow-2xl">
              <div className="h-24 flex flex-col items-center">
                <Slider orientation="vertical" defaultValue={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} className="h-full" />
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-col justify-center px-6 border-l border-white/10 max-w-[180px]">
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-40 leading-none mb-1">Radio Editorial</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent truncate">
              {PLAYLIST[currentTrackIndex].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

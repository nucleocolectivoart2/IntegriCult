
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Loader2, X, Quote, ShieldCheck } from "lucide-react";
import { aiNarrativeDraftingTool } from "@/ai/flows/ai-narrative-drafting-tool";
import { useToast } from "@/hooks/use-toast";

interface DraftToolProps {
  activeSection?: string;
}

export function DraftTool({ activeSection }: DraftToolProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [context, setContext] = React.useState("CULTURA ORGANIZACIONAL");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const { toast } = useToast();

  // Mapeo de secciones del sitio a contextos de la IA
  React.useEffect(() => {
    if (activeSection) {
      const mapping: Record<string, string> = {
        'ser': 'CULTURA ORGANIZACIONAL',
        'puente': 'LIDERAZGO & MENTORÍA',
        'conexion': 'SOSTENIBILIDAD ESG',
        'deber': 'COMPLIANCE ISO 37301',
        'gobernanza': 'GOBERNANZA SENIOR',
        'sostenibilidad-accion': 'SOSTENIBILIDAD ESG'
      };
      if (mapping[activeSection]) {
        setContext(mapping[activeSection]);
      }
    }
  }, [activeSection]);

  const handleGenerate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const output = await aiNarrativeDraftingTool({
        textToProcess: text,
        sectionContext: context,
      });
      setResult(output.generatedNarrative);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el análisis.",
      });
    } finally {
      setLoading(false);
    }
  };

  const PROMPTS = [
    "Identifica riesgos ESG en mi empresa",
    "Cómo implementar cultura de cumplimiento",
    "Analizar coherencia ética en junta directiva"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-16 lg:bottom-[64px] left-4 lg:left-8 z-[100] group">
        <Button
          id="ai-trigger"
          onClick={() => setIsOpen(true)}
          className="relative rounded-none w-12 h-12 lg:w-14 lg:h-14 bg-primary text-primary-foreground shadow-2xl border border-white/5 transition-all hover:bg-secondary"
          size="icon"
        >
          <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-secondary group-hover:text-white transition-colors" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
      <Card className="w-full max-w-xl shadow-2xl border-white/10 bg-background/95 glass overflow-hidden animate-in zoom-in-95 duration-500 rounded-none relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 lg:p-8">
          <div>
            <CardTitle className="font-headline text-2xl lg:text-3xl flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 lg:w-8 lg:h-8 text-secondary" />
              Asistente Estratégico
            </CardTitle>
            <CardDescription className="text-sm lg:text-lg opacity-70">Gobernanza & Cultura Ética</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-none hover:bg-secondary/10">
            <X className="w-6 h-6 text-secondary" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 lg:space-y-8 p-6 lg:p-8 pt-0">
          <div className="space-y-2 lg:space-y-3">
            <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Contexto Estratégico (Detectado)</label>
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger className="rounded-none border-primary/10 h-10 lg:h-12 bg-white/50">
                <SelectValue placeholder="Contexto" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="CULTURA ORGANIZACIONAL">CULTURA ORGANIZACIONAL</SelectItem>
                <SelectItem value="LIDERAZGO & MENTORÍA">LIDERAZGO & MENTORÍA</SelectItem>
                <SelectItem value="SOSTENIBILIDAD ESG">SOSTENIBILIDAD ESG</SelectItem>
                <SelectItem value="COMPLIANCE ISO 37301">COMPLIANCE ISO 37301</SelectItem>
                <SelectItem value="GOBERNANZA SENIOR">GOBERNANZA SENIOR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {PROMPTS.map((p, i) => (
              <button 
                key={i} 
                onClick={() => setText(p)}
                className="text-[9px] uppercase tracking-wider font-bold border border-primary/10 px-3 py-1.5 hover:bg-secondary/10 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Consulta</label>
            <Textarea
              placeholder="Ej: ¿Cómo alinear la ética personal con los objetivos de ESG?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px] lg:min-h-[120px] rounded-none border-primary/10 bg-white/50 p-4 text-base lg:text-lg text-primary"
            />
          </div>
          <Button 
            className="w-full h-12 lg:h-14 bg-secondary hover:bg-secondary/90 text-white rounded-none text-base lg:text-lg font-medium shadow-xl shadow-secondary/20 transition-all" 
            onClick={handleGenerate}
            disabled={loading || !text}
          >
            {loading ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin mr-3" /> : <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />}
            Analizar Estrategia
          </Button>
          {result && (
            <div className="mt-4 lg:mt-6 p-4 lg:p-6 rounded-none bg-secondary/5 border border-secondary/10 max-h-[200px] overflow-auto animate-in slide-in-from-top-4">
              <Quote className="w-5 h-5 text-secondary opacity-20 mb-3" />
              <p className="text-base lg:text-lg leading-relaxed text-primary/80 italic font-headline">"{result}"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

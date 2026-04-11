
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Scale, Users, 
  Activity, HeartPulse, Globe, BookOpen, 
  ShieldAlert, RefreshCcw, Target, Zap, 
  Coins, UserCheck, ChevronRight, Fingerprint,
  Lock, BarChart3, TrendingUp, AlertTriangle,
  Volume2, VolumeX, Info
} from 'lucide-react';

const THEME = {
  radius: '0px',
  colors: {
    bg: '#050505', 
    card: '#FDFCFB', 
    text: '#111111',
    primary: '#111111',
    accent: '#B08D57',
    secondary: '#C87A5A',
    emerald: '#10B981',
    blue: '#3B82F6',
    purple: '#A78BFA',
    red: '#EF4444'
  }
};

const SOUNDS = {
  click: "https://www.soundjay.com/buttons/sounds/button-16.mp3",
  transition: "https://www.soundjay.com/buttons/sounds/button-20.mp3",
  alert: "https://www.soundjay.com/buttons/sounds/beep-07.mp3",
  success: "https://www.soundjay.com/buttons/sounds/button-09.mp3"
};

const LEGAL_FRAMEWORK = {
  governance: {
    title: "ISO 37301 & BUEN GOBIERNO",
    penalty: "Pérdida de licencias y multas del 10% de ingresos brutos anuales."
  },
  esg_reporting: {
    title: "DIRECTIVA CSRD (ESG)",
    penalty: "Exclusión de mercados de capitales y sanciones reputacionales severas."
  },
  ai_ethics: {
    title: "LEY DE IA DE LA UE",
    penalty: "Multas de hasta 35M€ o el 7% de la facturación global."
  },
  sagrilaft: {
    title: "SAGRILAFT / LAFT",
    penalty: "Inhabilidad para contratar con el Estado y bloqueos financieros internacionales."
  },
  data_privacy: {
    title: "GDPR / LEY 1581",
    penalty: "Multas de hasta 2.000 SMMLV y cierre de operaciones digitales."
  },
  purpose: {
    title: "ESTATUTOS B-CORP",
    penalty: "Pérdida de certificación y desconfianza de inversores de impacto."
  }
};

const CHAPTERS = [
  {
    id: 1,
    title: 'Cultura de Integridad',
    tag: 'BUEN GOBIERNO',
    dilema: 'El 40% de los mandos medios ignora el canal de denuncias por miedo. ¿Cómo interviene el Estratega?',
    normativa: LEGAL_FRAMEWORK.governance,
    options: [
      { 
        text: 'Externalizar el canal con anonimato total', 
        cost: 80000, influence: 2,
        effects: { compliance: 25, trust: 30, governance: 15, profitability: -5 },
        feedback: 'Aumenta la confianza radicalmente. La transparencia externa es un escudo contra la retaliación.'
      },
      { 
        text: 'Sanciones públicas a comportamientos tóxicos', 
        cost: 0, influence: 3,
        effects: { compliance: 20, governance: 25, trust: -15, resilience: 10 },
        feedback: 'Envía un mensaje de rigor, pero genera un clima de vigilancia que puede inhibir el reporte.'
      },
      { 
        text: 'Capacitación ética lúdica y voluntaria', 
        cost: 30000, influence: 1,
        effects: { trust: 10, social: 5, compliance: 5, talent: 5 },
        feedback: 'Una medida blanda que mejora el clima pero no resuelve el problema estructural de seguridad.'
      }
    ]
  },
  {
    id: 2,
    title: 'Sostenibilidad ESG',
    tag: 'SOSTENIBILIDAD ESG',
    dilema: 'Un proveedor crítico ha sido señalado por vertidos tóxicos. Cambiarlo detendrá la producción 3 semanas.',
    normativa: LEGAL_FRAMEWORK.esg_reporting,
    options: [
      { 
        text: 'Terminar contrato inmediatamente', 
        cost: 450000, influence: 4,
        effects: { environmental: 40, compliance: 30, profitability: -40, resilience: 10 },
        feedback: 'Integridad total. El mercado castiga el corto plazo pero premia su resiliencia ética.'
      },
      { 
        text: 'Plan de transición y auditoría de 12 meses', 
        cost: 120000, influence: 1,
        effects: { environmental: 10, compliance: 10, profitability: -10, resilience: -5 },
        feedback: 'Pragmatismo que minimiza el daño financiero pero mantiene un riesgo latente en la cadena.'
      },
      { 
        text: 'Ignorar y mitigar con campaña de RSE', 
        cost: 50000, influence: -2,
        effects: { environmental: -20, trust: -30, profitability: 15, governance: -10 },
        feedback: 'Lavado de imagen detectado. La incoherencia es el mayor riesgo reputacional actual.'
      }
    ]
  },
  {
    id: 3,
    title: 'IA Ética & Sesgos',
    tag: 'TECNOLOGÍA RESPONSABLE',
    dilema: 'Su IA de reclutamiento prefiere ciertos perfiles por sesgos históricos. ¿Cómo procede ante el Director de RRHH?',
    normativa: LEGAL_FRAMEWORK.ai_ethics,
    options: [
      { 
        text: 'Auditoría externa y reentrenamiento total', 
        cost: 200000, influence: 3,
        effects: { social: 35, compliance: 30, talent: 25, resilience: 15 },
        feedback: 'Liderazgo en tecnología responsable. Asegura un futuro libre de discriminación algorítmica.'
      },
      { 
        text: 'Implementar filtros manuales de diversidad', 
        cost: 30000, influence: 1,
        effects: { social: 15, talent: 10, resilience: -5 },
        feedback: 'Parche paliativo. No corrige el sesgo del motor y mantiene el riesgo legal de la Ley de IA.'
      },
      { 
        text: 'Continuar priorizando eficiencia sobre equidad', 
        cost: 0, influence: -3,
        effects: { social: -40, compliance: -40, trust: -20 },
        feedback: 'Eficiencia de corto plazo que invita a litigios masivos por discriminación sistémica.'
      }
    ]
  },
  {
    id: 4,
    title: 'SAGRILAFT & Riesgos',
    tag: 'COMPLIANCE FINANCIERO',
    dilema: 'Un cliente potencial de alto valor tiene vínculos indirectos con paraísos fiscales no cooperantes.',
    normativa: LEGAL_FRAMEWORK.sagrilaft,
    options: [
      { 
        text: 'Rechazar operación por debida diligencia', 
        cost: 800000, influence: 5,
        effects: { compliance: 45, governance: 35, trust: 20, resilience: 20 },
        feedback: 'Blindaje institucional. Evitar el riesgo de lavado es la mejor inversión en longevidad.'
      },
      { 
        text: 'Aceptar bajo monitoreo intensivo', 
        cost: 150000, influence: 2,
        effects: { compliance: 10, profitability: 30, governance: -5 },
        feedback: 'Camina sobre el filo. El monitoreo es costoso y nunca garantiza seguridad al 100%.'
      },
      { 
        text: 'Aceptar mediante estructura de terceros', 
        cost: 50000, influence: -5,
        effects: { compliance: -60, governance: -50, trust: -40 },
        feedback: 'Incoherencia total. Ha comprometido la licencia de operación por una ganancia fugaz.'
      }
    ]
  },
  {
    id: 5,
    title: 'Soberanía de Datos',
    tag: 'PRIVACIDAD & ÉTICA',
    dilema: 'Una brecha de seguridad ha expuesto datos de 5.000 empleados. Legal sugiere no notificar si no hay quejas.',
    normativa: LEGAL_FRAMEWORK.data_privacy,
    options: [
      { 
        text: 'Notificación transparente inmediata', 
        cost: 250000, influence: 4,
        effects: { trust: 40, compliance: 35, social: 20, resilience: 15 },
        feedback: 'Honestidad radical. Construye una cultura de responsabilidad que empleados y reguladores valoran.'
      },
      { 
        text: 'Notificar solo a los afectados críticos', 
        cost: 80000, influence: 1,
        effects: { trust: 10, compliance: 15, resilience: 5 },
        feedback: 'Gestión de daños mínima. Cumple la norma pero no construye capital social profundo.'
      },
      { 
        text: 'Ocultar bajo acuerdo de confidencialidad', 
        cost: 100000, influence: -4,
        effects: { trust: -50, compliance: -50, governance: -30 },
        feedback: 'Bomba de tiempo. Cuando la brecha se haga pública, el costo será existencial para la marca.'
      }
    ]
  },
  {
    id: 6,
    title: 'Propósito Corporativo',
    tag: 'VALOR COMPARTIDO',
    dilema: 'Se debe elegir entre un dividendo extraordinario o reinvertir en el fondo de innovación social ética.',
    normativa: LEGAL_FRAMEWORK.purpose,
    options: [
      { 
        text: 'Invertir en Innovación Social Ética', 
        cost: 600000, influence: 5,
        effects: { social: 45, resilience: 35, trust: 30, profitability: -20 },
        feedback: 'Liderazgo de impacto. Está creando valor compartido que asegura la licencia social para operar.'
      },
      { 
        text: 'Dividendo del 50% y fondo del 50%', 
        cost: 300000, influence: 2,
        effects: { social: 20, profitability: 10, trust: 15 },
        feedback: 'Equilibrio pragmático. Satisface al inversor tradicional sin abandonar el propósito.'
      },
      { 
        text: 'Priorizar retorno total al accionista', 
        cost: 0, influence: -2,
        effects: { social: -30, resilience: -20, profitability: 40, trust: -10 },
        feedback: 'Visión de corto plazo. Maximizar el hoy puede significar la irrelevancia del mañana.'
      }
    ]
  }
];

const MetricBar = ({ label, value, color, icon: Icon }: any) => (
  <div className="w-full space-y-1.5">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/90 tracking-[0.25em]">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={12} className="opacity-80" style={{ color }} />}
        <span>{label}</span>
      </div>
      <span className="font-mono text-white/50">{Math.round(value)}%</span>
    </div>
    <div className="h-[3px] bg-white/5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }} 
        className="h-full shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const RadarSmall = ({ metrics, size = 200 }: any) => {
  const keys = ['compliance', 'governance', 'environmental', 'social', 'profitability', 'trust'];
  const center = size / 2;
  const radius = size * 0.42;
  const angles = keys.map((_, i) => (i * 60 - 90) * Math.PI / 180);
  const points = keys.map((key, i) => {
    const val = ((metrics[key as keyof typeof metrics] || 0) / 100) * radius;
    return `${center + val * Math.cos(angles[i])},${center + val * Math.sin(angles[i])}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg width={size} height={size} className="drop-shadow-2xl">
        {[0.33, 0.66, 1].map(v => (
          <polygon 
            key={v}
            points={angles.map(a => `${center + radius * v * Math.cos(a)},${center + radius * v * Math.sin(a)}`).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          />
        ))}
        {angles.map((a, i) => (
          <line 
            key={i} 
            x1={center} y1={center} 
            x2={center + radius * Math.cos(a)} y2={center + radius * Math.sin(a)} 
            stroke="rgba(255,255,255,0.15)" strokeWidth="1" 
          />
        ))}
        <motion.polygon 
          animate={{ points }} 
          fill={`${THEME.colors.secondary}40`} 
          stroke={THEME.colors.secondary} 
          strokeWidth="2.5" 
          className="drop-shadow-[0_0_15px_rgba(200,122,90,0.5)]"
        />
      </svg>
    </div>
  );
};

export function GovernanceSim() {
  const [view, setView] = useState('intro');
  const [turn, setTurn] = useState(0);
  const [metrics, setMetrics] = useState({ 
    compliance: 50, governance: 50, environmental: 40, 
    social: 50, profitability: 60, trust: 45, talent: 55, resilience: 40 
  });
  const [resources, setResources] = useState({ capital: 2500000, influence: 15 });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback((type: keyof typeof SOUNDS) => {
    if (isMuted) return;
    try {
      const audio = new Audio(SOUNDS[type]);
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch (e) {
      console.warn("Audio Context not available");
    }
  }, [isMuted]);

  const globalSustainability = (
    metrics.compliance * 0.25 + 
    metrics.trust * 0.2 + 
    metrics.resilience * 0.2 + 
    metrics.profitability * 0.2 +
    metrics.social * 0.15
  );

  useEffect(() => {
    if (globalSustainability < 20 && view === 'playing') {
      playSound('alert');
      setView('result');
    }
  }, [globalSustainability, view, playSound]);

  const handleChoice = (opt: any) => {
    if (resources.capital < opt.cost) {
      playSound('alert');
      return;
    }
    playSound('click');
    setResources(p => ({ capital: p.capital - opt.cost, influence: p.influence + (opt.influence || 0) }));
    setMetrics(p => {
      const next = { ...p };
      Object.entries(opt.effects).forEach(([k, v]: [string, any]) => {
        (next as any)[k] = Math.min(100, Math.max(0, (next as any)[k] + (v || 0)));
      });
      return next;
    });
    setFeedback(opt.feedback);
    setView('feedback');
  };

  const nextTurn = () => {
    playSound('transition');
    if (turn + 1 < CHAPTERS.length) {
      setTurn(turn + 1);
      setView('playing');
    } else {
      playSound('success');
      setView('result');
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] text-white flex flex-col items-center overflow-hidden font-body select-none">
      
      {/* HEADER TÉCNICO DE ALTA FIDELIDAD */}
      <header className="w-full h-14 px-8 flex justify-between items-center border-b border-white/5 bg-black/60 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 bg-secondary flex items-center justify-center shadow-[0_0_15px_rgba(200,122,90,0.4)]">
             <Shield size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">INTEGRICULT GRC ENGINE v3.6.1</span>
            <span className="text-[8px] font-bold tracking-[0.2em] text-secondary/60 uppercase">Alpha Mandate Protocol</span>
          </div>
        </div>

        {/* BARRA DE SOSTENIBILIDAD GLOBAL CENTRAL */}
        <div className="hidden lg:flex flex-col items-center w-64 space-y-1">
          <div className="flex justify-between w-full text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">
            <span>Viabilidad Corporativa</span>
            <span className={globalSustainability < 30 ? "text-red-500 animate-pulse" : "text-emerald-500"}>{Math.round(globalSustainability)}%</span>
          </div>
          <div className="w-full h-[3px] bg-white/5">
            <motion.div 
              animate={{ width: `${globalSustainability}%`, backgroundColor: globalSustainability < 30 ? THEME.colors.red : THEME.colors.emerald }}
              className="h-full"
            />
          </div>
        </div>

        <div className="flex gap-10 text-[10px] font-bold tracking-[0.25em] uppercase items-center">
          <div className="flex gap-3 items-center">
            <Coins size={12} className="text-emerald-500 opacity-60" />
            <span className="text-white/30">CAPITAL:</span>
            <span className="text-emerald-500 font-mono tracking-normal">${(resources.capital/1000).toFixed(0)}K</span>
          </div>
          <div className="flex gap-3 items-center">
            <Zap size={12} className="text-amber-500 opacity-60" />
            <span className="text-white/30">INFLUENCIA:</span>
            <span className="text-amber-500 font-mono tracking-normal">{resources.influence}</span>
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="text-white/30 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 flex flex-col items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          
          {/* PORTADA NARRATIVA */}
          {view === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="max-w-xl w-full">
              <div className="bg-[#FDFCFB] text-[#111111] p-10 lg:p-14 shadow-2xl relative flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary shadow-[0_5px_15px_rgba(200,122,90,0.2)]" />
                <Badge className="mb-6 uppercase tracking-[0.6em] text-[10px] py-1.5 px-6 border border-secondary/30 font-bold text-secondary bg-transparent rounded-none">Mandato Estratégico</Badge>
                <h1 className="text-4xl lg:text-5xl font-headline italic font-bold tracking-tighter mb-6 leading-none">El Mandato <br/> IntegriCult</h1>
                <p className="text-lg lg:text-xl text-primary/70 font-headline italic leading-relaxed mb-10 max-w-md mx-auto">
                  "Usted asume el rol de Estratega Senior. Deberá navegar dilemas de integridad donde cada decisión impacta la viabilidad futura de la organización."
                </p>
                <div className="grid grid-cols-3 gap-6 w-full text-left mb-10 border-t border-primary/10 pt-8">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-secondary block">Concepto</span>
                    <p className="text-[11px] text-primary/60 font-headline italic leading-snug">Gobernanza como eje del Ser.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-secondary block">Mecánica</span>
                    <p className="text-[11px] text-primary/60 font-headline italic leading-snug">Gestión de capital e influencia.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-secondary block">Propósito</span>
                    <p className="text-[11px] text-primary/60 font-headline italic leading-snug">Sello de Coherencia Ética.</p>
                  </div>
                </div>
                <button 
                  onClick={() => { playSound('transition'); setView('playing'); }} 
                  className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-primary/95 transition-all flex items-center justify-center gap-4 group shadow-xl"
                >
                  Iniciar Mandato
                  <ChevronRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SIMULACIÓN ACTIVA */}
          {view === 'playing' && (
            <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center h-full max-h-[650px]">
              
              {/* ÁREA DE DECISIÓN IZQUIERDA */}
              <div className="flex flex-col gap-8 items-center h-full justify-center">
                <div className="w-full max-w-xl bg-[#FDFCFB] text-[#111111] p-10 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary" />
                  <div className="mb-8 flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary">CAPÍTULO {turn + 1} DE 6</span>
                    <div className="flex items-center gap-2">
                       <Info size={12} className="text-primary/20" />
                       <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">{CHAPTERS[turn].tag}</h3>
                    </div>
                  </div>
                  <p className="text-2xl lg:text-4xl font-headline italic font-bold leading-[1.1] tracking-tight text-center px-4">
                    "{CHAPTERS[turn].dilema}"
                  </p>
                </div>

                <div className="w-full max-w-xl space-y-3">
                  {CHAPTERS[turn].options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleChoice(opt)}
                      disabled={resources.capital < opt.cost}
                      className="w-full group bg-white/5 hover:bg-[#FDFCFB] border border-white/5 hover:border-white transition-all duration-500 p-5 text-left flex items-center justify-between shadow-lg"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[11px] font-bold text-white/20 group-hover:text-secondary transition-colors">{i+1}</span>
                        <span className="text-base lg:text-lg font-headline italic font-bold text-white group-hover:text-[#111111] leading-snug transition-colors">{opt.text}</span>
                      </div>
                      {opt.cost > 0 && (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-bold text-red-500 group-hover:text-red-700 font-mono whitespace-nowrap">
                            -${(opt.cost/1000).toFixed(0)}K
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* PANEL DE AUDITORÍA DERECHA DE ALTA VISIBILIDAD */}
              <aside className="hidden lg:flex flex-col gap-8 bg-black/40 border border-white/10 p-8 h-full justify-between py-10 shadow-2xl backdrop-blur-md">
                <div className="space-y-8">
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Radar de Gobernanza</span>
                    <RadarSmall metrics={metrics} />
                  </div>
                  
                  <div className="space-y-5">
                    <MetricBar label="Integridad GRC" value={metrics.compliance} color={THEME.colors.secondary} icon={Shield} />
                    <MetricBar label="Confianza Social" value={metrics.trust} color={THEME.colors.emerald} icon={HeartPulse} />
                    <MetricBar label="Capital Humano" value={metrics.talent} color={THEME.colors.blue} icon={Users} />
                    <MetricBar label="Impacto ESG" value={metrics.social} color={THEME.colors.purple} icon={Globe} />
                    <MetricBar label="Resiliencia" value={metrics.resilience} color={THEME.colors.accent} icon={TrendingUp} />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-red-500 font-bold">
                    <ShieldAlert size={16} className="animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Alerta Normativa</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold text-white/90 uppercase tracking-widest leading-tight">{CHAPTERS[turn].normativa.title}</h4>
                    <p className="text-[12px] text-white/40 font-headline italic leading-relaxed">
                      Sanción: {CHAPTERS[turn].normativa.penalty}
                    </p>
                  </div>
                </div>
              </aside>

            </motion.div>
          )}

          {/* FEEDBACK NARRATIVO */}
          {view === 'feedback' && (
             <motion.div key="feed" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
                <div className="bg-[#FDFCFB] text-[#111111] p-12 shadow-2xl text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary" />
                   <div className="w-14 h-14 bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <BookOpen size={24} className="text-secondary" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 block mb-4">Bitácora de Auditoría</span>
                   <p className="text-2xl lg:text-3xl font-headline italic font-bold leading-tight mb-10 text-primary">"{feedback}"</p>
                   <button 
                     onClick={nextTurn} 
                     className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-primary/95 transition-all shadow-lg"
                   >
                     Continuar Mandato
                   </button>
                </div>
             </motion.div>
          )}

          {/* RESULTADO FINAL DEL MANDATO */}
          {view === 'result' && (
             <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-12 max-w-5xl w-full py-10">
                <div className="space-y-3">
                  <span className="uppercase tracking-[0.8em] text-[11px] font-bold text-secondary">Evaluación Institucional Senior</span>
                  <h2 className="text-4xl lg:text-6xl font-headline italic font-bold tracking-tighter">Dictamen de Mandato</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: 'Integridad', val: metrics.compliance, c: THEME.colors.secondary, i: Shield },
                    { label: 'Confianza', val: metrics.trust, c: THEME.colors.emerald, i: HeartPulse },
                    { label: 'Talento', val: metrics.talent, c: THEME.colors.blue, i: Users },
                    { label: 'Impacto ESG', val: metrics.social, c: THEME.colors.purple, i: Globe },
                    { label: 'Resiliencia', val: metrics.resilience, c: THEME.colors.accent, i: TrendingUp }
                  ].map((m, i) => (
                    <div key={i} className="bg-white/5 p-8 border border-white/5 space-y-3 backdrop-blur-sm">
                      <m.i size={16} style={{ color: m.c }} className="mx-auto opacity-60" />
                      <p className="text-[9px] font-bold uppercase text-white/40 tracking-[0.2em]">{m.label}</p>
                      <p className="text-4xl font-bold font-mono tracking-tighter" style={{ color: m.c }}>{Math.round(m.val)}%</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FDFCFB] text-[#111111] p-12 shadow-2xl max-w-2xl mx-auto relative">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary" />
                   <p className="text-xl lg:text-2xl font-headline italic font-bold leading-relaxed text-primary">
                    {globalSustainability > 65 && metrics.compliance > 70
                      ? "MANDATO EXITOSO. Su gestión ha blindado la organización. Ha demostrado que el rigor ético es el mayor activo para la sostenibilidad a largo plazo." 
                      : globalSustainability < 30 
                      ? "COLAPSO INSTITUCIONAL. La falta de coherencia y el agotamiento de recursos han comprometido la viabilidad de la empresa. El mandato ha sido revocado."
                      : "GOBERNANZA BAJO OBSERVACIÓN. Se detectan brechas de coherencia que podrían comprometer la licencia social para operar en el corto plazo."}
                   </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <button onClick={() => { playSound('transition'); window.location.reload(); }} className="flex items-center gap-4 px-10 py-5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white hover:bg-white/5 transition-all bg-transparent group">
                    <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                    Reiniciar Ciclo Estratégico
                  </button>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER TÉCNICO DE PRECISIÓN */}
      <footer className="w-full h-12 px-8 border-t border-white/5 bg-black/60 flex justify-between items-center opacity-40 text-[8px] font-bold uppercase tracking-[0.4em] backdrop-blur-md">
        <div className="flex items-center gap-6">
          <span>© 2026 INTEGRICULT GRC ENGINE</span>
          <span className="text-secondary/60">ESTADO: {view === 'playing' ? 'ACTIVO' : 'STANDBY'}</span>
        </div>
        <div className="flex gap-10">
           <span className="flex items-center gap-2"><Scale size={11} /> COMPLIANCE ISO 37301 READY</span>
           <span className="flex items-center gap-2"><Lock size={11} /> PROTOCOLO DE INTEGRIDAD</span>
           <span className="flex items-center gap-2 text-secondary"><BarChart3 size={11} /> AUDITORÍA EN TIEMPO REAL</span>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className, variant, ...props }: any) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

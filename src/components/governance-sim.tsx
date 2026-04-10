"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Scale, Building2, Leaf, Users, 
  AlertCircle, Compass, RefreshCcw,
  Trophy, Target, Award, Star, Activity,
  HeartPulse, Globe, BookOpen, Landmark,
  ShieldAlert, Download
} from 'lucide-react';

const THEME = {
  radius: '0px',
  colors: {
    bg: '#050505', 
    primary: '#FFFFFF',
    accent: '#B08D57',
    secondary: '#C87A5A',
    emerald: '#10B981',
    blue: '#3B82F6'
  }
};

const LEGAL_FRAMEWORK = {
  governance: {
    title: "ISO 37301 & Buen Gobierno",
    desc: "Sistemas de gestión de cumplimiento y estándares de integridad corporativa.",
    penalty: "Pérdida de licencias y multas del 10% de ingresos."
  },
  esg_reporting: {
    title: "Directiva CSRD (ESG)",
    desc: "Obligatoriedad de reportes de sostenibilidad y debida diligencia ambiental.",
    penalty: "Exclusión de mercados de capitales y sanciones regulatorias."
  },
  ai_ethics: {
    title: "Ley de IA de la UE",
    desc: "Marco de seguridad y transparencia para algoritmos de alto riesgo.",
    penalty: "Multas de hasta 35M€ o el 7% de la facturación global."
  },
  compliance_penal: {
    title: "Responsabilidad Penal Corporativa",
    desc: "Prevención de delitos financieros y SAGRILAFT.",
    penalty: "Disolución de la personería jurídica o intervención judicial."
  }
};

const CHAPTERS = [
  {
    id: 1,
    title: 'El Ser: Cultura de Integridad',
    dilema: 'Has detectado que el 40% de los mandos medios ignora el canal de denuncias por miedo a represalias. ¿Cómo intervienes?',
    normativa: LEGAL_FRAMEWORK.governance,
    options: [
      { 
        text: 'Externalizar el canal con anonimato total', 
        cost: 80000, influence: 2,
        effects: { compliance: 25, trust: 30, governance: 15, social: 10, profitability: -5 },
        feedback: 'Aumenta la confianza radicalmente, aunque requiere inversión tecnológica.'
      },
      { 
        text: 'Campaña interna de "Valores de Marca"', 
        cost: 30000, influence: 1,
        effects: { trust: 10, social: 5, governance: 5, compliance: 5 },
        feedback: 'Es un cambio cosmético; no resuelve el problema estructural de seguridad.'
      },
      { 
        text: 'Sanciones públicas a comportamientos tóxicos', 
        cost: 0, influence: 3,
        effects: { compliance: 20, governance: 25, trust: -15, talent: -10, social: 5 },
        feedback: 'Envía un mensaje fuerte de "Tolerancia Cero", pero genera un clima de miedo.'
      }
    ]
  },
  {
    id: 2,
    title: 'La Conexión: Sostenibilidad ESG',
    dilema: 'Un proveedor estratégico en Asia ha sido señalado por vertidos tóxicos. Cambiarlo detendrá la producción 3 semanas. ¿Qué haces?',
    normativa: LEGAL_FRAMEWORK.esg_reporting,
    options: [
      { 
        text: 'Terminar contrato inmediatamente', 
        cost: 450000, influence: 4,
        effects: { environmental: 40, compliance: 30, profitability: -40, trust: 20, social: 10 },
        feedback: 'Integridad total. El mercado castiga el corto plazo pero premia tu resiliencia ESG.'
      },
      { 
        text: 'Plan de transición de 12 meses', 
        cost: 120000, influence: 1,
        effects: { environmental: 10, compliance: 10, profitability: -10, governance: 15 },
        feedback: 'Una solución pragmática que minimiza el daño financiero pero arriesga tu reputación.'
      },
      { 
        text: 'Auditoría privada "amigable"', 
        cost: 50000, influence: -2,
        effects: { profitability: 10, environmental: -20, compliance: -25, trust: -30, governance: -20 },
        feedback: 'El "Greenwashing" detectado destruye el valor de marca a largo plazo.'
      }
    ]
  },
  {
    id: 3,
    title: 'Algoritmos & Sesgos: IA Ética',
    dilema: 'Tu IA de reclutamiento prefiere hombres para cargos técnicos por datos históricos sesgados. El equipo de TI dice que es "más eficiente".',
    normativa: LEGAL_FRAMEWORK.ai_ethics,
    options: [
      { 
        text: 'Reentrenar modelo con datos sintéticos equitativos', 
        cost: 180000, influence: 3,
        effects: { social: 30, compliance: 25, talent: 20, governance: 15, profitability: -15 },
        feedback: 'Lideras en IA Responsable, asegurando talento diverso para el futuro.'
      },
      { 
        text: 'Ajuste manual de cuotas de género', 
        cost: 20000, influence: 1,
        effects: { social: 15, trust: 5, governance: -5, compliance: 10 },
        feedback: 'Solucionas el síntoma, no la enfermedad algorítmica. Riesgo legal latente.'
      },
      { 
        text: 'Mantener: Priorizar eficiencia técnica', 
        cost: 0, influence: 0,
        effects: { profitability: 15, social: -40, compliance: -35, trust: -25, governance: -20 },
        feedback: 'Incurres en discriminación sistémica. La Ley de IA te sancionará severamente.'
      }
    ]
  },
  {
    id: 4,
    title: 'El Deber Ser: Cumplimiento Penal',
    dilema: 'Un agente comercial en un mercado emergente solicita un "pago de facilitación" para cerrar un contrato vital. Es una práctica común allí.',
    normativa: LEGAL_FRAMEWORK.compliance_penal,
    options: [
      { 
        text: 'Rechazar y denunciar a autoridades locales', 
        cost: 500000, influence: 5,
        effects: { compliance: 45, governance: 35, profitability: -50, trust: 40, social: 15 },
        feedback: 'Blindas a la empresa penalmente. Eres un referente de ética internacional.'
      },
      { 
        text: 'Disfrazar el pago como "gastos de consultoría"', 
        cost: 50000, influence: -5,
        effects: { profitability: 25, compliance: -60, governance: -40, trust: -50, social: -10 },
        feedback: 'Cohecho. Esto activa la responsabilidad penal corporativa y cárcel para directivos.'
      },
      { 
        text: 'Retirarse del mercado estratégicamente', 
        cost: 200000, influence: 2,
        effects: { compliance: 20, governance: 25, profitability: -30, trust: 15 },
        feedback: 'Protección de activos. Sacrificas ingresos por paz jurídica y coherencia de marca.'
      }
    ]
  },
  {
    id: 5,
    title: 'Transparencia & Datos',
    dilema: 'Una brecha de seguridad ha filtrado correos de clientes. El equipo legal dice que informar no es obligatorio por un tecnicismo legal.',
    normativa: LEGAL_FRAMEWORK.ai_ethics,
    options: [
      { 
        text: 'Comunicación proactiva y compensación', 
        cost: 300000, influence: 4,
        effects: { trust: 50, compliance: 20, social: 20, profitability: -35, governance: 20 },
        feedback: 'La honestidad radical genera una lealtad que el marketing no puede comprar.'
      },
      { 
        text: 'Informar solo a los afectados directos', 
        cost: 100000, influence: 1,
        effects: { trust: 10, compliance: 15, profitability: -10, governance: 5 },
        feedback: 'Cumples el mínimo legal. No construyes reputación, solo evitas multas.'
      },
      { 
        text: 'Silencio: Gestionar internamente', 
        cost: 0, influence: -3,
        effects: { profitability: 20, trust: -50, compliance: -30, governance: -25, social: -15 },
        feedback: 'Si se filtra por terceros, el daño reputacional será irreversible y terminal.'
      }
    ]
  },
  {
    id: 6,
    title: 'La Gobernanza: El Legado',
    dilema: 'Debes elegir tu sucesor. Un candidato garantiza beneficios récord; el otro garantiza una transformación cultural profunda.',
    normativa: LEGAL_FRAMEWORK.governance,
    options: [
      { 
        text: 'El Líder Cultural (Propósito)', 
        cost: 0, influence: 5,
        effects: { trust: 40, social: 30, environmental: 20, governance: 30, profitability: 5 },
        feedback: 'Aseguras que IntegriCult sobreviva a su fundador. El legado es la coherencia.'
      },
      { 
        text: 'El Líder Financiero (Resultados)', 
        cost: 0, influence: 2,
        effects: { profitability: 50, trust: -20, compliance: 5, governance: 10, talent: -15 },
        feedback: 'Éxito inmediato, pero el alma de la organización se diluye en los números.'
      },
      { 
        text: 'Modelo de Co-liderazgo', 
        cost: 100000, influence: 3,
        effects: { governance: 40, profitability: 20, trust: 20, compliance: 15, social: 15 },
        feedback: 'Un equilibrio complejo pero robusto para la complejidad del mundo actual.'
      }
    ]
  }
];

const MetricBar = ({ label, value, color, icon: Icon }: any) => (
  <div className="w-full space-y-1">
    <div className="flex justify-between items-center text-[8px] font-black uppercase text-white/60 tracking-widest">
      <div className="flex items-center gap-1">
        {Icon && <Icon size={9} />}
        <span>{label}</span>
      </div>
      <span>{Math.round(value)}%</span>
    </div>
    <div className="h-1 bg-white/10 rounded-none overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }} 
        className="h-full" 
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const RadarExtended = ({ metrics, size = 160 }: any) => {
  const keys = ['compliance', 'governance', 'environmental', 'social', 'profitability', 'trust'];
  const labels = ['CUM', 'GOB', 'AMB', 'SOC', 'REN', 'CON'];
  const center = size / 2;
  const radius = size * 0.35;
  const angles = keys.map((_, i) => (i * 60 - 90) * Math.PI / 180);

  const points = keys.map((key, i) => {
    const val = ((metrics[key as keyof typeof metrics] || 0) / 100) * radius;
    return `${center + val * Math.cos(angles[i])},${center + val * Math.sin(angles[i])}`;
  }).join(' ');

  return (
    <div className="relative group flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGrad">
            <stop offset="0%" stopColor={THEME.colors.secondary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={THEME.colors.secondary} stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {[0.2, 0.4, 0.6, 0.8, 1].map(v => (
          <polygon 
            key={v}
            points={angles.map(a => `${center + radius * v * Math.cos(a)},${center + radius * v * Math.sin(a)}`).join(' ')}
            fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20"
          />
        ))}
        {angles.map((a, i) => (
          <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(a)} y2={center + radius * Math.sin(a)} stroke="white" strokeWidth="0.5" className="opacity-10" />
        ))}
        <motion.polygon animate={{ points }} fill="url(#radarGrad)" stroke={THEME.colors.secondary} strokeWidth="2" strokeLinejoin="round" />
        {labels.map((l, i) => (
          <text key={l} x={center + (radius + 15) * Math.cos(angles[i])} y={center + (radius + 15) * Math.sin(angles[i])} textAnchor="middle" fontSize="8" fontWeight="900" fill="white" className="opacity-80 uppercase tracking-tighter">{l}</text>
        ))}
      </svg>
    </div>
  );
};

export function GovernanceSim() {
  const [view, setView] = useState('intro');
  const [turn, setTurn] = useState(0);
  const [metrics, setMetrics] = useState({ 
    compliance: 50, governance: 50, environmental: 40, 
    social: 50, profitability: 60, trust: 45, talent: 55 
  });
  const [resources, setResources] = useState({ capital: 1500000, influence: 10 });
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('integricult_sim_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTurn(parsed.turn || 0);
        setMetrics(parsed.metrics);
        setResources(parsed.resources);
        setView(parsed.view || 'intro');
      } catch (e) {
        console.error("Error loading saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    if (view !== 'intro') {
      localStorage.setItem('integricult_sim_state', JSON.stringify({
        turn, metrics, resources, view
      }));
    }
  }, [turn, metrics, resources, view]);

  const handleChoice = (opt: any) => {
    if (resources.capital < opt.cost) return;
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

  const resetGame = () => {
    localStorage.removeItem('integricult_sim_state');
    window.location.reload();
  };

  const nextTurn = () => {
    if (turn + 1 < CHAPTERS.length) {
      setTurn(turn + 1);
      setView('playing');
    } else {
      setView('result');
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] text-white font-body flex flex-col items-center overflow-hidden border-none shadow-none">
      
      <header className="w-full p-3 lg:px-6 flex justify-between items-center border-b border-white/10 bg-black/40 backdrop-blur-2xl z-40 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-none text-white flex items-center justify-center shadow-[0_0_15px_rgba(200,122,90,0.4)]"><Shield size={16} /></div>
          <div>
            <span className="block font-headline italic font-bold text-base tracking-tight leading-none text-white">IntegriCult GRC</span>
            <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.3em]">Software de Gestión de Mandato</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Activos Capital</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 text-emerald-400 rounded-none border border-emerald-400/20">
              <span className="text-xs font-code font-bold">{(resources.capital/1000).toFixed(0)}k</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Puntos Influencia</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 text-amber-400 rounded-none border border-amber-400/20">
              <span className="text-xs font-code font-bold">{resources.influence}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full p-4 lg:p-6 overflow-y-auto flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          
          {view === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full flex flex-col justify-center items-center text-center space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white/5 rounded-none shadow-2xl flex items-center justify-center border border-secondary/30">
                <Shield size={32} className="text-secondary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-5xl font-headline italic font-bold tracking-tighter leading-none text-white">Actividad <br /> <span className="text-secondary">Estratégica GRC</span></h1>
                <p className="text-base lg:text-lg text-white/60 font-headline italic max-w-xl mx-auto leading-tight">
                  "El mayor riesgo no es la sanción, sino la pérdida de coherencia. Dirige la corporación bajo los estándares más exigentes."
                </p>
              </div>
              <button 
                onClick={() => setView('playing')} 
                className="px-10 py-4 bg-secondary text-white rounded-none text-xs font-bold uppercase tracking-[0.4em] transition-all hover:bg-secondary/80 shadow-[0_0_30px_rgba(200,122,90,0.3)]"
              >
                Iniciar Mandato
              </button>
            </motion.div>
          )}

          {view === 'playing' && (
            <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl items-start h-full">
              
              <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-secondary text-white text-[9px] font-bold uppercase tracking-[0.3em] rounded-none">Escenario {turn + 1} / {CHAPTERS.length}</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-4xl font-headline italic font-bold leading-tight tracking-tighter text-white">{CHAPTERS[turn].title}</h2>
                  <div className="bg-white/5 p-6 lg:p-8 rounded-none border border-white/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
                    <p className="text-lg lg:text-xl font-headline italic text-white/80 leading-snug">
                       "{CHAPTERS[turn].dilema}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {CHAPTERS[turn].options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleChoice(opt)}
                      disabled={resources.capital < opt.cost}
                      className={`group relative p-4 lg:p-5 rounded-none border text-left transition-all flex flex-col gap-2
                        ${resources.capital < opt.cost ? 'opacity-40 cursor-not-allowed bg-white/5' : 'bg-white/5 border-white/10 hover:border-secondary hover:bg-white/10'}
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-none bg-white/10 flex items-center justify-center text-[9px] font-bold text-white group-hover:bg-secondary transition-colors">{i+1}</span>
                          <span className="text-base lg:text-lg font-headline italic font-bold tracking-tight text-white/90">{opt.text}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           {opt.cost > 0 && <span className="text-[10px] font-bold text-red-400 font-code tracking-tighter">-${(opt.cost/1000).toFixed(0)}k</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 bg-black/40 text-white p-6 rounded-none shadow-2xl flex flex-col items-center gap-5 sticky top-0 h-full overflow-y-auto border border-white/10">
                <div className="w-full flex justify-between items-center opacity-40">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Panel de Auditoría</span>
                  <Activity size={14} />
                </div>

                <RadarExtended metrics={metrics} />

                <div className="w-full grid grid-cols-1 gap-2 border-t border-white/10 pt-4">
                   <MetricBar label="Integridad GRC" value={metrics.compliance} color={THEME.colors.secondary} icon={Shield} />
                   <MetricBar label="Confianza Social" value={metrics.trust} color={THEME.colors.emerald} icon={HeartPulse} />
                   <MetricBar label="Capital Humano" value={metrics.talent} color={THEME.colors.blue} icon={Users} />
                   <MetricBar label="Impacto ESG" value={metrics.social} color="#A78BFA" icon={Globe} />
                </div>

                <div className="w-full p-4 bg-white/5 rounded-none border border-white/10 space-y-3">
                   <div className="flex items-center gap-2 text-secondary">
                      <Landmark size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Marco Normativo</span>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-tight leading-none text-white">{CHAPTERS[turn].normativa.title}</p>
                      <p className="text-[9px] italic opacity-50 leading-relaxed font-headline text-white/70">"{CHAPTERS[turn].normativa.desc}"</p>
                   </div>
                   <div className="pt-1.5 border-t border-white/5 flex gap-2 items-center">
                      <ShieldAlert size={10} className="text-red-400" />
                      <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Sanción: {CHAPTERS[turn].normativa.penalty}</span>
                   </div>
                </div>
              </aside>

            </motion.div>
          )}

          {view === 'feedback' && (
             <motion.div key="feed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col justify-center items-center max-w-xl mx-auto text-center space-y-6">
                <div className="w-full p-10 bg-[#111111] rounded-none border border-white/5 shadow-2xl space-y-8 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
                   <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-none flex items-center justify-center mx-auto border border-secondary/20">
                    <BookOpen size={20}/>
                   </div>
                   <div className="space-y-5">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Dictamen de Acción</h3>
                      <p className="text-xl lg:text-3xl font-headline italic text-white leading-tight px-4">"{feedback}"</p>
                   </div>
                   <button 
                     onClick={nextTurn} 
                     className="w-full py-5 bg-secondary text-white rounded-none text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-secondary/90 transition-all active:scale-[0.98]"
                   >
                     Siguiente Escenario
                   </button>
                </div>
             </motion.div>
          )}

          {view === 'result' && (
             <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-start text-center space-y-8 max-w-5xl mx-auto py-4 overflow-y-auto">
                <div className="space-y-2">
                  <div className="inline-block p-3 bg-secondary/10 rounded-none mb-1 border border-secondary/30 shadow-xl"><Trophy size={40} className="text-secondary" /></div>
                  <h2 className="text-3xl lg:text-5xl font-headline italic font-bold tracking-tighter leading-none text-white">Dictamen <br /> <span className="text-secondary">Corporativo Final</span></h2>
                  <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/30">Análisis de Desempeño y Coherencia</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {[
                    { label: 'Integridad', val: metrics.compliance, c: THEME.colors.secondary, icon: Shield },
                    { label: 'Confianza', val: metrics.trust, c: THEME.colors.emerald, icon: HeartPulse },
                    { label: 'Talento', val: metrics.talent, c: THEME.colors.blue, icon: Users },
                    { label: 'Social', val: metrics.social, c: '#A78BFA', icon: Globe }
                  ].map((m, i) => (
                    <div key={i} className="bg-white/5 p-4 lg:p-6 rounded-none border border-white/10 shadow-sm space-y-1">
                      <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest">{m.label}</p>
                      <p className="text-2xl lg:text-3xl font-bold font-code tabular-nums" style={{ color: m.c }}>{Math.round(m.val)}%</p>
                    </div>
                  ))}
                </div>

                <div className="w-full p-8 bg-white/5 text-white rounded-none relative overflow-hidden shadow-2xl border border-white/10">
                   <div className="relative z-10 space-y-4">
                      <p className="text-xl lg:text-3xl font-headline italic max-w-2xl mx-auto leading-tight text-white/90">
                        {metrics.compliance > 80 
                          ? "Tu mandato ha blindado a la organización. Has convertido la ética en una ventaja competitiva de alto nivel." 
                          : metrics.compliance > 60 
                          ? "Has mantenido la operación, pero existen brechas estructurales que amenazan la integridad de marca."
                          : "Gobernanza en riesgo crítico. La erosión de la cultura ética compromete el futuro corporativo."}
                      </p>
                      <div className="flex justify-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < (metrics.compliance / 20) ? THEME.colors.secondary : "none"} stroke={THEME.colors.secondary} />
                        ))}
                      </div>
                   </div>
                </div>

                <div className="flex justify-center">
                  <button onClick={resetGame} className="group flex items-center gap-3 px-12 py-4 border-2 border-secondary rounded-none text-[10px] font-bold uppercase tracking-[0.4em] text-secondary hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95">
                    <RefreshCcw size={14} />
                    Reiniciar Mandato
                  </button>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer className="w-full p-2 border-t border-white/10 flex justify-between items-center gap-4 opacity-30 bg-black/50 flex-shrink-0 text-[8px] font-bold uppercase tracking-widest px-6">
        <span>IntegriCult GRC Activity Engine v3.5</span>
        <div className="flex gap-4">
           <Scale size={12} />
           <Shield size={12} />
        </div>
      </footer>
    </div>
  );
}

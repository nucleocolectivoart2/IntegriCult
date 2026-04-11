"use client";

import { GovernanceSim } from "@/components/governance-sim";

/**
 * @fileOverview Página inmersiva para el Simulador de Gobernanza IntegriCult GRC.
 * Proporciona un entorno de pantalla completa (Full Viewport) para la toma de decisiones estratégicas.
 * Optimizado para resoluciones 1920x1080 y responsividad móvil.
 */

export default function SimuladorPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#050505]">
      <GovernanceSim />
    </main>
  );
}

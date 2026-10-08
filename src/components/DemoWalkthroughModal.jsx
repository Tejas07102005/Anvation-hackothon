import React, { useState } from 'react';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  MapPin,
  Bot,
  Truck,
  TrendingUp,
  Recycle,
  Sliders,
  RotateCcw
} from 'lucide-react';

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Command Center Baseline',
    desc: "Open EcoCity overview. Telemetry shows Today's waste: 42.8 tons, High-risk zones: 3, Active Fleet: 28 vehicles.",
    targetScreen: 'command_center',
    badge: 'Step 1 / 10',
    actionLabel: 'View Command Center'
  },
  {
    step: 2,
    title: 'City Waste GIS Map',
    desc: 'Display real-time sector GIS map. Markers show 🔴 Market D (92%), 🔴 Industrial A (87%), 🟠 Commercial C (84%), 🟢 Residential B (68%).',
    targetScreen: 'command_center',
    badge: 'Step 2 / 10',
    actionLabel: 'Inspect GIS Map'
  },
  {
    step: 3,
    title: 'Inspect Market Zone D',
    desc: 'Select Market Zone D. Telemetry confirms: Current fill: 92%, Predicted capacity: 100%, Time to overflow: 90 minutes.',
    targetScreen: 'waste_zones',
    openZone: 'zone-d',
    badge: 'Step 3 / 10',
    actionLabel: 'Inspect Market Zone'
  },
  {
    step: 4,
    title: 'Ask EcoAgent Operational Query',
    desc: 'Judge prompt: "Why is Market Zone high risk?". EcoAgent reveals: 92% fill, waste generation is 28% above weekly average, 100% capacity in 90 mins.',
    targetScreen: 'command_center',
    openAgent: true,
    agentQuery: 'Why is Market Zone high risk?',
    badge: 'Step 4 / 10',
    actionLabel: 'Ask EcoAgent'
  },
  {
    step: 5,
    title: 'Optimize Fleet Collection',
    desc: 'Trigger autonomous priority allocation: V12 (5000 kg) assigned to Market D, V17 (4000 kg) assigned to Industrial A.',
    targetScreen: 'route_optimization',
    badge: 'Step 5 / 10',
    actionLabel: 'Run Fleet Optimization'
  },
  {
    step: 6,
    title: 'Route Distance & Fuel Savings',
    desc: 'Before: 42.6 km legacy circular route. After: 31.2 km EcoCity optimized route. Saved: 11.4 km (26.8% reduction), 2.3 L fuel, 6.2 kg CO₂.',
    targetScreen: 'route_optimization',
    badge: 'Step 6 / 10',
    actionLabel: 'View Route Savings'
  },
  {
    step: 7,
    title: 'Landfill Saturation Forecaster',
    desc: 'Landfill Cell-04: Current capacity: 78%, Incoming: 42 T/day, Processing: 35 T/day (+7 T/day net accumulation). 7-day forecast: 96% critical.',
    targetScreen: 'landfill',
    badge: 'Step 7 / 10',
    actionLabel: 'View Landfill Saturation'
  },
  {
    step: 8,
    title: 'Door-to-Door Collection Reliability',
    desc: 'Timetable GPS tracking reveals reliability: On-Time: 86%, Delayed: 9%, Missed: 5% (Indiranagar unserviced).',
    targetScreen: 'collection',
    badge: 'Step 8 / 10',
    actionLabel: 'View Timetable Reliability'
  },
  {
    step: 9,
    title: 'Source Segregation Audit',
    desc: 'Citywide score: 62/100. Market Zone D contamination: Mixed waste = 41% 🔴 Poor. EcoAgent diagnosis: "Mixed waste increased from 32% to 41% during last 4 weeks."',
    targetScreen: 'segregation',
    badge: 'Step 9 / 10',
    actionLabel: 'View Segregation Audit'
  },
  {
    step: 10,
    title: 'What-If Fleet Stress Simulator',
    desc: 'Simulate Demand +30% surge: Vehicles required jumps from 4 → 5 trucks. Critical overflow sectors jump from 3 → 6 zones.',
    targetScreen: 'route_optimization',
    whatIfDemand: 30,
    badge: 'Step 10 / 10',
    actionLabel: 'Run +30% Demand Simulator'
  }
];

export const DemoWalkthroughModal = ({
  isOpen,
  onClose,
  currentStepIndex,
  onSetStepIndex,
  onNavigateScreen,
  onSelectZone,
  onOpenEcoAgentWithQuery
}) => {
  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleExecuteCurrentStep = () => {
    if (currentStep.targetScreen) {
      onNavigateScreen(currentStep.targetScreen);
    }
    if (currentStep.openZone && onSelectZone) {
      onSelectZone(currentStep.openZone);
    }
    if (currentStep.openAgent && onOpenEcoAgentWithQuery) {
      onOpenEcoAgentWithQuery(currentStep.agentQuery);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      onSetStepIndex(nextIdx);
      const next = DEMO_STEPS[nextIdx];
      if (next.targetScreen) onNavigateScreen(next.targetScreen);
      if (next.openZone && onSelectZone) onSelectZone(next.openZone);
      if (next.openAgent && onOpenEcoAgentWithQuery) onOpenEcoAgentWithQuery(next.agentQuery);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      onSetStepIndex(prevIdx);
      const prev = DEMO_STEPS[prevIdx];
      if (prev.targetScreen) onNavigateScreen(prev.targetScreen);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 animate-fadeIn">
      <div className="bg-[#0b1222]/95 border border-emerald-500/40 rounded-3xl p-5 shadow-2xl backdrop-blur-xl text-slate-100 flex flex-col gap-4">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-heading text-white">
                  10-Step Judge Presentation Scenario
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {currentStep.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Source Hackathon Operational Demonstration Storyline</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetStepIndex(0)}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-emerald-300 font-heading flex items-center gap-2">
              <span>{currentStep.step}.</span>
              <span>{currentStep.title}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              {currentStep.desc}
            </p>
          </div>

          <button
            onClick={handleExecuteCurrentStep}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{currentStep.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Step Pills & Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-[65%]">
            {DEMO_STEPS.map((s, idx) => {
              const isActive = currentStepIndex === idx;
              const isPast = currentStepIndex > idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSetStepIndex(idx);
                    const sel = DEMO_STEPS[idx];
                    if (sel.targetScreen) onNavigateScreen(sel.targetScreen);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/50 scale-105' 
                      : isPast
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                  title={s.title}
                >
                  {s.step}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`p-2 rounded-xl text-xs flex items-center gap-1 font-mono transition-all ${
                currentStepIndex === 0
                  ? 'text-slate-600 bg-slate-900/40 cursor-not-allowed'
                  : 'text-slate-300 bg-slate-800 hover:bg-slate-700 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className={`p-2 px-3 rounded-xl text-xs flex items-center gap-1 font-mono font-bold transition-all ${
                currentStepIndex === DEMO_STEPS.length - 1
                  ? 'text-slate-600 bg-slate-900/40 cursor-not-allowed'
                  : 'text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/30 cursor-pointer'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

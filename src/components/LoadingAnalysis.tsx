import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, CheckCircle2, Clock, Eye, Mic, Volume2 } from 'lucide-react';
import { UI_STRINGS } from '../translations';
import { SupportedLanguage } from '../types';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface LoadingAnalysisProps {
  currentLang: SupportedLanguage;
  imagePreview?: string | null;
  voiceTranscript?: string | null;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  currentLang,
  imagePreview,
  voiceTranscript,
}) => {
  const t = UI_STRINGS[currentLang];
  const [progress, setProgress] = useState<number>(10);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const agentSteps = [
    'Product received',
    'Product identified',
    'Material detected',
    'Listing created',
    'Price recommendation generated',
    'Instagram post prepared',
    'Waiting for artisan approval',
  ];

  // Progress simulation across agent workflow
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const increment = Math.random() * 5 + 3;
        const next = Math.min(prev + increment, 95);
        const stepIndex = Math.min(
          Math.floor((next / 95) * agentSteps.length),
          agentSteps.length - 1
        );
        setCurrentStepIndex(stepIndex);
        return next;
      });
    }, 700);

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-5 space-y-5 animate-fade-in pb-24">
      {/* Top Banner with Official Logo */}
      <div className="text-center space-y-2 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full p-1 bg-white border border-[#E8E2D6] shadow-sm mb-1">
          <img
            src={officialLogoImg}
            alt="KarigarX Official Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-full bg-[#FAF7F2]"
          />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 border border-amber-400/40 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" />
          <span>{voiceTranscript ? 'KarigarX AI Voice Analysis' : 'KarigarX AI Vision'}</span>
        </div>
        <h2 className="text-xl font-extrabold text-stone-900 tracking-tight leading-snug">
          {t.analyzingTitle}
        </h2>
        <p className="text-xs text-stone-500 flex items-center justify-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{secondsElapsed}s elapsed • {t.timeRemainingEstimate}</span>
        </p>
      </div>

      {/* Captured Image or Voice Visualizer */}
      {imagePreview ? (
        <div className="relative aspect-square max-w-[270px] mx-auto rounded-3xl overflow-hidden border-2 border-amber-500 shadow-xl bg-stone-950">
          <img
            src={imagePreview}
            alt="Artisan craft being analyzed"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90"
          />

          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-[0_0_16px_#f59e0b] animate-bounce-y z-10" />

          {/* Grid Overlay Matrix */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

          {/* Floating Tag Detection Badges */}
          <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/40 flex items-center gap-1">
            <Eye className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>Analyzing Craft</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-stone-950/85 backdrop-blur text-amber-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-amber-400/30">
            {Math.round(progress)}% Processed
          </div>
        </div>
      ) : (
        <div className="relative aspect-square max-w-[270px] mx-auto rounded-3xl overflow-hidden border-2 border-amber-500 shadow-xl bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 animate-pulse shadow-lg">
            <Mic className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <p className="text-amber-300 font-bold text-xs uppercase tracking-wider">
              Processing Spoken Description
            </p>
            <p className="text-stone-300 text-[11px] line-clamp-3 italic px-2">
              "{voiceTranscript}"
            </p>
          </div>

          {/* Audio Wave Visualizer Simulation */}
          <div className="flex items-center justify-center gap-1 h-6">
            {[30, 70, 90, 40, 80, 100, 60, 85, 45, 75].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Agent Activity Live Box */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
            <span className="text-base">🤖</span>
            <span className="font-serif tracking-wide font-extrabold text-stone-900">KarigarX Agent</span>
          </div>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            Agentic Processing
          </span>
        </div>

        <div className="space-y-2">
          {agentSteps.map((stepText, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;
            const isWaitingStep = stepText.toLowerCase().includes('waiting');

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'text-stone-800 font-medium'
                    : isCurrent
                    ? 'text-amber-950 font-bold bg-amber-50/80 p-1.5 rounded-xl border border-amber-200/60'
                    : 'text-stone-400 opacity-50'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  isWaitingStep ? (
                    <span className="text-sm shrink-0">⏳</span>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin shrink-0" />
                  )
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-stone-200 shrink-0" />
                )}
                <span>
                  {isCompleted ? `✓ ${stepText}` : isCurrent && isWaitingStep ? `⏳ ${stepText}` : stepText}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-center text-stone-500 italic max-w-xs mx-auto">
        Empowering rural Indian artisans with instant fair-trade market intelligence.
      </p>
    </div>
  );
};

import React from 'react';

interface KarigarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightText?: boolean;
}

export const KarigarLogo: React.FC<KarigarLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  lightText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Crafted KarigarX Emblem: Golden terracotta artisan loom + chisel 'K' */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 p-0.5 shadow-md shadow-amber-950/20 flex items-center justify-center overflow-hidden shrink-0`}
      >
        <div className="w-full h-full bg-stone-950/40 backdrop-blur-xs rounded-[14px] flex items-center justify-center relative">
          {/* Stylized Craft K & Weave Cross */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5/6 h-5/6 text-amber-300 drop-shadow-sm"
          >
            {/* Left Chisel Pillar */}
            <path d="M6 4v16" stroke="url(#amber-grad)" strokeWidth="3" />
            {/* Top Artisan Weave Diagonal */}
            <path d="M18 4l-10 8" stroke="url(#amber-grad)" strokeWidth="2.7" />
            {/* Bottom Flare Branch */}
            <path d="M8 12l10 8" stroke="url(#amber-grad)" strokeWidth="2.7" />
            {/* Central Sparkle Diamond */}
            <circle cx="18" cy="12" r="1.5" fill="#fef08a" />
            <defs>
              <linearGradient id="amber-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`font-black tracking-tight ${textSizes[size]} ${lightText ? 'text-white' : 'text-stone-900'} leading-none flex items-center`}>
            <span>Karigar</span>
            <span className="text-amber-500 font-extrabold ml-0.5">X</span>
          </div>
          <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase leading-none mt-0.5">
            Artisan AI
          </span>
        </div>
      )}
    </div>
  );
};

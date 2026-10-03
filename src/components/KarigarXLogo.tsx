import React from 'react';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface KarigarXLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showSlogan?: boolean;
  className?: string;
  withText?: boolean;
  variant?: 'emblem-only' | 'badge' | 'full';
}

export const KarigarXLogo: React.FC<KarigarXLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
  withText = false,
  variant = 'full',
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
    hero: 'w-40 sm:w-48 h-40 sm:h-48',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        <img
          src={officialLogoImg}
          alt="KarigarX Official Logo - Handcrafted Artisan Heritage"
          referrerPolicy="no-referrer"
          className={`${sizeClasses[size]} object-contain drop-shadow-sm rounded-full bg-[#FAF7F2] transition-transform duration-200 hover:scale-105`}
        />
      </div>

      {withText && (
        <div className="flex flex-col items-center mt-1.5 text-center">
          <span className="font-serif font-bold text-[#2B231D] tracking-tight leading-none text-base">
            Karigar<span className="text-[#b84c28]">X</span>
          </span>
        </div>
      )}

      {showSlogan && (
        <p className="text-xs sm:text-sm font-medium text-[#7A6E63] italic tracking-wide mt-2 text-center">
          &ldquo;Your Craft. Your Story. Your Market.&rdquo;
        </p>
      )}
    </div>
  );
};

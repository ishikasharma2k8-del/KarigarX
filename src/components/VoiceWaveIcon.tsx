import React from 'react';

interface VoiceWaveIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isRecording?: boolean;
}

export const VoiceWaveIcon: React.FC<VoiceWaveIconProps> = ({
  className = '',
  size = 'md',
  isRecording = false,
}) => {
  const heights = isRecording ? [40, 90, 60, 100, 50] : [35, 75, 100, 75, 35];

  const barWidth = size === 'sm' ? 'w-0.5' : size === 'lg' ? 'w-1' : 'w-0.5';
  const containerHeight = size === 'sm' ? 'h-3.5' : size === 'lg' ? 'h-5' : 'h-4';
  const gap = size === 'sm' ? 'gap-0.5' : 'gap-0.5 sm:gap-1';

  return (
    <span
      className={`inline-flex items-center justify-center ${containerHeight} ${gap} ${className}`}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`${barWidth} rounded-full bg-current transition-all duration-150 ${
            isRecording ? 'animate-pulse' : ''
          }`}
          style={{
            height: `${h}%`,
            animationDelay: isRecording ? `${i * 100}ms` : undefined,
          }}
        />
      ))}
    </span>
  );
};

import React from 'react';

interface IronManLogoProps {
  className?: string;
  size?: number;
  glowColor?: string;
}

export const IronManLogo: React.FC<IronManLogoProps> = ({
  className = '',
  size = 32,
  glowColor = '#00f2ff',
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size * 1.12}
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_0_10px_rgba(0,242,255,0.6)]"
      >
        <defs>
          <filter id="ironEyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="helmetWhiteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="ironEyeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e0f2fe" />
            <stop offset="85%" stopColor={glowColor} />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>

        {/* Outer White Helmet Silhouette Stencil */}
        <g filter="url(#helmetWhiteGlow)">
          {/* Main Helmet Faceplate & Temple Stencil */}
          <path
            d="M 110,25 C 160,25 190,125 250,138 C 310,125 340,25 390,25 L 380,225 C 392,235 395,248 395,260 C 390,350 320,410 305,430 L 305,435 C 320,442 335,455 335,455 L 305,480 L 250,465 L 195,480 L 165,455 C 165,455 180,442 195,435 L 195,430 C 180,410 110,350 105,260 C 105,248 108,235 120,225 Z"
            fill="#FFFFFF"
          />

          {/* Chin Jaw Accent Plate */}
          <path
            d="M 155,475 C 180,462 220,458 250,458 C 280,458 320,462 345,475 L 335,510 L 250,545 L 165,510 Z"
            fill="#FFFFFF"
          />

          {/* Lower Mouth Vent Lines */}
          <path
            d="M 185,412 C 220,405 280,405 315,412 L 308,426 C 280,420 220,420 192,426 Z"
            fill="#090d12"
          />
        </g>

        {/* Glowing Eyes Slits */}
        <g filter="url(#ironEyeGlow)">
          <path
            d="M 122,235 L 236,252 L 236,232 L 138,212 Z"
            fill="url(#ironEyeGradient)"
          />
          <path
            d="M 378,235 L 264,252 L 264,232 L 362,212 Z"
            fill="url(#ironEyeGradient)"
          />
        </g>
      </svg>
    </div>
  );
};

export default IronManLogo;


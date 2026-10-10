import React from 'react';

interface BKLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const BKLogo: React.FC<BKLogoProps> = ({
  size = 40,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`shrink-0 rounded-xl transition-all duration-300 shadow-sm ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="bkNavBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#063722" />
          <stop offset="100%" stopColor="#02160d" />
        </linearGradient>
        <linearGradient id="bkNavStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="bkNavBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Container Squircle with subtle border */}
      <rect width="64" height="64" rx="16" fill="url(#bkNavBgGrad)" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="15.25"
        fill="none"
        stroke="url(#bkNavBorderGrad)"
        strokeWidth="1.5"
      />

      {/* Ambient Radial Glow */}
      <circle cx="22" cy="18" r="16" fill="#10b981" opacity="0.18" />

      {/* Monogram Glyph: B */}
      <path
        d="M 16 17 V 47"
        stroke="url(#bkNavStrokeGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M 16 17 H 24.5 C 29.5 17 32.5 19.5 32.5 23.5 C 32.5 27.5 29.5 30 24.5 30 H 16"
        fill="none"
        stroke="url(#bkNavStrokeGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 16 30 H 25.5 C 31 30 34 32.8 34 37.5 C 34 42.5 31 47 25.5 47 H 16"
        fill="none"
        stroke="url(#bkNavStrokeGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Monogram Glyph: K */}
      <path
        d="M 37.5 17 V 47"
        stroke="url(#bkNavStrokeGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M 48 18 L 38.5 31 L 48 46"
        fill="none"
        stroke="url(#bkNavStrokeGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BKLogo;

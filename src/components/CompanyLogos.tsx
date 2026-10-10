import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Addepar Icon:
 * Matches the official Addepar brand icon provided:
 * Deep forest/teal-black background (#082321) with the white forward-slanted abstract "A" mark.
 */
export const AddeparLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-[#082321] text-white shadow-md shadow-emerald-950/20 p-1.5 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Addepar"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Left tall slanted stem (leans forward) */}
        <polygon
          points="42,16 71,16 37,82 8,82"
          fill="#FFFFFF"
        />
        {/* Right branch / leg connecting at center and slanting down-right */}
        <polygon
          points="54,49 82,49 96,82 68,82"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};

/**
 * Slalom Icon:
 * Matches the official Slalom circular app icon provided:
 * Vibrant royal electric blue (#1C73F4 / #2572F4) circular badge with bold white "S".
 */
export const SlalomLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#1C73F4] text-white shadow-md shadow-blue-500/20 p-1 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Slalom Consulting"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="50" cy="50" r="48" fill="#1C73F4" />
        {/* Precision bold Slalom 'S' glyph */}
        <path
          d="M68.5 35.8 C68.5 25.2 60.1 19.5 49.8 19.5 C38.6 19.5 30.5 25.5 30.5 35.2 C30.5 45.4 39.8 49.2 49.5 52.4 C60.2 55.9 66.8 59.8 66.8 67.8 C66.8 75.8 59.8 80.5 49.5 80.5 C38.2 80.5 29.8 74.2 29.2 63.8 L42.8 63.8 C43.2 68.8 46.2 71.5 50.1 71.5 C53.9 71.5 56.8 69.2 56.8 65.8 C56.8 60.2 50.2 57.2 42.5 54.2 C33.2 50.8 24.2 46.1 24.2 35.5 C24.2 22.8 34.8 14.5 49.8 14.5 C63.5 14.5 73.5 22.2 74.2 35.8 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};

export const LinkedInLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-md shadow-blue-900/15 p-2 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="LinkedIn"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9M5.07 18.5h2.79v-8.37H5.07v8.37z" />
      </svg>
    </div>
  );
};

export const GoogleLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-white border border-gray-200 shadow-md shadow-gray-400/10 p-2 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Google"
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
};

export const UWLogo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-[#4b2e83] text-[#b7a57a] font-black shadow-md p-2 transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="University of Washington"
    >
      <span className="text-sm font-serif tracking-wider font-extrabold text-[#e8d3a2]">UW</span>
    </div>
  );
};

export const renderCompanyLogo = (type: string, size = 44) => {
  switch (type) {
    case 'addepar':
      return <AddeparLogo size={size} />;
    case 'linkedin':
      return <LinkedInLogo size={size} />;
    case 'google':
      return <GoogleLogo size={size} />;
    case 'slalom':
      return <SlalomLogo size={size} />;
    default:
      return null;
  }
};

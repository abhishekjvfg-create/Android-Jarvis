import React from 'react';

// PhonePe Business Logo - Green Background + White Hindi 'पे' text
export const PhonePeBusinessLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`${className} shrink-0 bg-[#00A346] rounded-lg shadow-sm flex items-center justify-center text-white font-extrabold text-base border border-white/20 select-none`}>
    पे
  </div>
);

// PhonePe Logo - Purple Background + White Hindi 'पे' text
export const PhonePeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`${className} shrink-0 bg-[#5f259f] rounded-lg shadow-sm flex items-center justify-center text-white font-extrabold text-base border border-white/20 select-none`}>
    पे
  </div>
);

// FamPay Logo - Panchi / Orange Bird Emblem
export const FamPayLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-lg shadow-sm`} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#F38020"/>
    <path 
      d="M22 30C19 30 18.5 31.5 21 32.5C25.5 34.5 31 43 32.5 51.5C32.8 53.2 33 54.5 33.5 56C34.5 59.5 38.5 66 40 67.5C38.5 74 39.5 80 58 83.5C53.5 74.5 45 67 40 67.5C57.5 52 71.5 40.5 81 19.5C72.5 23 55 31.5 41 45.5C36.5 34 33.5 27.5 28.5 27.5C25.5 27.5 24 29 22 30Z" 
      fill="#FFFFFF"
    />
    <path 
      d="M50.5 36.5C62.5 28.5 73.5 22.5 81.5 19.5C70.5 30 52 47 40 67.5C41.5 60 40 48 50.5 36.5Z" 
      fill="#FFFFFF" 
      opacity="0.9"
    />
  </svg>
);

// Gemini AI Sparkling Star Logo
export const GeminiLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 12 6.627 12 0Z" 
      fill="url(#gemini_star_grad)" 
    />
    <defs>
      <linearGradient id="gemini_star_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A73E8" />
        <stop offset="0.5" stopColor="#8AB4F8" />
        <stop offset="1" stopColor="#F43F5E" />
      </linearGradient>
    </defs>
  </svg>
);

// Google Pay (GPay) Logo matching multi-colored loop emblem
export const GooglePayLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} shrink-0 bg-white rounded-lg p-1 border border-zinc-200/20 shadow-sm`} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 62.5L38.5 34C41 29.5 47 28 51.5 30.5L67 39.5L52.5 64.5C48 72 38 74.5 30.5 70C23 65.5 20.5 55.5 22 62.5Z" fill="#4285F4"/>
    <path d="M38.5 34L54 25C61.5 20.5 71.5 23 76 30.5C80.5 38 78 48 70.5 52.5L52.5 63L38.5 34Z" fill="#EA4335"/>
    <path d="M70.5 52.5L55 61.5C50.5 64 44.5 62.5 42 58L32.5 41.5L50.5 31C58 26.5 68 29 72.5 36.5C77 44 74.5 54 70.5 52.5Z" fill="#34A853"/>
    <path d="M50.5 31L66 22C73.5 17.5 83.5 20 88 27.5C92.5 35 90 45 82.5 49.5L64.5 60L50.5 31Z" fill="#FBBC04"/>
  </svg>
);

// BHIM UPI Logo matching orange & green overlapping triangular arrows emblem
export const BhimUpiLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} shrink-0 bg-white rounded-lg p-1 border border-zinc-200/20 shadow-sm`} xmlns="http://www.w3.org/2000/svg">
    <polygon points="43.5,7.5 65,47.5 20,88" fill="#F26522"/>
    <polygon points="58,9.5 80,49.5 35,90" fill="#00833E"/>
  </svg>
);

// Paytm Logo matching dark blue "pay" + light blue "tm" emblem
export const PaytmLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={`${className} shrink-0 bg-white rounded-lg p-1 border border-zinc-200/20 shadow-sm`} xmlns="http://www.w3.org/2000/svg">
    <text x="2" y="28" fill="#002E6E" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="24">pay</text>
    <text x="50" y="28" fill="#00BAF2" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="24">tm</text>
  </svg>
);

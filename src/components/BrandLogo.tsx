'use client';

import React from 'react';
import { useLocation } from '@/context/LocationContext';

interface BrandLogoProps {
  location?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandLogo({
  location,
  variant = 'dark',
  size = 'md',
  className = '',
}: BrandLogoProps) {
  const { displayLocation } = useLocation();
  const loc = location || displayLocation || 'Köln';
  const isLight = variant === 'light';

  return (
    <span
      className={`brand-logo-text ${size} ${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '6px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
    >
      <span
        style={{
          color: isLight ? '#FFFFFF' : '#002f61',
          letterSpacing: '-0.035em',
        }}
      >
        Autoankauf
      </span>
      <span
        style={{
          color: '#ff8f00',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        {loc}
      </span>

      <style jsx>{`
        .brand-logo-text.md {
          font-size: 22px;
        }
        .brand-logo-text.lg {
          font-size: 25px;
        }
        .brand-logo-text.sm {
          font-size: 18px;
        }

        @media (max-width: 640px) {
          .brand-logo-text.md {
            font-size: 18px !important;
          }
          .brand-logo-text.lg {
            font-size: 21px !important;
          }
        }
        @media (max-width: 400px) {
          .brand-logo-text.md {
            font-size: 16.5px !important;
          }
          .brand-logo-text.lg {
            font-size: 19px !important;
          }
        }
      `}</style>
    </span>
  );
}

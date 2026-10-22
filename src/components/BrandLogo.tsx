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
      className={`brand-logo-text size-${size} variant-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '6px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 900,
        fontStyle: 'italic',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        userSelect: 'none',
        flexShrink: 0,
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
    >
      {/* 1. Main Brand Text */}
      <span
        className="brand-logo-main"
        style={{
          color: isLight ? '#FFFFFF' : '#002f61',
          letterSpacing: '-0.035em',
          transition: 'color 0.2s ease',
        }}
      >
        Autoankauf
      </span>

      {/* 2. Dynamic City / Location Text */}
      <span
        className="brand-logo-loc"
        style={{
          color: '#ff8f00',
          fontWeight: 900,
          letterSpacing: '-0.025em',
        }}
      >
        {loc}
      </span>

      <style jsx>{`
        /* ===================================================================
           TEXT LOGO RESPONSIVE SIZING ENGINE
           Desktop prominent bold size matching kauf-auto.de typography
           Optimized for iPhone, Android, Tablets, Desktop
           =================================================================== */

        /* --- Default Medium Size (Header) --- */
        .brand-logo-text.size-md {
          font-size: 27px;
        }

        /* --- Large Size (Footer) --- */
        .brand-logo-text.size-lg {
          font-size: 30px;
        }

        /* --- Small Size --- */
        .brand-logo-text.size-sm {
          font-size: 19px;
        }

        /* Tablets (iPad portrait/landscape, Android tablets: 768px - 1024px) */
        @media (max-width: 1024px) {
          .brand-logo-text.size-md {
            font-size: 23px;
            gap: 5px;
          }
          .brand-logo-text.size-lg {
            font-size: 26px;
          }
        }

        /* Mobile Phones: iPhones & Android (max-width: 640px) */
        @media (max-width: 640px) {
          .brand-logo-text.size-md {
            font-size: 19.5px !important;
            gap: 4px;
          }
          .brand-logo-text.size-lg {
            font-size: 22px !important;
          }
        }

        /* Extra Small Phones (iPhone SE, Galaxy Fold: max-width: 380px) */
        @media (max-width: 380px) {
          .brand-logo-text.size-md {
            font-size: 17.5px !important;
            gap: 3.5px;
          }
        }

        .brand-logo-text:hover {
          opacity: 0.95;
          transform: translateY(-0.5px);
        }
      `}</style>
    </span>
  );
}

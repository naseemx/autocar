'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { TRANSLATIONS } from '@/data/translations';

interface LifestyleBannerProps {
  onOpenInventory?: () => void;
}

export default function LifestyleBanner({ onOpenInventory }: LifestyleBannerProps) {
  const { language } = useLanguage();
  const { displayLocation, locationConfig } = useLocation();
  const t = TRANSLATIONS[language].lifestyleBanner;

  const handleClick = () => {
    if (onOpenInventory) {
      onOpenInventory();
    } else {
      const target = document.getElementById('acquisition') || document.getElementById('how-it-works');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        padding: '16px 0 32px 0',
      }}
      id="lifestyle"
    >
      <div className="container-app">
        {/* Large Rounded Photo Banner with Dynamic Flex Layout - Rigid inline bounds prevent any viewport breakout */}
        <div
          className="lifestyle-banner-container"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '450px',
            overflow: 'hidden',
            borderRadius: '32px',
            backgroundColor: '#0b0d12',
          }}
        >
          {/* Background Image: lazy loaded, strictly constrained by parent */}
          <Image
            src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760699/kauf-auto/images/lifestyle-banner.jpg"
            alt="Family enjoying vehicle handover and travel"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1260px"
            className="lifestyle-bg-image"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />

          {/* High-Contrast Gradient Scrim for Flawless Readability */}
          <div
            className="lifestyle-scrim"
            style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
          />

          {/* Flow Content: Never Overlaps or Clips */}
          <div
            className="lifestyle-text"
            style={{ position: 'relative', zIndex: 10 }}
          >
            <h2>{t.heading}</h2>
            <p>{t.paragraph}</p>
            <button
              onClick={handleClick}
              className="lifestyle-cta-btn"
              type="button"
            >
              <span>{t.cta}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Bottom Right Floating Badge - Gracefully hidden on tablet & mobile */}
          <div
            className="badge-inset"
            onClick={handleClick}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#0A2540',
                  lineHeight: '1.3',
                }}
              >
                {t.badgeTitle}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#ff8f00',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
              >
                {t.badgeSubtitle}
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                width: '90px',
                height: '52px',
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760664/kauf-auto/images/badge-van.jpg"
                alt={`Free doorstep vehicle pickup in ${displayLocation} & ${locationConfig.region}`}
                fill
                sizes="90px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lifestyle-banner-container {
          position: relative;
          width: 100%;
          min-height: 450px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: var(--shadow-soft);
          display: flex;
          align-items: center;
          padding: 48px 56px;
          box-sizing: border-box;
          background-color: #0b0d12;
        }

        .lifestyle-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(7, 9, 14, 0.82) 0%,
            rgba(7, 9, 14, 0.65) 45%,
            rgba(7, 9, 14, 0.3) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .lifestyle-text {
          position: relative;
          z-index: 10;
          color: #ffffff;
          max-width: 580px;
          width: 100%;
        }

        .lifestyle-text h2 {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.035em;
          margin-bottom: 16px;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .lifestyle-text p {
          font-size: 16.5px;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 400;
          margin-bottom: 24px;
          max-width: 480px;
          line-height: 1.55;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .lifestyle-cta-btn {
          font-size: 15px;
          font-weight: 700;
          padding: 12px 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 9999px;
          background: #ffffff;
          color: #0b0d12;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }

        .lifestyle-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
          background-color: #f8fafc;
        }

        .badge-inset {
          position: absolute;
          bottom: 32px;
          right: 32px;
          background-color: #ffffff;
          border-radius: 20px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
          max-width: 360px;
          z-index: 10;
          cursor: pointer;
          transition: transform 0.2s;
        }

        @media (max-width: 1024px) {
          .lifestyle-banner-container {
            min-height: 400px;
            padding: 38px 32px;
          }
          .lifestyle-text h2 {
            font-size: 34px;
          }
          .lifestyle-text p {
            font-size: 15px;
          }
          .badge-inset {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .lifestyle-banner-container {
            min-height: 360px;
            padding: 28px 18px !important;
            border-radius: 20px !important;
          }
          .lifestyle-scrim {
            background: linear-gradient(
              180deg,
              rgba(7, 9, 14, 0.85) 0%,
              rgba(7, 9, 14, 0.72) 60%,
              rgba(7, 9, 14, 0.88) 100%
            ) !important;
          }
          .lifestyle-text h2 {
            font-size: 26px !important;
            line-height: 1.22 !important;
            margin-bottom: 12px !important;
          }
          .lifestyle-text p {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
          }
          .lifestyle-cta-btn {
            font-size: 14px !important;
            padding: 11px 20px !important;
            width: auto;
            max-width: 100%;
          }
        }

        @media (max-width: 380px) {
          .lifestyle-text h2 {
            font-size: 22px !important;
          }
          .lifestyle-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

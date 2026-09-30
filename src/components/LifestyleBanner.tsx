'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

interface LifestyleBannerProps {
  onOpenInventory?: () => void;
}

export default function LifestyleBanner({ onOpenInventory }: LifestyleBannerProps) {
  const { language } = useLanguage();
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
    <section style={{
      padding: '20px 0 32px 0',
    }} id="lifestyle">
      <div className="container-app">
        {/* Large Rounded Photo Banner (matching Screenshot 2) */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '460px',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-soft)',
        }} className="lifestyle-banner-container">
          
          {/* Background Image */}
          <Image
            src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760699/kauf-auto/images/lifestyle-banner.jpg"
            alt="Family enjoying vehicle handover and travel"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />

          {/* Subtle gradient vignette to make white text pop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
          }} />

          {/* Left Text Overlay: "Sell your car — Fast, fair & nationwide" */}
          <div style={{
            position: 'absolute',
            top: '45%',
            transform: 'translateY(-50%)',
            left: '48px',
            color: '#FFFFFF',
            maxWidth: '560px',
            zIndex: 10,
          }} className="lifestyle-text">
            <h2 style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: '1.1',
              letterSpacing: '-0.035em',
              marginBottom: '16px',
              whiteSpace: 'pre-line',
            }}>
              {t.heading}
            </h2>
            <p style={{
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.92)',
              fontWeight: 400,
              marginBottom: '24px',
              maxWidth: '440px',
              lineHeight: '1.5',
            }}>
              {t.paragraph}
            </p>
            <button
              onClick={handleClick}
              className="btn-pill-white"
              style={{
                fontSize: '15px',
                fontWeight: 700,
                padding: '12px 28px',
              }}
            >
              {t.cta} <ArrowRight size={16} />
            </button>
          </div>

          {/* Bottom Right Floating Badge */}
          <div style={{
            position: 'absolute',
            bottom: '36px',
            right: '36px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
            maxWidth: '380px',
            zIndex: 10,
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onClick={handleClick}
          className="badge-inset"
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0A2540',
                lineHeight: '1.3',
              }}>
                {t.badgeTitle}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#ff8f00',
                fontWeight: 600,
                marginTop: '4px',
              }}>
                {t.badgeSubtitle}
              </div>
            </div>

            <div style={{
              position: 'relative',
              width: '100px',
              height: '56px',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760664/kauf-auto/images/badge-van.jpg"
                alt="Free doorstep vehicle pickup in Cologne & NRW"
                fill
                sizes="100px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .lifestyle-banner-container {
            height: 380px !important;
          }
          .lifestyle-text {
            left: 24px !important;
          }
          .lifestyle-text h2 {
            font-size: 36px !important;
          }
          .badge-inset {
            bottom: 20px !important;
            right: 20px !important;
            max-width: 300px !important;
          }
        }
        @media (max-width: 580px) {
          .badge-inset {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

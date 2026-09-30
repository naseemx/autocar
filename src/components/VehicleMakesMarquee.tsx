'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

interface LogoItem {
  name: string;
  src: string;
  width: number;
}

const ROW_ONE_LOGOS: LogoItem[] = [
  { name: 'Porsche', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760648/kauf-auto/CarLogo/porshe.png', width: 48 },
  { name: 'Mercedes-Benz', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760640/kauf-auto/CarLogo/benz.png', width: 50 },
  { name: 'BMW', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760641/kauf-auto/CarLogo/bmw.png', width: 50 },
  { name: 'Audi', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760638/kauf-auto/CarLogo/audi.png', width: 68 },
  { name: 'Land Rover', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760644/kauf-auto/CarLogo/landrover.png', width: 82 },
  { name: 'Volkswagen', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760650/kauf-auto/CarLogo/volkswagan.png', width: 48 },
];

const ROW_TWO_LOGOS: LogoItem[] = [
  { name: 'Toyota', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760649/kauf-auto/CarLogo/toyoto.png', width: 58 },
  { name: 'Honda', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760642/kauf-auto/CarLogo/honda.png', width: 54 },
  { name: 'Nissan', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760646/kauf-auto/CarLogo/nissan.png', width: 54 },
  { name: 'Mazda', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760645/kauf-auto/CarLogo/mazda.png', width: 54 },
  { name: 'Kia', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760643/kauf-auto/CarLogo/kia.png', width: 60 },
  { name: 'Porsche', src: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760648/kauf-auto/CarLogo/porshe.png', width: 48 },
];

export default function VehicleMakesMarquee() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].makesMarquee;

  // Duplicate arrays 4 times to ensure seamless infinite looping on all screen sizes (including 4K)
  const marqueeRowOne = [...ROW_ONE_LOGOS, ...ROW_ONE_LOGOS, ...ROW_ONE_LOGOS, ...ROW_ONE_LOGOS];
  const marqueeRowTwo = [...ROW_TWO_LOGOS, ...ROW_TWO_LOGOS, ...ROW_TWO_LOGOS, ...ROW_TWO_LOGOS];

  return (
    <section
      id="accepted-makes"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '88px 0 96px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #F1F5F9',
        borderBottom: '1px solid #F1F5F9',
      }}
    >
      {/* Background ambient accents */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '760px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(0, 47, 97, 0.04) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-app" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          {/* Section Eyebrow Header with Brand Accent Bar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '2.5px',
                backgroundColor: '#ff8f00',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ff8f00',
              }}
            >
              {t.eyebrow}
            </span>
          </div>

          <h2
            style={{
              fontSize: '38px',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.18,
              color: '#0B0D12',
              textTransform: 'uppercase',
              margin: '0 0 14px 0',
            }}
            className="makes-section-title"
          >
            {t.title}
          </h2>

          <p
            style={{
              fontSize: '15.5px',
              lineHeight: 1.65,
              color: '#64748B',
              margin: '0 auto 24px auto',
              fontWeight: 450,
              maxWidth: '680px',
            }}
          >
            {t.subtitle}
          </p>

          {/* Value Props Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              <CheckCircle2 size={15} color="#ff8f00" /> {t.pill1}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              <CheckCircle2 size={15} color="#ff8f00" /> {t.pill2}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              <CheckCircle2 size={15} color="#ff8f00" /> {t.pill3}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Container with subtle gradient edge masks */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '10px 0',
        }}
        className="marquee-wrapper"
      >
        {/* Left and Right Fade Gradients */}
        <div className="fade-mask-left" />
        <div className="fade-mask-right" />

        {/* LINE 1: Left to Right Marquee */}
        <div style={{ marginBottom: '18px', overflow: 'hidden' }}>
          <div className="marquee-track track-line-one">
            {marqueeRowOne.map((item, idx) => (
              <div
                key={`line1-${item.name}-${idx}`}
                className="brand-logo-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px 28px',
                  height: '76px',
                  minWidth: '150px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  userSelect: 'none',
                  flexShrink: 0,
                  transition: 'all 0.25s ease',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={item.width}
                  height={40}
                  style={{
                    maxHeight: '40px',
                    maxWidth: '90px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) brightness(0.2)',
                    transition: 'filter 0.25s ease',
                  }}
                  className="brand-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* LINE 2: Opposite Direction (Right to Left) at Normal Speed */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track track-line-two">
            {marqueeRowTwo.map((item, idx) => (
              <div
                key={`line2-${item.name}-${idx}`}
                className="brand-logo-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px 28px',
                  height: '76px',
                  minWidth: '150px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  userSelect: 'none',
                  flexShrink: 0,
                  transition: 'all 0.25s ease',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={item.width}
                  height={40}
                  style={{
                    maxHeight: '40px',
                    maxWidth: '90px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) brightness(0.2)',
                    transition: 'filter 0.25s ease',
                  }}
                  className="brand-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS for Butter-Smooth Opposite-Direction Scrolling & Hover Effects */}
      <style jsx>{`
        .marquee-wrapper {
          position: relative;
        }

        .fade-mask-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 140px;
          background: linear-gradient(to right, #FFFFFF 20%, rgba(255, 255, 255, 0) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .fade-mask-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 140px;
          background: linear-gradient(to left, #FFFFFF 20%, rgba(255, 255, 255, 0) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .marquee-track {
          display: flex;
          gap: 18px;
          width: max-content;
          will-change: transform;
        }

        /* Line 1: moves smoothly from Left to Right at a normal steady speed */
        .track-line-one {
          animation: marqueeLeftToRight 28s linear infinite;
        }

        /* Line 2: moves smoothly in the Opposite Direction (Right to Left) at a normal steady speed */
        .track-line-two {
          animation: marqueeRightToLeft 28s linear infinite;
        }

        /* Pause on hover so visitor can easily inspect logos */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Moving Left to Right */
        @keyframes marqueeLeftToRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        /* Moving Right to Left (Opposite Direction) */
        @keyframes marqueeRightToLeft {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .brand-logo-card:hover {
          border-color: #002f61 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 47, 97, 0.08) !important;
        }

        .brand-logo-card:hover .brand-img {
          filter: grayscale(0%) brightness(1) !important;
        }

        @media (max-width: 768px) {
          .makes-section-title {
            font-size: 28px !important;
          }
          .fade-mask-left,
          .fade-mask-right {
            width: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

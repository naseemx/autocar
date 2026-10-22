'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import PillButton from '@/ui/PillButton';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function EngineDamageSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].engineDamage;

  const handleScrollToForm = () => {
    const target = document.getElementById('acquisition') || document.getElementById('how-it-works');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="engine-damage-solution"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '104px 0 112px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #F1F5F9',
      }}
    >
      <div className="container-app" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="engine-damage-grid"
        >
          {/* LEFT COLUMN: Content */}
          <div>
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

            {/* Main Headline */}
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.2,
                color: '#0B0D12',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
              className="engine-main-title"
            >
              {t.titleP1}
              <span style={{ color: '#ff8f00' }}>{t.titleHighlight}</span>
              {t.titleP2}
            </h2>

            {/* Paragraph 1: Frustration & High Repair Costs */}
            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.7,
                color: '#4B5565',
                margin: '0 0 20px 0',
                fontWeight: 450,
              }}
            >
              {t.p1Text1}
              <strong style={{ color: '#0B0D12' }}>{t.p1Bold1}</strong>
              {t.p1Text2}
              <strong style={{ color: '#0B0D12' }}>{t.p1Bold2}</strong>
              {t.p1Text3}
              <em style={{ fontStyle: 'italic', color: '#1E293B' }}>{t.p1Italic}</em>
            </p>

            {/* Paragraph 2: The Solution */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                padding: '20px 22px',
                border: '1px solid #E2E8F0',
                marginBottom: '20px',
                borderLeft: '4px solid #ff8f00',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: '#334155',
                  margin: 0,
                }}
              >
                {t.p2Prefix}
                <strong style={{ color: '#002f61', fontWeight: 800 }}>{t.p2Bold1}</strong>
                {t.p2Text1}
                <strong style={{ color: '#0B0D12' }}>{t.p2Bold2}</strong>
                {t.p2Text2}
              </p>
            </div>

            {/* Paragraph 3: Free Deregistration */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#4B5565',
                margin: '0 0 32px 0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <CheckCircle2 size={19} color="#002f61" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>
                {t.p3Text1}
                <strong style={{ color: '#0B0D12' }}>{t.p3Bold}</strong>
                {t.p3Text2}
              </span>
            </p>

            {/* Pill CTA Button */}
            <div>
              <PillButton onClick={handleScrollToForm}>
                {t.cta}
              </PillButton>
            </div>
          </div>

          {/* RIGHT COLUMN: Transparent Car Image Without Any Card */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="engine-image-container"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '620px',
                transition: 'transform 0.35s ease',
              }}
              className="engine-car-wrapper"
            >
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760654/kauf-auto/enginecar.png"
                alt="Car with engine damage"
                width={1536}
                height={1024}
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 32px rgba(11, 15, 25, 0.12))',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Hover Transitions & Responsive Breakpoints */}
      <style jsx>{`
        .engine-car-wrapper:hover {
          transform: translateY(-4px) scale(1.015);
        }

        @media (max-width: 960px) {
          .engine-damage-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .engine-main-title {
            font-size: 28px !important;
          }
          .engine-car-wrapper {
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .engine-damage-grid {
            gap: 24px !important;
          }
          .engine-main-title {
            font-size: 24px !important;
            line-height: 1.22 !important;
          }
        }
      `}</style>
    </section>
  );
}

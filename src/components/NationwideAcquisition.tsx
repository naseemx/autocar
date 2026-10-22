'use client';

import React from 'react';
import Image from 'next/image';
import {
  HeartHandshake,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import PillButton from '@/ui/PillButton';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function NationwideAcquisition() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].nationwide;

  const handleCta = () => {
    const target = document.getElementById('acquisition') || document.getElementById('how-it-works');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '104px 0 112px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #F1F5F9',
      }}
    >
      {/* Anchor for Counselor navigation */}
      <div
        id="experience-and-heart"
        style={{
          position: 'absolute',
          top: '-76px',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="container-app">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.95fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="acquisition-grid"
        >
          {/* LEFT COLUMN: Context & Features (Matching Image 1 Layout + Image 2 Content) */}
          <div>
            {/* Eyebrow Header with Brand Accent Bar */}
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

            {/* Main Headline (From Image 2 Content) */}
            <h2
              style={{
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.18,
                color: '#0B0D12',
                margin: '0 0 20px 0',
              }}
              className="acquisition-main-title"
            >
              {t.titleP1}
              <span style={{ color: '#002f61' }}>{t.titleHighlight1}</span>
              {t.titleP2}
              <span style={{ color: '#ff8f00' }}>{t.titleHighlight2}</span>
            </h2>

            {/* Lead Description Paragraph 1 (From Image 2 Content) */}
            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.65,
                color: '#4B5565',
                margin: '0 0 16px 0',
                fontWeight: 450,
              }}
            >
              {t.lead1Text1}
              <strong style={{ color: '#0B0D12', fontWeight: 700 }}>{t.lead1Bold1}</strong>
              {t.lead1Text2}
              <strong style={{ color: '#002f61', fontWeight: 700 }}>{t.lead1Bold2}</strong>
              {t.lead1Text3}
            </p>

            {/* Lead Description Paragraph 2 (From Image 2 Content) */}
            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.65,
                color: '#4B5565',
                margin: '0 0 28px 0',
                fontWeight: 450,
              }}
            >
              {t.lead2Text1}
              <strong style={{ color: '#0B0D12', fontWeight: 700 }}>{t.lead2Bold1}</strong>
              {t.lead2Text2}
              <strong style={{ color: '#0B0D12', fontWeight: 700 }}>{t.lead2Bold2}</strong>
              {t.lead2Text3}
              <strong style={{ color: '#002f61', fontWeight: 700 }}>{t.lead2Bold3}</strong>
              {t.lead2Text4}
              <strong style={{ color: '#ff8f00', fontWeight: 700 }}>{t.lead2Bold4}</strong>.
            </p>

            {/* Horizontal Divider Line */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#E2E8F0',
                marginBottom: '32px',
              }}
            />

            {/* Two-Column Features Grid (Matching Image 1 Structure) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '28px',
                marginBottom: '36px',
              }}
              className="features-dual-col"
            >
              {/* Feature 1: Personal Consultation */}
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#002f61',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    boxShadow: '0 4px 12px rgba(0, 47, 97, 0.25)',
                  }}
                >
                  <HeartHandshake size={20} />
                </div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    color: '#0B0D12',
                    margin: '0 0 8px 0',
                  }}
                >
                  {t.feature1Title}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.55,
                    color: '#64748B',
                    margin: '0 0 12px 0',
                  }}
                >
                  {t.feature1Desc}
                </p>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#0B0D12',
                    transition: 'gap 0.2s ease, color 0.2s ease',
                  }}
                  className="learn-more-link"
                >
                  {t.learnMore} <ArrowRight size={14} />
                </a>
              </div>

              {/* Feature 2: Fair Prices & Guaranteed Support */}
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#002f61',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    boxShadow: '0 4px 12px rgba(0, 47, 97, 0.25)',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    color: '#0B0D12',
                    margin: '0 0 8px 0',
                  }}
                >
                  {t.feature2Title}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.55,
                    color: '#64748B',
                    margin: '0 0 12px 0',
                  }}
                >
                  {t.feature2Desc}
                </p>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#0B0D12',
                    transition: 'gap 0.2s ease, color 0.2s ease',
                  }}
                  className="learn-more-link"
                >
                  {t.learnMore} <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Bottom Closing CTA Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {/* Pill Button: GET IN TOUCH */}
              <PillButton onClick={handleCta}>
                {t.cta}
              </PillButton>

              {/* Reassuring Closing Copy (From Image 2 Content) */}
              <span
                style={{
                  fontSize: '14px',
                  color: '#4B5565',
                  fontWeight: 500,
                }}
              >
                {t.reassurance}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Rounded Visual Card (Matching Image 1 Layout) */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '560px',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px -12px rgba(15, 23, 42, 0.18)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                backgroundColor: '#0F172A',
              }}
              className="visual-container"
            >
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760692/kauf-auto/images/how-it-works-suv.jpg"
                alt="Luxury White SUV on Scenic Canyon Highway"
                fill
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Hover Transitions & Responsive Layout */}
      <style jsx>{`
        .acquisition-main-title {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .learn-more-link:hover {
          color: #002f61 !important;
          gap: 10px !important;
        }

        @media (max-width: 960px) {
          .acquisition-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .acquisition-main-title {
            font-size: 30px !important;
          }
          .features-dual-col {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .visual-container {
            height: 380px !important;
          }
        }

        @media (max-width: 640px) {
          .acquisition-grid {
            gap: 28px !important;
          }
          .acquisition-main-title {
            font-size: 24px !important;
            line-height: 1.22 !important;
          }
          .visual-container {
            height: 280px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

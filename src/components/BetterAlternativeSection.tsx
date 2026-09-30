'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Scale } from 'lucide-react';
import PillButton from '@/ui/PillButton';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function BetterAlternativeSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].betterAlternative;

  const handleScrollToForm = () => {
    // Scroll to the main valuation / acquisition search bar at top
    const target = document.getElementById('acquisition') || document.getElementById('accepted-makes');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about-us"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '104px 0 112px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #F1F5F9',
      }}
    >
      <div className="container-app">
        {/* TOP SECTION: Eyebrow + Main Statement */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '48px',
            alignItems: 'flex-start',
            marginBottom: '48px',
          }}
          className="about-header-grid"
        >
          {/* Left Column: Accent Line + Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingTop: '8px',
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

          {/* Right Column: Headline, Lead Description, and CTA Button */}
          <div>
            {/* Main Headline */}
            <h2
              style={{
                fontSize: '38px',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.2,
                color: '#0B0D12',
                margin: '0 0 16px 0',
              }}
              className="about-main-title"
            >
              {t.title}
            </h2>

            {/* Lead Description */}
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.68,
                color: '#4B5565',
                margin: '0 0 28px 0',
                fontWeight: 450,
                maxWidth: '820px',
              }}
            >
              {t.leadText1}
              <strong style={{ color: '#0B0D12' }}>{t.leadBold1}</strong>
              {t.leadText2}
              <strong style={{ color: '#ff8f00', fontWeight: 700 }}>{t.leadBold2}</strong>
              {t.leadText3}
              <strong style={{ color: '#0B0D12' }}>{t.leadBold3}</strong>
              {t.leadText4}
            </p>

            {/* CTA Button matching GET IN TOUCH style */}
            <div>
              <PillButton onClick={handleScrollToForm}>
                {t.cta}
              </PillButton>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Two Side-by-Side Rounded Images with Embedded Frosted Glass Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
          }}
          className="about-images-grid"
        >
          {/* Left Image Card: Car Handover with 'No standard' Glass Content */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.12)',
              border: '1px solid #E2E8F0',
            }}
            className="about-image-card"
          >
            <Image
              src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760665/kauf-auto/images/better-alternative-handover.jpg"
              alt="Professional automotive advisor handing over keys to customer in showroom"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 35%',
                transition: 'transform 0.4s ease',
              }}
              className="about-img"
            />
            {/* Ambient Dark Gradient for Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11, 15, 25, 0.92) 0%, rgba(11, 15, 25, 0.35) 50%, rgba(11, 15, 25, 0.05) 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Frosted Glass Content Container */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(11, 15, 25, 0.82)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
              className="glass-content-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60A5FA',
                  }}
                >
                  <Scale size={18} />
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#93C5FD',
                    backgroundColor: 'rgba(0, 47, 97, 0.35)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <CheckCircle2 size={13} color="#60A5FA" />
                  {t.card1Badge}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {t.card1Title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {t.card1Text1}
                <strong style={{ color: '#FFFFFF', fontWeight: 650 }}>{t.card1Bold1}</strong>
                {t.card1Text2}
                <strong style={{ color: '#93C5FD', fontWeight: 650 }}>{t.card1Bold2}</strong>
                {t.card1Text3}
                <strong style={{ color: '#FFFFFF', fontWeight: 650 }}>{t.card1Bold3}</strong>.
              </p>
            </div>
          </div>

          {/* Right Image Card: Delighted Customer with 'Clear offers' Glass Content */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.12)',
              border: '1px solid #E2E8F0',
            }}
            className="about-image-card"
          >
            <Image
              src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760667/kauf-auto/images/better-alternative-happy.jpg"
              alt="Delighted customer holding car keys beside her vehicle"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 20%',
                transition: 'transform 0.4s ease',
              }}
              className="about-img"
            />
            {/* Ambient Dark Gradient for Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11, 15, 25, 0.92) 0%, rgba(11, 15, 25, 0.35) 50%, rgba(11, 15, 25, 0.05) 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Frosted Glass Content Container */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(11, 15, 25, 0.82)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
              className="glass-content-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff8f00',
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#FED7AA',
                    backgroundColor: 'rgba(255, 143, 0, 0.2)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 143, 0, 0.35)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <CheckCircle2 size={13} color="#ff8f00" />
                  {t.card2Badge}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {t.card2Title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {t.card2Text1}
                <strong style={{ color: '#FFFFFF', fontWeight: 650 }}>{t.card2Bold1}</strong>
                {t.card2Text2}
                <strong style={{ color: '#ff8f00', fontWeight: 650 }}>{t.card2Bold2}</strong>
                {t.card2Text3}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Styling for Micro-Interactions & Responsive Layout */}
      <style jsx>{`
        .about-image-card:hover .about-img {
          transform: scale(1.03);
        }

        .about-image-card:hover .glass-content-card {
          border-color: rgba(255, 255, 255, 0.3) !important;
          background-color: rgba(11, 15, 25, 0.88) !important;
          transform: translateY(-2px);
        }

        .glass-content-card {
          transition: all 0.3s ease;
        }

        @media (max-width: 960px) {
          .about-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .about-main-title {
            font-size: 28px !important;
          }
          .about-images-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .about-image-card {
            height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}

'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function TrustIntro() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].trustIntro;

  return (
    <section
      style={{
        padding: '70px 0 60px 0',
        backgroundColor: 'transparent',
      }}
      id="about"
    >
      <div className="container-app">
        <div
          style={{
            maxWidth: '920px',
          }}
          className="intro-wrapper"
        >
          {/* Section Eyebrow Header with Brand Accent Bar (matching attached style tag) */}
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

          {/* Big Bold Heading: "Sell with trust" */}
          <h2
            style={{
              fontSize: '46px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: '1.15',
              color: '#0B0D12',
              marginBottom: '20px',
            }}
            className="intro-title"
          >
            {t.title}
          </h2>

          {/* Paragraph copy placed right below the heading */}
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.68',
              color: '#374151',
              fontWeight: 400,
              margin: 0,
            }}
            className="intro-body"
          >
            {t.body}
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .intro-title {
            font-size: 34px !important;
            margin-bottom: 16px !important;
          }
          .intro-body {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </section>
  );
}

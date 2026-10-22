'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function TrustIntro() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].trustIntro;

  return (
    <section className="trust-intro-section" id="about">
      <div className="container-app">
        <div
          style={{
            maxWidth: '920px',
          }}
          className="intro-wrapper"
        >
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

          {/* Big Bold Heading */}
          <h2 className="intro-title">
            {t.title}
          </h2>

          {/* Paragraph copy placed right below the heading */}
          <p className="intro-body">
            {t.body}
          </p>
        </div>
      </div>

      <style jsx>{`
        .trust-intro-section {
          padding: 64px 0 52px 0;
          background-color: transparent;
        }
        .intro-title {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.16;
          color: #0b0d12;
          margin-bottom: 20px;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .intro-body {
          font-size: 17.5px;
          line-height: 1.68;
          color: #374151;
          font-weight: 400;
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        @media (max-width: 860px) {
          .trust-intro-section {
            padding: 38px 0 28px 0 !important;
          }
          .intro-title {
            font-size: 32px !important;
            margin-bottom: 14px !important;
          }
          .intro-body {
            font-size: 15.5px !important;
            line-height: 1.62 !important;
          }
        }
        @media (max-width: 480px) {
          .trust-intro-section {
            padding: 30px 0 22px 0 !important;
          }
          .intro-title {
            font-size: 26px !important;
            line-height: 1.2 !important;
          }
          .intro-body {
            font-size: 14.5px !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </section>
  );
}

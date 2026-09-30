import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Banknote, MapPin, AlertTriangle, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { TRANSLATIONS } from '@/data/translations';

export default function ClientTrustBento() {
  const { language } = useLanguage();
  const { displayLocation } = useLocation();
  const t = TRANSLATIONS[language].clientTrustBento;
  const brandInitials = displayLocation ? `A${displayLocation.charAt(0).toUpperCase()}` : 'AK';
  return (
    <section
      id="why-trust-us"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '96px 0 88px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-app">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px auto' }}>
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

          {/* Main Title */}
          <h2
            style={{
              fontSize: '40px',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              color: '#0B0D12',
              textTransform: 'uppercase',
              margin: '0 0 14px 0',
            }}
            className="bento-main-title"
          >
            {t.mainTitle}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.65,
              color: '#64748B',
              margin: 0,
              fontWeight: 450,
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* 3x2 Bento Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
          className="bento-cards-grid"
        >
          {/* CARD 1: Dark Card (Fair prices) */}
          <div
            style={{
              backgroundColor: '#0C0F17',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(12, 15, 23, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-dark"
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  marginBottom: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Banknote size={22} />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#FFFFFF' }}>{t.card1TitleWhite}</span>
                <span style={{ color: '#94A3B8' }}>{t.card1TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#94A3B8',
                  margin: 0,
                  maxWidth: '310px',
                }}
              >
                {t.card1Desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div className="arrow-btn arrow-btn-dark">
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>

          {/* CARD 2: White Card (Nationwide service) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-light"
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 143, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff8f00',
                  marginBottom: '18px',
                  border: '1px solid rgba(0, 47, 97, 0.12)',
                }}
              >
                <MapPin size={22} />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  color: '#0B0D12',
                }}
              >
                <span>{t.card2TitleWhite}</span>
                <span style={{ color: '#64748B' }}>{t.card2TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#64748B',
                  margin: 0,
                  maxWidth: '310px',
                }}
              >
                {t.card2Desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div className="arrow-btn arrow-btn-light">
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>

          {/* CARD 3: Dark Card with High-Performance Tire / Wheel Graphic (Engine damage also) */}
          <div
            style={{
              backgroundColor: '#0C0F17',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(12, 15, 23, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-dark"
          >
            {/* Embedded Sport Rim Visual in bottom-right corner - PRESERVED */}
            <div
              style={{
                position: 'absolute',
                right: '-18px',
                bottom: '-22px',
                width: '185px',
                height: '185px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760676/kauf-auto/images/card-wheel.jpg"
                alt="Performance Wheel Rim"
                fill
                sizes="185px"
                style={{
                  objectFit: 'cover',
                  borderRadius: '50%',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                }}
              />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  marginBottom: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <AlertTriangle size={22} />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#FFFFFF' }}>{t.card3TitleWhite}</span>
                <br />
                <span style={{ color: '#94A3B8' }}>{t.card3TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#94A3B8',
                  margin: 0,
                  maxWidth: '190px',
                }}
              >
                {t.card3Desc}
              </p>
            </div>

            {/* Empty space for bottom alignment */}
            <div style={{ height: '24px' }} />
          </div>

          {/* CARD 4: White Card with Steering Wheel Graphic (Fast Sale) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-light"
          >
            {/* Embedded Steering Wheel Visual in bottom-right corner - PRESERVED */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '-68px',
                width: '195px',
                height: '195px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <Image
                src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760674/kauf-auto/images/card-steering.png"
                alt="Leather Sports Steering Wheel"
                fill
                sizes="195px"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 143, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff8f00',
                  marginBottom: '18px',
                  border: '1px solid rgba(0, 47, 97, 0.12)',
                }}
              >
                <Clock size={22} />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  color: '#0B0D12',
                }}
              >
                <span>{t.card4TitleWhite}</span>
                <span style={{ color: '#64748B' }}>{t.card4TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#64748B',
                  margin: 0,
                  maxWidth: '190px',
                }}
              >
                {t.card4Desc}
              </p>
            </div>

            {/* Empty space for bottom alignment */}
            <div style={{ height: '24px' }} />
          </div>

          {/* CARD 5: Premium Dark Brand Card (Reputable car dealer) */}
          <div
            style={{
              background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 70%, #0B1120 100%)',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.16)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-dark"
          >
            {/* Subtle Brand Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 47, 97, 0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  marginBottom: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#FFFFFF' }}>{t.card5TitleWhite}</span>
                <span style={{ color: '#94A3B8' }}>{t.card5TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#94A3B8',
                  margin: 0,
                  maxWidth: '310px',
                }}
              >
                {t.card5Desc}
              </p>
            </div>

            {/* Bottom: Autoankauf Köln Brand Typography + Arrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '20px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Brand Logo in Project Colors */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    background: 'linear-gradient(135deg, #ff8f00 0%, #e67e00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B0D12',
                    fontWeight: 900,
                    fontSize: '11px',
                    boxShadow: '0 2px 8px rgba(255, 143, 0, 0.4)',
                  }}
                >
                  {brandInitials}
                </div>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF',
                  }}
                >
                  Autoankauf <span style={{ color: '#ff8f00' }}>{displayLocation}</span>
                </span>
              </div>

              <div className="arrow-btn arrow-btn-dark">
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>

          {/* CARD 6: White Card (Alternative to wirkaufendeinauto) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 28px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            className="bento-card bento-card-light"
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 143, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff8f00',
                  marginBottom: '18px',
                  border: '1px solid rgba(0, 47, 97, 0.12)',
                }}
              >
                <ThumbsUp size={22} />
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  color: '#0B0D12',
                }}
              >
                <span>{t.card6TitleWhite}</span>
                <br />
                <span style={{ color: '#64748B' }}>{t.card6TitleMuted}</span>
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: '#64748B',
                  margin: 0,
                  maxWidth: '310px',
                }}
              >
                {t.card6Desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div className="arrow-btn arrow-btn-light">
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Brand Watermark & Summary Paragraph */}
        <div
          style={{
            position: 'relative',
            marginTop: '64px',
            paddingTop: '40px',
            paddingBottom: '20px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Giant Background Watermark "AUTOANKAUF KÖLN" */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(84px, 15vw, 180px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#F1F5F9',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
              lineHeight: 0.9,
            }}
            aria-hidden="true"
          >
            AUTOANKAUF {displayLocation.toUpperCase()}
          </div>

          {/* Foreground Centered Text */}
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '740px',
              margin: '0 auto',
              fontSize: '15.5px',
              lineHeight: 1.75,
              color: '#4B5565',
              fontWeight: 450,
            }}
          >
            {t.footerNote}
          </p>
        </div>
      </div>

      <style jsx>{`
        .bento-card:hover {
          transform: translateY(-4px);
        }
        .bento-card-dark:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
          border-color: rgba(0, 47, 97, 0.4) !important;
        }
        .bento-card-light:hover {
          box-shadow: 0 16px 36px rgba(0, 47, 97, 0.08) !important;
          border-color: #93C5FD !important;
        }

        .arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .arrow-btn-dark {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }
        .arrow-btn-dark:hover {
          background-color: #002f61;
          color: #FFFFFF;
          transform: scale(1.08);
        }
        .arrow-btn-light {
          background-color: #F1F5F9;
          color: #0F172A;
          border: 1px solid #E2E8F0;
        }
        .arrow-btn-light:hover {
          background-color: #002f61;
          color: #FFFFFF;
          border-color: #002f61;
          transform: scale(1.08);
        }

        @media (max-width: 1024px) {
          .bento-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-main-title {
            font-size: 32px !important;
          }
        }

        @media (max-width: 640px) {
          .bento-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-main-title {
            font-size: 26px !important;
          }
        }
      `}</style>
    </section>
  );
}

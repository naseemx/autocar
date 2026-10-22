'use client';

import React from 'react';
import Image from 'next/image';
import {
  Gem,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Check
} from 'lucide-react';
import PillButton from '@/ui/PillButton';

export default function ExperienceAndHeartSection() {
  const handleScrollToForm = () => {
    const target = document.getElementById('acquisition') || document.getElementById('how-it-works');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const advantages = [
    {
      icon: <Gem size={20} strokeWidth={2} />,
      title: 'Personal Consultation',
      description: 'Honest, one-on-one advisor guidance with genuine heart and zero high-pressure sales pitches.',
    },
    {
      icon: <ShieldCheck size={20} strokeWidth={2} />,
      title: 'Clear Communication',
      description: 'Transparent dialogue so you always know exactly where you stand throughout the entire process.',
    },
    {
      icon: <Clock size={20} strokeWidth={2} />,
      title: 'Fair & Fast Pricing',
      description: 'Market-tested valuations grounded in common sense, rapid scheduling, and immediate payout.',
    },
    {
      icon: <BadgeCheck size={20} strokeWidth={2} />,
      title: 'Guaranteed Commitment',
      description: 'With you from the very first hello until you hand over the keys — and beyond. Guaranteed.',
    },
  ];

  return (
    <section
      id="experience-and-heart"
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
            gridTemplateColumns: '1.15fr 0.95fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="experience-heart-grid"
        >
          {/* LEFT COLUMN: Narrative & 4 Advantage Points (Image 1 Structure + Image 2 Content) */}
          <div>
            {/* Category Eyebrow with Brand Blue Dot */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#ff8f00',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ff8f00',
                }}
              >
                Why Choose Us
              </span>
            </div>

            {/* Main Headline (From Image 2) */}
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.2,
                color: '#0B0D12',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
              }}
              className="experience-main-title"
            >
              Used car dealer with{' '}
              <span style={{ color: '#002f61' }}>experience</span> &amp; <span style={{ color: '#ff8f00' }}>heart</span>
            </h2>

            {/* Story & Philosophy (From Image 2) */}
            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.7,
                color: '#4B5565',
                margin: '0 0 24px 0',
                fontWeight: 450,
              }}
            >
              We might not be your typical car dealership with a suit and tie – but we are a{' '}
              <strong style={{ color: '#0B0D12', fontWeight: 700 }}>used car dealer who means business</strong>.
              With heart, experience, and a good dose of common sense. For us, it&apos;s not just about selling a car.
              It&apos;s about <strong style={{ color: '#002f61', fontWeight: 700 }}>trust</strong>. And about making
              sure you feel comfortable and well taken care of.
            </p>

            {/* 4 Advantage Items (Faithfully matching Image 1's vertical circle-icon layout) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                margin: '28px 0 32px 0',
              }}
            >
              {advantages.map((adv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                  className="advantage-row"
                >
                  {/* Circular Icon Disc (Image 1 Style) */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#002f61',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                      transition: 'all 0.2s ease',
                    }}
                    className="advantage-icon-disc"
                  >
                    {adv.icon}
                  </div>

                  {/* Title & Description */}
                  <div style={{ flex: 1, paddingTop: '2px' }}>
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#0B0D12',
                        marginBottom: '4px',
                      }}
                    >
                      {adv.title}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#64748B',
                        lineHeight: 1.55,
                      }}
                    >
                      {adv.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reassurance text from Image 2 */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderLeft: '3px solid #ff8f00',
                padding: '14px 18px',
                borderRadius: '0 12px 12px 0',
                marginBottom: '32px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#4B5565',
                  margin: 0,
                }}
              >
                That&apos;s why we focus on <strong style={{ color: '#0B0D12' }}>personal consultation</strong>,{' '}
                <strong style={{ color: '#0B0D12' }}>clear communication</strong>, and{' '}
                <strong style={{ color: '#ff8f00', fontWeight: 700 }}>fair prices</strong>, so you know exactly where you stand.
                No sales pitches. We&apos;ll be with you from the first hello until you hand over the keys – and if you
                have any further questions after that, we&apos;ll still be there for you.{' '}
                <strong style={{ color: '#0B0D12' }}>Guaranteed.</strong>
              </p>
            </div>

            {/* Pill CTA Button */}
            <div>
              <PillButton onClick={handleScrollToForm}>
                Get In Touch With Us
              </PillButton>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Card with Handshake Photo (From Image 2) */}
          <div style={{ position: 'relative' }}>
            {/* Outer Decorative Gradient Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '40px',
                background: 'radial-gradient(circle at 60% 40%, rgba(0, 47, 97, 0.08) 0%, transparent 70%)',
                filter: 'blur(16px)',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px -12px rgba(15, 23, 42, 0.16)',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                zIndex: 1,
              }}
              className="experience-visual-card"
            >
              {/* Image Aspect Box */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  minHeight: '380px',
                }}
              >
                <Image
                  src="https://res.cloudinary.com/dymoyukvh/image/upload/v1790760679/kauf-auto/images/handshake-experience-heart.png"
                  alt="Dealer handshake and car key handover with experience and heart"
                  fill
                  loading="lazy"
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                  }}
                />

                {/* Subtle vignette/gradient over bottom of image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(11, 15, 25, 0.85) 0%, rgba(11, 15, 25, 0.2) 40%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Floating Reassurance Badge on the Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(11, 15, 25, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '20px',
                    padding: '16px 20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          backgroundColor: '#002f61',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                          Handshake Guarantee
                        </div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                          From First Hello to Key Handover
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 143, 0, 0.25)',
                        color: '#FFA726',
                        borderRadius: '9999px',
                        border: '1px solid rgba(96, 165, 250, 0.35)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Trust First
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Hover Transitions & Responsive Breakpoints */}
      <style jsx>{`
        .advantage-row:hover .advantage-icon-disc {
          border-color: #002f61 !important;
          background-color: rgba(0, 47, 97, 0.05) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 47, 97, 0.15) !important;
        }

        @media (max-width: 960px) {
          .experience-heart-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .experience-main-title {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}

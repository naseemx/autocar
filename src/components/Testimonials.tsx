'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function Testimonials() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].testimonials;
  const [activeIndex, setActiveIndex] = useState(1); // Irina in the center by default

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Reorder so activeIndex is in the middle slot
  const leftIndex = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  const rightIndex = (activeIndex + 1) % TESTIMONIALS.length;

  const leftItem = TESTIMONIALS[leftIndex];
  const centerItem = TESTIMONIALS[activeIndex];
  const rightItem = TESTIMONIALS[rightIndex];

  const getQuote = (item: typeof centerItem) => {
    return language === 'DE' ? item.quoteDe : item.quoteEn;
  };

  return (
    <section style={{
      padding: '70px 0 60px 0',
      backgroundColor: 'transparent',
    }} id="testimonials">
      <div className="container-app">
        
        {/* Top Header Row: Heading on left, controls on right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '44px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            {/* Section Eyebrow Header with Brand Accent Bar */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
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

            <h2 style={{
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: '1.1',
              color: '#0B0D12',
              textTransform: 'uppercase',
            }} className="testimonials-title">
              {t.title}
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '6px',
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B7280',
                letterSpacing: '0.03em',
              }}>
                {t.verifiedBadge}
              </span>
            </div>
          </div>

          {/* Black Circular Navigation Arrow Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <button
              onClick={prevReview}
              className="nav-arrow-btn-dark"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextReview}
              className="nav-arrow-btn-dark"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 3 Testimonials Grid with Center Floating Dark Card (exact match to Screenshot 4) */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr 1fr',
          gap: '24px',
          alignItems: 'center',
          minHeight: '340px',
        }} className="testimonials-showcase">
          
          {/* Left Card: Light Card */}
          <div
            onClick={prevReview}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px 24px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-soft)',
              cursor: 'pointer',
              opacity: 0.88,
              transition: 'all 0.3s ease',
            }}
            className="flanking-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <Image src={leftItem.avatar} alt={leftItem.name} fill sizes="46px" style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0D12', letterSpacing: '-0.01em' }}>
                  {leftItem.name}
                </div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#ff8f00" color="#ff8f00" />
                  ))}
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '12px',
              lineHeight: '1.6',
              color: '#556070',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}>
              {getQuote(leftItem)}
            </p>
          </div>

          {/* Center Card: High-End Elevated Dark Glassmorphism Card (matching Screenshot 4 center) */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#1B2130',
              backgroundImage: 'linear-gradient(145deg, #242B3E 0%, #151924 100%)',
              color: '#FFFFFF',
              borderRadius: '26px',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-elevated)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              zIndex: 10,
              transform: 'scale(1.04)',
            }}
            className="center-featured-card"
          >
            {/* Top Right External Link Arrow (exact match to Screenshot 4) */}
            <div style={{
              position: 'absolute',
              top: '28px',
              right: '28px',
              color: '#FFFFFF',
              opacity: 0.85,
            }}>
              <ArrowUpRight size={22} />
            </div>

            {/* Author Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '18px',
            }}>
              <div style={{
                position: 'relative',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}>
                <Image
                  src={centerItem.avatar}
                  alt={centerItem.name}
                  fill
                  sizes="54px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}>
                  {centerItem.name}
                </div>

                {/* 5 White/Gold Stars */}
                <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#ff8f00" color="#ff8f00" />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Body */}
            <p style={{
              fontSize: '13.5px',
              lineHeight: '1.65',
              color: 'rgba(255, 255, 255, 0.88)',
              fontWeight: 400,
              marginBottom: '18px',
            }}>
              {getQuote(centerItem)}
            </p>

            {/* Verified Footer Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '12px',
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#60A5FA',
                fontWeight: 600,
              }}>
                <ShieldCheck size={14} /> {language === 'DE' ? 'Verifizierte Direktübergabe' : 'Verified Direct Handover'}
              </span>
              <span style={{ color: '#93C5FD', fontWeight: 700 }}>
                {centerItem.savings}
              </span>
            </div>
          </div>

          {/* Right Card: Light Card */}
          <div
            onClick={nextReview}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px 24px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-soft)',
              cursor: 'pointer',
              opacity: 0.88,
              transition: 'all 0.3s ease',
            }}
            className="flanking-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <Image src={rightItem.avatar} alt={rightItem.name} fill sizes="46px" style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0D12', letterSpacing: '-0.01em' }}>
                  {rightItem.name}
                </div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#ff8f00" color="#ff8f00" />
                  ))}
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '12px',
              lineHeight: '1.6',
              color: '#556070',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}>
              {getQuote(rightItem)}
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .flanking-card:hover {
          opacity: 1 !important;
          transform: translateY(-2px);
        }
        @media (max-width: 960px) {
          .testimonials-showcase {
            grid-template-columns: 1fr !important;
          }
          .flanking-card {
            display: none !important;
          }
          .center-featured-card {
            transform: none !important;
          }
          .testimonials-title {
            font-size: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

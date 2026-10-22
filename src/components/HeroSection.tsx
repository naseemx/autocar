'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { TRANSLATIONS } from '@/data/translations';

interface HeroSectionProps {
  onOpenCalculator?: () => void;
  onOpenInventory?: () => void;
}

export default function HeroSection({ onOpenInventory, onOpenCalculator }: HeroSectionProps) {
  const { language } = useLanguage();
  const { displayLocation } = useLocation();
  const slides = TRANSLATIONS[language].hero.slides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Mount detection: ensures autoplay timers and transitions start only after client mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Autoplay auto-advance every 8 seconds, paused on hover, starts ONLY after mount
  useEffect(() => {
    if (!isMounted || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isMounted, isPaused, slides.length]);

  const handleCta = () => {
    if (onOpenInventory) {
      onOpenInventory();
    } else {
      const target = document.getElementById('acquisition') || document.getElementById('how-it-works');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  const slide = slides[currentSlide] || slides[0];

  return (
    <section
      className="hero-section-root"
      style={{
        position: 'relative',
        width: '100%',
        padding: '12px 0 24px 0',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-app">
        {/* Main Curved Hero Card Shape - Rigid inline containment prevents any collapse */}
        <div
          className="hero-container"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            minHeight: '540px',
            backgroundColor: '#07090E',
            borderRadius: '32px',
          }}
        >
          {/* 1. Full-size Card Shape Background Image Container */}
          <div
            className="hero-image-wrapper"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              zIndex: 0,
            }}
          >
            {slides.map((s, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={s.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: isMounted ? 'opacity 0.6s ease-in-out' : 'none',
                    zIndex: isActive ? 1 : 0,
                  }}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={s.carImage}
                    alt={s.title}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : 'lazy'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                    className="hero-bg-image"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center right',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* 2. Gradient Scrim & Overlays for Text Contrast */}
          <div className="hero-gradient-overlay" />
          <div className="hero-radial-glow" />
          <div className="hero-bottom-vignette" />

          {/* Top Header Row within Hero: Arrow Controls */}
          <div className="hero-nav-row">
            <div className="hero-arrows-group">
              <button
                onClick={prevSlide}
                className="nav-arrow-btn"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="nav-arrow-btn"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Hero Content Grid: Left Text + Clean Unobstructed Photo View */}
          <div className="hero-grid">
            {/* Left Column: Headlines & CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={isMounted ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="hero-content-col"
              >
                {/* Big Bold Headline */}
                <h1 className="hero-title">
                  <span className="hero-title-text">{slide.title}</span>{' '}
                  <span className="hero-highlight-break" />
                  <span className="hero-highlight-text">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-description">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="hero-cta-group">
                  <button
                    onClick={handleCta}
                    className="btn-pill-white hero-btn-primary"
                  >
                    {slide.ctaText} <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right side spacer to keep the right area open for the photo subjects */}
            <div className="hero-right-spacer" />
          </div>

          {/* Bottom Center Slider Indicator Dashes */}
          <div className="hero-slider-indicators">
            <div className="hero-indicators-capsule">
              {slides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`hero-indicator-dash ${currentSlide === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section-root {
          padding: 24px 0 0 0;
          position: relative;
        }

        .hero-container {
          position: relative;
          background-color: #07090E;
          border-radius: 32px;
          overflow: hidden;
          min-height: 540px;
          padding: 40px 48px 112px 48px;
          color: #FFFFFF;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          touch-action: pan-y;
        }

        .hero-image-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        :global(.hero-bg-image) {
          object-fit: cover !important;
          object-position: center right !important;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(7, 9, 14, 0.94) 0%,
            rgba(7, 9, 14, 0.88) 38%,
            rgba(7, 9, 14, 0.52) 65%,
            rgba(7, 9, 14, 0.22) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .hero-radial-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 75% 25%, rgba(0, 80, 160, 0.18) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-bottom-vignette {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(180deg, transparent 0%, rgba(7, 9, 14, 0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-nav-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
        }

        .hero-arrows-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(10, 12, 17, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-arrow-btn:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1px);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: center;
          position: relative;
          z-index: 5;
          min-height: 380px;
        }

        .hero-content-col {
          max-width: 580px;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin-bottom: 20px;
          color: #FFFFFF;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
        }

        .hero-highlight-break {
          display: block;
        }

        .hero-highlight-text {
          color: #60A5FA;
          background: linear-gradient(90deg, #FFFFFF 0%, #93C5FD 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 32px;
          max-width: 480px;
          font-weight: 400;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          padding: 14px 34px;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
          transition: all 0.2s ease;
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 600;
          padding: 13px 22px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .hero-slider-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 10;
          margin-top: 32px;
        }

        .hero-indicators-capsule {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(10, 12, 17, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .hero-indicator-dash {
          height: 4px;
          width: 20px;
          border-radius: 2px;
          background-color: rgba(255, 255, 255, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hero-indicator-dash.active {
          width: 38px;
          background-color: #ff8f00;
        }

        @media (max-width: 960px) {
          .hero-container {
            padding: 32px 24px 85px 24px !important;
            min-height: 440px !important;
            border-radius: 26px !important;
          }
          .hero-gradient-overlay {
            background: linear-gradient(
              180deg,
              rgba(7, 9, 14, 0.92) 0%,
              rgba(7, 9, 14, 0.80) 45%,
              rgba(7, 9, 14, 0.94) 100%
            ) !important;
          }
          :global(.hero-bg-image) {
            object-position: center bottom !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            min-height: auto !important;
          }
          .hero-content-col {
            max-width: 100% !important;
          }
          .hero-title {
            font-size: 38px !important;
            line-height: 1.15 !important;
          }
          .hero-description {
            font-size: 15px !important;
            max-width: 100% !important;
          }
          .hero-right-spacer {
            display: none !important;
          }
          .hero-slider-indicators {
            margin-top: 24px;
          }
        }

        @media (max-width: 640px) {
          .hero-section-root {
            padding: 12px 0 0 0 !important;
          }
          .hero-container {
            padding: 20px 16px 86px 16px !important;
            min-height: auto !important;
            border-radius: 20px !important;
          }
          .hero-nav-row {
            margin-bottom: 12px !important;
          }
          .nav-arrow-btn {
            width: 34px !important;
            height: 34px !important;
          }
          .hero-title {
            font-size: 28px !important;
            line-height: 1.2 !important;
            margin-bottom: 14px !important;
            letter-spacing: -0.025em !important;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .hero-highlight-break {
            display: inline;
          }
          .hero-description {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 18px !important;
            font-size: 14.5px !important;
            box-sizing: border-box !important;
          }
          .hero-slider-indicators {
            margin-top: 18px !important;
          }
          .hero-indicators-capsule {
            padding: 6px 12px !important;
            gap: 6px !important;
          }
          .hero-indicator-dash {
            width: 14px;
            height: 3px;
          }
          .hero-indicator-dash.active {
            width: 28px;
          }
        }

        @media (max-width: 420px) {
          .hero-container {
            padding: 18px 14px 78px 14px !important;
            border-radius: 18px !important;
          }
          .hero-title {
            font-size: 24px !important;
          }
          .hero-description {
            font-size: 13.5px !important;
          }
        }
      `}</style>
    </section>
  );
}

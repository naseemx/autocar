'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/insights';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function MarketInsights() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].marketInsights;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        padding: '60px 0 80px 0',
        backgroundColor: 'transparent',
      }}
      id="insights"
    >
      <div className="container-app">
        {/* Top Header Row: Blog Title on the left, Carousel Controls on the right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
          className="insights-header-row"
        >
          <div>
            {/* Small Brand Accent Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '2.5px',
                  backgroundColor: '#ff8f00',
                  borderRadius: '2px',
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
                {t.eyebrow}
              </span>
            </div>

            {/* Main Headline for the Blog */}
            <h2
              style={{
                fontSize: '44px',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: '1.18',
                color: '#0B0D12',
                maxWidth: '820px',
                margin: 0,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
              className="insights-heading"
            >
              {t.heading}
            </h2>
          </div>

          {/* Carousel Navigation Arrows (< >) on the right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <button
              type="button"
              onClick={scrollLeft}
              className="nav-arrow-btn-light"
              aria-label="Scroll insights left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="nav-arrow-btn-light"
              aria-label="Scroll insights right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Article Cards Carousel */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="insights-scroll"
        >
          {INSIGHTS_ARTICLES.map((article) => (
            <article
              key={article.id}
              style={{
                flex: '0 0 calc(25% - 18px)',
                minWidth: '285px',
                scrollSnapAlign: 'start',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="insight-card"
            >
              {/* Card Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '190px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-img"
                />
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: '22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '1.3',
                      color: '#0B0D12',
                      marginBottom: '10px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {language === 'DE' ? article.titleDe : article.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.55',
                      color: '#556070',
                      marginBottom: '20px',
                    }}
                  >
                    {language === 'DE' ? article.excerptDe : article.excerpt}
                  </p>
                </div>

                {/* Card Footer: Date & "read more" */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid #F3F4F6',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: '#8892A0', fontWeight: 500 }}>
                    {language === 'DE' ? article.dateDe : article.date}
                  </span>

                  <a
                    href={`#${article.slug}`}
                    style={{
                      color: '#0B0D12',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s ease, gap 0.2s ease',
                    }}
                    className="read-more-link"
                  >
                    <span>{language === 'DE' ? 'Weiterlesen' : 'read more'}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .insights-scroll::-webkit-scrollbar {
          display: none;
        }
        .insight-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px -4px rgba(0, 0, 0, 0.08);
        }
        .insight-card:hover .card-img {
          transform: scale(1.04);
        }
        .read-more-link:hover {
          color: #002f61 !important;
          gap: 6px !important;
        }
        @media (max-width: 960px) {
          .insights-heading {
            font-size: 30px !important;
          }
          .insight-card {
            flex: 0 0 300px !important;
          }
        }
        @media (max-width: 640px) {
          .insights-heading {
            font-size: 24px !important;
            line-height: 1.22 !important;
          }
          .insight-card {
            flex: 0 0 270px !important;
          }
        }
      `}</style>
    </section>
  );
}

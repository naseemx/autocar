import React from 'react';
import { HeartHandshake, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function TrustFeatures() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].trustFeatures;

  return (
    <section style={{
      padding: '0 0 40px 0',
    }}>
      <div className="container-app">
        {/* 3 Trust Feature Cards Grid below the Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="features-grid">
          
          {/* Feature Card 1 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 24px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: 'var(--shadow-soft)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          className="feature-card"
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#002f61',
            }}>
              <HeartHandshake size={22} />
            </div>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0B0D12',
                marginBottom: '6px',
              }}>
                {t.feature1Title}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.5',
              }}>
                {t.feature1Desc}
              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 24px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: 'var(--shadow-soft)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          className="feature-card"
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#ff8f00',
            }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0B0D12',
                marginBottom: '6px',
              }}>
                {t.feature2Title}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.5',
              }}>
                {t.feature2Desc}
              </div>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 24px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: 'var(--shadow-soft)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          className="feature-card"
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#002f61',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#FFFFFF',
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0B0D12',
                marginBottom: '6px',
              }}>
                {t.feature3Title}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.5',
              }}>
                {t.feature3Desc}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);
        }
        @media (max-width: 960px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

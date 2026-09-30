'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calculator, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

interface ValueCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValueCalculatorModal({ isOpen, onClose }: ValueCalculatorModalProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].calculator;

  const [year, setYear] = useState('2023');
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('RAV4 Hybrid');
  const [mileage, setMileage] = useState('18000');
  const [condition, setCondition] = useState<'excellent' | 'veryGood' | 'good'>('excellent');
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  if (!isOpen) return null;

  const calculateEstimate = () => {
    // Generate realistic pricing estimate
    const base = 32000;
    const directOffer = base + (condition === 'excellent' ? 2500 : 1000);
    const dealerTradeIn = directOffer - 4200;
    return { directOffer, dealerTradeIn, extraEarned: directOffer - dealerTradeIn };
  };

  const { directOffer, dealerTradeIn, extraEarned } = calculateEstimate();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteGenerated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const conditionOptions: Array<{ key: 'excellent' | 'veryGood' | 'good'; label: string }> = [
    { key: 'excellent', label: t.conditions.excellent },
    { key: 'veryGood', label: t.conditions.veryGood },
    { key: 'good', label: t.conditions.good },
  ];

  return (
    <div className="calculator-modal-backdrop">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="calculator-modal-container"
      >
        {/* Header */}
        <div className="calculator-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#EEF3FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#002f61',
              flexShrink: 0,
            }}>
              <Calculator size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B0D12', margin: 0 }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0 0' }}>
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="calculator-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="calculator-modal-body">
          {!quoteGenerated ? (
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="calc-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4B5565', marginBottom: '6px' }}>
                    {t.yearLabel}
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="calc-input"
                  >
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4B5565', marginBottom: '6px' }}>
                    {t.makeLabel}
                  </label>
                  <select
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="calc-input"
                  >
                    <option>Toyota</option>
                    <option>Mercedes-Benz</option>
                    <option>Porsche</option>
                    <option>Tesla</option>
                    <option>Audi</option>
                    <option>Subaru</option>
                  </select>
                </div>
              </div>

              <div className="calc-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4B5565', marginBottom: '6px' }}>
                    {t.modelLabel}
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="calc-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4B5565', marginBottom: '6px' }}>
                    {t.mileageLabel}
                  </label>
                  <input
                    type="text"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="calc-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4B5565', marginBottom: '6px' }}>
                  {t.conditionLabel}
                </label>
                <div className="calc-condition-row">
                  {conditionOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCondition(key)}
                      style={{
                        flex: 1,
                        padding: '10px 8px',
                        borderRadius: '10px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        border: condition === key ? '2px solid #002f61' : '1px solid #E5E7EB',
                        backgroundColor: condition === key ? '#EEF2FF' : '#FFFFFF',
                        color: condition === key ? '#002f61' : '#4B5565',
                        textAlign: 'center',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-pill-blue"
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  marginTop: '6px',
                  width: '100%',
                }}
              >
                {t.calculateBtn}
              </button>
            </form>
          ) : (
            <div>
              {/* Result card */}
              <div style={{
                backgroundColor: '#0F1219',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '20px',
                backgroundImage: 'linear-gradient(145deg, #1C2232 0%, #0F1219 100%)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <span style={{ fontSize: '13px', color: '#93C5FD', fontWeight: 700 }}>
                    {t.estimatedBestPrice}
                  </span>
                  <span style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34D399',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                  }}>
                    +€{extraEarned.toLocaleString()} {t.moreVsDealer}
                  </span>
                </div>

                <div style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                  €{directOffer.toLocaleString()}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginTop: '18px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{t.standardDealerTradeIn}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#EF4444', textDecoration: 'line-through', marginTop: '2px' }}>
                      €{dealerTradeIn.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{t.kaufAutoDirectPayout}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>
                      {t.instantPayoutPickup}
                    </div>
                  </div>
                </div>
              </div>

              <div className="calc-result-actions">
                <button
                  onClick={() => {
                    alert(t.alertSuccess);
                    onClose();
                  }}
                  className="btn-pill-blue"
                  style={{ flex: 1, padding: '13px', fontSize: '14px' }}
                >
                  <ShieldCheck size={16} /> {t.requestOfferBtn}
                </button>
                <button
                  onClick={() => setQuoteGenerated(false)}
                  style={{
                    padding: '13px 18px',
                    borderRadius: '9999px',
                    border: '1px solid #D1D5DB',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  {t.recalculateBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .calculator-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(10, 12, 17, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .calculator-modal-container {
          background-color: #FFFFFF;
          border-radius: 28px;
          width: 100%;
          maxWidth: 680px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.4);
        }

        .calculator-modal-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .calculator-modal-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4B5565;
          cursor: pointer;
          border: none;
        }

        .calculator-modal-body {
          padding: 32px;
        }

        .calc-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .calc-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #D1D5DB;
          background-color: #F9FAFB;
          font-size: 14px;
          font-weight: 500;
          box-sizing: border-box;
        }

        .calc-condition-row {
          display: flex;
          gap: 10px;
        }

        .calc-result-actions {
          display: flex;
          gap: 12px;
        }

        @media (max-width: 640px) {
          .calculator-modal-backdrop {
            padding: 12px !important;
          }
          .calculator-modal-container {
            border-radius: 20px !important;
            max-height: 92vh !important;
          }
          .calculator-modal-header {
            padding: 18px 18px !important;
          }
          .calculator-modal-body {
            padding: 20px 16px !important;
          }
          .calc-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .calc-input {
            font-size: 16px !important; /* Prevents iOS Safari auto-zoom */
            padding: 11px 14px !important;
          }
          .calc-condition-row {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .calc-result-actions {
            flex-direction: column !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

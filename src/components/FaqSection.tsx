'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faqs';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

export default function FaqSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].faq;
  const [openId, setOpenId] = useState<string | null>('faq-1'); // First FAQ open by default

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section style={{
      padding: '50px 0 90px 0',
      backgroundColor: 'transparent',
    }} id="faq">
      <div className="container-app">
        
        {/* Centered Large "FAQ" Heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#0B0D12',
          }}>
            {t.title}
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            marginTop: '8px',
            maxWidth: '560px',
            margin: '8px auto 0 auto',
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const questionText = language === 'DE' ? (item.questionDe || item.question) : item.question;
            const answerBullets = (language === 'DE' && item.answerDe) ? item.answerDe : item.answer;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: isOpen ? '0 12px 30px -4px rgba(0, 0, 0, 0.06)' : 'var(--shadow-soft)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Header Row: Number + Question Title + Circle +/- Button */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  style={{
                    width: '100%',
                    padding: '24px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  className="faq-header-btn"
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px',
                    flex: 1,
                  }}>
                    {/* Number: 01, 02, 03... */}
                    <span style={{
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#0B0D12',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.02em',
                      minWidth: '36px',
                    }}>
                      {item.number}
                    </span>

                    {/* Question Title */}
                    <span style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#0B0D12',
                      letterSpacing: '-0.015em',
                      lineHeight: '1.35',
                      textTransform: 'uppercase',
                    }}>
                      {questionText}
                    </span>
                  </div>

                  {/* Circular Toggle Button */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#0B0D12' : '#F3F4F6',
                    color: isOpen ? '#FFFFFF' : '#0B0D12',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}>
                    {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div style={{
                        padding: '0 32px 28px 92px',
                        color: '#4B5565',
                        fontSize: '15px',
                        lineHeight: '1.7',
                      }} className="faq-answer-inner">
                        <p style={{ marginBottom: '12px', fontWeight: 500, color: '#1F2937' }}>
                          {t.prefix}
                        </p>
                        <ul style={{
                          paddingLeft: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}>
                          {answerBullets.map((bullet, idx) => (
                            <li key={idx} style={{ color: '#4B5565' }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .faq-header-btn {
            padding: 20px 18px !important;
            gap: 16px !important;
          }
          .faq-answer-inner {
            padding: 0 18px 20px 18px !important;
          }
        }
      `}</style>
    </section>
  );
}

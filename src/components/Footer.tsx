'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BrandLogo from '@/components/BrandLogo';
import { TRANSLATIONS } from '@/data/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="contact"
      style={{
        width: '100%',
        backgroundColor: 'transparent',
        padding: '16px 20px 32px 20px',
        position: 'relative',
      }}
    >
      <div className="container-app" style={{ maxWidth: '1280px', padding: 0 }}>
        {/* Rounded Dark Floating Inset Card */}
        <div
          className="footer-card"
          style={{
            backgroundColor: '#0F1218',
            borderRadius: '36px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
            padding: '64px 60px 36px 60px',
          }}
        >
          {/* Subtle Warm Gradient Accent in corner */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-120px',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 143, 0, 0.08) 0%, rgba(255, 143, 0, 0) 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Main Footer Columns Grid */}
          <div
            className="footer-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1.3fr',
              gap: '48px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Column 1: Brand Logo & Mission */}
            <div>
              {/* Brand Font Logo */}
              <div style={{ marginBottom: '22px' }}>
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                  }}
                  className="footer-logo-link"
                >
                  <BrandLogo variant="light" size="lg" />
                </Link>
              </div>

              {/* Company Blurb */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.65',
                  color: '#9CA3AF',
                  marginBottom: '0',
                  maxWidth: '320px',
                }}
              >
                {t.companyBlurb}
              </p>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.informationTitle}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: 0,
                  margin: 0,
                }}
              >
                {t.informationLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-nav-link"
                      style={{
                        fontSize: '14.5px',
                        color: '#9CA3AF',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        display: 'inline-block',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get in touch & Social */}
            <div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.getInTouchTitle}
              </h4>

              {/* Contact Items with Project Color Round Badges */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  marginBottom: '28px',
                }}
              >
                {/* 1. Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#ff8f00',
                      color: '#0B0D12',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(255, 143, 0, 0.25)',
                    }}
                  >
                    <MapPin size={18} strokeWidth={2.4} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#D1D5DB', fontWeight: 500 }}>
                    {t.locationsCount}
                  </span>
                </div>

                {/* 2. Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#ff8f00',
                      color: '#0B0D12',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(255, 143, 0, 0.25)',
                    }}
                  >
                    <Phone size={18} strokeWidth={2.4} />
                  </div>
                  <a
                    href={`tel:${t.phone.replace(/[^0-9+]/g, '')}`}
                    className="footer-contact-link"
                    style={{
                      fontSize: '14px',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {t.phone}
                  </a>
                </div>

                {/* 3. Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#ff8f00',
                      color: '#0B0D12',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(255, 143, 0, 0.25)',
                    }}
                  >
                    <Mail size={18} strokeWidth={2.4} />
                  </div>
                  <a
                    href={`mailto:${t.email}`}
                    className="footer-contact-link"
                    style={{
                      fontSize: '14px',
                      color: '#D1D5DB',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {t.email}
                  </a>
                </div>
              </div>

              {/* Follow Us Section */}
              <div>
                <h5
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.followUsTitle}
                </h5>

                {/* Social Profiles Row matching design reference with project brand colors */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="footer-social-btn"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="footer-social-btn"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.102a2.895 2.895 0 0 1 2.373-4.536c.394 0 .769.078 1.111.218V9.45a6.326 6.326 0 0 0-1.111-.098C6.012 9.352 3.2 12.164 3.2 15.631c0 3.468 2.812 6.279 6.279 6.279 3.467 0 6.279-2.811 6.279-6.279V8.835a8.21 8.21 0 0 0 3.831 1.096V6.686z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="footer-social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/498005500008"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Business"
                    className="footer-social-btn"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="footer-social-btn"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Atmospheric Brand Watermark matching Moveo reference */}
          <div
            aria-hidden="true"
            className="footer-watermark"
            style={{
              position: 'absolute',
              bottom: '-28px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              textAlign: 'center',
              fontSize: 'clamp(60px, 14.5vw, 195px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.75,
              whiteSpace: 'nowrap',
              color: 'rgba(255, 255, 255, 0.032)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 1,
              fontFamily: 'inherit',
              textTransform: 'uppercase',
            }}
          >
            AUTOANKAUF KÖLN
          </div>

          {/* Bottom Copyright & Back-to-Top Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '50px',
              paddingTop: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ fontSize: '13px', color: '#6B7280' }}>
              {t.copyright}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>
                Autoankauf Köln • Vor Ort in ganz NRW
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                className="footer-back-to-top"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  color: '#9CA3AF',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{t.backToTop}</span>
                <ArrowUp size={14} color="#ff8f00" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-logo-link:hover {
          transform: translateY(-2px);
          opacity: 0.92;
        }
        .footer-nav-link:hover {
          color: #ffffff !important;
          transform: translateX(3px);
        }
        .footer-contact-link:hover {
          color: #ff8f00 !important;
        }
        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #ff8f00;
          color: #0b0d12;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(255, 143, 0, 0.25);
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background-color: #ffa024;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(255, 143, 0, 0.45);
        }
        .footer-back-to-top:hover {
          background-color: rgba(255, 255, 255, 0.08);
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.16);
        }
        @media (max-width: 1024px) {
          .footer-card {
            padding: 48px 36px 30px 36px !important;
            border-radius: 28px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-card {
            padding: 36px 20px 24px 20px !important;
            border-radius: 22px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-watermark {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}

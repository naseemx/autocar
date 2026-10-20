'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Globe2,
  MapPin,
  Phone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import BrandLogo from '@/components/BrandLogo';
import { TRANSLATIONS } from '@/data/translations';

// =========================================================================
// 📞 CONTACT CONFIGURATION
// =========================================================================
const PHONE_NUMBER = '+4915207107540';
const PHONE_DISPLAY = '+49 1520 7107540';
const WHATSAPP_LINK = 'https://wa.me/4915207107540?text=Hallo!%20Ich%20interessiere%20mich%20f%C3%BCr%20den%20Autoankauf.';

function WhatsAppIcon({ size = 16, color = '#25D366' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
      aria-hidden="true"
    >
      <path d="M16 2C8.28 2 2 8.28 2 16c0 2.68.75 5.18 2.05 7.33L2 30l6.89-1.99C11.02 29.28 13.44 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.34 0-4.52-.66-6.38-1.81l-.46-.28-4.73 1.36 1.37-4.6-.3-.48C4.24 19.82 3.55 17.97 3.55 16c0-6.86 5.59-12.45 12.45-12.45s12.45 5.59 12.45 12.45-5.59 12.45-12.45 12.45zm6.83-9.33c-.37-.19-2.22-1.09-2.56-1.22-.35-.12-.6-.19-.85.19s-.98 1.22-1.2 1.47c-.22.25-.45.28-.82.09-.37-.19-1.57-.58-2.99-1.84-1.11-.99-1.86-2.21-2.07-2.58-.22-.37-.02-.57.16-.75.17-.17.37-.45.56-.67.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.09-.19-.85-2.05-1.17-2.81-.31-.74-.63-.64-.85-.65h-.73c-.25 0-.66.09-1 .47-.35.37-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.68 4.09 6.49 5.73.91.39 1.61.63 2.16.81.91.29 1.74.25 2.4.15.73-.11 2.22-.91 2.53-1.78.31-.88.31-1.63.22-1.78-.09-.16-.34-.25-.71-.44z" />
    </svg>
  );
}

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenInventory?: () => void;
}

export default function Header({ onOpenCalculator }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { displayLocation } = useLocation();
  const defaultLocation = displayLocation || 'Köln';
  const t = TRANSLATIONS[language].header;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.07)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div
        className="container-app header-main-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <BrandLogo variant="dark" size="md" />
        </Link>

        {/* Desktop Navigation Links: Home, What We Buy, About Us, Counselor, Contact */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {/* 1. Home */}
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#1A1E26',
              cursor: 'pointer',
              padding: '6px 4px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            {t.home}
          </button>

          {/* 2. What We Buy */}
          <button
            type="button"
            onClick={() => scrollToSection('accepted-makes')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#1A1E26',
              cursor: 'pointer',
              padding: '6px 4px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            {t.whatWeBuy}
          </button>

          {/* 3. About Us */}
          <button
            type="button"
            onClick={() => scrollToSection('about-us')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#1A1E26',
              cursor: 'pointer',
              padding: '6px 4px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            {t.aboutUs}
          </button>

          {/* 4. Counselor */}
          <button
            type="button"
            onClick={() => scrollToSection('experience-and-heart')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#1A1E26',
              cursor: 'pointer',
              padding: '6px 4px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            {t.counselor}
          </button>

          {/* 5. Contact */}
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            style={{
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#1A1E26',
              cursor: 'pointer',
              padding: '6px 4px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            {t.contact}
          </button>
        </nav>

        {/* Right Section: Phone, WhatsApp, Location, Language, Mobile Controls */}
        <div
          className="header-right-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          {/* Desktop Direct Contact Pills: Phone & WhatsApp */}
          <div className="desktop-contact-group">
            {/* Phone Button */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="nav-contact-pill nav-phone-pill"
              title={`Telefon: ${PHONE_DISPLAY}`}
            >
              <Phone size={13} color="#ff8f00" strokeWidth={2.4} />
              <span className="nav-phone-text">{PHONE_DISPLAY}</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-contact-pill nav-wa-pill"
              title={`WhatsApp: ${PHONE_DISPLAY}`}
            >
              <WhatsAppIcon size={14} color="#25D366" />
              <span className="nav-wa-text">WhatsApp</span>
            </a>
          </div>

          {/* Location Badge (Shows default place, user cannot change) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '7px 13px',
              borderRadius: '9999px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#002f61',
              userSelect: 'none',
              cursor: 'default',
            }}
            className="desktop-location-badge"
            title={`Standort: ${defaultLocation}`}
          >
            <MapPin size={13} color="#ff8f00" />
            <span>{defaultLocation}</span>
          </div>

          {/* Language Switcher (EN / DE) - Desktop only (in drawer on mobile) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#F1F5F9',
              padding: '3px 4px',
              borderRadius: '9999px',
              border: '1px solid #E2E8F0',
            }}
            className="lang-switcher-nav"
          >
            <Globe2 size={13} color="#64748B" style={{ marginLeft: '5px' }} />
            <button
              type="button"
              onClick={() => setLanguage('EN')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 9px',
                borderRadius: '9999px',
                backgroundColor: language === 'EN' ? '#002f61' : 'transparent',
                color: language === 'EN' ? '#FFFFFF' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('DE')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 9px',
                borderRadius: '9999px',
                backgroundColor: language === 'DE' ? '#002f61' : 'transparent',
                color: language === 'DE' ? '#FFFFFF' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="German (Deutsch)"
            >
              DE
            </button>
          </div>

          {/* Mobile Quick Direct Contact Actions (Top Bar) */}
          <div className="mobile-quick-actions">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="mobile-quick-btn mobile-phone-quick"
              title={`Anrufen: ${PHONE_DISPLAY}`}
              aria-label="Telefonisch kontaktieren"
            >
              <Phone size={15} color="#FFFFFF" strokeWidth={2.4} />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-quick-btn mobile-wa-quick"
              title={`WhatsApp: ${PHONE_DISPLAY}`}
              aria-label="WhatsApp Chat"
            >
              <WhatsAppIcon size={16} color="#FFFFFF" />
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '6px',
              color: '#11141B',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: 'calc(100vh - 76px)',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Mobile Contact Action Cards (Full width vertical stack for clean readability) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingBottom: '4px',
            }}
          >
            <a
              href={`tel:${PHONE_NUMBER}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '12px',
                backgroundColor: '#FFF7ED',
                border: '1px solid #FFEDD5',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#ff8f00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={17} color="#FFFFFF" strokeWidth={2.4} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#C2410C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {language === 'DE' ? 'Jetzt anrufen' : 'Call Now'}
                  </span>
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#1E293B',
                    }}
                  >
                    {PHONE_DISPLAY}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#EA580C',
                  backgroundColor: '#FFFFFF',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  border: '1px solid #FED7AA',
                }}
              >
                {language === 'DE' ? 'Direkt' : 'Direct'}
              </span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '12px',
                backgroundColor: '#F0FDF4',
                border: '1px solid #DCFCE7',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <WhatsAppIcon size={18} color="#FFFFFF" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#15803D',
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                    }}
                  >
                    WhatsApp Chat
                  </span>
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#1E293B',
                    }}
                  >
                    {PHONE_DISPLAY}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#16A34A',
                  backgroundColor: '#FFFFFF',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  border: '1px solid #BBF7D0',
                }}
              >
                Online
              </span>
            </a>
          </div>

          {/* Mobile Links */}
          <button
            type="button"
            onClick={() => {
              scrollToTop();
              setMobileMenuOpen(false);
            }}
            style={{
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 0',
              color: '#111827',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {t.home}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('accepted-makes')}
            style={{
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 0',
              color: '#111827',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {t.whatWeBuy}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('about-us')}
            style={{
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 0',
              color: '#111827',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {t.aboutUs}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('experience-and-heart')}
            style={{
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 0',
              color: '#111827',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {t.counselor}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            style={{
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 0',
              color: '#111827',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {t.contact}
          </button>

          {/* Mobile Default Location Display (Fixed, user cannot change) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <MapPin size={15} color="#ff8f00" />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1E293B' }}>
              {language === 'DE' ? 'Standort:' : 'Location:'}{' '}
              <strong style={{ color: '#002f61' }}>{defaultLocation}</strong>
            </span>
          </div>

          {/* Mobile Language Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0 6px 0',
              borderTop: '1px solid #F1F5F9',
              marginTop: '4px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#4B5565' }}>Language</span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#F1F5F9',
                padding: '3px 4px',
                borderRadius: '9999px',
                border: '1px solid #E2E8F0',
              }}
            >
              <Globe2 size={13} color="#64748B" style={{ marginLeft: '5px' }} />
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: '9999px',
                  backgroundColor: language === 'EN' ? '#002f61' : 'transparent',
                  color: language === 'EN' ? '#FFFFFF' : '#64748B',
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('DE')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: '9999px',
                  backgroundColor: language === 'DE' ? '#002f61' : 'transparent',
                  color: language === 'DE' ? '#FFFFFF' : '#64748B',
                  cursor: 'pointer',
                }}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS for Nav Interactivity */}
      <style jsx>{`
        .nav-link:hover {
          color: #002f61 !important;
        }

        .nav-contact-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-phone-pill {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #0F172A;
        }

        .nav-phone-pill:hover {
          background-color: #FFF7ED;
          border-color: #FDBA74;
          color: #EA580C;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.12);
          transform: translateY(-1px);
        }

        .nav-wa-pill {
          background-color: #F0FDF4;
          border: 1px solid #BBF7D0;
          color: #15803D;
        }

        .nav-wa-pill:hover {
          background-color: #DCFCE7;
          border-color: #86EFAC;
          color: #166534;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.16);
          transform: translateY(-1px);
        }

        .desktop-contact-group {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .mobile-quick-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mobile-quick-btn {
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .mobile-quick-btn:active {
          transform: scale(0.92);
        }

        .mobile-phone-quick {
          background-color: #ff8f00;
          box-shadow: 0 2px 6px rgba(255, 143, 0, 0.3);
        }

        .mobile-wa-quick {
          background-color: #25D366;
          box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);
        }

        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-contact-group {
            display: flex !important;
          }
          .mobile-quick-actions {
            display: none !important;
          }
        }

        @media (max-width: 1240px) and (min-width: 960px) {
          .desktop-location-badge {
            display: none !important;
          }
        }

        @media (max-width: 959px) {
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .desktop-location-badge {
            display: none !important;
          }
          .desktop-contact-group {
            display: none !important;
          }
          .lang-switcher-nav {
            display: none !important;
          }
          .header-right-group {
            gap: 8px !important;
          }
        }

        @media (max-width: 640px) {
          .header-main-row {
            height: 62px !important;
          }
        }

        @media (max-width: 380px) {
          .header-right-group {
            gap: 6px !important;
          }
          .mobile-quick-btn {
            width: 31px !important;
            height: 31px !important;
          }
        }
      `}</style>
    </header>
  );
}


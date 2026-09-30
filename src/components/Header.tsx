'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Globe2,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import BrandLogo from '@/components/BrandLogo';
import { TRANSLATIONS } from '@/data/translations';

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
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container-app"
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
            flexShrink: 0,
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

        {/* Right Section: Location Option with Search & 101 Cities, Language Switcher, Mobile Hamburger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Location Badge (Shows only default place, user cannot change) */}
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

          {/* 7. Language Switcher (EN / DE) - matching ClientTrustBento pill design */}
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
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
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

        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
        }

        @media (max-width: 959px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .desktop-location-badge {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

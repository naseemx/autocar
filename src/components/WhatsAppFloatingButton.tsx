'use client';

import React, { useState } from 'react';

// =========================================================================
// 📱 WHATSAPP CONFIGURATION
// Format: country code + number (e.g., '+4915207107540' or '4915207107540')
// =========================================================================
export const DEFAULT_WHATSAPP_NUMBER = '+4915207107540'; // 👈 PUT YOUR PHONE NUMBER HERE

// Default prefilled message (optional, user can edit or clear it)
export const DEFAULT_WHATSAPP_MESSAGE = 'Hallo! Ich interessiere mich für den Autoankauf und möchte gerne mehr erfahren.';

interface WhatsAppFloatingButtonProps {
  /**
   * Phone number with country code (e.g., '+4915207107540').
   * If omitted, falls back to DEFAULT_WHATSAPP_NUMBER.
   */
  phoneNumber?: string;
  /**
   * Optional prefilled message when the chat opens.
   */
  message?: string;
  /**
   * Floating screen position. Defaults to 'bottom-right'.
   */
  position?: 'bottom-right' | 'bottom-left';
  /**
   * Tooltip label shown on hover.
   */
  tooltipText?: string;
}

export default function WhatsAppFloatingButton({
  phoneNumber = DEFAULT_WHATSAPP_NUMBER,
  message = DEFAULT_WHATSAPP_MESSAGE,
  position = 'bottom-right',
  tooltipText = 'Chatte mit uns auf WhatsApp',
}: WhatsAppFloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Clean phone number (strip spaces, dashes, or leading '+')
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');

  // Formulate official WhatsApp universal link
  const whatsappUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
    : 'https://wa.me/';

  const isLeft = position === 'bottom-left';

  return (
    <div
      className={`whatsapp-floating-container ${isLeft ? 'pos-left' : 'pos-right'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip badge on desktop hover (auto-hidden on touch/mobile) */}
      <div
        className={`whatsapp-tooltip ${isHovered ? 'visible' : ''} ${isLeft ? 'tooltip-right' : 'tooltip-left'}`}
        aria-hidden={!isHovered}
      >
        <div className="whatsapp-tooltip-content">
          <span className="whatsapp-status-dot" />
          <span className="whatsapp-tooltip-text">{tooltipText}</span>
        </div>
      </div>

      {/* Pulsing radar ring */}
      <div className="whatsapp-pulse-ring" />

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Auf WhatsApp kontaktieren"
        title="WhatsApp Chat"
      >
        {/* Official WhatsApp Vector Logo */}
        <svg
          viewBox="0 0 32 32"
          className="whatsapp-icon"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.68.75 5.18 2.05 7.33L2 30l6.89-1.99C11.02 29.28 13.44 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.34 0-4.52-.66-6.38-1.81l-.46-.28-4.73 1.36 1.37-4.6-.3-.48C4.24 19.82 3.55 17.97 3.55 16c0-6.86 5.59-12.45 12.45-12.45s12.45 5.59 12.45 12.45-5.59 12.45-12.45 12.45zm6.83-9.33c-.37-.19-2.22-1.09-2.56-1.22-.35-.12-.6-.19-.85.19s-.98 1.22-1.2 1.47c-.22.25-.45.28-.82.09-.37-.19-1.57-.58-2.99-1.84-1.11-.99-1.86-2.21-2.07-2.58-.22-.37-.02-.57.16-.75.17-.17.37-.45.56-.67.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.09-.19-.85-2.05-1.17-2.81-.31-.74-.63-.64-.85-.65h-.73c-.25 0-.66.09-1 .47-.35.37-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.68 4.09 6.49 5.73.91.39 1.61.63 2.16.81.91.29 1.74.25 2.4.15.73-.11 2.22-.91 2.53-1.78.31-.88.31-1.63.22-1.78-.09-.16-.34-.25-.71-.44z" />
        </svg>
      </a>

      <style jsx>{`
        /* Stays completely fixed in place on both desktop & mobile viewport scroll */
        .whatsapp-floating-container {
          position: fixed;
          z-index: 9990;
          display: flex;
          align-items: center;
          pointer-events: auto;
          user-select: none;
          -webkit-user-select: none;
        }

        .whatsapp-floating-container.pos-right {
          bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          right: calc(24px + env(safe-area-inset-right, 0px));
          flex-direction: row-reverse;
        }

        .whatsapp-floating-container.pos-left {
          bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          left: calc(24px + env(safe-area-inset-left, 0px));
          flex-direction: row;
        }

        /* Pulse ring animation behind button */
        .whatsapp-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          background-color: rgba(37, 211, 102, 0.45);
          z-index: -1;
          pointer-events: none;
          animation: waPulse 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }

        @keyframes waPulse {
          0% {
            transform: scale(0.92);
            opacity: 0.8;
          }
          65% {
            transform: scale(1.36);
            opacity: 0;
          }
          100% {
            transform: scale(1.36);
            opacity: 0;
          }
        }

        /* Main Circular Action Button */
        .whatsapp-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          background: linear-gradient(145deg, #2fe675 0%, #25D366 45%, #128C7E 100%);
          color: #ffffff;
          box-shadow:
            0 10px 25px -3px rgba(37, 211, 102, 0.5),
            0 4px 12px rgba(18, 140, 126, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.4);
          cursor: pointer;
          outline: none;
          text-decoration: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease,
                      filter 0.2s ease;
        }

        /* Desktop hover only (prevents sticky hover bug on touch screens) */
        @media (hover: hover) and (pointer: fine) {
          .whatsapp-btn:hover {
            transform: scale(1.1) translateY(-3px);
            box-shadow:
              0 16px 32px -4px rgba(37, 211, 102, 0.6),
              0 8px 16px rgba(18, 140, 126, 0.35),
              inset 0 1px 2px rgba(255, 255, 255, 0.5);
            filter: brightness(1.04);
          }

          .whatsapp-btn:hover .whatsapp-icon {
            transform: rotate(-4deg) scale(1.05);
          }
        }

        /* Immediate tactile feedback on tap/touch */
        .whatsapp-btn:active {
          transform: scale(0.92) !important;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
          transition: transform 80ms ease-out, box-shadow 80ms ease-out;
        }

        .whatsapp-btn:focus-visible {
          box-shadow:
            0 0 0 3px #ffffff,
            0 0 0 6px #25D366,
            0 10px 25px rgba(37, 211, 102, 0.5);
        }

        .whatsapp-icon {
          width: 33px;
          height: 33px;
          display: block;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
          transition: transform 0.25s ease;
        }

        /* Tooltip message styling (desktop only) */
        .whatsapp-tooltip {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          z-index: 10;
        }

        .whatsapp-tooltip.tooltip-left {
          right: 74px;
          transform: translateX(10px);
        }

        .whatsapp-tooltip.tooltip-right {
          left: 74px;
          transform: translateX(-10px);
        }

        .whatsapp-tooltip.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }

        .whatsapp-tooltip-content {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.94);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 9999px;
          box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.25);
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .whatsapp-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #25D366;
          box-shadow: 0 0 8px #25D366;
          display: inline-block;
          flex-shrink: 0;
        }

        /* =========================================================================
           📱 MOBILE VIEWPORT OPTIMIZATIONS (< 640px)
           - Respects iOS / Android Home Indicator safe area insets
           - 56px touch target meets Apple & Android accessibility guidelines
           - Eliminates 300ms tap delay and sticky hover states
           ========================================================================= */
        @media (max-width: 640px) {
          .whatsapp-floating-container.pos-right {
            bottom: calc(18px + env(safe-area-inset-bottom, 0px));
            right: calc(16px + env(safe-area-inset-right, 0px));
          }

          .whatsapp-floating-container.pos-left {
            bottom: calc(18px + env(safe-area-inset-bottom, 0px));
            left: calc(16px + env(safe-area-inset-left, 0px));
          }

          .whatsapp-btn {
            width: 56px;
            height: 56px;
            box-shadow:
              0 8px 20px -2px rgba(37, 211, 102, 0.5),
              0 4px 10px rgba(18, 140, 126, 0.25);
          }

          .whatsapp-icon {
            width: 30px;
            height: 30px;
          }

          /* Never show hover tooltips on touch devices */
          .whatsapp-tooltip {
            display: none !important;
          }
        }

        /* Extra small phones (< 380px) */
        @media (max-width: 380px) {
          .whatsapp-floating-container.pos-right {
            bottom: calc(14px + env(safe-area-inset-bottom, 0px));
            right: calc(14px + env(safe-area-inset-right, 0px));
          }

          .whatsapp-btn {
            width: 52px;
            height: 52px;
          }

          .whatsapp-icon {
            width: 27px;
            height: 27px;
          }
        }
      `}</style>
    </div>
  );
}

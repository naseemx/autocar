'use client';

import React, { useState } from 'react';

// =========================================================================
// 📞 PHONE CONFIGURATION
// =========================================================================
export const DEFAULT_PHONE_NUMBER = '+4915207107540';

interface PhoneFloatingButtonProps {
  phoneNumber?: string;
  position?: 'bottom-right' | 'bottom-left';
  tooltipText?: string;
}

export default function PhoneFloatingButton({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  position = 'bottom-right',
  tooltipText = 'Jetzt anrufen',
}: PhoneFloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = position === 'bottom-left';

  return (
    <div
      className={`phone-floating-container ${isLeft ? 'pos-left' : 'pos-right'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip badge on desktop hover */}
      <div
        className={`phone-tooltip ${isHovered ? 'visible' : ''} ${isLeft ? 'tooltip-right' : 'tooltip-left'}`}
        aria-hidden={!isHovered}
      >
        <div className="phone-tooltip-content">
          <span className="phone-status-dot" />
          <span className="phone-tooltip-text">{tooltipText}</span>
        </div>
      </div>

      {/* Pulsing radar ring */}
      <div className="phone-pulse-ring" />

      {/* Floating Action Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="phone-btn"
        aria-label="Telefonisch kontaktieren"
        title="Anrufen"
      >
        <svg
          viewBox="0 0 24 24"
          className="phone-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.87 5.87l1.92-1.92a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      <style jsx>{`
        .phone-floating-container {
          position: fixed;
          z-index: 9991;
          display: flex;
          align-items: center;
          pointer-events: auto;
          user-select: none;
          -webkit-user-select: none;
        }

        .phone-floating-container.pos-right {
          bottom: calc(100px + env(safe-area-inset-bottom, 0px));
          right: calc(24px + env(safe-area-inset-right, 0px));
          flex-direction: row-reverse;
        }

        .phone-floating-container.pos-left {
          bottom: calc(100px + env(safe-area-inset-bottom, 0px));
          left: calc(24px + env(safe-area-inset-left, 0px));
          flex-direction: row;
        }

        .phone-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          background-color: rgba(255, 143, 0, 0.4);
          z-index: -1;
          pointer-events: none;
          animation: phonePulse 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          animation-delay: 0.6s;
        }

        @keyframes phonePulse {
          0% { transform: scale(0.92); opacity: 0.8; }
          65% { transform: scale(1.36); opacity: 0; }
          100% { transform: scale(1.36); opacity: 0; }
        }

        .phone-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          background: linear-gradient(145deg, #ffb300 0%, #ff8f00 45%, #e65100 100%);
          color: #ffffff;
          box-shadow:
            0 10px 25px -3px rgba(255, 143, 0, 0.55),
            0 4px 12px rgba(230, 81, 0, 0.3),
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

        @media (hover: hover) and (pointer: fine) {
          .phone-btn:hover {
            transform: scale(1.1) translateY(-3px);
            box-shadow:
              0 16px 32px -4px rgba(255, 143, 0, 0.65),
              0 8px 16px rgba(230, 81, 0, 0.35),
              inset 0 1px 2px rgba(255, 255, 255, 0.5);
            filter: brightness(1.06);
          }
          .phone-btn:hover .phone-icon {
            transform: rotate(10deg) scale(1.05);
          }
        }

        .phone-btn:active {
          transform: scale(0.92) !important;
          box-shadow: 0 4px 12px rgba(255, 143, 0, 0.4);
          transition: transform 80ms ease-out, box-shadow 80ms ease-out;
        }

        .phone-btn:focus-visible {
          box-shadow:
            0 0 0 3px #ffffff,
            0 0 0 6px #ff8f00,
            0 10px 25px rgba(255, 143, 0, 0.5);
        }

        .phone-icon {
          width: 28px;
          height: 28px;
          display: block;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          transition: transform 0.25s ease;
        }

        .phone-tooltip {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          z-index: 10;
        }

        .phone-tooltip.tooltip-left {
          right: 74px;
          transform: translateX(10px);
        }

        .phone-tooltip.tooltip-right {
          left: 74px;
          transform: translateX(-10px);
        }

        .phone-tooltip.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }

        .phone-tooltip-content {
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

        .phone-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #ff8f00;
          box-shadow: 0 0 8px #ff8f00;
          display: inline-block;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .phone-floating-container.pos-right {
            bottom: calc(72px + env(safe-area-inset-bottom, 0px));
            right: calc(16px + env(safe-area-inset-right, 0px));
          }
          .phone-floating-container.pos-left {
            bottom: calc(72px + env(safe-area-inset-bottom, 0px));
            left: calc(16px + env(safe-area-inset-left, 0px));
          }
          .phone-btn {
            width: 48px;
            height: 48px;
          }
          .phone-icon {
            width: 21px;
            height: 21px;
          }
          .phone-tooltip {
            display: none !important;
          }
        }

        @media (max-width: 380px) {
          .phone-floating-container.pos-right {
            bottom: calc(68px + env(safe-area-inset-bottom, 0px));
            right: calc(14px + env(safe-area-inset-right, 0px));
          }
          .phone-btn {
            width: 44px;
            height: 44px;
          }
          .phone-icon {
            width: 19px;
            height: 19px;
          }
        }
      `}</style>
    </div>
  );
}

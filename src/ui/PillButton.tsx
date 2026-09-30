'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  hoverVariant?: 'amber' | 'navy';
  className?: string;
  style?: React.CSSProperties;
}

export default function PillButton({
  children,
  icon,
  hoverVariant = 'amber',
  className = '',
  style = {},
  type = 'button',
  ...rest
}: PillButtonProps) {
  const isAmber = hoverVariant === 'amber';

  return (
    <button
      type={type}
      className={`project-pill-btn ${isAmber ? 'hover-amber' : 'hover-navy'} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#002f61',
        color: '#FFFFFF',
        padding: '7px 8px 7px 24px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0, 47, 97, 0.28)',
        transition: 'all 0.25s ease',
        ...style,
      }}
      {...rest}
    >
      <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <div
        className="project-pill-disc"
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          color: '#002f61',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.25s ease, color 0.25s ease',
        }}
      >
        {icon || <ArrowUpRight size={16} strokeWidth={2.4} />}
      </div>

      <style jsx>{`
        .project-pill-btn.hover-amber:hover {
          background-color: #ff8f00 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 143, 0, 0.38) !important;
        }

        .project-pill-btn.hover-amber:hover .project-pill-disc {
          transform: rotate(45deg);
          color: #ff8f00 !important;
        }

        .project-pill-btn.hover-navy:hover {
          background-color: #002247 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 47, 97, 0.45) !important;
        }

        .project-pill-btn.hover-navy:hover .project-pill-disc {
          transform: rotate(45deg);
        }

        .project-pill-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
}

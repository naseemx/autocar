import React, { forwardRef, SVGProps } from 'react';

export interface WhatsAppIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * Authentic WhatsApp Vector Icon
 * Clean official geometry with perfectly isolated speech bubble and phone handset
 */
export const WhatsAppIcon = forwardRef<SVGSVGElement, WhatsAppIconProps>(
  ({ size = 24, color = 'currentColor', className = '', style, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill={color}
        className={className}
        style={{
          display: 'block',
          flexShrink: 0,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.68.75 5.18 2.05 7.33L2 30l6.89-1.99C11.02 29.28 13.44 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.34 0-4.52-.66-6.38-1.81l-.46-.28-4.73 1.36 1.37-4.6-.3-.48C4.24 19.82 3.55 17.97 3.55 16c0-6.86 5.59-12.45 12.45-12.45s12.45 5.59 12.45 12.45-5.59 12.45-12.45 12.45zm6.83-9.33c-.37-.19-2.22-1.09-2.56-1.22-.35-.12-.6-.19-.85.19s-.98 1.22-1.2 1.47c-.22.25-.45.28-.82.09-.37-.19-1.57-.58-2.99-1.84-1.11-.99-1.86-2.21-2.07-2.58-.22-.37-.02-.57.16-.75.17-.17.37-.45.56-.67.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.09-.19-.85-2.05-1.17-2.81-.31-.74-.63-.64-.85-.65h-.73c-.25 0-.66.09-1 .47-.35.37-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.68 4.09 6.49 5.73.91.39 1.61.63 2.16.81.91.29 1.74.25 2.4.15.73-.11 2.22-.91 2.53-1.78.31-.88.31-1.63.22-1.78-.09-.16-.34-.25-.71-.44z" />
      </svg>
    );
  }
);

WhatsAppIcon.displayName = 'WhatsAppIcon';
export default WhatsAppIcon;

import React from 'react';
import { C } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: '16' | '24';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", style = {}, padding = 'lg', radius = '16' }) => {
  
  let paddingClass = "";
  if (padding === 'sm') paddingClass = "p-[8px]";
  if (padding === 'md') paddingClass = "p-[12px]";
  if (padding === 'lg') paddingClass = "p-[16px]";
  if (padding === 'xl') paddingClass = "p-[20px]";

  const radiusClass = radius === '16' ? "rounded-[16px]" : "rounded-[24px]";

  return (
    <div
      className={`backdrop-blur-[8px] overflow-hidden ${paddingClass} ${radiusClass} ${className}`}
      style={{
        backgroundColor: C.glass,
        border: `1px solid ${C.glassBorder}`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

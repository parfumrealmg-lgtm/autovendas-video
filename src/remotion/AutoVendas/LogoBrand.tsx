import React from "react";

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";

export const BoltIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg viewBox="0 0 512 512" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill={ROXO} />
    <circle cx="256" cy="256" r="200" fill="none" stroke="#5b21b6" strokeWidth="2.5" />
    <circle cx="256" cy="256" r="180" fill="none" stroke="#9554f7" strokeWidth="0.5" opacity="0.3" />
    <g transform="translate(256,256)">
      <path d="M18,-108 L-42,-12 L12,-12 L-18,108 L42,12 L-12,12 Z" fill="white" />
    </g>
  </svg>
);

export const LogoBrand: React.FC<{
  iconSize?: number;
  fontSize?: number;
  gap?: number;
  showIcon?: boolean;
}> = ({ iconSize = 48, fontSize = 48, gap = 16, showIcon = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap, justifyContent: "center" }}>
    {showIcon && <BoltIcon size={iconSize} />}
    <div>
      <span style={{ fontSize, fontWeight: 900, color: ROXO_CLARO, letterSpacing: "-0.03em" }}>
        AutoVendas
      </span>
      <span style={{ fontSize, fontWeight: 900, color: "white" }}>IA</span>
    </div>
  </div>
);

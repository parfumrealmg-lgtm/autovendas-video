import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import React from "react";
import { LogoBrand } from "./LogoBrand";
import {
  AbsoluteFill,
  Sequence,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { PromoReelsProps } from "../../../types/constants";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";

export const PromoReels: React.FC<z.infer<typeof PromoReelsProps>> = ({
  headline,
  subheadline,
  preco,
  ctaText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ fps, frame, durationInFrames: 25, config: { damping: 80 } });
  const headIn = spring({ fps, frame, delay: 15, durationInFrames: 30, config: { damping: 100 } });
  const subIn = spring({ fps, frame, delay: 35, durationInFrames: 30, config: { damping: 100 } });
  const precoIn = spring({ fps, frame, delay: 55, durationInFrames: 25, config: { damping: 80 } });
  const ctaIn = spring({ fps, frame, delay: 75, durationInFrames: 25, config: { damping: 80 } });

  const pulseScale = 1 + 0.03 * Math.sin(frame * 0.15);

  const glowOpacity = interpolate(frame, [0, 30, 90], [0, 0.6, 0.3], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROXO}66 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <Sequence from={0}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 180,
          }}
        >
          <div style={{ transform: `scale(${logoIn})`, opacity: logoIn }}>
            <LogoBrand iconSize={56} fontSize={48} gap={14} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Headline */}
      <Sequence from={15}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              transform: `translateY(${interpolate(headIn, [0, 1], [40, 0])}px)`,
              opacity: headIn,
            }}
          >
            {headline}
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* Subheadline */}
      <Sequence from={35}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 220,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: ROXO_CLARO,
              textAlign: "center",
              letterSpacing: "0.05em",
              transform: `translateY(${interpolate(subIn, [0, 1], [30, 0])}px)`,
              opacity: subIn,
            }}
          >
            {subheadline}
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* Preço */}
      <Sequence from={55}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 260,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "white",
              transform: `scale(${precoIn * pulseScale})`,
              opacity: precoIn,
            }}
          >
            {preco}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#6a6a8a",
              marginTop: 8,
              opacity: precoIn,
            }}
          >
            por mês · cancele quando quiser
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* CTA */}
      <Sequence from={75}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 120,
          }}
        >
          <div
            style={{
              background: ROXO,
              padding: "18px 48px",
              borderRadius: 14,
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              transform: `scale(${ctaIn * pulseScale})`,
              opacity: ctaIn,
            }}
          >
            {ctaText}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

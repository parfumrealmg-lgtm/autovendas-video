import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { FeaturesProps } from "../../../types/constants";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";
const CARD_BG = "#12121e";
const BORDA = "#1e1e2e";

export const Features: React.FC<z.infer<typeof FeaturesProps>> = ({
  titulo,
  features,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, durationInFrames: 30, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 400,
          background: `radial-gradient(ellipse at 50% 0%, ${ROXO}33 0%, transparent 60%)`,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Título */}
      <Sequence from={0}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 60,
          }}
        >
          <h1
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              letterSpacing: "-0.03em",
              transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
              opacity: titleIn,
            }}
          >
            {titulo}
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* Cards dos módulos */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 1100,
            padding: "0 40px",
          }}
        >
          {features.map((feat, i) => {
            const delay = 15 + i * 12;
            const cardIn = spring({
              fps,
              frame,
              delay,
              durationInFrames: 25,
              config: { damping: 80 },
            });

            return (
              <Sequence key={feat.nome} from={delay}>
                <div
                  style={{
                    background: CARD_BG,
                    border: `1px solid ${BORDA}`,
                    borderRadius: 16,
                    padding: "28px 24px",
                    width: 195,
                    transform: `translateY(${interpolate(cardIn, [0, 1], [40, 0])}px) scale(${interpolate(cardIn, [0, 1], [0.9, 1])})`,
                    opacity: cardIn,
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{feat.emoji}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e0e0f0",
                      marginBottom: 8,
                    }}
                  >
                    {feat.nome}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#6a6a8a",
                      lineHeight: 1.5,
                    }}
                  >
                    {feat.desc}
                  </div>
                </div>
              </Sequence>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Rodapé */}
      <Sequence from={80}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          {(() => {
            const footIn = spring({ fps, frame: frame - 80, durationInFrames: 25, config: { damping: 80 } });
            return (
              <div
                style={{
                  fontSize: 20,
                  color: ROXO_CLARO,
                  opacity: footIn,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                AutoVendasIA.com
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

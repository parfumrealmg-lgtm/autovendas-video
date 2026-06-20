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
import { DepoimentoProps } from "../../../types/constants";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";
const VERDE = "#10b981";

export const Depoimento: React.FC<z.infer<typeof DepoimentoProps>> = ({
  nome,
  cargo,
  texto,
  resultado,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteIn = spring({ fps, frame, delay: 10, durationInFrames: 35, config: { damping: 100 } });
  const nameIn = spring({ fps, frame, delay: 40, durationInFrames: 25, config: { damping: 80 } });
  const resultIn = spring({ fps, frame, delay: 65, durationInFrames: 30, config: { damping: 60 } });

  const initials = nome
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROXO}44 0%, transparent 70%)`,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Logo topo */}
      <Sequence from={0}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          {(() => {
            const logoIn = spring({ fps, frame, durationInFrames: 20, config: { damping: 80 } });
            return (
              <div style={{ opacity: logoIn }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: ROXO_CLARO }}>AutoVendas</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: "white" }}>IA</span>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* Aspas decorativas */}
      <Sequence from={5}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          {(() => {
            const aspIn = spring({ fps, frame: frame - 5, durationInFrames: 20, config: { damping: 80 } });
            return (
              <div
                style={{
                  fontSize: 120,
                  color: ROXO,
                  opacity: aspIn * 0.3,
                  fontWeight: 900,
                  lineHeight: 1,
                  transform: `scale(${aspIn})`,
                }}
              >
                "
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* Citação */}
      <Sequence from={10}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: "#e0e0f0",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.6,
              fontWeight: 400,
              fontStyle: "italic",
              padding: "0 60px",
              transform: `translateY(${interpolate(quoteIn, [0, 1], [30, 0])}px)`,
              opacity: quoteIn,
            }}
          >
            "{texto}"
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* Nome e cargo */}
      <Sequence from={40}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 220,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: nameIn,
              transform: `translateY(${interpolate(nameIn, [0, 1], [20, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${ROXO}, ${ROXO_CLARO})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "white",
              }}
            >
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>{nome}</div>
              <div style={{ fontSize: 15, color: "#6a6a8a" }}>{cargo}</div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Resultado */}
      <Sequence from={65}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <div
            style={{
              background: "#0d2818",
              border: `1px solid ${VERDE}44`,
              borderRadius: 14,
              padding: "16px 36px",
              transform: `scale(${resultIn})`,
              opacity: resultIn,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 900, color: VERDE, textAlign: "center" }}>
              {resultado}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

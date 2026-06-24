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
import { LogoBrand } from "./LogoBrand";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";
const FADE = 10;

function CrossFade({ children, durFrames }: { children: React.ReactNode; durFrames: number }) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durFrames - FADE, durFrames], [1, 0], { extrapolateLeft: "clamp" });
  return <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>{children}</AbsoluteFill>;
}

export const VideoDor: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${ROXO}44 0%, transparent 70%)`, left: "50%", top: "30%", transform: "translate(-50%, -50%)" }} />

      {/* CENA 1: Pergunta forte (0-3s) */}
      <Sequence from={0} durationInFrames={95}>
        <CrossFade durFrames={95}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 80 } });
              return (
                <div style={{ textAlign: "center", opacity: a, transform: `scale(${interpolate(a, [0, 1], [0.85, 1])})` }}>
                  <p style={{ fontSize: 44, fontWeight: 900, color: "white", lineHeight: 1.3 }}>
                    Quantas vendas você <span style={{ color: "#ef4444" }}>perdeu</span> essa semana?
                  </p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 2: Lista de dores (2.8s-6.5s) */}
      <Sequence from={85} durationInFrames={115}>
        <CrossFade durFrames={115}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const items = [
                "❌ Respondeu tarde demais",
                "❌ Esqueceu o follow-up",
                "❌ Não rastreou a origem",
                "❌ Postou no horário errado",
                "❌ Zero métricas de conversão",
              ];
              return (
                <div>
                  <p style={{ fontSize: 22, color: ROXO_CLARO, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 30, textAlign: "center" }}>
                    Provavelmente porque...
                  </p>
                  {items.map((t, i) => {
                    const a = spring({ fps, frame, delay: 8 + i * 12, durationInFrames: 18, config: { damping: 80 } });
                    return (
                      <p key={i} style={{ fontSize: 30, fontWeight: 700, color: "#e0e0f0", marginBottom: 16, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [-40, 0])}px)` }}>{t}</p>
                    );
                  })}
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 3: Solução (6.2s-9s) */}
      <Sequence from={195} durationInFrames={90}>
        <CrossFade durFrames={90}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 40px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              const items = [
                "✅ Bot responde 24h por você",
                "✅ Follow-up automático de 7 toques",
                "✅ UTM rastreia cada canal",
                "✅ Posts saem no horário certo",
                "✅ Dashboard com tudo em tempo real",
              ];
              return (
                <div>
                  <p style={{ fontSize: 22, color: "#10b981", textTransform: "uppercase", letterSpacing: "3px", marginBottom: 30, textAlign: "center", opacity: a }}>
                    Com AutoVendas IA...
                  </p>
                  {items.map((t, i) => {
                    const b = spring({ fps, frame, delay: 8 + i * 10, durationInFrames: 18, config: { damping: 80 } });
                    return (
                      <p key={i} style={{ fontSize: 28, fontWeight: 600, color: "#e0e0f0", marginBottom: 14, opacity: b, transform: `translateX(${interpolate(b, [0, 1], [40, 0])}px)` }}>{t}</p>
                    );
                  })}
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 4: CTA (8.7s-12s) */}
      <Sequence from={275} durationInFrames={85}>
        <CrossFade durFrames={85}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              const pulse = 1 + 0.03 * Math.sin(frame * 0.2);
              return (
                <div style={{ textAlign: "center", opacity: a }}>
                  <LogoBrand iconSize={64} fontSize={44} gap={14} />
                  <p style={{ fontSize: 24, color: "#10b981", fontWeight: 700, marginTop: 30, marginBottom: 30 }}>
                    🔥 40% OFF — R$297/mês
                  </p>
                  <div style={{ background: ROXO, padding: "18px 44px", borderRadius: 14, fontSize: 26, fontWeight: 700, color: "white", display: "inline-block", transform: `scale(${pulse})` }}>
                    Link na bio →
                  </div>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>
    </AbsoluteFill>
  );
};

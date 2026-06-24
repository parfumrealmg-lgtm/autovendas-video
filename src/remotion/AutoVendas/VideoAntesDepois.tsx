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
const VERMELHO = "#ef4444";
const VERDE = "#10b981";
const FADE = 10;

function CrossFade({ children, durFrames }: { children: React.ReactNode; durFrames: number }) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durFrames - FADE, durFrames], [1, 0], { extrapolateLeft: "clamp" });
  return <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>{children}</AbsoluteFill>;
}

export const VideoAntesDepois: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      {/* CENA 1: ANTES (0-3.5s) */}
      <Sequence from={0} durationInFrames={110}>
        <CrossFade durFrames={110}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const t = spring({ fps, frame, durationInFrames: 20, config: { damping: 80 } });
              const items = [
                { icon: "😩", text: "Acordou com 47 mensagens não lidas" },
                { icon: "😤", text: "Perdeu 3 vendas respondendo tarde" },
                { icon: "😵", text: "Postou no horário errado de novo" },
                { icon: "💸", text: "Não sabe de onde vieram as vendas" },
              ];
              return (
                <div style={{ textAlign: "center" }}>
                  <div style={{ background: VERMELHO + "22", border: `1px solid ${VERMELHO}44`, borderRadius: 100, padding: "8px 24px", display: "inline-block", marginBottom: 30, opacity: t }}>
                    <span style={{ fontSize: 18, color: VERMELHO, fontWeight: 700 }}>ANTES</span>
                  </div>
                  {items.map((item, i) => {
                    const a = spring({ fps, frame, delay: 10 + i * 12, durationInFrames: 20, config: { damping: 80 } });
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [-30, 0])}px)` }}>
                        <span style={{ fontSize: 36 }}>{item.icon}</span>
                        <span style={{ fontSize: 24, color: "#e0e0f0", fontWeight: 600, textAlign: "left" }}>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 2: DEPOIS (3.3s-7s) */}
      <Sequence from={100} durationInFrames={115}>
        <CrossFade durFrames={115}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const t = spring({ fps, frame, durationInFrames: 20, config: { damping: 80 } });
              const items = [
                { icon: "😎", text: "Bot respondeu tudo enquanto dormia" },
                { icon: "💰", text: "3 vendas fechadas automaticamente" },
                { icon: "📅", text: "Posts saíram no horário certo" },
                { icon: "📊", text: "Dashboard mostra tudo em tempo real" },
              ];
              return (
                <div style={{ textAlign: "center" }}>
                  <div style={{ background: VERDE + "22", border: `1px solid ${VERDE}44`, borderRadius: 100, padding: "8px 24px", display: "inline-block", marginBottom: 30, opacity: t }}>
                    <span style={{ fontSize: 18, color: VERDE, fontWeight: 700 }}>DEPOIS</span>
                  </div>
                  {items.map((item, i) => {
                    const a = spring({ fps, frame, delay: 10 + i * 12, durationInFrames: 20, config: { damping: 80 } });
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [30, 0])}px)` }}>
                        <span style={{ fontSize: 36 }}>{item.icon}</span>
                        <span style={{ fontSize: 24, color: "#e0e0f0", fontWeight: 600, textAlign: "left" }}>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 3: A diferença (6.7s-9.5s) */}
      <Sequence from={210} durationInFrames={90}>
        <CrossFade durFrames={90}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              return (
                <div style={{ textAlign: "center", opacity: a, transform: `scale(${a})` }}>
                  <p style={{ fontSize: 28, color: "#6a6a8a", marginBottom: 16 }}>A diferença?</p>
                  <LogoBrand iconSize={80} fontSize={56} gap={16} />
                  <p style={{ fontSize: 22, color: VERDE, marginTop: 24, fontWeight: 700 }}>Sistema pronto em 5 minutos</p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 4: CTA (9.2s-12s) */}
      <Sequence from={290} durationInFrames={70}>
        <CrossFade durFrames={70}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              const pulse = 1 + 0.03 * Math.sin(frame * 0.2);
              return (
                <div style={{ textAlign: "center", opacity: a }}>
                  <div style={{ background: "#10b98122", border: "1px solid #10b98144", borderRadius: 100, padding: "8px 24px", display: "inline-block", marginBottom: 20 }}>
                    <span style={{ fontSize: 18, color: VERDE, fontWeight: 600 }}>🔥 40% OFF lançamento</span>
                  </div>
                  <div style={{ fontSize: 64, fontWeight: 900, color: VERDE, marginBottom: 10 }}>R$297</div>
                  <p style={{ fontSize: 20, color: "#4a4a6a", marginBottom: 30 }}>/mês · primeiros 50</p>
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

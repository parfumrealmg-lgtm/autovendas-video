import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";
const CARD_BG = "#12121e";
const BORDA = "#1e1e2e";
const VERDE = "#10b981";

const modulos = [
  { emoji: "🤖", nome: "Bot WhatsApp", desc: "Fecha vendas 24h" },
  { emoji: "📅", nome: "Conteúdo auto", desc: "Posts no horário certo" },
  { emoji: "🎯", nome: "Funil 7 toques", desc: "Follow-up que converte" },
  { emoji: "🔗", nome: "Rastreador UTM", desc: "Origem de cada venda" },
  { emoji: "📊", nome: "Dashboard", desc: "Métricas em tempo real" },
];

function Glow({ x, y, size, opacity }: { x: string; y: string; size: number; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${ROXO}55 0%, transparent 70%)`,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        opacity,
      }}
    />
  );
}

export const Lancamento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = 0.4 + 0.15 * Math.sin(frame * 0.08);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      <Glow x="50%" y="35%" size={700} opacity={glowPulse} />
      <Glow x="30%" y="70%" size={400} opacity={glowPulse * 0.5} />
      <Glow x="75%" y="60%" size={350} opacity={glowPulse * 0.4} />

      {/* ═══ CENA 1: Logo reveal (0-2s) ═══ */}
      <Sequence from={0} durationInFrames={fps * 2.5}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const logoScale = spring({ fps, frame, durationInFrames: 20, config: { damping: 60 } });
            const lineWidth = interpolate(
              spring({ fps, frame, delay: 15, durationInFrames: 25, config: { damping: 100 } }),
              [0, 1], [0, 200]
            );
            return (
              <>
                <div style={{ transform: `scale(${logoScale})`, opacity: logoScale, textAlign: "center" }}>
                  <span style={{ fontSize: 72, fontWeight: 900, color: ROXO_CLARO, letterSpacing: "-0.03em" }}>
                    AutoVendas
                  </span>
                  <span style={{ fontSize: 72, fontWeight: 900, color: "white" }}>IA</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "58%",
                    width: lineWidth,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${ROXO}, transparent)`,
                    borderRadius: 2,
                  }}
                />
              </>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 2: Problema (2s-4.5s) ═══ */}
      <Sequence from={fps * 2} durationInFrames={fps * 3}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 2);
            const fadeIn = spring({ fps, frame: localFrame, durationInFrames: 20, config: { damping: 100 } });
            const items = [
              "Você responde clientes manualmente?",
              "Posta conteúdo quando lembra?",
              "Não sabe de onde vêm suas vendas?",
            ];
            return (
              <div style={{ textAlign: "center", padding: "0 80px" }}>
                <p
                  style={{
                    fontSize: 22,
                    color: ROXO_CLARO,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 40,
                    opacity: fadeIn,
                  }}
                >
                  Você ainda...
                </p>
                {items.map((t, i) => {
                  const itemIn = spring({
                    fps,
                    frame: localFrame,
                    delay: 10 + i * 12,
                    durationInFrames: 20,
                    config: { damping: 80 },
                  });
                  return (
                    <p
                      key={t}
                      style={{
                        fontSize: 36,
                        fontWeight: 700,
                        color: "#e0e0f0",
                        marginBottom: 20,
                        opacity: itemIn,
                        transform: `translateX(${interpolate(itemIn, [0, 1], [-40, 0])}px)`,
                      }}
                    >
                      {t}
                    </p>
                  );
                })}
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 3: Solução headline (4.5s-7s) ═══ */}
      <Sequence from={fps * 4.5} durationInFrames={fps * 3}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 4.5);
            const headIn = spring({ fps, frame: localFrame, durationInFrames: 25, config: { damping: 80 } });
            const subIn = spring({ fps, frame: localFrame, delay: 15, durationInFrames: 25, config: { damping: 100 } });
            return (
              <div style={{ textAlign: "center", padding: "0 60px" }}>
                <h1
                  style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: "white",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    marginBottom: 24,
                    transform: `scale(${interpolate(headIn, [0, 1], [0.8, 1])})`,
                    opacity: headIn,
                  }}
                >
                  Automatize{" "}
                  <span style={{ color: ROXO_CLARO }}>tudo</span>
                  <br />
                  com um clique
                </h1>
                <p
                  style={{
                    fontSize: 24,
                    color: "#8a8aaa",
                    opacity: subIn,
                    transform: `translateY(${interpolate(subIn, [0, 1], [20, 0])}px)`,
                  }}
                >
                  O AutoVendas IA gera o sistema completo para você
                </p>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 4: 5 módulos (7s-11s) ═══ */}
      <Sequence from={fps * 7} durationInFrames={fps * 4.5}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 7);
            const titleIn = spring({ fps, frame: localFrame, durationInFrames: 20, config: { damping: 100 } });
            return (
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: "white",
                    marginBottom: 40,
                    opacity: titleIn,
                    letterSpacing: "-0.02em",
                  }}
                >
                  5 módulos prontos
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    justifyContent: "center",
                    padding: "0 40px",
                  }}
                >
                  {modulos.map((m, i) => {
                    const cardIn = spring({
                      fps,
                      frame: localFrame,
                      delay: 10 + i * 8,
                      durationInFrames: 20,
                      config: { damping: 60 },
                    });
                    return (
                      <div
                        key={m.nome}
                        style={{
                          background: CARD_BG,
                          border: `1px solid ${BORDA}`,
                          borderRadius: 16,
                          padding: "24px 16px",
                          width: 180,
                          textAlign: "center",
                          transform: `translateY(${interpolate(cardIn, [0, 1], [60, 0])}px) scale(${interpolate(cardIn, [0, 1], [0.8, 1])})`,
                          opacity: cardIn,
                        }}
                      >
                        <div style={{ fontSize: 40, marginBottom: 10 }}>{m.emoji}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#e0e0f0", marginBottom: 6 }}>
                          {m.nome}
                        </div>
                        <div style={{ fontSize: 13, color: "#6a6a8a" }}>{m.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 5: Como funciona (11s-14s) ═══ */}
      <Sequence from={fps * 11} durationInFrames={fps * 3.5}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 11);
            const steps = [
              { n: "1", t: "Selecione suas plataformas" },
              { n: "2", t: "Ative os módulos" },
              { n: "3", t: "Ajuste a IA" },
              { n: "4", t: "Cole no Claude Code" },
            ];
            return (
              <div style={{ textAlign: "center", padding: "0 80px" }}>
                <h2
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: "white",
                    marginBottom: 40,
                    opacity: spring({ fps, frame: localFrame, durationInFrames: 20, config: { damping: 100 } }),
                  }}
                >
                  4 passos simples
                </h2>
                <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
                  {steps.map((s, i) => {
                    const stepIn = spring({
                      fps,
                      frame: localFrame,
                      delay: 8 + i * 10,
                      durationInFrames: 20,
                      config: { damping: 60 },
                    });
                    return (
                      <div
                        key={s.n}
                        style={{
                          textAlign: "center",
                          opacity: stepIn,
                          transform: `scale(${interpolate(stepIn, [0, 1], [0.7, 1])})`,
                        }}
                      >
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            background: "#1e0a4e",
                            border: `2px solid ${ROXO}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 12px",
                            fontSize: 22,
                            fontWeight: 900,
                            color: ROXO_CLARO,
                          }}
                        >
                          {s.n}
                        </div>
                        <div style={{ fontSize: 16, color: "#c0c0d8", fontWeight: 600, maxWidth: 160 }}>
                          {s.t}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 6: Preço + CTA (14s-18s) ═══ */}
      <Sequence from={fps * 14} durationInFrames={fps * 4}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 14);
            const priceIn = spring({ fps, frame: localFrame, durationInFrames: 25, config: { damping: 60 } });
            const ctaIn = spring({ fps, frame: localFrame, delay: 20, durationInFrames: 25, config: { damping: 60 } });
            const badgeIn = spring({ fps, frame: localFrame, delay: 35, durationInFrames: 20, config: { damping: 80 } });
            const pulse = 1 + 0.02 * Math.sin(localFrame * 0.2);
            return (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 20,
                    color: "#6a6a8a",
                    marginBottom: 12,
                    opacity: priceIn,
                  }}
                >
                  Assinatura mensal
                </p>
                <div
                  style={{
                    fontSize: 96,
                    fontWeight: 900,
                    color: "white",
                    lineHeight: 1,
                    marginBottom: 8,
                    transform: `scale(${priceIn * pulse})`,
                    opacity: priceIn,
                  }}
                >
                  R$500
                </div>
                <p
                  style={{
                    fontSize: 18,
                    color: "#4a4a6a",
                    marginBottom: 40,
                    opacity: priceIn,
                  }}
                >
                  /mês · cancele quando quiser
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: ROXO,
                    padding: "20px 56px",
                    borderRadius: 14,
                    fontSize: 32,
                    fontWeight: 700,
                    color: "white",
                    transform: `scale(${ctaIn * pulse})`,
                    opacity: ctaIn,
                    marginBottom: 24,
                  }}
                >
                  Comece agora →
                </div>
                <div style={{ opacity: badgeIn }}>
                  <div
                    style={{
                      display: "inline-flex",
                      gap: 24,
                      fontSize: 14,
                      color: "#6a6a8a",
                    }}
                  >
                    <span>✓ Gerador ilimitado</span>
                    <span>✓ 10 PDFs incluídos</span>
                    <span>✓ Sem fidelidade</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ═══ CENA 7: Logo final (18s-20s) ═══ */}
      <Sequence from={fps * 18}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {(() => {
            const localFrame = Math.max(0, frame - fps * 18);
            const logoIn = spring({ fps, frame: localFrame, durationInFrames: 25, config: { damping: 60 } });
            return (
              <div style={{ textAlign: "center", opacity: logoIn, transform: `scale(${logoIn})` }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 56, fontWeight: 900, color: ROXO_CLARO }}>AutoVendas</span>
                  <span style={{ fontSize: 56, fontWeight: 900, color: "white" }}>IA</span>
                </div>
                <p style={{ fontSize: 20, color: "#6a6a8a", letterSpacing: "0.05em" }}>
                  autovendas-ia.vercel.app
                </p>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

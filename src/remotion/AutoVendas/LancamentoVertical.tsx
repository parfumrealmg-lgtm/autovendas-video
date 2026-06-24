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
const CARD_BG = "#12121e";
const BORDA = "#1e1e2e";

const modulos = [
  { emoji: "🤖", nome: "Bot WhatsApp" },
  { emoji: "📅", nome: "Conteúdo auto" },
  { emoji: "🎯", nome: "Funil 7 toques" },
  { emoji: "🔗", nome: "Rastreador UTM" },
  { emoji: "📊", nome: "Dashboard" },
];

const FADE = 10;

function CrossFade({ children, durFrames }: { children: React.ReactNode; durFrames: number }) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durFrames - FADE, durFrames], [1, 0], { extrapolateLeft: "clamp" });
  return <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>{children}</AbsoluteFill>;
}

function Glow({ x, y, size }: { x: string; y: string; size: number }) {
  const frame = useCurrentFrame();
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${ROXO}55 0%, transparent 70%)`,
      left: x, top: y, transform: "translate(-50%, -50%)",
      opacity: 0.4 + 0.15 * Math.sin(frame * 0.08),
    }} />
  );
}

export const LancamentoVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      <Glow x="50%" y="30%" size={500} />
      <Glow x="30%" y="70%" size={300} />

      {/* CENA 1: Logo (0-2.5s) */}
      <Sequence from={0} durationInFrames={80}>
        <CrossFade durFrames={80}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const s = spring({ fps, frame, durationInFrames: 20, config: { damping: 60 } });
              return (
                <div style={{ transform: `scale(${s})`, textAlign: "center" }}>
                  <LogoBrand iconSize={100} fontSize={52} gap={16} />
                  <p style={{ fontSize: 18, color: "#4a4a6a", marginTop: 20, letterSpacing: "3px", textTransform: "uppercase" }}>Gerador de vendas com IA</p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 2: Problema (2.3s-5s) */}
      <Sequence from={70} durationInFrames={85}>
        <CrossFade durFrames={85}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const items = ["Responde clientes manualmente?", "Posta quando lembra?", "Perde vendas dormindo?"];
              return (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 20, color: ROXO_CLARO, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 50 }}>
                    Você ainda...
                  </p>
                  {items.map((t, i) => {
                    const a = spring({ fps, frame, delay: 8 + i * 15, durationInFrames: 20, config: { damping: 80 } });
                    return (
                      <p key={i} style={{ fontSize: 38, fontWeight: 700, color: "#e0e0f0", marginBottom: 30, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [-40, 0])}px)` }}>{t}</p>
                    );
                  })}
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 3: Solução (4.7s-7.5s) */}
      <Sequence from={150} durationInFrames={90}>
        <CrossFade durFrames={90}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 40px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const h = spring({ fps, frame, durationInFrames: 25, config: { damping: 80 } });
              const sub = spring({ fps, frame, delay: 18, durationInFrames: 25, config: { damping: 100 } });
              return (
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ fontSize: 56, fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 24, transform: `scale(${interpolate(h, [0, 1], [0.8, 1])})`, opacity: h }}>
                    Automatize <span style={{ color: ROXO_CLARO }}>tudo</span> com um clique
                  </h1>
                  <p style={{ fontSize: 22, color: "#8a8aaa", opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [20, 0])}px)` }}>
                    Sistema completo gerado em 5 minutos
                  </p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 4: Módulos (7.2s-11s) */}
      <Sequence from={230} durationInFrames={120}>
        <CrossFade durFrames={120}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 40px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              return (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <h2 style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 40, opacity: spring({ fps, frame, durationInFrames: 20, config: { damping: 100 } }) }}>
                    8 módulos prontos
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                    {modulos.map((m, i) => {
                      const c = spring({ fps, frame, delay: 10 + i * 10, durationInFrames: 20, config: { damping: 60 } });
                      return (
                        <div key={i} style={{
                          background: CARD_BG, border: `1px solid ${BORDA}`, borderRadius: 14,
                          padding: "16px 24px", width: "85%", display: "flex", alignItems: "center", gap: 16,
                          transform: `translateX(${interpolate(c, [0, 1], [60, 0])}px)`, opacity: c,
                        }}>
                          <span style={{ fontSize: 32 }}>{m.emoji}</span>
                          <span style={{ fontSize: 20, fontWeight: 700, color: "#e0e0f0" }}>{m.nome}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 5: Preço (10.7s-14s) */}
      <Sequence from={340} durationInFrames={105}>
        <CrossFade durFrames={105}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const p = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              const cta = spring({ fps, frame, delay: 20, durationInFrames: 25, config: { damping: 60 } });
              const pulse = 1 + 0.03 * Math.sin(frame * 0.2);
              return (
                <div style={{ textAlign: "center" }}>
                  <div style={{ background: "#10b98122", border: "1px solid #10b98144", borderRadius: 100, padding: "6px 20px", display: "inline-block", marginBottom: 20, opacity: p }}>
                    <span style={{ fontSize: 16, color: "#10b981", fontWeight: 600 }}>🔥 40% OFF lançamento</span>
                  </div>
                  <div style={{ fontSize: 36, color: "#4a4a6a", textDecoration: "line-through", opacity: p }}>R$500</div>
                  <div style={{ fontSize: 100, fontWeight: 900, color: "#10b981", lineHeight: 1, marginBottom: 10, transform: `scale(${p * pulse})`, opacity: p }}>R$297</div>
                  <p style={{ fontSize: 20, color: "#4a4a6a", marginBottom: 40, opacity: p }}>/mês · cancele quando quiser</p>
                  <div style={{ display: "inline-block", background: ROXO, padding: "22px 50px", borderRadius: 14, fontSize: 28, fontWeight: 700, color: "white", transform: `scale(${cta * pulse})`, opacity: cta }}>
                    Assinar agora →
                  </div>
                  <p style={{ fontSize: 16, color: "#f59e0b", marginTop: 20, opacity: cta }}>⏳ Primeiros 50 assinantes</p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 6: Garantia (13.7s-16.5s) */}
      <Sequence from={440} durationInFrames={90}>
        <CrossFade durFrames={90}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 50px" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              return (
                <div style={{ textAlign: "center", opacity: a, transform: `scale(${a})` }}>
                  <div style={{ fontSize: 80, marginBottom: 20 }}>🛡️</div>
                  <h2 style={{ fontSize: 36, fontWeight: 900, color: "#10b981", marginBottom: 16 }}>Garantia de 7 dias</h2>
                  <p style={{ fontSize: 22, color: "#8a8aaa", lineHeight: 1.6 }}>Não gostou? 100% do dinheiro de volta. Sem perguntas.</p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>

      {/* CENA 7: Logo final (16.2s-20s) */}
      <Sequence from={525} durationInFrames={75}>
        <CrossFade durFrames={75}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {(() => {
              const frame = useCurrentFrame();
              const { fps } = useVideoConfig();
              const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
              return (
                <div style={{ textAlign: "center", opacity: a, transform: `scale(${a})` }}>
                  <LogoBrand iconSize={80} fontSize={44} gap={14} />
                  <p style={{ fontSize: 18, color: "#6a6a8a", letterSpacing: "2px", marginTop: 20 }}>autovendas-ia.vercel.app</p>
                  <p style={{ fontSize: 16, color: "#4a4a6a", marginTop: 10 }}>WhatsApp: (38) 99821-9189</p>
                </div>
              );
            })()}
          </AbsoluteFill>
        </CrossFade>
      </Sequence>
    </AbsoluteFill>
  );
};

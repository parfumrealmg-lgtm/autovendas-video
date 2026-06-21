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

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

const ROXO = "#7c3aed";
const ROXO_CLARO = "#a78bfa";
const BG = "#0a0a0f";
const CARD_BG = "#12121e";
const BORDA = "#1e1e2e";

const modulos = [
  { emoji: "🤖", nome: "Bot WhatsApp", desc: "Fecha vendas 24h" },
  { emoji: "📅", nome: "Conteúdo auto", desc: "Posts no horário certo" },
  { emoji: "🎯", nome: "Funil 7 toques", desc: "Follow-up que converte" },
  { emoji: "🔗", nome: "Rastreador UTM", desc: "Origem de cada venda" },
  { emoji: "📊", nome: "Dashboard", desc: "Métricas em tempo real" },
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
  const pulse = 0.4 + 0.15 * Math.sin(frame * 0.08);
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${ROXO}55 0%, transparent 70%)`,
      left: x, top: y, transform: "translate(-50%, -50%)", opacity: pulse,
    }} />
  );
}

export const Lancamento: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      <Glow x="50%" y="35%" size={700} />
      <Glow x="30%" y="70%" size={400} />
      <Glow x="75%" y="60%" size={350} />

      {/* CENA 1: Logo (0s–2.5s) */}
      <Sequence from={0} durationInFrames={80}>
        <CrossFade durFrames={80}>
          <SceneLogo />
        </CrossFade>
      </Sequence>

      {/* CENA 2: Problema (2.3s–5.3s) */}
      <Sequence from={70} durationInFrames={95}>
        <CrossFade durFrames={95}>
          <SceneProblema />
        </CrossFade>
      </Sequence>

      {/* CENA 3: Solução (5s–8s) */}
      <Sequence from={155} durationInFrames={95}>
        <CrossFade durFrames={95}>
          <SceneSolucao />
        </CrossFade>
      </Sequence>

      {/* CENA 4: Módulos (7.7s–11.7s) */}
      <Sequence from={240} durationInFrames={125}>
        <CrossFade durFrames={125}>
          <SceneModulos />
        </CrossFade>
      </Sequence>

      {/* CENA 5: 4 passos (11.3s–14.3s) */}
      <Sequence from={355} durationInFrames={95}>
        <CrossFade durFrames={95}>
          <ScenePassos />
        </CrossFade>
      </Sequence>

      {/* CENA 6: Preço (14s–17.7s) */}
      <Sequence from={440} durationInFrames={110}>
        <CrossFade durFrames={110}>
          <ScenePreco />
        </CrossFade>
      </Sequence>

      {/* CENA 7: Logo final (17.3s–20s) */}
      <Sequence from={540} durationInFrames={60}>
        <CrossFade durFrames={60}>
          <SceneLogoFinal />
        </CrossFade>
      </Sequence>
    </AbsoluteFill>
  );
};

function SceneLogo() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ fps, frame, durationInFrames: 20, config: { damping: 60 } });
  const line = interpolate(spring({ fps, frame, delay: 15, durationInFrames: 25, config: { damping: 100 } }), [0, 1], [0, 200]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${s})`, textAlign: "center" }}>
        <span style={{ fontSize: 72, fontWeight: 900, color: ROXO_CLARO, letterSpacing: "-0.03em" }}>AutoVendas</span>
        <span style={{ fontSize: 72, fontWeight: 900, color: "white" }}>IA</span>
      </div>
      <div style={{ position: "absolute", top: "58%", width: line, height: 3, background: `linear-gradient(90deg, transparent, ${ROXO}, transparent)`, borderRadius: 2 }} />
    </AbsoluteFill>
  );
}

function SceneProblema() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = ["Você responde clientes manualmente?", "Posta conteúdo quando lembra?", "Não sabe de onde vêm suas vendas?"];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", padding: "0 80px" }}>
        <p style={{ fontSize: 22, color: ROXO_CLARO, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 40, opacity: spring({ fps, frame, durationInFrames: 15, config: { damping: 100 } }) }}>
          Você ainda...
        </p>
        {items.map((t, i) => {
          const a = spring({ fps, frame, delay: 8 + i * 15, durationInFrames: 20, config: { damping: 80 } });
          return <p key={i} style={{ fontSize: 36, fontWeight: 700, color: "#e0e0f0", marginBottom: 20, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [-40, 0])}px)` }}>{t}</p>;
        })}
      </div>
    </AbsoluteFill>
  );
}

function SceneSolucao() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const h = spring({ fps, frame, durationInFrames: 25, config: { damping: 80 } });
  const sub = spring({ fps, frame, delay: 18, durationInFrames: 25, config: { damping: 100 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", padding: "0 60px" }}>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: "white", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 24, transform: `scale(${interpolate(h, [0, 1], [0.8, 1])})`, opacity: h }}>
          Automatize <span style={{ color: ROXO_CLARO }}>tudo</span><br />com um clique
        </h1>
        <p style={{ fontSize: 24, color: "#8a8aaa", opacity: sub, transform: `translateY(${interpolate(sub, [0, 1], [20, 0])}px)` }}>
          O AutoVendas IA gera o sistema completo para você
        </p>
      </div>
    </AbsoluteFill>
  );
}

function SceneModulos() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: "white", marginBottom: 40, opacity: spring({ fps, frame, durationInFrames: 20, config: { damping: 100 } }), letterSpacing: "-0.02em" }}>
          5 módulos prontos
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", padding: "0 40px" }}>
          {modulos.map((m, i) => {
            const c = spring({ fps, frame, delay: 12 + i * 10, durationInFrames: 20, config: { damping: 60 } });
            return (
              <div key={i} style={{ background: CARD_BG, border: `1px solid ${BORDA}`, borderRadius: 16, padding: "24px 16px", width: 180, textAlign: "center", transform: `translateY(${interpolate(c, [0, 1], [60, 0])}px) scale(${interpolate(c, [0, 1], [0.8, 1])})`, opacity: c }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{m.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e0e0f0", marginBottom: 6 }}>{m.nome}</div>
                <div style={{ fontSize: 13, color: "#6a6a8a" }}>{m.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function ScenePassos() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = [{ n: "1", t: "Selecione suas plataformas" }, { n: "2", t: "Ative os módulos" }, { n: "3", t: "Ajuste a IA" }, { n: "4", t: "Cole no Claude Code" }];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", padding: "0 80px" }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 40, opacity: spring({ fps, frame, durationInFrames: 20, config: { damping: 100 } }) }}>
          4 passos simples
        </h2>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {steps.map((s, i) => {
            const a = spring({ fps, frame, delay: 8 + i * 12, durationInFrames: 20, config: { damping: 60 } });
            return (
              <div key={i} style={{ textAlign: "center", opacity: a, transform: `scale(${interpolate(a, [0, 1], [0.7, 1])})` }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1e0a4e", border: `2px solid ${ROXO}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22, fontWeight: 900, color: ROXO_CLARO }}>{s.n}</div>
                <div style={{ fontSize: 16, color: "#c0c0d8", fontWeight: 600, maxWidth: 160 }}>{s.t}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function ScenePreco() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
  const cta = spring({ fps, frame, delay: 20, durationInFrames: 25, config: { damping: 60 } });
  const badge = spring({ fps, frame, delay: 35, durationInFrames: 20, config: { damping: 80 } });
  const pulse = 1 + 0.02 * Math.sin(frame * 0.2);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 20, color: "#6a6a8a", marginBottom: 12, opacity: p }}>Assinatura mensal</p>
        <div style={{ fontSize: 96, fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 8, transform: `scale(${p * pulse})`, opacity: p }}>R$500</div>
        <p style={{ fontSize: 18, color: "#4a4a6a", marginBottom: 40, opacity: p }}>/mês · cancele quando quiser</p>
        <div style={{ display: "inline-block", background: ROXO, padding: "20px 56px", borderRadius: 14, fontSize: 32, fontWeight: 700, color: "white", transform: `scale(${cta * pulse})`, opacity: cta, marginBottom: 24 }}>Comece agora →</div>
        <div style={{ opacity: badge }}>
          <div style={{ display: "inline-flex", gap: 24, fontSize: 14, color: "#6a6a8a" }}>
            <span>✓ Gerador ilimitado</span><span>✓ 10 PDFs incluídos</span><span>✓ Sem fidelidade</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function SceneLogoFinal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ fps, frame, durationInFrames: 25, config: { damping: 60 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: a, transform: `scale(${a})` }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: ROXO_CLARO }}>AutoVendas</span>
          <span style={{ fontSize: 56, fontWeight: 900, color: "white" }}>IA</span>
        </div>
        <p style={{ fontSize: 20, color: "#6a6a8a", letterSpacing: "0.05em" }}>autovendas-ia.vercel.app</p>
      </div>
    </AbsoluteFill>
  );
}

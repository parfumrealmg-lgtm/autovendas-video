import { z } from "zod";

export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// ─── AutoVendas IA Templates ───

export const PromoReelsProps = z.object({
  headline: z.string(),
  subheadline: z.string(),
  preco: z.string(),
  ctaText: z.string(),
});

export const defaultPromoReelsProps: z.infer<typeof PromoReelsProps> = {
  headline: "Automatize suas vendas com IA",
  subheadline: "Bot WhatsApp · Funil · Dashboard · UTM",
  preco: "R$500/mês",
  ctaText: "Comece agora →",
};

export const FeaturesProps = z.object({
  titulo: z.string(),
  features: z.array(z.object({
    emoji: z.string(),
    nome: z.string(),
    desc: z.string(),
  })),
});

export const defaultFeaturesProps: z.infer<typeof FeaturesProps> = {
  titulo: "5 módulos prontos para instalar",
  features: [
    { emoji: "🤖", nome: "Bot WhatsApp", desc: "Fecha vendas 24h no automático" },
    { emoji: "📅", nome: "Máquina de conteúdo", desc: "Posta no horário certo, todo dia" },
    { emoji: "🎯", nome: "Funil de 7 toques", desc: "Follow-up que converte" },
    { emoji: "🔗", nome: "Rastreador UTM", desc: "Saiba de onde vem cada venda" },
    { emoji: "📊", nome: "Dashboard", desc: "Métricas em tempo real" },
  ],
};

export const DepoimentoProps = z.object({
  nome: z.string(),
  cargo: z.string(),
  texto: z.string(),
  resultado: z.string(),
});

export const defaultDepoimentoProps: z.infer<typeof DepoimentoProps> = {
  nome: "Maria Silva",
  cargo: "Empreendedora digital",
  texto: "Em 30 dias o bot já tinha fechado mais vendas do que eu fazia manualmente em 3 meses.",
  resultado: "+340% de conversão",
};

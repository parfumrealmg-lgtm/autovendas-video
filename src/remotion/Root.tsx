import { Composition } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultPromoReelsProps,
  defaultFeaturesProps,
  defaultDepoimentoProps,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { PromoReels } from "./AutoVendas/PromoReels";
import { Features } from "./AutoVendas/Features";
import { Depoimento } from "./AutoVendas/Depoimento";
import { Lancamento } from "./AutoVendas/Lancamento";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      {/* AutoVendas IA — Promo Reels (1080x1920 vertical) */}
      <Composition
        id="PromoReels"
        component={PromoReels}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultPromoReelsProps}
      />
      {/* AutoVendas IA — Features (1280x720 landscape) */}
      <Composition
        id="Features"
        component={Features}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={defaultFeaturesProps}
      />
      {/* AutoVendas IA — Depoimento (1080x1920 vertical) */}
      <Composition
        id="Depoimento"
        component={Depoimento}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultDepoimentoProps}
      />
      {/* AutoVendas IA — Vídeo de Lançamento (1280x720 landscape, 20s) */}
      <Composition
        id="Lancamento"
        component={Lancamento}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{}}
      />
    </>
  );
};

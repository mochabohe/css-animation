import {Composition, Folder} from "remotion";
import {
  CssAnimationPromo,
  promoDurationInFrames,
  promoFps,
} from "./CssAnimationPromo";

export const RemotionRoot = () => {
  return (
    <Folder name="css-animation">
      <Composition
        id="CssAnimationPromo16x9"
        component={CssAnimationPromo}
        durationInFrames={promoDurationInFrames}
        fps={promoFps}
        width={1920}
        height={1080}
        defaultProps={{orientation: "landscape"}}
      />
      <Composition
        id="CssAnimationPromo9x16"
        component={CssAnimationPromo}
        durationInFrames={promoDurationInFrames}
        fps={promoFps}
        width={1080}
        height={1920}
        defaultProps={{orientation: "portrait"}}
      />
    </Folder>
  );
};

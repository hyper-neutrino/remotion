import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    duration: z.optional(z.number()),
    backgroundColor: z.optional(zColor()),
    color: z.optional(zColor()),
});

export const SceneTransition: React.FC<z.infer<typeof schema>> = ({ duration, backgroundColor, color }) => {
    duration ??= 120;
    backgroundColor ??= "#2b2d31";
    color ??= "#ff0099";

    const config = useVideoConfig();
    const frame = useCurrentFrame();

    const left = config.width / 2 - config.height * 0.36;
    const right = config.width / 2 + config.height * 0.36;

    const translate =
        frame < duration / 5
            ? interpolate(frame, [0, duration / 5], [100, 0], { easing: Easing.bezier(0.6, 0, 0.6, 1) })
            : frame > (duration * 4) / 5
            ? interpolate(frame, [(duration * 4) / 5, duration], [0, 100], { easing: Easing.bezier(0.3, 0, 0.4, 0.8) })
            : 0;

    return (
        <AbsoluteFill style={{ opacity: 1 - translate / 100 }}>
            <AbsoluteFill
                style={{
                    backgroundColor: interpolateColors(
                        frame,
                        [duration / 5, (duration * 3) / 7 - duration / 20, (duration * 3) / 7 + duration / 20, (duration * 4) / 5],
                        ["#009688", "#009688", "#ff0099", "#ff0099"]
                    ),
                    opacity: frame < duration / 5 || frame > (duration * 4) / 5 ? 0 : 1,
                }}
            />
            <AbsoluteFill
                style={{
                    backgroundColor,
                    clipPath: `polygon(0% 0%, ${left - 10}px 0%, ${config.width / 2 - 10}px 50%, ${left - 10}px 100%, 0% 100%)`,
                    translate: `-${translate}%`,
                }}
            />
            <AbsoluteFill
                style={{ backgroundColor, clipPath: `polygon(${left + 10}px 0%, 100% 0%, 100% 100%, ${right + 10}px 100%)`, translate: `${translate}%` }}
            />
            <AbsoluteFill
                style={{
                    backgroundColor,
                    clipPath: `polygon(${left + 10}px 100%, 50% ${config.height / 2 + 13.76}px, ${right - 10}px 100%)`,
                    translate: `0 ${translate}%`,
                }}
            />
        </AbsoluteFill>
    );
};

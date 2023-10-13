import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    duration: z.number(),
    backgroundColor: zColor(),
    color: zColor(),
});

export const SceneTransition: React.FC<z.infer<typeof schema>> = ({ duration, backgroundColor, color }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    const left = config.width / 2 - config.height * 0.36;
    const right = config.width / 2 + config.height * 0.36;

    const translate =
        frame < duration / 4
            ? interpolate(frame, [0, duration / 4], [100, 0], { easing: Easing.bezier(0.6, 0, 0.6, 1) })
            : frame > (duration * 3) / 4
            ? interpolate(frame, [(duration * 3) / 4, duration], [0, 100], { easing: Easing.bezier(0.3, 0, 0.4, 0.8) })
            : 0;

    return (
        <>
            <AbsoluteFill
                style={{
                    backgroundColor: color,
                    opacity:
                        frame < duration / 4 || frame > (duration * 3) / 4
                            ? 0
                            : interpolate((((frame - duration / 4) * 2) / duration) * 21, [0, 1, 4, 5, 6, 7, 8, 20, 21], [0, 0.4, 0.4, 0, 0.6, 0, 1, 1, 0]),
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
        </>
    );
};

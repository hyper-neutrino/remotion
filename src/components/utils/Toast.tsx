import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
    delay: z.optional(z.number()),
    transitionDuration: z.optional(z.number()),
    duration: z.optional(z.number()),
});

export const Toast: React.FC<React.PropsWithChildren<z.infer<typeof schema>>> = ({ children, backgroundColor, delay, transitionDuration, duration }) => {
    backgroundColor ??= "#303136";
    delay ??= 0;
    transitionDuration ??= 30;
    duration ??= 270;

    const { width: w, height: h } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                top: h * 0.75,
                left: w * 0.32,
                height: h * 0.15,
                width: w * 0.36,
                borderRadius: w * 0.01,
                opacity:
                    frame > delay + transitionDuration && frame < delay + duration - transitionDuration
                        ? 1
                        : frame <= delay + transitionDuration
                        ? interpolate(frame, [delay, delay + transitionDuration], [0, 1])
                        : interpolate(frame, [delay + duration - transitionDuration, delay + duration], [1, 0], {
                              easing: Easing.bezier(0.6, -0.4, 0.8, 0.6),
                              extrapolateRight: "clamp",
                          }),
                scale: `${interpolate(
                    frame,
                    [delay + duration - transitionDuration, delay + duration],
                    [
                        interpolate(frame, [delay, delay + transitionDuration], [0.75, 1], {
                            extrapolateRight: "clamp",
                            easing: Easing.bezier(0.2, 0.8, 0.5, 1.25),
                        }),
                        0.75,
                    ],
                    { extrapolateLeft: "clamp", easing: Easing.bezier(0.6, -0.4, 0.8, 0.6) }
                )}`,
                translate: `0 ${interpolate(
                    frame,
                    [delay + duration - transitionDuration, delay + duration],
                    [
                        interpolate(frame, [delay, delay + transitionDuration], [32, 0], {
                            extrapolateRight: "clamp",
                            easing: Easing.bezier(0.2, 0.8, 0.5, 1.25),
                        }),
                        32,
                    ],
                    { extrapolateLeft: "clamp", easing: Easing.bezier(0.6, -0.4, 0.8, 0.6) }
                )}px`,
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
            }}
        >
            {children}
        </AbsoluteFill>
    );
};

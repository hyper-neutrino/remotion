import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    backgroundColor: zColor(),
});

export const FadeFrom: React.FC<z.infer<typeof schema>> = ({ backgroundColor }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <>
            {[
                interpolate(frame, [40, 60], [0, config.width * 1.5], {
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.4, 0.5, 0.6, 0.4),
                }),
                interpolate(frame, [20, 60], [0, config.width * 1.5], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.6, 0.2, 0.8, 0.5),
                }),
                interpolate(frame, [0, 60], [0, config.width * 1.5], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.5, 0.4, 1, 0.6),
                }),
            ].map((translate, index) => (
                <AbsoluteFill
                    style={{
                        backgroundColor,
                        opacity: (1 + index) / 3,
                        width: config.width * 10,
                        clipPath: "polygon(2% 0%, 0% 100%, 100% 100%, 100% 0%)",
                        translate: translate - config.width * 0.25,
                    }}
                />
            ))}
        </>
    );
};

import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    backgroundColor: zColor(),
});

export const FadeTo: React.FC<z.infer<typeof schema>> = ({ backgroundColor }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <>
            {[0, 1, 2].map((index) => (
                <AbsoluteFill
                    style={{
                        backgroundColor,
                        opacity: (1 + index) / 3,
                        width: config.width * 2,
                        clipPath: "polygon(0% 0%, 0% 100%, 90% 100%, 100% 0)",
                        translate: interpolate(frame, [20 * index, 40 + 10 * index], [-config.width * 2, -config.width * 0.8], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                            easing: Easing.bezier(0.2, 0.2, 0.8, 0.6),
                        }),
                    }}
                />
            ))}
        </>
    );
};

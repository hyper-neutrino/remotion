import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    duration: z.optional(z.number()),
    backgroundColor: z.optional(zColor()),
});

export const FadeFrom: React.FC<z.infer<typeof schema>> = ({ duration, backgroundColor }) => {
    duration ??= 90;
    backgroundColor ??= "#2b2d31";

    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <>
            {[0, 1, 2].map((index) => (
                <AbsoluteFill
                    style={{
                        backgroundColor,
                        opacity: (1 + index) / 3,
                        width: config.width * 10,
                        clipPath: "polygon(2% 0%, 0% 100%, 100% 100%, 100% 0)",
                        translate: interpolate(
                            frame,
                            [(duration! / 9) * 4 - (duration! / 9) * 2 * index, (duration! / 9) * 6 - (duration! / 9) * index],
                            [-config.width * 0.25, config.width * 1.25],
                            {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                                easing: Easing.bezier(0.2, 0.2, 0.8, 0.6),
                            }
                        ),
                    }}
                />
            ))}
        </>
    );
};

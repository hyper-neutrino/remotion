import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

const { fontFamily } = loadFont();

export const schema = z.object({
    text: z.string(),
    subtitle: z.string(),
    color: z.optional(zColor()),
    subtitleColor: z.optional(zColor()),
});

export const Title: React.FC<z.infer<typeof schema>> = ({ text, subtitle, color, subtitleColor }) => {
    color ??= "#eeeeee";
    subtitleColor ??= "#888888";

    const frame = useCurrentFrame();
    const { width: w, height: h } = useVideoConfig();

    const x = interpolate(frame, [150, 180], [0, 101]);

    return (
        <>
            <AbsoluteFill
                style={{
                    fontSize: h * 0.16,
                    fontFamily,
                    fontWeight: "bold",
                    color,
                    top: h * 0.42,
                    left: w * 0.3,
                    opacity: interpolate(frame, [0, 30], [0, 1]),
                    clipPath: `polygon(${x * 2}% 0%, ${x * 2}% 100%, 100% 100%, 100% 0%)`,
                    scale: `${interpolate(frame, [60, 90], [1, 0.5], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: Easing.bezier(0.4, 0.2, 0.4, 1),
                    })}`,
                    transformOrigin: "top left",
                }}
            >
                {text}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    fontSize: h * 0.08,
                    color: subtitleColor,
                    fontFamily,
                    top: h * 0.53,
                    left: w * 0.3,
                    opacity: interpolate(frame, [60, 90], [0, 1]),
                    clipPath: `polygon(${x}% 0%, ${x}% 100%, 100% 100%, 100% 0%)`,
                }}
            >
                {subtitle}
            </AbsoluteFill>
        </>
    );
};

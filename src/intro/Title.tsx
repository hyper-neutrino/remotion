import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    text: z.string(),
    subtitle: z.string(),
    color: zColor(),
    subtitleColor: zColor(),
});

export const Title: React.FC<z.infer<typeof schema>> = ({ text, subtitle, color, subtitleColor }) => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();

    const x = interpolate(frame, [150, 180], [0, 101]);

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap" rel="stylesheet" />
            <AbsoluteFill
                style={{
                    fontSize: config.height * 0.16,
                    fontFamily: "Share Tech",
                    fontWeight: "bold",
                    color,
                    top: config.height * 0.42,
                    left: config.width * 0.3,
                    opacity: interpolate(frame, [0, 30], [0, 1]),
                    clipPath: `polygon(${x * 2}% 0%, ${x * 2}% 100%, 100% 100%, 100% 0%)`,
                    transform: `scale(${interpolate(frame, [60, 90], [100, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
                    transformOrigin: "top left",
                }}
            >
                {text}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    fontSize: config.height * 0.08,
                    fontFamily: "Share Tech",
                    color: subtitleColor,
                    top: config.height * 0.53,
                    left: config.width * 0.3,
                    opacity: interpolate(frame, [60, 90], [0, 1]),
                    clipPath: `polygon(${x}% 0%, ${x}% 100%, 100% 100%, 100% 0%)`,
                }}
            >
                {subtitle}
            </AbsoluteFill>
        </>
    );
};

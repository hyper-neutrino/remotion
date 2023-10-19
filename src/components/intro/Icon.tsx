import { zColor } from "@remotion/zod-types";
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    primaryColor: z.optional(zColor()),
    secondaryColor: z.optional(zColor()),
});

export const Icon: React.FC<z.infer<typeof schema>> = ({ primaryColor, secondaryColor }) => {
    primaryColor ??= "#ff0099";
    secondaryColor ??= "#009688";

    const frame = useCurrentFrame();
    const config = useVideoConfig();

    const inter = (x: number, y: number, start: number, end: number) =>
        interpolate(frame, [x, y], [start, end], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.64, 0.32, 0.32, 0.64) });

    return (
        <svg
            viewBox={`0 0 ${config.width} ${config.height}`}
            style={{
                position: "absolute",
                opacity: inter(15, 45, 0, 1),
                scale: `${inter(60, 90, spring({ frame, fps: config.fps, durationInFrames: 30, delay: 15, config: { damping: 15 } }), 0.6)}`,
                translate: `${inter(240, 270, inter(60, 90, 0, -30), 61)}%`,
            }}
        >
            <rect
                width={config.width * 0.2}
                height={config.height * 0.01}
                style={{
                    fill: primaryColor,
                    rotate: "54deg",
                    translate: `${config.width * 0.45}px ${config.height * 0.34}px`,
                }}
            />
            <rect
                width={config.width * 0.1}
                height={config.height * 0.01}
                style={{ fill: primaryColor, rotate: "-54deg", translate: `${config.width * 0.445}px ${config.height * 0.625}px` }}
            />
            <rect
                x={config.width / 2 - config.width * 0.12}
                y={config.height / 2 - config.width * 0.12}
                width={config.width * 0.24}
                height={config.width * 0.24}
                rx={config.width * 0.02}
                pathLength={100}
                style={{
                    fill: "transparent",
                    stroke: `${secondaryColor}`,
                    strokeWidth: config.width / 320,
                    strokeDasharray: 100,
                    strokeDashoffset: inter(90, 120, 100, 0),
                    opacity: inter(90, 120, 0, 1),
                }}
            />
        </svg>
    );
};

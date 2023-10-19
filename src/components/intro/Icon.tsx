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
    const { width: w, height: h, fps } = useVideoConfig();

    const inter = (x: number, y: number, start: number, end: number) =>
        interpolate(frame, [x, y], [start, end], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.64, 0.32, 0.32, 0.64) });

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            style={{
                position: "absolute",
                opacity: inter(15, 45, 0, 1),
                scale: `${inter(60, 90, spring({ frame, fps, durationInFrames: 30, delay: 15, config: { damping: 15 } }), 0.6)}`,
                translate: `${inter(240, 270, inter(60, 90, 0, -30), 61)}%`,
            }}
        >
            <rect
                width={w * 0.2}
                height={h * 0.01}
                style={{
                    fill: primaryColor,
                    rotate: "54deg",
                    translate: `${w * 0.45}px ${h * 0.34}px`,
                }}
            />
            <rect width={w * 0.1} height={h * 0.01} style={{ fill: primaryColor, rotate: "-54deg", translate: `${w * 0.445}px ${h * 0.625}px` }} />
            <rect
                x={w / 2 - w * 0.12}
                y={h / 2 - w * 0.12}
                width={w * 0.24}
                height={w * 0.24}
                rx={w * 0.02}
                pathLength={100}
                style={{
                    fill: "transparent",
                    stroke: `${secondaryColor}`,
                    strokeWidth: w / 320,
                    strokeDasharray: 100,
                    strokeDashoffset: inter(90, 120, 100, 0),
                    opacity: inter(90, 120, 0, 1),
                }}
            />
        </svg>
    );
};

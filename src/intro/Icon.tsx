import { zColor } from "@remotion/zod-types";
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    primaryColor: zColor(),
    secondaryColor: zColor(),
});

export const Icon: React.FC<z.infer<typeof schema>> = ({ primaryColor, secondaryColor }) => {
    const frame = useCurrentFrame();
    const config = useVideoConfig();

    const inter = (x: number, y: number, start: number, end: number) =>
        interpolate(frame, [x, y], [start, end], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <svg
            viewBox={`0 0 ${config.width} ${config.height}`}
            style={{
                position: "absolute",
                opacity: inter(30, 60, 0, 1),
                transform: `scale(${inter(
                    60,
                    90,
                    spring({ frame, fps: config.fps, durationInFrames: 30, delay: 30, config: { damping: 15 } }),
                    0.6
                )}) translateX(${inter(240, 270, inter(60, 90, 0, -50), 101)}%)`,
            }}
        >
            <rect
                width={config.width * 0.2}
                height={config.height * 0.01}
                style={{
                    fill: primaryColor,
                    transform: `rotate(54deg) translate(42%, -45%)`,
                }}
            />
            <rect
                width={config.width * 0.1}
                height={config.height * 0.01}
                style={{
                    fill: primaryColor,
                    transform: `rotate(-54deg) translate(-2.4%, 101%)`,
                }}
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

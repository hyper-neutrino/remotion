import React from "react";
import { AbsoluteFill, interpolate, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Intro } from "../../components/Intro";

export const duration = 1000;

export const DeepDiveBezierCurves: React.FC = () => {
    const frame = useCurrentFrame();
    const { width: w, height: h } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: "#111214" }}>
            <Series.Sequence durationInFrames={330}>
                <Intro subtitle="Deep Dive: Bezier Curves" />
            </Series.Sequence>
            <Series.Sequence durationInFrames={180}>
                <svg
                    viewBox={`0 0 ${w} ${h}`}
                    style={{ strokeWidth: w * 0.01, stroke: "white", fill: "transparent", opacity: interpolate(frame, [330, 380, 480, 510], [0, 1, 1, 0]) }}
                >
                    <path d={`M ${w / 3} ${h / 3} C ${w} ${(h * 2) / 3}, ${0} ${(h * 2) / 3}, ${(w * 2) / 3} ${h / 3}`} />
                </svg>
            </Series.Sequence>
        </AbsoluteFill>
    );
};

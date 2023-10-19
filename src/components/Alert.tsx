import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
    duration: z.optional(z.number()),
    showProgress: z.optional(z.boolean()),
    progressColor: z.optional(zColor()),
});

export const Alert: React.FC<React.PropsWithChildren<z.infer<typeof schema>>> = ({ backgroundColor, duration, showProgress, progressColor, children }) => {
    backgroundColor ??= "#303136";
    duration ??= 240;
    showProgress ??= true;
    progressColor ??= "#009688";

    const { width: w, height: h } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill>
            <div
                style={{
                    opacity: interpolate(frame, [0, 30, duration - 30, duration], [0, 1, 1, 0]),
                    scale: `${interpolate(frame, [0, 30, duration], [0.9, 1, 1])}`,
                    translate:
                        frame < 30
                            ? spring({ frame, fps: 60, durationInFrames: 30, from: w * 0.25, to: 0, config: { damping: 12 } })
                            : frame > duration - 30
                            ? interpolate(frame, [duration - 30, duration], [0, w], { easing: Easing.bezier(1, -0.02, 1, 0.1) })
                            : 0,
                    transformOrigin: "50% 50%",
                    position: "relative",
                    display: "inline-block",
                    width: w * 0.4,
                    top: h * 0.05,
                    left: w * 0.6 - h * 0.05,
                    backgroundColor,
                    padding: h * 0.025,
                    borderRadius: w * 0.01,
                }}
            >
                {children}
                {showProgress ? (
                    <hr
                        style={{
                            border: `2px solid ${progressColor}`,
                            marginLeft: 0,
                            marginTop: 50,
                            width: `${interpolate(frame, [0, duration], [0, 100])}%`,
                        }}
                    />
                ) : null}
            </div>
        </AbsoluteFill>
    );
};

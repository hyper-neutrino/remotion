import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    backgroundColor: zColor(),
    duration: z.number(),
    showProgress: z.boolean(),
    progressColor: z.optional(zColor()),
});

export const Alert: React.FC<React.PropsWithChildren<z.infer<typeof schema>>> = ({ backgroundColor, duration, showProgress, progressColor, children }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill>
            <div
                style={{
                    opacity: interpolate(frame, [0, 30, duration - 30, duration], [0, 1, 1, 0]),
                    scale: `${interpolate(frame, [0, 30, duration], [0.9, 1, 1])}`,
                    translate:
                        frame < 30
                            ? spring({ frame, fps: 60, durationInFrames: 30, from: config.width * 0.25, to: 0, config: { damping: 12 } })
                            : frame > duration - 30
                            ? interpolate(frame, [duration - 30, duration], [0, config.width], { easing: Easing.bezier(1, -0.02, 1, 0.1) })
                            : 0,
                    transformOrigin: "50% 50%",
                    position: "relative",
                    display: "inline-block",
                    width: config.width * 0.4,
                    top: config.height * 0.05,
                    left: config.width * 0.6 - config.height * 0.05,
                    backgroundColor,
                    padding: config.height * 0.025,
                    borderRadius: config.width * 0.01,
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

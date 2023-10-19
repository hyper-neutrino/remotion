import { Gif } from "@remotion/gif";
import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Toast } from "./utils/Toast";

const { fontFamily } = loadFont();

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
});

export const JoinDiscord: React.FC<z.infer<typeof schema>> = ({ backgroundColor }) => {
    const { width: w, height: h } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <Toast backgroundColor={backgroundColor} delay={0} transitionDuration={30} duration={270}>
            <AbsoluteFill
                style={{
                    height: h * 0.15,
                    width: h * 0.15,
                }}
            >
                {frame < 30 || (frame > 94 && frame < 236) ? (
                    <Img src={staticFile("discord.png")} width={h * 0.15} height={h * 0.15} />
                ) : (
                    <Sequence from={frame < 135 ? 30 : 236}>
                        <Gif src={staticFile("discord.gif")} width={h * 0.15} height={h * 0.15} fit="contain" />
                    </Sequence>
                )}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    left: h * 0.1,
                    width: w * 0.36 - h * 0.1,
                    color: "#eeeeee",
                    fontSize: h * 0.03,
                    fontFamily,
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    opacity: interpolate(frame, [30, 90], [0, 1]),
                    scale: `${spring({ frame, fps: 60, durationInFrames: 60, delay: 30, from: 0.75, to: 1, config: { damping: 12 } })}`,
                }}
            >
                Join the Discord! Link in description.
            </AbsoluteFill>
        </Toast>
    );
};

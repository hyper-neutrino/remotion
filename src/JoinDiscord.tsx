import { Gif } from "@remotion/gif";
import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Toast } from "./utils/Toast";

const { fontFamily } = loadFont();

export const schema = z.object({
    backgroundColor: zColor(),
});

export const JoinDiscord: React.FC<z.infer<typeof schema>> = ({ backgroundColor }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <Toast backgroundColor={backgroundColor} delay={0} transitionDuration={30} duration={270}>
            <AbsoluteFill
                style={{
                    height: config.height * 0.15,
                    width: config.height * 0.15,
                }}
            >
                {frame < 30 || (frame > 94 && frame < 236) ? (
                    <Img src={staticFile("discord.png")} width={config.height * 0.15} height={config.height * 0.15} />
                ) : (
                    <Sequence from={frame < 135 ? 30 : 236}>
                        <Gif src={staticFile("discord.gif")} width={config.height * 0.15} height={config.height * 0.15} fit="contain" />
                    </Sequence>
                )}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    left: config.height * 0.1,
                    width: config.width * 0.36 - config.height * 0.1,
                    color: "#eeeeee",
                    fontSize: config.height * 0.03,
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

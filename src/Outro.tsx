import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Subscribe } from "./cta/Subscribe";
import { FadeTo } from "./FadeTo";
import { Pane } from "./outro/Pane";

const { fontFamily } = loadFont();

export const schema = z.object({
    backgroundColor: zColor(),
    paneColor: zColor(),
    title: z.string(),
    titleColor: zColor(),
    titleUnderlineColor: zColor(),
    subscribeBackgroundColor: zColor(),
    subscribeColor: zColor(),
    subscribeBackgroundColorFill: zColor(),
    subscribeColorFill: zColor(),
});

export const Outro: React.FC<z.infer<typeof schema>> = ({
    backgroundColor,
    paneColor,
    title,
    titleColor,
    titleUnderlineColor,
    subscribeBackgroundColor,
    subscribeColor,
    subscribeBackgroundColorFill,
    subscribeColorFill,
}) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    const w = (config.height * 0.38 * 16) / 9;

    return (
        <>
            <Sequence durationInFrames={60}>
                <FadeTo {...{ backgroundColor }} />
            </Sequence>
            <Sequence from={60}>
                <AbsoluteFill style={{ backgroundColor }}>
                    <Pane x={config.width - w - config.height * 0.08} y={config.height * 0.08} w={w} h={config.height * 0.38} backgroundColor={paneColor} />
                    <Pane x={config.width - w - config.height * 0.08} y={config.height * 0.54} w={w} h={config.height * 0.38} backgroundColor={paneColor} />
                    <AbsoluteFill
                        style={{
                            textAlign: "center",
                            width: config.width - w - config.height * 0.08,
                            top: config.height * 0.25,
                            fontSize: config.height * 0.1,
                            fontFamily,
                            color: titleColor,
                        }}
                    >
                        <div style={{ opacity: interpolate(frame, [60, 90], [0, 1]) }}>{title}</div>
                        <div
                            style={{
                                borderBottom: `2px solid ${titleUnderlineColor}`,
                                translate: `${spring({ frame, fps: 60, from: -100, to: 0, durationInFrames: 60, delay: 60, config: { damping: 12 } })}%`,
                            }}
                        />
                    </AbsoluteFill>
                    <AbsoluteFill style={{ top: config.height * 0.85, left: config.width * 0.05 }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.4em",
                                fontFamily,
                                fontSize: config.height * 0.05,
                                color: titleColor,
                            }}
                        >
                            <Subscribe {...{ subscribeColor, subscribeBackgroundColor, subscribeColorFill, subscribeBackgroundColorFill }} />
                            <div>for more!</div>
                        </div>
                    </AbsoluteFill>
                </AbsoluteFill>
            </Sequence>
        </>
    );
};

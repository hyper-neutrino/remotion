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
    backgroundColor: z.optional(zColor()),
    paneColor: z.optional(zColor()),
    title: z.optional(z.string()),
    titleColor: z.optional(zColor()),
    titleUnderlineColor: z.optional(zColor()),
    subscribeBackgroundColor: z.optional(zColor()),
    subscribeColor: z.optional(zColor()),
    subscribeBackgroundColorFill: z.optional(zColor()),
    subscribeColorFill: z.optional(zColor()),
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
    backgroundColor ??= "#2b2d31";
    title ??= "Thanks for watching!";
    titleColor ??= "#eeeeee";
    titleUnderlineColor ??= "#009688";

    const config = useVideoConfig();
    const frame = useCurrentFrame();

    const w = (config.height * 0.38 * 16) / 9;

    return (
        <>
            <Sequence durationInFrames={60}>
                <FadeTo duration={90} {...{ backgroundColor }} />
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

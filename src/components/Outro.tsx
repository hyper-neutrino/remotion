import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Subscribe } from "./cta/Subscribe";
import { FadeTo } from "./FadeTo";

const { fontFamily } = loadFont();

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
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

    const { width: w, height: h } = useVideoConfig();
    const frame = useCurrentFrame();

    const paneW = (h * 0.38 * 16) / 9;

    return (
        <>
            <Sequence durationInFrames={60}>
                <FadeTo duration={90} {...{ backgroundColor }} />
            </Sequence>
            <Sequence from={60}>
                <AbsoluteFill style={{ backgroundColor }}>
                    <AbsoluteFill
                        style={{
                            textAlign: "center",
                            width: w - paneW - h * 0.08,
                            top: h * 0.25,
                            fontSize: h * 0.1,
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
                    <AbsoluteFill style={{ top: h * 0.85, left: w * 0.05 }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.4em",
                                fontFamily,
                                fontSize: h * 0.05,
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

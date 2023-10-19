import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

const { fontFamily } = loadFont();

export const schema = z.object({
    duration: z.optional(z.number()),
    title: z.string(),
    subtitle: z.optional(z.string()),
    titleColor: z.optional(zColor()),
    subtitleColor: z.optional(zColor()),
});

export const SectionHeader: React.FC<z.infer<typeof schema>> = ({ duration, title, subtitle, titleColor, subtitleColor }) => {
    duration ??= 240;
    titleColor ??= "#eeeeee";
    subtitleColor ??= "#aaaaaa";

    const { height: h } = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
                opacity: interpolate(frame, [0, duration / 5, (duration * 7) / 8, duration], [0, 1, 1, 0]),
                scale: `${
                    frame < duration / 5
                        ? interpolate(frame, [0, duration / 5], [0.9, 1], { easing: Easing.bezier(0.1, 0.8, 0.5, 0.9) })
                        : frame > (duration * 7) / 8
                        ? interpolate(frame, [(duration * 7) / 8, duration], [1, 0.9], { easing: Easing.bezier(0.8, 0.1, 0.9, 0.4) })
                        : 1
                }`,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: h * 0.02 }}>
                <div style={{ color: titleColor, fontSize: h * 0.16, fontFamily }}>{title}</div>
                {subtitle ? <div style={{ color: subtitleColor ?? titleColor, fontSize: h * 0.08, fontFamily }}>{subtitle}</div> : null}
            </div>
        </AbsoluteFill>
    );
};

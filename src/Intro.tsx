import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { FadeFrom } from "./FadeFrom";
import { Icon } from "./intro/Icon";
import { Title } from "./intro/Title";

export const schema = z.object({
    text: z.string(),
    subtitle: z.string(),
    backgroundColor: zColor(),
    color: zColor(),
    subtitleColor: zColor(),
    primaryColor: zColor(),
    secondaryColor: zColor(),
});

export const Intro: React.FC<z.infer<typeof schema>> = ({ text, subtitle, backgroundColor, color, subtitleColor, primaryColor, secondaryColor }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: frame <= 270 ? backgroundColor : "transparent" }}>
            <Icon {...{ primaryColor, secondaryColor }} />
            <Sequence from={90}>
                <Title {...{ text, subtitle, color, subtitleColor }} />
            </Sequence>
            <Sequence from={270} durationInFrames={60}>
                <FadeFrom duration={90} {...{ backgroundColor }} />
            </Sequence>
        </AbsoluteFill>
    );
};

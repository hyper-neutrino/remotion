import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
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
    return (
        <AbsoluteFill style={{ backgroundColor }}>
            <Icon {...{ primaryColor, secondaryColor }} />
            <Sequence from={90}>
                <Title {...{ text, subtitle, color, subtitleColor }} />
            </Sequence>
        </AbsoluteFill>
    );
};

import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { FadeFrom } from "./FadeFrom";
import { FadeTo } from "./FadeTo";

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
    intermissionDuration: z.optional(z.number()),
});

export const Intermission: React.FC<React.PropsWithChildren<z.infer<typeof schema>>> = ({ backgroundColor, intermissionDuration, children }) => {
    backgroundColor ??= "#2b2d31";
    intermissionDuration ??= 240;

    return (
        <>
            <Sequence durationInFrames={60}>
                <FadeTo duration={90} {...{ backgroundColor }} />
            </Sequence>
            <Sequence from={60} durationInFrames={intermissionDuration}>
                <AbsoluteFill style={{ backgroundColor }}>{children}</AbsoluteFill>
            </Sequence>
            <Sequence from={intermissionDuration + 60}>
                <FadeFrom duration={90} {...{ backgroundColor }} />
            </Sequence>
        </>
    );
};

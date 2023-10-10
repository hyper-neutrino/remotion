import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { FadeFrom } from "./FadeFrom";
import { FadeTo } from "./FadeTo";

export const schema = z.object({
    backgroundColor: zColor(),
    intermissionDuration: z.number(),
});

export const Intermission: React.FC<React.PropsWithChildren<z.infer<typeof schema>>> = ({ backgroundColor, intermissionDuration, children }) => {
    return (
        <>
            <Sequence durationInFrames={60}>
                <FadeTo {...{ backgroundColor }} />
            </Sequence>
            <Sequence from={60} durationInFrames={intermissionDuration}>
                <AbsoluteFill style={{ backgroundColor }}>{children}</AbsoluteFill>
            </Sequence>
            <Sequence from={intermissionDuration + 60}>
                <FadeFrom {...{ backgroundColor }} />
            </Sequence>
        </>
    );
};

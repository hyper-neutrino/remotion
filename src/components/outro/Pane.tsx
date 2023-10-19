import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

export const schema = z.object({
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    backgroundColor: z.optional(zColor()),
});

export const Pane: React.FC<z.infer<typeof schema>> = ({ x, y, w, h, backgroundColor }) => {
    backgroundColor ??= "#303136";

    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                left: x,
                top: y,
                width: w,
                height: h,
                backgroundColor,
                opacity: interpolate(frame, [0, 30], [0, 1]),
                scale: interpolate(frame, [0, 30], [0.75, 1]),
            }}
        ></AbsoluteFill>
    );
};

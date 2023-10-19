import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

const { fontFamily } = loadFont();

export const schema = z.object({
    subscribeBackgroundColor: z.optional(zColor()),
    subscribeColor: z.optional(zColor()),
    subscribeBackgroundColorFill: z.optional(zColor()),
    subscribeColorFill: z.optional(zColor()),
});

export const Subscribe: React.FC<z.infer<typeof schema>> = ({ subscribeBackgroundColor, subscribeColor, subscribeBackgroundColorFill, subscribeColorFill }) => {
    subscribeBackgroundColor ??= "#eeeeee";
    subscribeColor ??= "#303136";
    subscribeBackgroundColorFill ??= "#bb4444";
    subscribeColorFill ??= "#ffffff";

    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <>
            <div
                style={{
                    fontSize: config.width * 0.02,
                    fontFamily,
                    scale: `${
                        frame < 110 || frame > 150
                            ? 1
                            : Math.min(1.12, Math.min(interpolate(frame, [110, 150], [1, 1.6]), interpolate(frame, [110, 150], [1.6, 1])))
                    }`,
                    backgroundColor: frame > 112 ? subscribeBackgroundColorFill : subscribeBackgroundColor,
                    color: frame > 112 ? subscribeColorFill : subscribeColor,
                    padding: config.width * 0.01,
                    borderRadius: config.width * 0.005,
                }}
            >
                SUBSCRIBE
            </div>
        </>
    );
};

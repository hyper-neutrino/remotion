import { zColor } from "@remotion/zod-types";
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    subscribeBackgroundColor: zColor(),
    subscribeColor: zColor(),
    subscribeBackgroundColorFill: zColor(),
    subscribeColorFill: zColor(),
});

export const Subscribe: React.FC<z.infer<typeof schema>> = ({ subscribeBackgroundColor, subscribeColor, subscribeBackgroundColorFill, subscribeColorFill }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap" rel="stylesheet" />
            <div
                style={{
                    fontSize: config.width * 0.02,
                    fontFamily: "Share Tech",
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
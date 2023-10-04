import { zColor } from "@remotion/zod-types";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Like } from "./cta/Like";
import { Notifications } from "./cta/Notifications";
import { Subscribe } from "./cta/Subscribe";

export const schema = z.object({
    backgroundColor: zColor(),
    likeColor: zColor(),
    likeColorFill: zColor(),
    subscribeBackgroundColor: zColor(),
    subscribeColor: zColor(),
    subscribeBackgroundColorFill: zColor(),
    subscribeColorFill: zColor(),
    notificationColor: zColor(),
    notificationColorFill: zColor(),
});

export const CTA: React.FC<z.infer<typeof schema>> = ({
    backgroundColor,
    likeColor,
    likeColorFill,
    subscribeBackgroundColor,
    subscribeColor,
    subscribeBackgroundColorFill,
    subscribeColorFill,
    notificationColor,
    notificationColorFill,
}) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                top: config.height * 0.75,
                left: config.width * 0.32,
                height: config.height * 0.15,
                width: config.width * 0.36,
                borderRadius: config.width * 0.01,
                opacity:
                    frame > 30 && frame < 240
                        ? 1
                        : frame <= 30
                        ? interpolate(frame, [0, 30], [0, 1])
                        : interpolate(frame, [240, 270], [1, 0], { easing: Easing.bezier(0.6, -0.4, 0.8, 0.6), extrapolateRight: "clamp" }),
                scale: `${interpolate(
                    frame,
                    [240, 270],
                    [interpolate(frame, [0, 30], [0.75, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.5, 1.25) }), 0.75],
                    { extrapolateLeft: "clamp", easing: Easing.bezier(0.6, -0.4, 0.8, 0.6) }
                )}`,
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
            }}
        >
            <Like {...{ likeColor, likeColorFill }} />
            <Subscribe {...{ subscribeBackgroundColor, subscribeColor, subscribeBackgroundColorFill, subscribeColorFill }} />
            <Notifications {...{ notificationColor, notificationColorFill }} />
        </AbsoluteFill>
    );
};

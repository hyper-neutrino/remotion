import { zColor } from "@remotion/zod-types";
import React from "react";
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    notificationColor: zColor(),
    notificationColorFill: zColor(),
});

export const Notifications: React.FC<z.infer<typeof schema>> = ({ notificationColor, notificationColorFill }) => {
    const config = useVideoConfig();
    const frame = useCurrentFrame();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={config.height * 0.09}
            viewBox="0 -960 960 960"
            width={config.height * 0.09}
            style={{
                position: "absolute",
                fill: interpolateColors(frame, [176, 184], [notificationColor, notificationColorFill]),
                top: config.height * 0.03,
                right: config.height * 0.06,
                scale: `${
                    frame < 176 || frame > 210
                        ? 1
                        : Math.min(1.12, Math.min(interpolate(frame, [176, 210], [1, 1.6]), interpolate(frame, [176, 210], [1.6, 1])))
                }`,
                rotate: `${
                    frame < 176 || frame > 210 ? 0 : Math.min(3, Math.min(interpolate(frame, [176, 210], [0, 10]), interpolate(frame, [176, 210], [10, 0])))
                }deg`,
            }}
        >
            <path
                style={{ opacity: interpolate(frame, [176, 184], [1, 0]) }}
                d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
            />
            <path
                style={{ opacity: interpolate(frame, [176, 184], [0, 1]) }}
                d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80Z"
            />
        </svg>
    );
};

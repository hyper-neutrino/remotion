import { zColor } from "@remotion/zod-types";
import React from "react";
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const schema = z.object({
    likeColor: z.optional(zColor()),
    likeColorFill: z.optional(zColor()),
});

export const Like: React.FC<z.infer<typeof schema>> = ({ likeColor, likeColorFill }) => {
    likeColor ??= "#eeeeee";
    likeColorFill ??= "#8888ee";

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
                fill: interpolateColors(frame, [56, 64], [likeColor, likeColorFill]),
                top: config.height * 0.03,
                left: config.height * 0.06,
                scale: `${
                    frame < 56 || frame > 90 ? 1 : Math.min(1.12, Math.min(interpolate(frame, [56, 90], [1, 1.6]), interpolate(frame, [56, 90], [1.6, 1])))
                }`,
                rotate: `${
                    frame < 56 || frame > 90 ? 0 : Math.min(3, Math.min(interpolate(frame, [56, 90], [0, 10]), interpolate(frame, [56, 90], [10, 0])))
                }deg`,
            }}
        >
            <path
                style={{ opacity: interpolate(frame, [56, 64], [1, 0]) }}
                d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
            />
            <path
                style={{ opacity: interpolate(frame, [56, 64], [0, 1]) }}
                d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z"
            />
        </svg>
    );
};

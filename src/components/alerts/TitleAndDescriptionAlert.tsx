import { loadFont } from "@remotion/google-fonts/ShareTech";
import { zColor } from "@remotion/zod-types";
import React from "react";
import { useVideoConfig } from "remotion";
import { z } from "zod";

const { fontFamily } = loadFont();

export const schema = z.object({
    title: z.string(),
    description: z.string(),
    titleColor: z.optional(zColor()),
    descriptionColor: z.optional(zColor()),
});

export const TitleAndDescriptionAlert: React.FC<z.infer<typeof schema>> = ({ title, description, titleColor, descriptionColor }) => {
    titleColor ??= "#eeeeee";
    descriptionColor ??= "#cccccc";

    const config = useVideoConfig();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <span style={{ color: titleColor, fontSize: config.height * 0.08, fontFamily }}>{title}</span>
            <div style={{ color: descriptionColor, fontSize: config.height * 0.04, fontFamily }}>{description}</div>
        </div>
    );
};

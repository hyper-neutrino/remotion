import { zColor } from "@remotion/zod-types";
import React from "react";
import { z } from "zod";
import { Like } from "./cta/Like";
import { Notifications } from "./cta/Notifications";
import { Subscribe } from "./cta/Subscribe";
import { Toast } from "./utils/Toast";

export const schema = z.object({
    backgroundColor: z.optional(zColor()),
    likeColor: z.optional(zColor()),
    likeColorFill: z.optional(zColor()),
    subscribeBackgroundColor: z.optional(zColor()),
    subscribeColor: z.optional(zColor()),
    subscribeBackgroundColorFill: z.optional(zColor()),
    subscribeColorFill: z.optional(zColor()),
    notificationColor: z.optional(zColor()),
    notificationColorFill: z.optional(zColor()),
});

export const Cta: React.FC<z.infer<typeof schema>> = ({
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
    return (
        <Toast backgroundColor={backgroundColor} delay={0} transitionDuration={30} duration={270}>
            <Like {...{ likeColor, likeColorFill }} />
            <Subscribe {...{ subscribeBackgroundColor, subscribeColor, subscribeBackgroundColorFill, subscribeColorFill }} />
            <Notifications {...{ notificationColor, notificationColorFill }} />
        </Toast>
    );
};

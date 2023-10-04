import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";

export const schema = z.object({});

export const Outro: React.FC<z.infer<typeof schema>> = ({}) => {
    return <AbsoluteFill></AbsoluteFill>;
};

import { Composition } from "remotion";
import { Intro, schema } from "./Intro";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                // You can take the "id" to render a video:
                // npx remotion render src/index.ts <id> out/video.mp4
                id="Intro"
                component={Intro}
                durationInFrames={270}
                fps={60}
                width={2560}
                height={1440}
                // You can override these props for each render:
                // https://www.remotion.dev/docs/parametrized-rendering
                schema={schema}
                defaultProps={{
                    text: "HyperNeutrino",
                    subtitle: "Hello, World!",
                    backgroundColor: "#2b2d31",
                    color: "#eeeeee",
                    subtitleColor: "#888888",
                    primaryColor: "#ff0099",
                    secondaryColor: "#009688",
                }}
            />
        </>
    );
};

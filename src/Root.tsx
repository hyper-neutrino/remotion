import { Composition } from "remotion";
import { CTA, schema as ctaSchema } from "./CTA";
import { Intro, schema as introSchema } from "./Intro";
import { Outro, schema as outroSchema } from "./Outro";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Intro"
                component={Intro}
                durationInFrames={270}
                fps={60}
                width={2560}
                height={1440}
                schema={introSchema}
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
            <Composition
                id="CTA"
                component={CTA}
                durationInFrames={300}
                fps={60}
                width={2560}
                height={1440}
                schema={ctaSchema}
                defaultProps={{
                    backgroundColor: "#303136",
                    likeColor: "#eeeeee",
                    likeColorFill: "#8888ee",
                    subscribeBackgroundColor: "#eeeeee",
                    subscribeColor: "#303136",
                    subscribeBackgroundColorFill: "#bb4444",
                    subscribeColorFill: "#ffffff",
                    notificationColor: "#eeeeee",
                    notificationColorFill: "#ee88ee",
                }}
            />
            <Composition id="Outro" component={Outro} durationInFrames={600} fps={60} width={2560} height={1440} schema={outroSchema} defaultProps={{}} />
        </>
    );
};

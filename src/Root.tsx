import { Composition } from "remotion";
import { CTA, schema as ctaSchema } from "./CTA";
import { FadeFrom, schema as fadeFromSchema } from "./FadeFrom";
import { FadeTo, schema as fadeToSchema } from "./FadeTo";
import { Intro, schema as introSchema } from "./Intro";
import { JoinDiscord, schema as joinDiscordSchema } from "./JoinDiscord";
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
            <Composition
                id="Outro"
                component={Outro}
                durationInFrames={600}
                fps={60}
                width={2560}
                height={1440}
                schema={outroSchema}
                defaultProps={{
                    backgroundColor: "#2b2d31",
                    paneColor: "#303136",
                    title: "Thanks for watching!",
                    titleColor: "#eeeeee",
                    titleUnderlineColor: "#009688",
                    subscribeBackgroundColor: "#eeeeee",
                    subscribeColor: "#303136",
                    subscribeBackgroundColorFill: "#bb4444",
                    subscribeColorFill: "#ffffff",
                }}
            />
            <Composition
                id="JoinDiscord"
                component={JoinDiscord}
                durationInFrames={300}
                fps={60}
                width={2560}
                height={1440}
                schema={joinDiscordSchema}
                defaultProps={{
                    backgroundColor: "#303136",
                }}
            />
            <Composition
                id="FadeTo"
                component={FadeTo}
                durationInFrames={90}
                fps={60}
                width={2560}
                height={1440}
                schema={fadeToSchema}
                defaultProps={{ backgroundColor: "#2b2d31" }}
            />
            <Composition
                id="FadeFrom"
                component={FadeFrom}
                durationInFrames={90}
                fps={60}
                width={2560}
                height={1440}
                schema={fadeFromSchema}
                defaultProps={{ backgroundColor: "#2b2d31" }}
            />
        </>
    );
};

import { zColor } from "@remotion/zod-types";
import { Composition, Sequence } from "remotion";
import { z } from "zod";
import { Alert, schema as alertSchema } from "./components/Alert";
import { TitleAndDescriptionAlert } from "./components/alerts/TitleAndDescriptionAlert";
import { CTA, schema as ctaSchema } from "./components/CTA";
import { FadeFrom, schema as fadeFromSchema } from "./components/FadeFrom";
import { FadeTo, schema as fadeToSchema } from "./components/FadeTo";
import { Intermission, schema as intermissionSchema } from "./components/Intermission";
import { SectionHeader } from "./components/intermissions/SectionHeader";
import { Intro, schema as introSchema } from "./components/Intro";
import { JoinDiscord, schema as joinDiscordSchema } from "./components/JoinDiscord";
import { Outro, schema as outroSchema } from "./components/Outro";
import { SceneTransition, schema as sceneTransitionSchema } from "./components/SceneTransition";
import { DeepDiveBezierCurves, duration as deepDiveBezierCurvesDuration } from "./videos/DeepDiveBezierCurves";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Intro"
                component={Intro}
                durationInFrames={330}
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
                defaultProps={{ duration: 90, backgroundColor: "#2b2d31" }}
            />
            <Composition
                id="FadeFrom"
                component={FadeFrom}
                durationInFrames={90}
                fps={60}
                width={2560}
                height={1440}
                schema={fadeFromSchema}
                defaultProps={{ duration: 90, backgroundColor: "#2b2d31" }}
            />
            <Composition
                id="FadeInOut"
                component={(props: { duration: number; backgroundColor: string }) => (
                    <>
                        <Sequence durationInFrames={60}>
                            <FadeTo {...props} />
                        </Sequence>
                        <Sequence from={60}>
                            <FadeFrom {...props} />
                        </Sequence>
                    </>
                )}
                durationInFrames={120}
                fps={60}
                width={2560}
                height={1440}
                schema={z.object({
                    duration: z.number(),
                    backgroundColor: zColor(),
                })}
                defaultProps={{ duration: 60, backgroundColor: "#2b2d31" }}
            />
            <Composition
                id="Intermission"
                component={Intermission}
                durationInFrames={360}
                fps={60}
                width={2560}
                height={1440}
                schema={intermissionSchema}
                defaultProps={{
                    backgroundColor: "#2b2d31",
                    intermissionDuration: 240,
                    children: <SectionHeader duration={240} title="Section Title" subtitle="Section Subtitle" titleColor="#eeeeee" subtitleColor="#aaaaaa" />,
                }}
            />
            <Composition
                id="Alert"
                component={Alert}
                durationInFrames={240}
                fps={60}
                width={2560}
                height={1440}
                schema={alertSchema}
                defaultProps={{
                    backgroundColor: "#303136",
                    duration: 240,
                    showProgress: true,
                    progressColor: "#009688",
                    children: (
                        <TitleAndDescriptionAlert
                            title="Title"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisi nunc, id laoreet est pulvinar sit amet."
                            titleColor="#eeeeee"
                            descriptionColor="#cccccc"
                        />
                    ),
                }}
            />
            <Composition
                id="SceneTransition"
                component={SceneTransition}
                durationInFrames={120}
                fps={60}
                width={2560}
                height={1440}
                schema={sceneTransitionSchema}
                defaultProps={{
                    duration: 120,
                    backgroundColor: "#2b2d31",
                    color: "#ff0099",
                }}
            />
            <Composition
                id="Video-DeepDiveBezierCurves"
                component={DeepDiveBezierCurves}
                durationInFrames={deepDiveBezierCurvesDuration}
                fps={60}
                width={2560}
                height={1440}
            />
        </>
    );
};

import { Sequence, staticFile, Video } from "remotion";
import { Cta } from "../../components/Cta";
import { Intro } from "../../components/Intro";
import { Outro } from "../../components/Outro";

const file = "tips-2023";
const name = "Advent of Code | General Tips";
const length = 55048;

export const duration = 810 + length;

export const AOC: React.FC = () => {
    return (
        <>
            <Sequence from={240} durationInFrames={length}>
                <Video src={staticFile(`aoc/${file}.mp4`)} />
            </Sequence>
            <Sequence durationInFrames={330}>
                <Intro subtitle={name} />
            </Sequence>
            <Sequence from={length + 150} durationInFrames={600}>
                <Outro />
            </Sequence>
            <Sequence from={36669} durationInFrames={300}>
                <Cta />
            </Sequence>
        </>
    );
};

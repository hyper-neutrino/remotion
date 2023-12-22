import { Series } from "remotion";
import { Intro } from "../../components/Intro";

export const duration = 500;

export const JS1: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={330}>
                <Intro subtitle="JS Lesson 1: Introduction & Setup" />
            </Series.Sequence>
        </Series>
    );
};

import type { FC } from "react";

import { StudentHero } from "@/sections/StudentHero/StudentHero";
import { useStudent } from "./Student.hooks";

const Student: FC = () => {
    useStudent();

    return (
        <main>
            <StudentHero />
        </main>
    );
};

export default Student;
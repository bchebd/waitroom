import type { FC } from "react";

import { FormContainer } from "@/components/FormContainer/FormContainer";
import { SignUpForm } from "@/sections/SignUpForm/SignUpForm";

const SignUp: FC = () => {
    return (
        <main>
            <FormContainer>
                <SignUpForm />
            </FormContainer>
        </main>
    );
};

export default SignUp;
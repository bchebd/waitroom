import type { FC } from "react";

import { FormContainer } from "@/components/FormContainer/FormContainer";
import { SignInForm } from "@/sections/SignInForm/SignInForm";

const SignIn: FC = () => {
    return (
        <main>
            <FormContainer>
                <SignInForm />
            </FormContainer>
        </main>
    );
};

export default SignIn;
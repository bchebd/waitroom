import { type FC } from "react";
import { NavLink } from "react-router";
import classNames from "classnames/bind";

import { Input } from "@/ui/Input/Input";
import { Button } from "@/ui/Button/Button";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignInForm } from "@/sections/SignInForm//SignInForm.hooks";

import styles from "@/sections/SignInForm/SignInForm.module.scss";

const cn = classNames.bind(styles);

export const SignInForm: FC = () => {
    const {
        name,
        password,
        nameError,
        passwordError,
        disabled,
        handleChange,
        handleSubmit
    } = useSignInForm();

    return (
        <div>
            <h1>
                Sign in
            </h1>
            <form action="post" onSubmit={handleSubmit}>
                <Input 
                    id="name"
                    value={name}
                    onChange={handleChange("name")}
                    label="Name"
                    error={nameError ?? nameError}
                />
                <InputPassword 
                    id="password"
                    value={password}
                    onChange={handleChange("password")}
                    label="Password"
                    error={passwordError ?? passwordError}
                />
                <Button
                    type="submit"
                    className={cn("btn")}
                    isDisabled={disabled}
                >
                    Sign in
                </Button>
            </form>
            <div className={cn("navigation")}>
                <p>Hast du noch kein Konto?</p>
                <NavLink to="/waitroom/signup">
                    Registrierung
                </NavLink>
            </div>
        </div>
    );
};
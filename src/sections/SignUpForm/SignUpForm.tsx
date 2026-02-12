import { type FC } from "react";
import { NavLink } from "react-router";
import classNames from "classnames/bind";

import { Input } from "@/ui/Input/Input";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { Button } from "@/ui/Button/Button";
import { useSignUpForm } from "@/sections/SignUpForm/SignUpForm.hooks";

import styles from "@/sections/SignUpForm/SignUpForm.module.scss";

const cn = classNames.bind(styles);

export const SignUpForm: FC = () => {
    const { 
        name, 
        password, 
        nameError,
        passwordError,
        isDisabled,
        handleChange,
        handleSubmit
    } = useSignUpForm();

    return (
        <div>
            <h1>
                Sign up
            </h1>
            <form action="post" onSubmit={handleSubmit}>
                <Input
                    value={name}
                    onChange={handleChange("name")}
                    id="name"
                    label="Name"
                    placeholder="Bsp: Tinu"
                    error={nameError && nameError}
                />
                <InputPassword
                    value={password}
                    onChange={handleChange("password")}
                    id="password"
                    label="Password"
                    placeholder="veryStrong_Pass1234"
                    error={passwordError && passwordError}
                />
                <Button 
                    type="submit"
                    className={cn("btn")}
                    isDisabled={isDisabled}
                >
                    Sign up
                </Button>
            </form>
            <div className={cn("navigation")}>
                <p>Hast du bereits ein Konto?</p>
                <NavLink to="/waitroom/signin">
                    Anmelden
                </NavLink>
            </div>
        </div>
    );
};
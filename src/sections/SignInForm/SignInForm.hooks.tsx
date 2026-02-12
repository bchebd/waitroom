import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

import { instance } from "@/store/operations/instance";
import type { User } from "@/types/entity.types";

import { useAppDispatch } from "@/store/redux.hooks";
import { refreshUser } from "@/store/operations/authThunk";

interface FormState {
    name: string,
    password: string
};

interface Errors {
    nameError: string | null,
    passwordError: string | null
};

const initialFormProps: FormState = {
    name: "",
    password: ""
};   

const initialErrors: Errors = {
    nameError: null,
    passwordError: null
};

export const useSignInForm = () => {
    const [formState, setFormState] = useState<FormState>(initialFormProps);
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const [disabled, setDisabled] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange= <K extends keyof FormState>(field: K) => (value: string): void => {
        setFormState(prev => {
            const newState = {
                ...prev,
                [field]: value
            };

            validation(newState, field);

            return newState;
        });
    };

    const validation = <K extends keyof FormState>(newState: FormState, field: K): void => {
        const errorfiled = `${field}Error`;

        setErrors(prev => {
            return {
                ...prev,
                [errorfiled]: null
            }
        });

        if (field === "name") {

            if (newState[field].trim() === "") {
                setErrors(prev => {
                    return {
                        ...prev,
                        [errorfiled]: "Kann nicht leer sein"
                    };
                });
            }

        } else if (field === "password") {

            if (newState[field].trim() === "") {
                setErrors(prev => {
                    return {
                        ...prev,
                        [errorfiled]: "Kann nicht leer sein"
                    };
                });
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isErrors = Object.values(errors).some(error => error !== null);

        if (isErrors) return;

        try {
            const response = await instance.get<User[]>(`users`);

            const foundUser = response.data.find(u => u.name.trim().toLowerCase() === formState.name.trim().toLowerCase()); 

            if (!foundUser) {
                setErrors({
                    nameError: "Name oder Passwort ist falsch",
                    passwordError: "Name oder Passwort ist falsch"
                });

                return;
            }

            const isValid = await bcrypt.compare(formState.password, foundUser.passwd);
    
            if (!isValid) {
                setErrors({
                    nameError: "Name oder Passwort ist falsch",
                    passwordError: "Name oder Passwort ist falschhdghgfxhdgfhgfhg"
                });
                
                return;
            }
    
            await dispatch(refreshUser(parseInt(foundUser.id as string) as number))
    
            navigate("/admin", { replace: true });
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        const handleDisabled = () => {
            const hasErrors = Object.values(errors).some(error => error !== null); 
            const hasEmptyFields = !formState.name.trim() || !formState.password.trim(); 

            setDisabled(hasErrors || hasEmptyFields);
        };

        handleDisabled();
    }, [disabled, errors, formState.name, formState.password]);

    return {
        name: formState.name,
        password: formState.password,
        nameError: errors.nameError,
        passwordError: errors.passwordError,
        disabled,
        handleChange,
        handleSubmit
    };
};
import { useEffect, useState, type FormEvent as ReactFormEvent } from "react";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

import { useAppDispatch, useAppSelector } from "@/store/redux.hooks";
import { registration } from "@/store/operations/authThunk";
import { getUsers } from "@/store/operations/usersThunk";
import { usersSelector } from "@/store/selectors/selectors";

interface FormStateProps {
    name: string;
    password: string;
};

interface PasswdErrorsProps {
    isEightCharacters: boolean;
    isOneUppercase: boolean;
    isOneLowercase: boolean;
    isOneNumber: boolean;
    isOneSpecialSymbol: boolean;
};

interface ErrorsState {
    nameError: string | null,
    passwordError: string | null
};

const initialFormState: FormStateProps = {
    name: '',
    password: ''
};

const initialErrorState: ErrorsState = {
    nameError:  null,
    passwordError:  null
};

export const useSignUpForm = () => {
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [errors, setErrors] = useState<ErrorsState>(initialErrorState);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    const navigate = useNavigate();

    const handleChange = (field: keyof FormStateProps) => (value: string) => {
        setFormState(prev => {
            const newState = { ...prev, [field]: value };
            validateField(newState, field);
            return newState;
        });
    };

    const validatePassword = (password: string): PasswdErrorsProps => {
        return {
            isEightCharacters: password.length >= 8,
            isOneUppercase: /[A-Z]/.test(password),
            isOneLowercase: /[a-z]/.test(password),
            isOneNumber: /[0-9]/.test(password),
            isOneSpecialSymbol: /[^A-Za-z0-9]/.test(password),
        };
    };

    const validateField = (formProps: FormStateProps, field: keyof FormStateProps): void => {
        const errorField: string = `${field}Error` as keyof ErrorsState;

        setErrors((prev) => ({ ...prev, [errorField]: null}));

        if (field === "name") {

            if (!formProps.name.trim()) {
                setErrors(prev => ({ ...prev, nameError: "Kann nicht leer sein" }));
            } else if (formProps.name.trim().length < 3) {
                setErrors(prev => ({ ...prev, nameError: "Min. 3 Symbole" }));
            } else {
                setErrors(prev => ({ ...prev, nameError: null}))
            }

        } else if (field === "password") {
            const pwdValidation = validatePassword(formProps.password);
            const hasError = Object.values(pwdValidation).some(v => v === false);

            setErrors(prev => ({
                ...prev,
                passwordError: hasError
                    ? "Das Passwort muss mindestens 8 Zeichen enthalten, Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen."
                    : null
            }));
        }
    };

    const hashPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    const isFormValid = (): boolean => {
        return !errors.nameError && 
            !errors.passwordError && 
            (formState.name.trim() !== "") && 
            (formState.password.trim() !== "");
    };

    const handleSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid()) return;

        await dispatch(getUsers());

        if (users.some(user => user.name === formState.name)) {
            setErrors(prev => ({ ...prev, nameError: "Dieser Name ist bereits vergeben"}))

            return;
        }

        const hashedPassword = await hashPassword(formState.password);

        await dispatch(registration({ 
            name: formState.name, 
            passwd: hashedPassword, 
            admin: false
        }));

        setFormState(initialFormState);

        navigate("/waitroom/", { replace: true });
    };

    useEffect(() => {
        const handleDisabled = () => {
            const hasErrors = Object.values(errors).some(error => error !== null); 
            const hasEmptyFields = !formState.name.trim() || !formState.password.trim(); 
            
            setIsDisabled(hasErrors || hasEmptyFields); 
        }

        handleDisabled();
    }, [errors, formState.name, formState.password, isDisabled]);

    return {
        name: formState.name,
        password: formState.password,
        nameError: errors.nameError,
        passwordError: errors.passwordError,
        isDisabled,
        handleChange,
        handleSubmit
    }
};
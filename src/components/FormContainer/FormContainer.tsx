import type { FC, ReactNode } from "react";

import styles from "@/components/FormContainer/FormContainer.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "@/store/redux.hooks";
import { loadingSelector } from "@/store/selectors/selectors";
import { Loader } from "@/components/Loader/Loader";

interface FormContainerProps {
    children: ReactNode,
};

const cn = classNames.bind(styles);

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
    const isLoading = useAppSelector(loadingSelector);
    
    return (
        <>
            <section className={cn("container")}>
                {children}
            </section>
            { isLoading && <Loader /> }
        </>
    );
};
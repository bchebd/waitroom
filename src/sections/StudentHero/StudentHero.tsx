import type { FC } from "react";
import classNames from "classnames/bind";

import { Button } from "@/ui/Button/Button";
import { useStudentHero } from "@/sections/StudentHero/StudentHero.hooks";
import styles from "@/sections/StudentHero/StudentHero.module.scss";
import { Loader } from "@/components/Loader/Loader";
import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { getErrorMessage } from "@/hooks/useGetErrorMessage";

const cn = classNames.bind(styles);

export const StudentHero: FC = () => {
    const {
        currentTag,
        userTag,
        isDisabled,
        isLoadingA,
        isLoadingG,
        isErrorA,
        isErrorG,
        errorA,
        errorG,
        handleCreateTag
    } = useStudentHero();

    return (
        <>
            <section className={cn("student")}>
                <div className={cn("student__container")}>
                    <ul className={cn("student__list")}>
                        <li className={
                            cn("student__item", { "student__item--active": Number(userTag) === Number(currentTag)})}>
                            <span className={cn("student__label")}>Deine Nummer</span>
                            <span className={cn("student__value")}>{userTag}</span>
                        </li>
                        <li className={cn("student__item", "student__item--active")}>
                            <span className={cn("student__label")}>Aktuelle Nummer</span>
                            <span className={cn("student__value")}>{currentTag}</span>
                        </li>
                    </ul>

                    <Button
                        className={cn("student__button")}
                        onClick={handleCreateTag}
                        isDisabled={isDisabled}
                    >
                        Hilfe
                    </Button>
                </div>
            </section>
            { (isLoadingA || isLoadingG) && <Loader /> }
            {
                (isErrorA || isErrorG) && (() => {
                    const { status, message } = getErrorMessage(errorA || errorG);

                    return (
                        <ModalPortal isOpen>
                             <div className={cn("modal__container__header")}>
                                Fehler: {status}
                            </div>

                            <div className={cn("modal__container__body")}>
                                {message}
                            </div>

                            <div className={cn("modal__container__footer")}>
                                <Button onClick={() => window.location.reload()}>
                                    Ok
                                </Button>
                            </div>
                        </ModalPortal>
                    )
                })()
            }
        </>
    );
};
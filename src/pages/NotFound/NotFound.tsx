import type { FC } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames/bind";

import { Button } from "@/ui/Button/Button";

import styles from "@/pages/NotFound/NotFound.module.scss";

const cn = classNames.bind(styles);

const NotFound: FC = () => {
    const navigate = useNavigate();

    return (
        <section className={cn("notfound-page")}>
            <div className={cn("notfound-page__container")}>
                <div className={cn("notfound-page__icon")}>
                    🚫
                </div>

                <h1 className={cn("notfound-page__title")}>
                    404
                </h1>

                <p className={cn("notfound-page__message")}>
                    Oops! Die Seite konnte nicht gefunden werden.
                </p>

                <Button
                className={cn("notfound-page__button")}
                onClick={() => navigate("/")}
                >
                    Zur Startseite
                </Button>
            </div>
        </section>
    );
};

export default NotFound;
import type { FC } from "react";
import classNames from "classnames/bind";

import styles from "@/components/Loader/Loader.module.scss";

const cn = classNames.bind(styles);

export const Loader: FC = () => {
    return (
        <section className={cn("loader")}>
            <div className={cn("loader__container")}>
                <span className={cn("loader__spinner")}></span>
            </div>
        </section>
    )
}
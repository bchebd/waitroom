import classNames from "classnames/bind";

import { Loader } from "@/components/Loader/Loader";
import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { getErrorMessage } from "@/hooks/useGetErrorMessage";
import { useAdminTable } from "@/sections/AdminTable/AdminTable.hooks";
import { Button } from "@/ui/Button/Button";

import styles from "@/sections/AdminTable/AdminTable.module.scss";

const cn = classNames.bind(styles);

export const AdminTable = () => {
    const {
        rows,
        tags,
        isLoadingG,
        isLoadingD,
        isErrorG,
        isErrorD,
        isDModalOpen,
        setIsDModalOpen,
        handleDelete,
        errorG,
        errorD
    } = useAdminTable();
  
    console.log(errorG)
    console.log(errorD)
    return (
        <>
            <section className={cn("admin-table")}>
                <div>
                    {
                        (tags !== undefined && tags?.length > 0) ?
                        (
                            <h1>
                                Aktuelle Ticket: <span>{tags !== undefined && tags?.length > 0 ? tags[0].id : ""}</span>
                            </h1>
                        ) : 
                        ""
                    }

                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Student</th>
                                <th>Done</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows}
                        </tbody>
                    </table>

                    {
                        (tags === undefined || tags?.length === 0) ?
                        (
                            <h1 className={cn("notfound")}>
                                Noch kein Ticket vorhanden
                            </h1>
                        ) : 
                        ""
                    }
                </div>
            </section>
            {
                (isLoadingG || isLoadingD) && <Loader />
            }
            {
                <ModalPortal isOpen={isDModalOpen}>
                        <div className={cn("modal__container__header")}>
                            Ticket abschliessen
                        </div>

                        <div className={cn("modal__container__body")}>
                            Bist du sicher, dass du dieses Ticket abschliessen möchtest?
                        </div>

                        <div className={cn("modal__container__footer")}>
                            <Button onClick={() => setIsDModalOpen(false)}>
                                Abbrechen
                            </Button>
                            <Button sType="secondary" onClick={() => handleDelete()}>
                                Ja, abschließen
                            </Button>
                        </div>
                </ModalPortal>
            }
            {
                (isErrorG || isErrorD) && (() => {
                    const { status, message } = getErrorMessage(errorD || errorG);


                    return (
                         <ModalPortal isOpen={true}>
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
                    );
                })()
            }
        </>
    );
};
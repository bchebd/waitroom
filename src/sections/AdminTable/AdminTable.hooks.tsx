import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";

import { getUsers } from "@/store/operations/usersThunk";
import { useAppDispatch, useAppSelector } from "@/store/redux.hooks";
import { usersSelector } from "@/store/selectors/selectors";
import { useDeleteTagMutation, useGetTagsQuery } from "@/store/services/tagApi"
import { Button } from "@/ui/Button/Button";

import styles from "@/sections/AdminTable/AdminTable.module.scss";

const cn = classNames.bind(styles);

export const useAdminTable = () => {
    const { data: tags, isLoading: isLoadingG, isError: isErrorG, error: errorG,  } = useGetTagsQuery(undefined, { pollingInterval: 6000 });
    const [deleteTag, { isLoading: isLoadingD, isError: isErrorD, error: errorD }] = useDeleteTagMutation();
    const [isDModalOpen, setIsDModalOpen] = useState<boolean>(false);
    const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);

    const handleWarningBeforeDelete = (tagId: number) => {
        setIsDModalOpen(true);

        setTicketToDelete(tagId);
    }

    const handleDelete = useCallback(
        async () => {
            try {
                setIsDModalOpen(false);

                if (!ticketToDelete) return;

                await deleteTag(ticketToDelete);
            } catch (e) {
                console.log(e)
            }
        },
        [deleteTag, ticketToDelete]
    );

    const rows = useMemo(() => {
        if (!tags) return [];

        return tags.map((tag) => {
            const userName = users.find(user => parseInt(user.id as string) === tag.userId)?.name ?? "—";

            return (
                <tr key={tag.id}>
                    <td>{tag.id}</td>
                    <td>{userName}</td>
                    <td>
                        <Button 
                            type="button" 
                            className={cn("row__button")}
                            onClick={() => handleWarningBeforeDelete(tag.id)}
                            isDisabled={isLoadingD || isLoadingG || tags[0].id !== tag.id}
                        >
                            DELETE
                        </Button>
                    </td>
                </tr>
            );
        });
    }, [tags, users, isLoadingD, isLoadingG]);

    const slicedRows = rows.slice(0, 15);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, tags]);

    return {
        slicedRows,
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
    };
};
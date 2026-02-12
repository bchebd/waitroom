import { useEffect, useState } from "react";

import { useAppSelector } from "@/store/redux.hooks";
import { authSelector } from "@/store/selectors/selectors";
import { useAddTagMutation, useGetTagsQuery } from "@/store/services/tagApi";

export const useStudentHero = () => {
    const { data: tags, isLoading: isLoadingG, isError: isErrorG, error: errorG } = useGetTagsQuery(undefined, { pollingInterval: 6000 });
    const [addTag, { isLoading: isLoadingA, isError: isErrorA, error: errorA}] = useAddTagMutation();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const user = useAppSelector(authSelector);

    const currentTag = tags?.[0]?.id ?? "Noch kein Ticket vorhanden";

    const userTag = (() => {
        const tag = tags?.find(tag => tag.userId === Number(user.id));
        return tag ? Number(tag.id) : "Du hast noch kein Ticket";
    })();

    const handleCreateTag = () => {
        if (!user.id) return;

        addTag(user.id as number);

        if (isLoadingA) setIsDisabled(true);
    };

    useEffect(() => {
        const handleDisabled = () => {
            const hasTicket = typeof userTag === "number";
            setIsDisabled(hasTicket || isLoadingA || isLoadingG);
        };

        handleDisabled();
    }, [isLoadingA, isLoadingG, userTag]);


    return {
        currentTag,
        userTag,
        isDisabled,
        isLoadingA,
        isLoadingG,
        isErrorG,
        isErrorA,
        errorG,
        errorA,
        handleCreateTag
    };
};
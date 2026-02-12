import { refreshUser } from "@/store/operations/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/redux.hooks";
import { authSelector } from "@/store/selectors/selectors";
import { useEffect } from "react"

export const useStudent = () => {
    const { id } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        dispatch(refreshUser(id as number));
    }, [dispatch, id]);

    return {};
;}
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { logout } from "@/store/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux.hooks"
import { authSelector } from "@/store/selectors/selectors"
import type { User } from "@/types/entity.types";
import { refreshUser } from "@/store/operations/authThunk";
import { useTheme } from "@/hooks/useTheme";

export const useHeader = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user: Omit<User, "passwd"> = useAppSelector(authSelector);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {accent, setNewTheme} = useTheme();

    const btnRef = useRef<HTMLButtonElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());

        navigate("/signin", { replace: true })
    };

    const handleRefresh = useCallback(() => {
        if (!user.id) return;

        dispatch(refreshUser(user.id as number));
    }, [user.id, dispatch]);
    
    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    return { name: user.name, admin: user.admin, handleLogout, handleRefresh, accent, setNewTheme, btnRef, toggleMenu, isOpen, setIsOpen };
};
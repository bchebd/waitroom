import { useAppSelector } from "@/store/redux.hooks";
import { authSelector } from "@/store/selectors/selectors";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface AdminRouteProps {
    children: ReactNode,
};

export const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
    const user = useAppSelector(authSelector);

    if (!user.id) return <Navigate to="/waitroom/signin" replace />;

    if (!user.admin) return <Navigate to="/waitroom/" replace />;

    return <>{children}</>;
};
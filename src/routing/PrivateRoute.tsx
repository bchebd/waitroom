import { useAppSelector } from "@/store/redux.hooks";
import { authSelector } from "@/store/selectors/selectors";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: ReactNode,
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const user = useAppSelector(authSelector);

    if (!user.id) return <Navigate to="/waitroom/signin" replace />;

    if (user.admin) return <Navigate to="/waitroom/admin" replace />;

    return <>{children}</>;
};
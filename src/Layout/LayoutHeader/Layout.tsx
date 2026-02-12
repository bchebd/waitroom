import { Header } from "@/components/Header/Header";
import type { FC, ReactNode } from "react";

interface LayoutHeaderProps {
    children: ReactNode
}

const LayoutHeader: FC<LayoutHeaderProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default LayoutHeader;
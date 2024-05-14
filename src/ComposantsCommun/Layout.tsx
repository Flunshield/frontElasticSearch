import { ReactNode } from 'react';
import Footer from '../ComposantsCommun/Footer';
import Header from "./Header.tsx";
import clsx from "clsx";

type LayoutProps = {
    children: ReactNode
    classnameMain?: string
    classnameFooter?: string
}

const Layout = ({ children, classnameMain, classnameFooter }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className={clsx(classnameMain, "flex-grow bg-tertiari")}>
                {children}
            </main>
            <Footer className={classnameFooter} />
        </div>
    )
}

export default Layout;

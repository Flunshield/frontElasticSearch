import React from 'react';
import clsx from "clsx";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={clsx(className, "relative bottom-0 w-full h-auto text-tertiari p-4 z-0 bg-secondary")}>
            <div className="flex mb-3 flex-col md:flex-row md:justify-between">
                <div className="max-lg:hidden">
                    {/* Contenu */}
                </div>
                <div className="flex-col mt-5">
                    {/* Contenu */}
                </div>
                <div className="flex-col mt-24 md:mt-10 text-center">
                    {/* Contenu */}
                </div>
            </div>
            <div className="mx-auto border-t-2 border-white w-2/3"></div>
            <div className="mt-16 text-center">
                <p>Copyright © {new Date().getFullYear()} Projet ElasticSearch</p>
            </div>
        </footer>
    );
};

export default Footer;

import { Link } from "react-router-dom";
import {DRAG_AND_DROP_URL, HOME_URL} from "../constante.ts";

const Header = () => {
    return (
        <header className="relative top-0 bg-secondary w-full z-10 p-10 h-28 flex items-center justify-between">
                <ul className="flex items-center space-x-6 text-2xl">
                    <li>
                        <Link to={HOME_URL} className="text-soft-gray hover:text-white transition-colors">
                            Accueil</Link>
                    </li>
                    <li>
                        <Link to={DRAG_AND_DROP_URL} className="text-soft-gray hover:text-white transition-colors">Télécharger un fichier</Link>
                    </li>
                </ul>
        </header>
    );
};

export default Header;

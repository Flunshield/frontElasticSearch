import { Link } from "react-router-dom";
import {AGREGATION_URL, DRAG_AND_DROP_URL, HOME_URL, SEARCH_URL} from "../constante.ts";

const Header = () => {
    return (
        <header className="relative top-0 bg-secondary w-full z-10 p-10 h-28 flex items-center justify-between">
            <ul className="flex items-center space-x-6 lg:text-2xl">
                <li>
                    <Link to={HOME_URL} className="text-soft-gray hover:text-white transition-colors">
                        Accueil</Link>
                </li>
                <li>
                    <Link to={DRAG_AND_DROP_URL} className="text-soft-gray hover:text-white transition-colors">Télécharger
                        un fichier</Link>
                </li>
                <li>
                    <Link to={SEARCH_URL} className="text-soft-gray hover:text-white transition-colors">Recherche
                        simple</Link>
                </li>
                <li>
                    <Link to={AGREGATION_URL} className="text-soft-gray hover:text-white transition-colors">Agrégation</Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;

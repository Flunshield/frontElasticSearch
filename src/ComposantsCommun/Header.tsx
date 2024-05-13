import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="relative top-0 bg-secondary w-full z-10 p-10 h-28 flex items-center justify-between">
                <ul className="flex items-center space-x-6 text-2xl">
                    <li>
                        <Link to="/" className="text-soft-gray hover:text-white transition-colors">Home</Link>
                    </li>
                    <li>
                        <Link to="/draanddrop" className="text-soft-gray hover:text-white transition-colors">Drag And Drop</Link>
                    </li>
                </ul>
        </header>
    );
};

export default Header;

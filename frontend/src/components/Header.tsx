import { Link } from "react-router-dom";
import pokeball from "/images/pokeball.png"

export default function Header() {

    return (
        <>
            <nav className="flex justify-between items-center px-24 py-4 absolute top-0 right-0 w-full">
                <div>
                    <a href="/" className="flex items-center">
                        <img src={pokeball} className="w-12 h-12" />
                        <span className="px-4 font-semibold text-3xl">Pokedéx</span>
                    </a>
                </div>
                <div>
                    <ul className="flex items-center text-xl">
                        <li>
                            <Link to="/" className="pr-12 hover:text-red-600 transition:colors duration-200">Search</Link>
                        </li>
                        <li>
                            <Link to="/favorite" className="hover:text-red-600 transition:colors duration-200">Favorites</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

import { Link } from "react-router-dom";
import pokeball from '/images/pokeball.png'

export default function Header() {
    return (
        <div className="flex justify-end items-center p-8 absolute top-0 right-0 w-full bg-transparent">
            <img className="w-12 h-12 mr-4" src={pokeball} alt="Pokeball" />
            <Link className='text-white' to={"/favorite"}>My Favorites =&gt;</Link>
        </div>
    )
}

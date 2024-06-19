import { Link } from "react-router-dom";
import pokeball from '/images/pokeball.png'

export default function Header() {
    return (
        <div className="flex justify-between items-center px-16 py-4 absolute top-0 right-0 w-full bg-myPurple">
            <img className="w-8 h-8 mr-4" src={pokeball} alt="Pokeball" />
            <Link className='text-white' to={"/favorite"}>My Favorites =&gt;</Link>
        </div>
    )
}

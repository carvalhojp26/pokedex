import { Link } from "react-router-dom";
import avatar from '/images/avatar.png'

export default function Header() {
    return (
        <div className="flex justify-between items-center px-16 py-4 absolute top-0 right-0 w-full bg-myPurple">
            <img className="w-8 h-8" src={avatar} alt="Pokeball" />
            <Link className='text-white ml-4 font-semibold' to={"/favorite"}>My Favorites =&gt;</Link>
        </div>
    )
}

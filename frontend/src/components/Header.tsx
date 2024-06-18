import { Link } from "react-router-dom";

export default function Header () {
    return (
        <div>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngfre.com%2Fpokeball-png%2F&psig=AOvVaw2arqy0htUJq1SMnt96aD-b&ust=1718787070584000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDMrYPj5IYDFQAAAAAdAAAAABAK" />
            <Link to={"/favorite"}>Go to my Favorites</Link>
        </div>
    )
}
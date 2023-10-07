import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

const Nav = () => {
	// accéder à l'utilisateur stocké dans le contexte
	const { user, setUser } = useContext(UserContext);

	return (
		<nav>
			<Link to={"/"}>Home</Link>
			{user ? (
				<Link to={"/logout"}> Logout</Link>
			) : (
				<>
					<Link to={"/register"}> Register</Link>
					<Link to={"/login"}> Login</Link>
				</>
			)}
			<Link to={"/admin"}> Admin</Link>
		</nav>
	);
};

export default Nav;

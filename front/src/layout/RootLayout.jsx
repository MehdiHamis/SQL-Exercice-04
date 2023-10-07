import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Nav from "../components/Nav";

const RootLayout = () => {
	// utiliser un contexte
	const { user, setUser } = useContext(UserContext);

	return (
		<>
			<p>{JSON.stringify(user)}</p>
			<Nav />
			<Outlet />
		</>
	);
};

export default RootLayout;

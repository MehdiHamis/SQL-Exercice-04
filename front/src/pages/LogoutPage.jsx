import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = () => {
	// accéder à l'utilisateur stocké dans le contexte
	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	// supprimer l'utilisateur
	useEffect(() => {
		// supprimer l'utilisateur stocké dans le contexte
		setUser();

		// message en session
		window.sessionStorage.setItem("notice", "You are logout");

		// redirection
		navigate("/");
	});

	return <></>;
};

export default LogoutPage;

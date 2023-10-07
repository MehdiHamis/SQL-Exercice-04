import { createContext, useState } from "react";

// créer un contexte : support de données
const UserContext = createContext();

// créer un provider : composant associé à un contexte
const UserProvider = ({ children }) => {
	// état permettant de stocker l'utilisateur de manière globale
	const [user, setUser] = useState();

	// value : permet de définir les données associées au Provider
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };

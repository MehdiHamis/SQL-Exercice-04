import { useState, useEffect } from "react";
import { getStudents } from "../services/api";

const ListStudents = () => {
	// état pour stocker les données de l'API
	const [students, setStudents] = useState([]);

	// état pour stocker la notification contenue dans la sessionStorage
	const [message, setMessage] = useState();

	// exécuter la requête HTTP au premier affichage du composant
	useEffect(() => {
		// récupérer les étudiants à partir de l'API
		getStudents().then((values) => setStudents(values.data));
	}, []);

	// récupérer la notification du sessionStorage
	useEffect(() => {
		// si un message existe en session
		if (window.sessionStorage.getItem("notice")) {
			// stocker le message dans l'état
			setMessage(window.sessionStorage.getItem("notice"));

			// supprimer le massage en session
			window.sessionStorage.removeItem("notice");

			// faire disparaître le message après un délai en millisecondes
			setTimeout(() => setMessage(null), 5000);
		}
	});

	return (
		<>
			<p>{message}</p>
			<h2>Students list</h2>
			{students.map((value) => (
				<p key={crypto.randomUUID()}>{value.firstname}</p>
			))}
		</>
	);
};

export default ListStudents;

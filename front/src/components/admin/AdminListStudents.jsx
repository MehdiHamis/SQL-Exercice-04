import { Link } from "react-router-dom";
import { deleteStudent, getStudents } from "../../services/api.js";
import { useEffect, useState } from "react";

const AdminListStudents = () => {
	// état pour rafraîchir le composant après la suppression d'un élève
	const [forceUpdate, setForceUpdate] = useState(false);

	// état pour stocker les données de l'API
	const [students, setStudents] = useState([]);

	// état pour stocker la notification contenue dans la sessionStorage
	const [message, setMessage] = useState();

	// exécuter la requête HTTP au premier affichage du composant
	useEffect(() => {
		// récupérer les étudiants à partir de l'API
		getStudents().then((values) => setStudents(values.data));
	}, [forceUpdate]);

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

	// supprimer un élève
	const handleClick = async (id) => {
		// console.log(id);
		const responseAPI = await deleteStudent(id);

		if (responseAPI.status === 200) {
			window.sessionStorage.setItem("notice", "Student deleted");
		} else {
			window.sessionStorage.setItem("notice", "Error");
		}

		setForceUpdate(!forceUpdate);
	};

	return (
		<>
			<p>{message}</p>
			<p>
				<Link to={"/admin/students/form"}>Add</Link>
			</p>
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Age</td>
						<td>Birthday</td>
						<td>Is external</td>
						<td>Classroom id</td>
						<td> </td>
					</tr>
				</thead>
				<tbody>
					{students.map((value) => (
						<tr key={crypto.randomUUID()}>
							<td>{`${value.firstname} ${value.lastname}`}</td>
							<td>{value.age}</td>
							<td>{new Date(value.birthday).toLocaleDateString()}</td>
							<td>{value.isExternal}</td>
							<td>{value.classroom_id}</td>
							<td>
								<Link to={`/admin/students/${value.id}/form`}>Edit</Link>
								<Link onClick={() => handleClick(value.id)}> Delete</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default AdminListStudents;

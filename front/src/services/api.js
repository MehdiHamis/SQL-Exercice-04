// récupérer tous les étudiants
const getStudents = async () => {
	// configurer la requête HTTP
	const requestInfos = new Request("http://localhost:3000/students", {
		method: "get",
	});

	// executer la requête HTTP
	const request = await fetch(requestInfos);

	// récupérer la réponse HTTP
	const response = await request.json();

	// renvoyer la réponse
	return response;
};

// créer un utilisateur
// values représente la saisie du formulaire
const createUser = async (values) => {
	const requestInfos = new Request("http://localhost:3000/users/register", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// vérifier la connexion d'un utilisateur
const checkUser = async (values) => {
	const requestInfos = new Request("http://localhost:3000/users/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// récupérer toutes les classes
const getClassrooms = async (values) => {
	const requestInfos = new Request("http://localhost:3000/classrooms", {
		method: "get",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// créer un étudiant
const createStudent = async (values) => {
	const requestInfos = new Request("http://localhost:3000/students/create", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// récupérer un étudiant par son identifiant
const getStudentsByID = async (id) => {
	const requestInfos = new Request(`http://localhost:3000/students/${id}`, {
		method: "get",
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// modifier un étudiant
const updateStudent = async (values) => {
	const requestInfos = new Request("http://localhost:3000/students/update", {
		method: "put",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

// supprimer un étudiant
const deleteStudent = async (values) => {
	const requestInfos = new Request("http://localhost:3000/students/delete", {
		method: "delete",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: values }),
	});
	const request = await fetch(requestInfos);
	const response = await request.json();
	return response;
};

export {
	getStudents,
	createUser,
	checkUser,
	getClassrooms,
	createStudent,
	getStudentsByID,
	updateStudent,
	deleteStudent,
};

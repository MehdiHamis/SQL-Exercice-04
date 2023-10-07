import express from "express";
import dbConnection from "../services/dbConnection.js";

const studentRouter = express.Router();

// exécuter une requête sur le serveur mysql
/*
	le nom d'une table SQL devient une route
		- par ex. avec une table student
			GET : /students > renvoyer tous les étudiants
			POST : /students > créer un étudiant
			PUT : /students/IDENTIFIANT > modifier un étudiant
			DELETE : /students/IDENTIFIANT > supprimer un étudiant
*/
studentRouter.get("/", async (req, res) => {
	// requête SQl à exécuter
	const query = `
		SELECT student.*
		FROM formation.student;
	`;

	// exécuter la requête
	try {
		// récupérer les résultats de la requête
		const [results] = await dbConnection.execute(query);
		// console.log(results);

		// renvoyer la réponse HTTP
		return res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}

	// return res.send("endpoint students");
});

// récupérer un étudiant par son identifiant : /students/:id
studentRouter.get("/:id", async (req, res) => {
	// récupérer la variable id de la route
	const { id } = req.params;
	// console.log(req.params);

	// requête
	const query = `
		SELECT student.*
		FROM formation.student
		WHERE student.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		// const [results] = await dbConnection.execute(query, { id: 1 });
		const [results] = await dbConnection.execute(query, req.params);
		return res.status(200).json({
			status: 200,
			message: "OK",
			// shift : récupérer le premier indice d'un array
			data: results.shift(),
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// créer un étudiant
studentRouter.post("/create", async (req, res) => {
	// requête
	const query = `
		INSERT INTO formation.student
		VALUE (NULL, :firstname, :lastname, :age, :birthday, :isExternal, :classroom_id);
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// modifier un étudiant
studentRouter.put("/update", async (req, res) => {
	// requête
	const query = `
		UPDATE formation.student
		SET
			student.firstname = :firstname,
			student.lastname = :lastname,
			student.age = :age,
			student.birthday = :birthday,
			student.isExternal = :isExternal,
			student.classroom_id = :classroom_id
		WHERE student.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// supprimer un étudiant
studentRouter.delete("/delete", async (req, res) => {
	// requête
	const query = `
		DELETE FROM formation.student
		WHERE student.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

export default studentRouter;

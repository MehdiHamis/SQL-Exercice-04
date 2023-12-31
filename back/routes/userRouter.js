import express from "express";
import dbConnection from "../services/dbConnection.js";
import argon2 from "argon2";

const userRouter = express.Router(); // créer un utilisateur
/*
	tester les méthodes POST, PUT et DELETE avec thunder client:
		- ajouter l'en-tête HTTP : Content-Type: application/json
		- remplir le body (contenu) de la requête avec du JSON
		- le JSON doit contenir les propriétés liées à la requête SQL
*/
userRouter.post("/register", async (req, res) => {
	// hacher le mot de passe contenu dans req.body
	const bodyHashed = {
		...req.body,
		password: await argon2.hash(req.body.password),
	};
	// console.log(bodyHashed);
	const query = `
		INSERT INTO formation.user
		VALUE (NULL, :email, :password, 2);
	`;

	try {
		// récupérer le body de la requête avec la propriété body de la requête
		const [results] = await dbConnection.execute(query, bodyHashed);
		return res.status(201).json({
			status: 201,
			message: "User created",
		});
	} catch (error) {
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// connexion
userRouter.post("/login", async (req, res) => {
	// requête SQL
	const query = `
		SELECT user.*, role.name AS role
		FROM formation.user
		JOIN formation.role
		ON role.id = user.role_id
		WHERE user.email = :email;
	`;

	// exécution de la requête
	let results;

	try {
		// récupération des resultats de la requête
		[results] = await dbConnection.execute(query, req.body);

		// console.log(results);

		// si l'email n'existe pas dans la table
		if (results.length === 0) {
			return res.status(403).json({
				status: 403,
				message: "Forbidden",
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}

	// récupérer l'utilisateur
	const user = results.shift();

	// vérifier la concordance entre le hash contenu dans le table avec le mot de passe saisi
	/*
		user.password : le hash est contenu dans la table, récupéré dans le select
		req.body.password : la saisie en clair du champ de formulaire nommé password
	*/

	if (!(await argon2.verify(user.password, req.body.password))) {
		return res.status(403).json({
			status: 403,
			message: "Forbidden",
		});
	}

	// si l'utilisateur existe, renvoyer l'utilisateur dans la réponse HTTP
	return res.status(200).json({
		status: 200,
		message: "OK",
		data: user,
	});
});

export default userRouter;

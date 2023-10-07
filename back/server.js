// import des dépendances
import express from "express";
import http from "node:http";
import studentRouter from "./routes/studentRouter.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import classroomRouter from "./routes/classroomRouter.js";

// création d'une application
const app = express();

// création d'un routeur
const router = express.Router();

// associer l'application au routeur
app.use(router);

// ajouter la méthode JSON à toutes les routes, pour récupérer le body des requêtes
router.use(express.json());

// autoriser les serveurs à dialoguer avec l'API
router.use(
	cors({
		origin: ["http://localhost:5173"],
	}),
);

// appel des routeurs avec un préfixe de routes (éviter de répéter le préfixe dans le routeur)
router.use("/students", studentRouter);
router.use("/users", userRouter);
router.use("/classrooms", classroomRouter);

/*
	création d'une route
		liée à une méthode, ou un verbe, HTTP
		liée à une réponse
	req: paramètre représente la requête HTTP
	res: paramètre représente la réponse HTTP
*/
router.get("/", (req, res) => res.send("coucou"));

// route avec variables
router.get("/products/:id", (req, res) => {
	// req.params : récupérer la variable d'url / de route
	const { id } = req.params;
	return res.send(`product ${id}`);
});

// route renvoyant du JSON
router.get("/products", (req, res) => {
	return res.status(200).json({
		status: 200,
		message: "OK",
		data: [
			{ id: 1, name: "product1", price: 10 },
			{ id: 5, name: "product5", price: 50 },
		],
	});
});

// créer une route avec la méthode POST
router.post("/products", (req, res) => {
	// récupérer le contenu de la requête (body)
	// par défaut, la propriété body n'est pas reconnue, il est nécessaire d'ajouter la méthode json à toutes les routes
	console.log(req.body);

	return res.json(req.body);
});

// création du serveur http
const server = http.createServer(app);

// exporter le serveur pour l'importer dans index.js
export default server;

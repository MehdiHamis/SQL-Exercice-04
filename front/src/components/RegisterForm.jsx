import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
	} = useForm();

	const navigate = useNavigate();

	// soumission du formulaire
	const onSubmit = async (values) => {
		// appel de la route d'API créant un utilisateur
		// console.log(values);
		const responseAPI = await createUser(values);
		// console.log(responseAPI);

		// créer un message de confirmation
		// window.sessionStorage permet de stocker des chaînes de caractères dans un navigateur
		window.sessionStorage.setItem("notice", "Account created");

		// redirection : useNavigate de react-router
		navigate("/");
	};

	// observateur de la saisie
	useEffect(() => {
		// const observer = watch((values) => console.log(values));
		const observer = watch((values) => null);

		return () => observer.unsubscribe();
	}, [watch]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>
				<label>Email : </label>
				{/* utiliser les noms des colonnes sql pour le nom des champs */}
				<input
					type="email"
					{...register("email", { required: "Email is required" })}
				/>
				{/* errors.<nom du champ défini dans register>.message */}
				<small>{errors.email?.message}</small>
			</p>
			<p>
				<label>Password : </label>
				<input
					type="password"
					{...register("password", { required: "Password is required" })}
				/>
				<small>{errors.password?.message}</small>
			</p>
			<p>
				<input type="submit" />
			</p>
		</form>
	);
};

export default RegisterForm;

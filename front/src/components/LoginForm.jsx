import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { checkUser } from "../services/api";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
	} = useForm();

	// importer le contexte de l'utilisateur
	const { user, setUser } = useContext(UserContext);

	// importer le hook de redirection
	const navigate = useNavigate();

	//  affichage d'un message
	const [message, setMessage] = useState();

	// soumission du formulaire
	const onSubmit = async (values) => {
		// appel de la route d'API créant un utilisateur
		// console.log(values);
		const responseAPI = await checkUser(values);

		// stocker l'utilisateur dans un contexte
		// console.log(responseAPI);
		if (responseAPI.status === 200) {
			setUser(responseAPI.data);
			window.sessionStorage.setItem("notice", "You are connected");
			navigate("/");
		} else {
			setMessage("Invalid credentials");
			setTimeout(() => setMessage(), 5000);
		}
	};

	// observateur de la saisie
	useEffect(() => {
		// const observer = watch((values) => console.log(values));
		const observer = watch((values) => null);

		return () => observer.unsubscribe();
	}, [watch]);

	return (
		<>
			<p>{message}</p>
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
		</>
	);
};

export default LoginForm;

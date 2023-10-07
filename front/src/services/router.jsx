import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import Guard from "../components/Guard";
import AdminStudentsHomePage from "../pages/admin/students/AdminStudentsHomePage";
import AdminStudentsFormPage from "../pages/admin/students/AdminStudentsFormPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "logout",
				element: <LogoutPage />,
			},
		],
	},
	{
		path: "/admin/",
		element: (
			<Guard role="admin">
				<RootLayout />
			</Guard>
		),
		children: [
			{
				path: "",
				element: <AdminHomePage />,
			},
			{
				path: "students/:id?",
				element: <AdminStudentsHomePage />,
			},
			{
				path: "students/:id?/form",
				element: <AdminStudentsFormPage />,
			},
		],
	},
]);

export default router;

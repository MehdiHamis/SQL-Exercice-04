import { Link } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <>
      <h1>Admin</h1>
      <p>
        <Link to={"/admin/students"}>Manage students</Link>
      </p>
    </>
  );
};

export default AdminHomePage;

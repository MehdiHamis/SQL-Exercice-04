import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createStudent,
  getClassrooms,
  getStudentsByID,
  updateStudent,
} from "../../services/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminStudentsForm = () => {
  // récupérer l'identifiant de l'étudiant à modifier
  const { id } = useParams();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    reset,
  } = useForm();

  // importer le hook de redirection
  const navigate = useNavigate();

  // récupérer les classes
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const allPromises = Promise.allSettled([getClassrooms()]);

    allPromises.then((results) => {
      setClassrooms(results[0].value.data);
    });

    // préremplir le formulaire avec un élève existant
    prefillForm();
  }, []);

  // préremplir le formulaire avec un élève existant
  // const prefillForm = async () => {
  //   if (id) {
  //     // console.log(id);
  //     const responseAPI = await getStudentsByID(id);
  //     const student = responseAPI.data;
  //     // console.log(student);
  //     reset({
  //       id: student.id,
  //       firstname: student.firstname,
  //       lastname: student.lastname,
  //       age: student.age,
  //       birthday: new Date(student.birthday).toLocaleDateString("en-CA"),
  //       isExternal: `${student.isExternal}`,
  //       classroom_id: student.classroom_id,
  //     });
  //   }
  };

  // soumission du formulaire
  const onSubmit = async (values) => {
    // appel de la route d'API
    const responseAPI = id
      ? await updateStudent(values)
      : await createStudent(values);

    if (responseAPI.status === 200) {
      window.sessionStorage.setItem(
        "notice",
        id ? "Student updated" : "Student created"
      );
    } else {
      window.sessionStorage.setItem("notice", "Error");
    }
    navigate("/admin/students");
  };

  // observateur de la saisie
  useEffect(() => {
    const observer = watch((values) => console.log(values));
    // const observer = watch((values) => null);

    return () => observer.unsubscribe();
  }, [watch]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>Firstname : </label>
          {/* utiliser les noms des colonnes sql pour le nom des champs */}
          <input
            type="text"
            {...register("firstname", { required: "Firstname is required" })}
          />
          {/* errors.<nom du champ défini dans register>.message */}
          <small>{errors.firstname?.message}</small>
        </p>
        <p>
          <label>Lastname : </label>
          <input
            type="text"
            {...register("lastname", { required: "Lastname is required" })}
          />
          <small>{errors.lastname?.message}</small>
        </p>
        <p>
          <label>Age : </label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
          />
          <small>{errors.age?.message}</small>
        </p>
        <p>
          <label>Birthday : </label>
          <input
            type="date"
            {...register("birthday", { required: "Birthday is required" })}
          />
          <small>{errors.birthday?.message}</small>
        </p>
        <p>
          <label>Is external : </label>
          {[
            { id: "0", name: "No" },
            { id: "1", name: "Yes" },
          ].map((el) => (
            <label key={crypto.randomUUID()}>
              <input type="radio" {...register("isExternal")} value={el.id} />
              {el.name}
            </label>
          ))}
          <small>{errors.isExternal?.message}</small>
        </p>
        <p>
          <select
            {...register("classroom_id", { required: "Classroom is required" })}
            value={watch().classroom_id}
          >
            <option value=""> </option>
            {classrooms.map((el) => (
              <option key={crypto.randomUUID()} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <small>{errors.classroom_id?.message}</small>
        </p>
        <p>
          <input type="hidden" {...register("id")} />
          <input type="submit" />
        </p>
      </form>
      <p>
        <Link to={"/admin/students"}>Back</Link>
      </p>
    </>
  );
};

export default AdminStudentsForm;

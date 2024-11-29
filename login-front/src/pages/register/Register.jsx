import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Title } from "../../components/Title";

const formInputs = [
  {
    type: "text",
    placeholder: "Nombre Completo",
    name: "name",
  },
  {
    type: "text",
    placeholder: "DNI",
    name: "dni",
  },
  {
    type: "password",
    placeholder: "Contraseña",
    name: "password",
  },
  {
    type: "password",
    placeholder: "Reingresar Contraseña",
    name: "rePassword",
  },
];

export const Register = () => {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      name: "",
      dni: "",
      password: "",
      rePassword: "",
      career: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.rePassword) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas deben coincidir!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        const createUser = await fetch(
          "https://login-urquiza-api.vercel.app/api/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              email: `${values.dni}@terciariourquiza.edu.ar`,
              password: values.password,
              career: [values.career],
            }),
          }
        ).then((res) => res.json());
        if (createUser.email) {
          Swal.fire({
            title: "¡Éxito!",
            text: `Usuario creado! Ingrese con el email ${`${values.dni}@terciariourquiza.edu.ar`} y la contraseña que ha proporcionado.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error(createUser.error);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .required("El nombre es requerido!")
        .min(3, "El nombre debe tener por lo menos 3 caracteres!"),
      dni: yup
        .string()
        .required("El DNI es requerido")
        .min(6, "Un DNI debe contener mas de 6 caracteres!"),
      password: yup
        .string()
        .required("La contraseña es requerida")
        .min(8, "La contraseña debe contener al menos 8 caracteres!"),
    }),
  });
  return (
    <div className="flex justify-center items-center h-screen bg-purple-950">
      <div className="bg-white px-10 py-8 rounded-md text-black flex flex-col gap-5">
        <Title title="Registro" />
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          {formInputs.map(({ type, placeholder, name }) => {
            return (
              <div key={name} className="flex flex-col">
                <input
                  type={type}
                  {...getFieldProps(name)}
                  className="text-black text-[18px] px-2 py-4 rounded-md min-w-[400px] border-2 border-gray-500"
                  placeholder={placeholder}
                  required
                />
                {touched[name] && errors[name] && (
                  <span className="text-red-600 text-xl">{errors[name]}</span>
                )}
              </div>
            );
          })}
          <select
            {...getFieldProps("career")}
            className="text-black px-2 text-[18px] py-4 rounded-md min-w-[400px] border-2 border-gray-500"
            required
          >
            <option value="" selected disabled>
              Seleciona tu carrera...
            </option>
            <option value="DS">DS</option>
            <option value="AF">AF</option>
            <option value="IT">IT</option>
          </select>

          <button
            type="submit"
            className="p-2 bg-purple-950 text-white rounded-md text-xl"
          >
            Registrarse
          </button>
        </form>

        <Link to="/login" className="text-end">
          <button className="text-xl text-purple-800">
            {"<- "}
            <span className="underline">Ingresar</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

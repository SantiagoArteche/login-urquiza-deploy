import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Title } from "../../components/Title";

const formInputs = [
  {
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Contraseña",
    name: "password",
  },
];

export const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const login = await fetch(
          "https://login-urquiza-api.vercel.app/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        ).then((res) => res.json());

        if (login.user) {
          const user = login.user;
          const { password, ...rest } = user;
          localStorage.setItem(
            "credentials",
            JSON.stringify({ token: login.token, user: rest })
          );
          if (login.user?.role === "alumno") {
            navigate("/student");
          } else if (login.user?.role === "docente") {
            navigate("/teacher");
          } else if (login.user?.role === "superusuario") {
            navigate("/superuser");
          } else if (login.user?.role === "directivo") {
            navigate("/executive");
          } else {
            Swal.fire({
              title: "Error",
              text: "Tu rol no es valido!",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } else {
          throw new Error(login);
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
      email: yup.string(),
      password: yup.string(),
    }),
  });

  return (
    <div className="flex justify-center items-center h-screen bg-purple-950">
      <div className="bg-white px-10 py-8 rounded-md text-black flex flex-col gap-5">
        <Title title="Login" />
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

          <button
            type="submit"
            className="p-2 bg-purple-950 text-white rounded-md text-xl"
          >
            Ingresar
          </button>
          <div className="flex items-center">
            <div className="border-b-2 border-gray-500 w-[48%]" />
            <div className="text-center px-3">O</div>
            <div className="border-b-2 border-gray-500 w-[48%]" />
          </div>
          <Link
            to="/forget"
            className="p-2 bg-purple-950 text-white rounded-md text-xl text-center"
          >
            <button>Recuperar Contraseña</button>
          </Link>
        </form>

        <Link to="/register" className="text-end">
          <button className="text-xl text-purple-800">
            <span className="underline">Registrarse</span>
            {" ->"}
          </button>
        </Link>
      </div>
    </div>
  );
};

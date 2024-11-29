import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Title } from "../../components/Title";

const formInputs = [
  {
    type: "password",
    placeholder: "Ingresa Contraseña",
    name: "password",
  },
  {
    type: "password",
    placeholder: "Reingresa Nueva Contraseña",
    name: "rePassword",
  },
];

export const PasswordRecovery = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
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
        const changePassword = await fetch(
          `https://login-urquiza-api.vercel.app/api/users/changepassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: values.password,
              token: token.toString(),
            }),
          }
        ).then((res) => res.json());

        if (changePassword?.msg) {
          Swal.fire({
            title: "¡Éxito!",
            text: changePassword?.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/login");
        } else {
          throw new Error(changePassword);
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
      password: yup
        .string()
        .min(8, "La contraseña debe contener al menos 8 caracteres!"),
    }),
  });

  return (
    <div className="flex justify-center items-center h-screen bg-purple-950">
      <div className="bg-white px-10 py-8 rounded-md text-black flex flex-col gap-5">
        <Title title="Cambiar Contraseña" />
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
            Cambiar Contraseña
          </button>
        </form>

        <Link to="/login" className="text-end">
          <button className="text-xl text-purple-800">
            {"<- "}
            <span className="underline">Login</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

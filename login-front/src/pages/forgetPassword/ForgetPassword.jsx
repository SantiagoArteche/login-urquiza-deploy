import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Title } from "../../components/Title";

export const ForgetPassword = () => {
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const sendRecovery = await fetch(
          "https://login-urquiza-api.vercel.app/api/users/recover",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
            }),
          }
        ).then((res) => res.json());

        if (sendRecovery?.msg) {
          Swal.fire({
            title: "¡Éxito!",
            text: sendRecovery.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error(sendRecovery.error);
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
    }),
  });
  return (
    <div className="flex justify-center items-center h-screen bg-purple-950">
      <div className="bg-white px-10 py-8 rounded-md text-black flex flex-col gap-5">
        <Title title="Recuperar Contraseña" />
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            {...getFieldProps("email")}
            className="text-black text-[18px] px-2 py-3 rounded-md min-w-[400px] border-2 border-gray-500"
            placeholder="Email"
            required
          />
          <span className="max-w-[400px] leading-[30px] font-semibold text-lg">
            Presione enviar y en caso de estar registrado le llegara el
            instructivo correspondiente a su correo para recuperar su
            contraseña.
          </span>
          <button
            type="submit"
            className="p-2 bg-purple-950 text-white rounded-md text-xl"
          >
            Enviar
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

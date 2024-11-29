import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Classroom } from "../../components/Classroom";

export const StudentPage = () => {
  const credentials =
    localStorage.getItem("credentials") &&
    JSON.parse(localStorage.getItem("credentials"));

  const navigate = useNavigate();
  const [user] = useState(
    localStorage.getItem("credentials") ? credentials?.user : []
  );

  const getUser = async () => {
    setTimeout(() => {}, 1000);
    const validateToken = await fetch(
      `https://login-urquiza-api.vercel.app/api/auth/verify/${credentials?.token}`
    ).then((res) => res.json());

    await validateToken;
    if (!validateToken?.tokenData) navigate("/login");
  };

  const destroySession = () => {
    if (localStorage.getItem("credentials")) {
      localStorage.removeItem("credentials");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const career = (career) => {
    if (career?.length > 1) return "bg-purple-950";
    if (career) {
      switch (career[0]) {
        case "DS":
          return "bg-green-700";
        case "AF":
          return "bg-blue-700";
        case "IT":
          return "bg-red-700";
        default:
          return "bg-purple-950";
      }
    }
  };

  let classRooms = [
    "Práctica Profesionalizante 1",
    "Bases de Datos 1",
    "Ingeniería de Software 2",
    "Programación 1",
    "Estadística",
    "Innovación y Desarrollo Emprendedor",
    "Inglés Técnico 2 ",
    "UDI 2 ",
    "Problemáticas Socio Contemporáneas",
  ];

  if (user?.career) {
    if (user?.career[0] === "AF") {
      classRooms[1] = "Desarrollo de Sistemas";
      classRooms[2] = "Estrategias de Negocios ";
      classRooms[3] = "Gestión de Software 2";
    } else if (user?.career[0] === "IT") {
      classRooms[1] = "Bases de Datos";
      classRooms[2] = "Sistemas Operativos";
      classRooms[3] = "Algoritmos y Estructura de Datos";
      classRooms[6] = "Infraestructura de Redes 2";
    }
  }

  return (
    <div className={`min-h-screen ${career(user?.career)}  text-white`}>
      <Navbar
        email={user?.email}
        destroySession={destroySession}
        role={user?.role}
      />
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
          {classRooms.map((classRoom) => (
            <Classroom key={classRoom} classRoom={classRoom} />
          ))}
        </div>
      </main>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

import { InvitationButton } from "../../components/InvitationButton";

export const SuperUserPage = () => {
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
      `http://localhost:7000/api/auth/verify/${credentials?.token}`
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

  return (
    <div className={`min-h-screen bg-purple-950  text-white`}>
      <Navbar
        email={user?.email}
        destroySession={destroySession}
        role={user?.role}
      />
      <main className="p-6">
        <div className="flex flex-col justify-between gap-20 py-40">
          <InvitationButton
            title={"Ver Usuarios Registrados"}
            height="min-h-[100px]"
            fontSize={"text-3xl"}
          />
          <InvitationButton
            title={"Armar Aulas"}
            height="min-h-[100px]"
            fontSize={"text-3xl"}
          />
          <InvitationButton
            title={"Invitar Directivos a las Aulas"}
            height="min-h-[100px]"
            fontSize={"text-3xl"}
          />
        </div>
      </main>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Classroom } from "../../components/Classroom";
import { InvitationButton } from "../../components/InvitationButton";

export const ExecutivePage = () => {
  const credentials =
    localStorage.getItem("credentials") &&
    JSON.parse(localStorage.getItem("credentials"));

  const navigate = useNavigate();
  const [user] = useState(
    localStorage.getItem("credentials") ? credentials?.user : []
  );

  const getUser = async () => {
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
    <div className={`min-h-screen bg-purple-950  text-white `}>
      <Navbar
        email={user?.email}
        destroySession={destroySession}
        role={user?.role}
      />
      <main className="p-6 flex items-center justify-center h-[80vh]">
        <InvitationButton title={"Invitar Docentes a las aulas"} />
      </main>
    </div>
  );
};

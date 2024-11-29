import { Link } from "react-router-dom";

export const Navbar = ({ email, destroySession, role }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 text-black">
      <div className="text-xl font-semibold max-w-4 ">{`${
        role && role[0].toUpperCase() + role.slice(1)
      } ${email}`}</div>
      <div className="text-3xl font-semibold">Plataforma Urquiza</div>
      <Link to="/login">
        <button
          className="text-xl font-semibold hover:underline"
          onClick={() => destroySession()}
        >
          Salir -&gt;
        </button>
      </Link>
    </header>
  );
};

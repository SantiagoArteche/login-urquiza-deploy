import React from "react";

export const Classroom = ({ classRoom }) => {
  return (
    <div className="bg-gray-200 text-black rounded-lg shadow-md overflow-hidden min-h-[370px]">
      <div className="p-4">
        <h3 className="text-xl font-bold text-center">{classRoom}</h3>
      </div>
      <div className="p-4 flex justify-center">
        <button className="text-lg text-purple-900 hover:underline">
          Ingresar
        </button>
      </div>
    </div>
  );
};

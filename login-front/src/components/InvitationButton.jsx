import React from "react";

export const InvitationButton = ({ title, height, fontSize }) => {
  return (
    <div className={`flex justify-center  items-center`}>
      <div
        className={`bg-gray-200  text-black rounded-lg shadow-md  overflow-hidden min-w-[500px] justify-center items-center cursor-pointer `}
      >
        <div className={` ${height} p-4 flex justify-center items-center`}>
          <h3 className={`text-xl font-bold text-center ${fontSize}`}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

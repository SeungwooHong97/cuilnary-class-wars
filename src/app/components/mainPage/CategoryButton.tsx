import React from "react";

type CategoryButtonPropsType = {
  buttonType: string;
  onClick: (buttonType: string) => void;
};

const CategoryButton = ({ buttonType, onClick }: CategoryButtonPropsType) => {
  return (
    <button
      className={`size-full h-12 ${buttonType === "백수저" ? "bg-white text-black" : "bg-black text-white"}`}
      onClick={() => onClick(buttonType)}
    >
      {buttonType}
    </button>
  );
};

export default CategoryButton;

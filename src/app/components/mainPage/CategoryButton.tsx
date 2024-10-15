import React from "react";

type CategoryButtonPropsType = {
  buttonType: string;
  category: string;
  onClick: (buttonType: string) => void;
};

const CategoryButton = ({ buttonType, category, onClick }: CategoryButtonPropsType) => {
  return (
    <button
      className={`size-full h-12 ${category === buttonType ? "bg-white text-black" : "bg-black text-white"}`}
      onClick={() => onClick(buttonType)}
    >
      {buttonType}
    </button>
  );
};

export default CategoryButton;

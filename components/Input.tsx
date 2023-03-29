import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="bg-white px-4 py-2 border border-gray-200 rounded-md"
      {...props}
    />
  );
};

export default Input;

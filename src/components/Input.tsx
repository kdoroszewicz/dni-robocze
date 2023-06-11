import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="text-left! h-11 appearance-none rounded-md border border-gray-200 bg-white px-4 py-2"
      {...props}
    />
  );
};

export default Input;

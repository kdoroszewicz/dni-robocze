import { HTMLAttributes } from "react";

const Fieldset = (props: HTMLAttributes<HTMLFieldSetElement>) => {
  return <fieldset className="flex flex-col space-y-2" {...props} />;
};

export default Fieldset;

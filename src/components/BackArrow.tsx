import Image from "next/image";
import React from "react";
import arrow from "../app/assets/arrow.svg";

const BackArrow = () => {
  return (
    <Image className="min-w-[44px]" src={arrow} alt="wróć do strony głównej" />
  );
};

export default BackArrow;

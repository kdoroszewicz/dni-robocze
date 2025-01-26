import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      Nie znaleziono strony.{" "}
      <Link className="text-blue-500" href="/">
        Wróć na stronę główną.
      </Link>
    </div>
  );
};

export default NotFound;

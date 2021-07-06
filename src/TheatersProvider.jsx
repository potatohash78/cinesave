import React, { createContext, useState } from "react";

export const TheatersContext = createContext();

export default function TheatersProvider({ children }) {
  const [theaters, setTheaters] = useState(["Cranford", "Rialto"]);
  const [currTheater, setCurrTheater] = useState("Cranford");

  return (
    <TheatersContext.Provider
      value={{ theaters, setTheaters, currTheater, setCurrTheater }}
    >
      {children}
    </TheatersContext.Provider>
  );
}

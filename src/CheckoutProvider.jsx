import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const [page, setPage] = useState(0);
  const [date, setMovieDate] = useState(new Date());
  const [info, setInfo] = useState({});
  const [currSeats, setCurrSeats] = useState([]);
  const [poster, setPoster] = useState();
  const [concessions, setConcessions] = useState([]);

  return (
    <CheckoutContext.Provider
      value={{
        page,
        setPage,
        date,
        setMovieDate,
        info,
        setInfo,
        currSeats,
        setCurrSeats,
        poster,
        setPoster,
        concessions,
        setConcessions,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

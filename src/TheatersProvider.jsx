import React, { createContext, useState, useEffect } from "react";

export const TheatersContext = createContext();

export default function TheatersProvider({ children }) {
  const [theaters, setTheaters] = useState([1, 3]);
  const [currTheater, setCurrTheater] = useState("Cranford Theater");
  const [theaterNames, setTheaterNames] = useState([]);

  useEffect(() => {
    async function getNames() {
      await Promise.all(
        theaters.map((id) =>
          fetch(
            `https://dry-tor-14403.herokuapp.com/info/theaterinfo?theater=${id}`
          )
        )
      )
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          const searchResults = [];
          for (let item of data) {
            searchResults.push(item.theater_name);
          }
          setTheaterNames(searchResults);
        });
    }
    getNames();
  }, []);

  return (
    <TheatersContext.Provider
      value={{
        theaters,
        setTheaters,
        currTheater,
        setCurrTheater,
        theaterNames,
        setTheaterNames,
      }}
    >
      {children}
    </TheatersContext.Provider>
  );
}

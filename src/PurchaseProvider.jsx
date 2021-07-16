import React, { createContext, useEffect, useContext, useState } from "react";
import { firestore } from "../firebase";
import { UserContext } from "./UserProvider";

export const PurchaseContext = createContext();

export default function PurchaseProvider({ children }) {
  const { user } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  async function getPurchase() {
    const query = await firestore
      .collection("purchases")
      .where("user", "==", user.id)
      .get();
    const data = [];
    query.forEach((doc) => {
      data.push(doc.data());
    });
    setPurchases(data);
  }

  useEffect(() => {
    if (loggedIn) {
      getPurchase();
    }
  }, [loggedIn]);

  return (
    <PurchaseContext.Provider value={{ purchases, setPurchases, setLoggedIn }}>
      {children}
    </PurchaseContext.Provider>
  );
}

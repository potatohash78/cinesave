import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    location: true,
    payment: "",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

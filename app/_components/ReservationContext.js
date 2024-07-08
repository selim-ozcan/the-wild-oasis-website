"use client";

import { createContext, useState } from "react";

export const ReservationContext = createContext();

export default function ReservationContextProvider({ children }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const contextValue = { range, setRange };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
}

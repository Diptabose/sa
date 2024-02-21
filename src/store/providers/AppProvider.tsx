"use client";
import React, { ReactNode } from "react";
import AppContext from "../contexts/app.context";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import { AppInitialState, initialState } from "../state/app.state";


const AppProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const appContextValue = useCreateReducer<AppInitialState>({ initialState });
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

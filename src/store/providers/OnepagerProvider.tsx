"use client";
import React, { ReactNode } from "react";
import OnepagerContext from "../contexts/onepager.context";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import {
  OnepagerInitialState,
  initialState as initState,
} from "../state/onepager.state";
import { Email } from "@/types/email";

const OnepagerProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: Email;
}) => {
  let initialState = { ...initState, email: data };
  const onepagerContextValue = useCreateReducer<OnepagerInitialState>({
    initialState,
  });
  return (
    <OnepagerContext.Provider value={onepagerContextValue}>
      {children}
    </OnepagerContext.Provider>
  );
};

export default OnepagerProvider;

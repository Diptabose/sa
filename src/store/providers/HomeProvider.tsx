"use client";
import React, { ReactNode } from "react";
import HomeContext from "../contexts/home.context";
import {
  HomeInitialState,
  initialState as initState,
} from "../state/home.state";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import { Opinion, Tags } from "@/types/email";

const HomeProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: { opinions: Opinion[]; tags: Tags[] };
}) => {
  const { opinions, tags } = data;
  const initialState = { ...initState, opinions, tags };
  const homeContextValue = useCreateReducer<HomeInitialState>({ initialState });
  return (
    <HomeContext.Provider value={homeContextValue}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;

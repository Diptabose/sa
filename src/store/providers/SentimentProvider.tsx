"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import SentimentContext from "../contexts/sentiment.context";
import { SentimentInitialState } from "../state/sentiment.state";
import { initialState } from "../state/sentiment.state";
import { GetMethod } from "@/utils/app/api";

const SentimentProvider = ({ children }: { children: ReactNode }) => {
  const sentimentContextValue = useCreateReducer<SentimentInitialState>({
    initialState,
  });

  const { dispatch } = sentimentContextValue;

  useEffect(() => {
    GetMethod("user/user")
      .then((response) => {
        if (response.success) {
          dispatch({ field: "userData", value: response.data });
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <SentimentContext.Provider value={sentimentContextValue}>
      {children}
    </SentimentContext.Provider>
  );
};

export default SentimentProvider;

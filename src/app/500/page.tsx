"use client";

import React from "react";
import ErrorPage from "../error";

export default function ServerErrorPage() {
  return (
    <ErrorPage
      error={new Error("500 - Internal Server Error")}
      reset={() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }}
    />
  );
}

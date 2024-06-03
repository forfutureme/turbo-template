"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  clickFn: () => void;
}

export const Button = ({ children, clickFn }: ButtonProps) => {
  return (
    <button className="" onClick={() => clickFn()}>
      {children}
    </button>
  );
};

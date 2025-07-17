"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "hsl(0 0% 9%)",
          "--normal-text": "hsl(0 0% 98%)",
          "--normal-border": "hsl(217 32% 17%)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
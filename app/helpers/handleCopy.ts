import React, { ReactNode } from "react";

export const handleCopy = ({ content }: { content: ReactNode }) => {
  const textContent = React.Children.toArray(content)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }
      if (React.isValidElement(child) && child.props?.children) {
        return child.props.children;
      }
      return "";
    })
    .join("");

  navigator.clipboard.writeText(textContent);
};

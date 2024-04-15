import React from "react";

interface ToCartButtonProps {
  onClick: () => void;
}

export const ToCartButton: React.FC<ToCartButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      My order
    </button>
  );
};
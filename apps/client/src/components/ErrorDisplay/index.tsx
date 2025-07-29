import React from "react";

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
      <p className="text-red-200">{message}</p>
    </div>
  );
};

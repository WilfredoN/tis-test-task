import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        <span className="text-lg text-gray-300">{message}</span>
      </div>
    </div>
  );
};

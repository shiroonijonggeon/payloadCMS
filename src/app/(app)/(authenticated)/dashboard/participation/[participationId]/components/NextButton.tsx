"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface NextButtonProps {
  loading: boolean;
  text: string;
  onClick: () => void;
}

export default function NextButton({ loading, text, onClick }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="relative flex items-center justify-center bg-teal-500 text-black rounded-md p-2 w-full transition disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading && (
        <AiOutlineLoading3Quarters className="absolute left-2 animate-spin text-black" />
      )}
      <span>{text}</span>
    </button>
  );
}

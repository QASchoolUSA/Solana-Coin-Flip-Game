import React from "react";
import LottieAnimation from "../components/LottieAnimation";
import animationData from "../../public/coin-flip.json"; // Replace with your Lottie JSON file

type LoadingModalProps = {
  isLoading: boolean;
  message?: string; // Optional message to display
};

export default function LoadingModal({ isLoading }: LoadingModalProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
      <div>
        <LottieAnimation animationData={animationData} width="80%" height="80%" />
      </div>
    </div>
  );
}
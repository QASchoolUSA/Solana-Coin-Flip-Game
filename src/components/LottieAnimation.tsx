import React from "react";
import Lottie from "react-lottie";

type LottieAnimationProps = {
  animationData: object; // JSON data for the Lottie animation
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
};

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  width = "100%",
  height = "100%",
}: LottieAnimationProps) {
  const options = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "none", // Adjust aspect ratio (e.g., "none", "meet", "slice")
      hideOnTransparent: true,
      clearCanvas: true, // Keeps the canvas clear between frames (useful for transparency)
      progressiveLoad: true, // Improves initial loading for large animations
    },
  };

  return <Lottie options={options} height={height} width={width} />;
}
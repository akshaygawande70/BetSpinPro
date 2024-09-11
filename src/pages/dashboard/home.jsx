import React, { useState } from "react";
import Wheel from "@/widgets/moneywheel/Wheel";
import "./Home.css";
import ReactConfetti from "react-confetti";

export function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  const segments = [
    { label: "0", color: "#33FFF2", value: 10 },
    { label: "1", color: "#FF5733", value: 1000 },
    { label: "2", color: "#33FF57", value: 500 },
    { label: "3", color: "#3357FF", value: 250 },
    { label: "4", color: "#FF33A6", value: 100 },
    { label: "5", color: "#8E44AD", value: 50 },
    { label: "6", color: "#FFFF33", value: 20 },
    { label: "7", color: "#33FFF2", value: 10 },
    { label: "8", color: "#FF5733", value: 1000 },
    { label: "9", color: "#33FF57", value: 500 },
  ];



  return (
    <div className="home-container flex">
      {/* Wheel Section */}
      <div className="flex justify-center items-center">
        <Wheel segments={segments} spinDuration={5000} wheelSize={450} setShowConfetti={setShowConfetti} />
      </div>
      {showConfetti && (
        <ReactConfetti />
      )}
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import "./Wheel.css";
import pinImage from "../../../public/img/pin_red.svg";
import spinSound from "../../../public/sounds/spin.mp3"; // Import your sound file
import Confetti from 'react-confetti';

const Wheel = ({ segments, spinDuration, wheelSize, setShowConfetti }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const pinOffset = 0;

  // Function to play the sound effect
  const playSound = () => {
    const audio = new Audio(spinSound);
    audio.play();
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowConfetti(false);

    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const extraSpins = 8;

    // Play the sound effect when the wheel starts spinning
    playSound();

    // Calculate the exact rotation needed to land on the selected segment
    const targetRotation =
      360 * extraSpins + segmentAngle * randomSegment + segmentAngle / 2;

    // Set the new rotation, ensuring a smooth transition
    setRotation((prevRotation) => prevRotation + targetRotation);

    // Use a single timeout to trigger actions after the spin ends
    setTimeout(() => {
      // Fire confetti after the spin has completely stopped
      setShowConfetti(true);

      // Calculate the final rotation and adjust to center the pin on a segment
      const finalRotation = (rotation + targetRotation) % 360;
      const correctedRotation =
        finalRotation - (finalRotation % segmentAngle) + segmentAngle / 2;

      // Determine the selected segment
      const selectedSegmentIndex =
        Math.floor((360 - correctedRotation) / segmentAngle) % segments.length;

      console.log(`Selected Segment: ${segments[selectedSegmentIndex].label}`);

      // Ensure the wheel stops at the corrected rotation for visual accuracy
      setRotation(
        (prevRotation) => prevRotation + (correctedRotation - finalRotation)
      );

      setTimeout(() => {
        setIsSpinning(false);
        setShowConfetti(false);
      }, 5000);
    }, spinDuration);
  };

  const renderSegments = () => {
    const segmentAngle = 360 / segments.length;
    const radius = wheelSize / 2 - 10;
    const centerX = wheelSize / 2;
    const centerY = wheelSize / 2;

    return segments.map((segment, index) => {
      const rotateAngle = segmentAngle * index;

      return (
        <g
          key={index}
          className="segment"
          style={{ transform: `rotate(${rotateAngle}deg)` }}
        >
          <path
            d={`M${centerX},${centerY} L${centerX + radius
              },${centerY} A${radius},${radius} 0 0,1 ${centerX + radius * Math.cos((segmentAngle * Math.PI) / 180)
              },${centerY + radius * Math.sin((segmentAngle * Math.PI) / 180)} Z`}
            fill={`url(#gradient-${index})`}
            className="segment-path"
          />
          <text
            x={centerX + radius / 1.2}
            y={centerY}
            fill="#fff"
            transform={`rotate(${segmentAngle / 2}, ${centerX}, ${centerY})`}
            textAnchor="middle"
            alignmentBaseline="middle"
            className="segment-text"
            style={{ fontSize: wheelSize / 25 }}
          >
            {segment.label}
          </text>
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%">
              <stop
                offset="0%"
                style={{ stopColor: segment.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#000", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </g>
      );
    });
  };

  return (
    <div className="wheel-fixed-container">
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${spinDuration || 4000
            }ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          width: wheelSize,
          height: wheelSize,
          border: `${wheelSize / 25}px solid #d4af37`,
        }}
      >
        <svg className="wheel-svg" viewBox={`0 0 ${wheelSize} ${wheelSize}`}>
          <defs>
            <filter id="metallic-effect" x="0" y="0">
              <feSpecularLighting
                result="specOut"
                specularExponent="20"
                lightingColor="white"
              >
                <fePointLight x="-5000" y="-10000" z="20000" />
              </feSpecularLighting>
              <feComposite
                in="SourceGraphic"
                in2="specOut"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>
          </defs>
          <g className="segments">{renderSegments()}</g>
        </svg>
      </div>
      <div className="center-spin-button-container">
        <button
          className="center-spin-button"
          onClick={handleSpin}
          style={{
            width: wheelSize / 7,
            height: wheelSize / 7,
            fontSize: wheelSize / 25,
          }}
          disabled={isSpinning}
        >
          {isSpinning ? "" : "Spin"}
        </button>
      </div>
      <div
        className={`pin ${isSpinning ? "pin-jitter" : ""}`}
        style={{
          top: `calc(55%)`,
          left: `calc(50% + ${wheelSize / 2.2}px)`,
          width: wheelSize / 10,
          height: wheelSize / 10,
        }}
      >
        <img src={pinImage} alt="Wheel Pin" className="pin-image" />
      </div>
    </div>
  );
};

export default Wheel;

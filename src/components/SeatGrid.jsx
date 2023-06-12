import React, { useState } from "react";
import styles from "./SeatGrid.module.css";

export default function SeatGrid({ totalSeats, selectedSeats, onSeatClick }) {
  const seats = Array(totalSeats).fill(null);

  const handleSeatClick = (seatIndex) => {
    onSeatClick(seatIndex);
  };

  return (
    <div className={styles.seatGrid}>
      {seats.map((seat, index) => (
        <Seat
          key={index}
          seatIndex={index}
          selected={selectedSeats.includes(index)}
          onClick={handleSeatClick}
        />
      ))}
    </div>
  );
}

function Seat({ seatIndex, selected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onClick(seatIndex);
  };

  let seatColor = styles.seatGreen;

  if (selected) {
    seatColor = styles.seatBlue;
  } else if (isHovered) {
    seatColor = styles.seatRed;
  }

  return (
    <div
      className={`${styles.seat} ${seatColor}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {seatIndex + 1}
    </div>
  );
}
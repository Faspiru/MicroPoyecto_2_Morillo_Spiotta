import React, { useState } from "react";
import "./SeatGrid.css";

export default function SeatGrid ()  {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(0);

  const handleSeatClick = (row, col) => {
    const seat = `${row}-${col}`;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const renderSeats = () => {
    const seatGrid = [];
    for (let row = 0; row < 4; row++) {
      const rowSeats = [];
      for (let col = 0; col < 5; col++) {
        const seat = `${row}-${col}`;
        const isSelected = selectedSeats.includes(seat);
        const seatColor = isSelected ? "blue" : "gray";
        rowSeats.push(
          <div
            key={seat}
            className="seat"
            style={{ backgroundColor: seatColor }}
            onClick={() => handleSeatClick(row, col)}
          >
            {seat}
          </div>
        );
      }
      seatGrid.push(<div key={row} className="seat-row">{rowSeats}</div>);
    }
    return seatGrid;
  };

  const handleMaxSeatsChange = (event) => {
    const value = parseInt(event.target.value);
    setMaxSeats(value);
    setSelectedSeats(selectedSeats.slice(0, value));
  };

  return (
    <div className="seat-grid">
      <div>
        <label htmlFor="maxSeats">Número máximo de asientos:</label>
        <input
          type="number"
          id="maxSeats"
          min="0"
          value={maxSeats}
          onChange={handleMaxSeatsChange}
        />
      </div>
      {renderSeats()}
    </div>
  );
};
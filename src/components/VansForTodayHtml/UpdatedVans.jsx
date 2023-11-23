import React from 'react'
import styles from "./VansForToday.module.css"


export default function UpdatedVans({ vans }) {
  if (!Array.isArray(vans)) {
    console.log("Updated vans not working");
    return null; // or an appropriate fallback
  }

  const vansHtml = vans.map((van) => {
    const passengerHtml = van.passengers.map((passenger) => {
      const { passengerName, location } = passenger;

      return (
        <p
          className="passenger"
          key={passengerName + location}
          // draggable="true"
          // onDragStart={() => handleDragStart(passenger, van)}
          // onDragEnd={handleDragEnd}
          // onDrag={handleDrag}
        >
          {passengerName}
        </p>
      );
    });

    return (
      <div
        className="van-container"
        key={van.employee + van.numSeats}
        // onDragOver={handleDragOver}
        // onDragEnter={(e) => handleDragEnter(e)}
        // onDragLeave={(e) => handleDragLeave(e)}
        // onDrop={(e) => handleDrop(e, van)}
      >
        <h4 className="employee-txt">Employee</h4>
        <p className="employee-name">{van.employee}</p>
        <h4>Route</h4>
        <p>{van.route}</p>
        <h4 className="passenger-txt">Passengers</h4>
        <div className="passenger-container">{passengerHtml}</div>
      </div>
    );
  });

  return vansHtml;
}

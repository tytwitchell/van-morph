import React from "react";

export default function UpdatedVans({ vans }) {
  if (!Array.isArray(vans)) {
    console.log("Updated vans not working");
    return null;
  }
  const vansHtml = vans.map((van) => {
    const passengerHtml = van.passengers.map((passenger) => {
      const { passengerName, location } = passenger;
      return (
        <p className="passenger" key={passengerName + location}>
          {passengerName}
        </p>
      );
    });
    return (
      <div className="van-container" key={van.employee + van.numSeats}>
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

import React from "react";
import styles from "./VansForToday.module.css";

export default function InactiveVan({ van }) {
  const { employee, passengers, route, numSeats } = van;
  const vanPassengers = [...passengers];
  const passengerHtml = vanPassengers.map((passenger) => {
    const { passengerName, location } = passenger;
    return (
      <p className={styles.passenger} key={passengerName + location}>
        {passengerName}
      </p>
    );
  });
  return (
    <div className={styles.uneditableVanContainer} key={employee + numSeats}>
      <h4 className="employee-txt">Employee</h4>
      <p className="employee-name">{employee}</p>
      <h4>Route</h4>
      <p>{route}</p>
      <h4 className="passenger-txt">Passengers</h4>
      <div className={styles.absentPassengerContainer}>{passengerHtml}</div>
    </div>
  );
}

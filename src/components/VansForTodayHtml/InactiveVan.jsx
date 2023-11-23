import React from 'react'
import styles from "./VansForToday.module.css";

export default function InactiveVan({ vans }) {
    if (!Array.isArray(vans)) {
      console.log("inactive vans not working");
      return null; // or an appropriate fallback
    }

    const vansHtml = vans.map((van) => {
      const passengerHtml = van.passengers.map((passenger) => {
        const { passengerName, location } = passenger;

        return (
          <p className={styles.passenger} key={passengerName + location}>
            {passengerName}
          </p>
        );
      });

      return (
        <div
          className={styles.uneditableVanContainer}
          key={van.employee + van.numSeats}
        >
          <h4 className="employee-txt">Employee</h4>
          <p className="employee-name">{van.employee}</p>
          <h4>Route</h4>
          <p>{van.route}</p>
          <h4 className="passenger-txt">Passengers</h4>
          <div className={styles.absentPassengerContainer}>{passengerHtml}</div>
        </div>
      );
    });

    return vansHtml;
}


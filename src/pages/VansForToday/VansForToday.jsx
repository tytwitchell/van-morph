import { useContext, useState, useEffect } from "react";
import styles from "./VansForToday.module.css";

import { vanContext } from "../../components/Layout";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const [allVans, setAllVans] = useState(dbVans);
  const [inactiveVan, setInactiveVan] = useState([]);
  const [updatedVans, setUpdatedVans] = useState([]);

  useEffect(() => {
    const absentVan = [];
    const availableVans = [];
    const passengerArray = [];
    const updatedVans = [];
    let remainingPassengers = passengerArray;

    for (let van of dbVans) {
      if (van.employee === selectedEmployee) {
        absentVan.push(van);
        passengerArray.push(...van.passengers);
      } else {
        availableVans.push(van);
      }
    }

    if (selectedEmployee !== "") {
      localStorage.setItem("absentVan", JSON.stringify(absentVan));
    }
    
    const absentVanFromStorage = JSON.parse(localStorage.getItem("absentVan"));
    setInactiveVan(absentVanFromStorage);


    const allVans = availableVans.map((van) => {
      if (van.passengers.length < 6) {
        const availableSeats = 6 - van.passengers.length;
        const updatedPassengers = [
          ...van.passengers,
          ...remainingPassengers.slice(0, availableSeats),
        ];

        remainingPassengers = passengerArray.filter(
          (passenger) => !updatedPassengers.includes(passenger)
        );

        const newVan = { ...van, passengers: updatedPassengers };

        // limit updated vans to only vans that were changed
        // save unchanged vans in state
        // render all van assignments

        updatedVans.push(newVan);

        return newVan;
      } else {
        return van;
      }
    });

    setUpdatedVans(updatedVans);
    setAllVans(allVans);
  }, [selectedEmployee]);

  const inactiveVanHtml = inactiveVan.map((van) => {
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
        className={styles.absentVanContainer}
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

  const updatedVansHtml = updatedVans.map((van) => {
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

  const allVansHtml = allVans.map((van) => {
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

  return (
    <>
      <h2>Today's Vans</h2>
      <h3>Absent Van</h3>
      <div className="van-list-container">{inactiveVanHtml}</div>
      <h3>Updated Vans</h3>
      <div className="van-list-container">{updatedVansHtml}</div>
      <h3>All Vans for Today</h3>
      <div className="van-list-container">{allVansHtml}</div>
    </>
  );
}



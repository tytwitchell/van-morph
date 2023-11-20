import { useContext, useState, useEffect } from "react";
import styles from "./VansForToday.module.css";
import {
  handleDragOver,
  handleDrag,
  handleDragEnter,
  handleDragLeave,
} from "../../utils/functions";

import { vanContext } from "../../components/Layout";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const [allVans, setAllVans] = useState(dbVans);
  const [inactiveVan, setInactiveVan] = useState([]);
  const [availableVans, setAvailableVans] = useState([]);
  const [updatedVans, setUpdatedVans] = useState([]);

  const [draggedPassenger, setDraggedPassenger] = useState(null);
  const [draggedVan, setDraggedVan] = useState(null);
  /**
   * correct issue where moed passengers reset on refresh
   *  possible solution: move localStorage set and get outside of useEffect. try to replace in useEffect with state updates
   * add navLinks to separate "absent/updated vans" and "final vans for today" in Today's Vans
   * add drag and drop UI
   */

  useEffect(() => {
    const absentVan = [];
    const availableVans = [];
    const fullVans = [];
    const passengerArray = [];
    const updatedVans = [];
    const inactiveVan1 = inactiveVan ? inactiveVan[0] : null;
    let remainingPassengers = [];

    if (selectedEmployee) {
      for (let van of dbVans) {
        if (van.employee === selectedEmployee) {
          absentVan.push(van);
          passengerArray.push(...van.passengers);
        } else if (van.passengers.length < 6) {
          availableVans.push(van);
        } else {
          fullVans.push(van);
        }
      }

      absentVan
        ? localStorage.setItem("absentVan", JSON.stringify(absentVan))
        : "";
      availableVans
        ? localStorage.setItem("availableVans", JSON.stringify(availableVans))
        : "";
      fullVans
        ? localStorage.setItem("fullVans", JSON.stringify(fullVans))
        : "";
    }

    const absentVanFromStorage = JSON.parse(localStorage.getItem("absentVan"));
    const updatedVansFromStorage = JSON.parse(
      localStorage.getItem("updatedVans")
    );
    const availableVansFromStorage = JSON.parse(
      localStorage.getItem("availableVans")
    );

    const newVans = availableVansFromStorage.map((van) => {
      if (van.passengers.length < 6) {
        const availableSeats = 6 - van.passengers.length;
        const newPassengers = remainingPassengers
          ? [...remainingPassengers.slice(0, availableSeats)]
          : [...passengerArray.slice(0, availableSeats)];

        const updatedPassengers = [...van.passengers, ...newPassengers];

        const newVan = { ...van, passengers: updatedPassengers };

        const unsortedPassengers = passengerArray.filter(
          (passenger) => !updatedPassengers.includes(passenger)
        );

        remainingPassengers = [...unsortedPassengers];

        updatedVans.push(newVan);

        return newVan;
      } else {
        return van;
      }
    });

    localStorage.setItem("updatedVans", JSON.stringify(updatedVans));

    const allVans = [...newVans, ...fullVans];
    
    setInactiveVan(absentVanFromStorage);
    setUpdatedVans(updatedVansFromStorage);
    setAllVans(allVans);

  }, [selectedEmployee]);

  // localStorage.clear();
  /**
   * drag and drop UI for todays vans starts here
   * These changes are only saved in local storage and will not affect the db
   */

  // function handleDragStart(passenger, van) {
  //   setDraggedPassenger(passenger);
  //   setDraggedVan(van);
  //   console.log(draggedPassenger);
  // }

  // function handleDragEnd() {
  //   setDraggedPassenger(null);
  // }

  // function handleDrop(e, targetVan) {
  //   e.preventDefault();
  //   e.currentTarget.classList.remove("drag-over");
  //   e.currentTarget.classList.remove("dragged-passenger");

  //   if (draggedPassenger && draggedVan !== targetVan) {
  //     handleAddNewPassenger(draggedPassenger, targetVan);
  //     handleRemovePassenger(draggedVan, draggedPassenger);

  //     const updatedLocalVans = [...updatedVans];

  //     const draggedVanIndex = updatedLocalVans.findIndex(
  //       (van) => van === draggedVan
  //     );
  //     const targetVanIndex = updatedLocalVans.findIndex(
  //       (van) => van === targetVan
  //     );

  //     updatedLocalVans[draggedVanIndex] = {
  //       ...draggedVan,
  //       passengers: draggedVan.passengers.filter(
  //         (passenger) => passenger !== draggedPassenger
  //       ),
  //     };

  //     updatedLocalVans[targetVanIndex] = {
  //       ...targetVan,
  //       passengers: [...targetVan.passengers, draggedPassenger],
  //     };
  //     console.log(updatedLocalVans);
  //     // setUpdatedVans(updatedLocalVans);
  //   }
  // }

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

  const updatedVansHtml = updatedVans.map((van) => {
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

  const allVansHtml = allVans.map((van) => {
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

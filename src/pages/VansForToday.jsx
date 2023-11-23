import { useContext, useState, useEffect } from "react";

import {
  handleDragOver,
  handleDrag,
  handleDragEnter,
  handleDragLeave,
} from "../utils/functions";

import { vanContext } from "../components/Layout";
import InactiveVan from "../components/VansForTodayHtml/InactiveVan"
import UpdatedVans from "../components/VansForTodayHtml/UpdatedVans";
import AllVans from "../components/VansForTodayHtml/AllVans";

/**
 * 
 *IF NAV TO TODAYS VANS IS TRUE SET RERENDER STATE AS TRUE ON THIS PAGE TO RERENDER THE PAGE
 *  - add a state that is called Rerender and set to false.  Once loading screen is complete,
 *    change this state to true to rerender this page and have the vans rendered.
 */

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);

  const [allVans, setAllVans] = useState(dbVans);
  const [inactiveVan, setInactiveVan] = useState([]);
  const [availableVans, setAvailableVans] = useState([]);
  const [fullVans, setFullVans] = useState([]);
  const [updatedVans, setUpdatedVans] = useState([]);

  const [rerender, setRerender] = useState(false);

  const [draggedPassenger, setDraggedPassenger] = useState(null);
  const [draggedVan, setDraggedVan] = useState(null);

  /**
   * HTML is not rendering automatically when user switches to the page (local storage is null for all except for inactive van
   * because inactive van storage was set on employee page)
   * add navLinks to separate "absent/updated vans" and "final vans for today" in Today's Vans
   * add drag and drop UI
   * add ability to clear today's vans page (localstorage clear)
   */

  useEffect(() => {
    const storedInactiveVan =
      JSON.parse(localStorage.getItem("inactiveVan")) || []
    const storedUpdatedVans =
      JSON.parse(localStorage.getItem("updatedVans")) || []
    const storedAllVans = JSON.parse(localStorage.getItem("allVans")) || []

    setInactiveVan(storedInactiveVan)
    setUpdatedVans(storedUpdatedVans)
    setAllVans(storedAllVans)
  }, []);

  useEffect(() => {
    localStorage.setItem("inactiveVan", JSON.stringify(inactiveVan));
  }, [inactiveVan]);
  useEffect(() => {
    localStorage.setItem("updatedVans", JSON.stringify(updatedVans));
  }, [updatedVans]);
  useEffect(() => {
    localStorage.setItem("allVans", JSON.stringify(allVans));
  }, [allVans]);

   console.log("inactive vans", inactiveVan);
   console.log("updated vans", updatedVans);
   console.log("all vans", allVans);
   console.log("storageItem", JSON.parse(localStorage.getItem("updatedVans")));
   
  useEffect(() => {
      const absentVanArr = [];
      const availableVansArr = [];
      const fullVansArr = [];
      const passengerArr = [];
      const updatedVansArr = [];
      let remainingPassengers = [];

      if (selectedEmployee) {
        for (let van of dbVans) {
          if (van.employee === selectedEmployee) {
            absentVanArr.push(van);
            passengerArr.push(...van.passengers);
          } else if (van.passengers.length < 6) {
            availableVansArr.push(van);
          } else {
            fullVansArr.push(van);
          }
        }
        setInactiveVan(absentVanArr);
        setAvailableVans(availableVansArr);
        setFullVans(fullVansArr);
      }

      const newVans = availableVans.map((van) => {
        if (van.passengers.length < 6) {
          const availableSeats = 6 - van.passengers.length;
          const newPassengers = remainingPassengers
            ? [...remainingPassengers.slice(0, availableSeats)]
            : [...passengerArr.slice(0, availableSeats)];

          const updatedPassengers = [...van.passengers, ...newPassengers];
          const newVan = { ...van, passengers: updatedPassengers };
          const unsortedPassengers = passengerArr.filter(
            (passenger) => !updatedPassengers.includes(passenger)
          );

          remainingPassengers = [...unsortedPassengers];
          updatedVansArr.push(newVan);

          return newVan;
        } else {
          return van;
        }
      });

      setUpdatedVans(updatedVansArr);
      setAllVans([...newVans, ...fullVans]);

      // inactiveVan
      //   ? localStorage.setItem("inactiveVan", JSON.stringify(inactiveVan))
      //   : "";
      // availableVans
      //   ? localStorage.setItem("availableVans", JSON.stringify(availableVans))
      //   : "";
      // updatedVans
      //   ? localStorage.setItem("updatedVans", JSON.stringify(updatedVans))
      //   : "";
      // fullVans ? localStorage.setItem("fullVans", JSON.stringify(fullVans)) : "";
      // allVans ? localStorage.setItem("allVans", JSON.stringify(allVans)) : "";


  }, []);

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



  return (
    <>
      <h2>Today's Vans</h2>
      <h3>Absent Van</h3>
      <div className="van-list-container">
        <InactiveVan vans={inactiveVan} />
      </div>
      <h3>Updated Vans</h3>
      <div className="van-list-container">
        <UpdatedVans vans={updatedVans} />
      </div>
      <h3>All Vans for Today</h3>
      <div className="van-list-container">
        <AllVans vans={allVans} />
      </div>
    </>
  );
}


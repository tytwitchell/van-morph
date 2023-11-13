import { useContext, useState, useEffect } from "react";
import { vanContext } from "../components/Layout";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const [allVans, setAllVans] = useState([]);
  const [inactiveVan, setInactiveVan] = useState([]);
  const [updatedVans, setUpdatedVans] = useState([])

  useEffect(() => {
    const absentVan = [];
    const availableVans = [];
    const passengerArray = [];
    const updatedVans = []
    let remainingPassengers = passengerArray;

    for (let van of dbVans) {
      if (van.employee === selectedEmployee) {
        absentVan.push(van);
        passengerArray.push(...van.passengers);
      } else {
        availableVans.push(van);
      }
    }

    setInactiveVan(absentVan);

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

  console.log("inactive van", inactiveVan);
  console.log("updatedVans", updatedVans);
  console.log("allVans", allVans);

 

  const inactiveVanHtml = inactiveVan.map((van) => {
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
    <div>
      <h2>Today's Vans</h2>
      <h3>Absent Van</h3>
      {inactiveVanHtml}
      <h3>Updated Vans</h3>
      {/* {updatedVansHtml} */}
      <h3>Available Vans</h3>
      {/* {availableVansHtml} */}
    </div>
  );
}

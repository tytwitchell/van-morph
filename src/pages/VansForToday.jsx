import { useContext, useState } from "react";
import { vanContext } from "../components/Layout";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const [updatedVans, setUpdatedVans] = useState([]);
  const absentVan = [];
  const availableVans = [];
  const unavailableVans = [];

  // identify passengers in selectedEmployee's van
  // put passengers into van with least amount of passengers
  // once filled, move on to the next van
  // save temp vans in state and local storage for daily use
  // render vans on screen

  dbVans.filter((van) => {
    van.employee === selectedEmployee
      ? absentVan.push(van)
      : van.passengers.length < 6
      ? availableVans.push(van)
      : unavailableVans.push(van);
  });

  console.log("OOOEE", selectedEmployee);
  console.log("OOOVAN", absentVan);
  console.log("avilVans", availableVans);

  const absentVanHtml = absentVan.map((van) => {
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

  // const updatedVansHtml = 

  const unavailableVansHtml = unavailableVans.map((van) => {
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
      {absentVanHtml}
      <h3>Updated Vans</h3>
      {/* {updatedVansHtml} */}
      <h3>Available Vans</h3>
      {/* {availableVansHtml} */}
      <h3>Unchanged Vans</h3>
      {unavailableVansHtml}
    </div>
  );
}

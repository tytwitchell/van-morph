import { useState, useContext } from "react";
import { handleAddNewPassenger, handleRemovePassenger } from "../firebase";
import { vanContext } from "../components/Layout";
import {
  handleDragOver,
  handleDrag,
  handleDragEnter,
  handleDragLeave,
} from "../utils/functions";

export default function Vans() {
  const { dbVans, setDbVans } = useContext(vanContext);
  const [draggedPassenger, setDraggedPassenger] = useState(null);
  const [draggedVan, setDraggedVan] = useState(null);
  function handleDragStart(passenger, van) {
    setDraggedPassenger(passenger);
    setDraggedVan(van);
  }
  function handleDragEnd() {
    setDraggedPassenger(null);
  }
  function handleDrop(e, targetVan) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    e.currentTarget.classList.remove("dragged-passenger");
    try {
      if (draggedPassenger && draggedVan !== targetVan) {
        handleAddNewPassenger(draggedPassenger, targetVan),
          handleRemovePassenger(draggedVan, draggedPassenger);
        const updatedDbVans = [...dbVans];
        const draggedVanIndex = updatedDbVans.findIndex(
          (van) => van === draggedVan
        );
        const targetVanIndex = updatedDbVans.findIndex(
          (van) => van === targetVan
        );
        updatedDbVans[draggedVanIndex] = {
          ...draggedVan,
          passengers: draggedVan.passengers.filter(
            (passenger) => passenger !== draggedPassenger
          ),
        };
        updatedDbVans[targetVanIndex] = {
          ...targetVan,
          passengers: [...targetVan.passengers, draggedPassenger],
        };
        setDbVans(updatedDbVans);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  const renderVansHtml = dbVans.map((van) => {
    const passengerHtml = van.passengers.map((passenger) => {
      const { passengerName, location } = passenger;
      return (
        <p
          className="passenger"
          key={passengerName + location}
          draggable="true"
          onDragStart={() => handleDragStart(passenger, van)}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
        >
          {passengerName}
        </p>
      );
    });
    return (
      <div
        className="van-container"
        key={van.employee + van.numSeats}
        onDragOver={handleDragOver}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e, van)}
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
      <h1>Van List</h1>
      <div className="van-list-container">{renderVansHtml}</div>
    </>
  );
}

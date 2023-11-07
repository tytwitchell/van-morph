import React, { useState, useEffect } from "react";
import {
  vansInDb,
  handleAddNewPassenger,
  handleRemovePassenger,
} from "../firebase";


export default function Vans() {
  const [draggedPassenger, setDraggedPassenger] = useState(null);
  const [draggedVan, setDraggedVan] = useState(null);
  const [dbVans, setDbVans] = useState(vansInDb);

  function handleDragStart(passenger, van) {
    setDraggedPassenger(passenger);
    setDraggedVan(van)
  }

  function handleDragEnd() {
    setDraggedPassenger(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrag(e) {
    e.currentTarget.classList.add("dragged-passenger");
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
    e.currentTarget.classList.remove("dragged-passenger");

  }
 
  // function to add passengers to other vans in DB
  // function to remove passengers from their current van in DB

function handleDrop(e, targetVan) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    e.currentTarget.classList.remove("dragged-passenger");
   
    
    if (draggedPassenger && draggedVan !== targetVan) {
      
          handleAddNewPassenger(draggedPassenger, targetVan),
          handleRemovePassenger(draggedVan, draggedPassenger)
    

        const updatedDbVans = [...dbVans];
        const draggedVanIndex = updatedDbVans.findIndex((van) => van === draggedVan);
        const targetVanIndex = updatedDbVans.findIndex((van) => van === targetVan);

        updatedDbVans[draggedVanIndex] = {
            ...draggedVan,
            passengers: draggedVan.passengers.filter((passenger) => passenger !== draggedPassenger),
          };

        updatedDbVans[targetVanIndex] = {
          ...targetVan,
          passengers: [...targetVan.passengers, draggedPassenger],
        };

        setDbVans(updatedDbVans);
    }

  }
   
    
    
    

   
      
      // Implement the logic to move the passenger from one van to another
      // You'll need to update the state and re-render the component
      // Example: movePassenger(draggedPassenger, draggedVan, targetVan);
      // After moving the passenger, you may need to update the state
      // to reflect the changes and re-render the component.
    

    // call add and remove functions and pass e.currentTarget


  const vansHtml = dbVans.map((van) => {
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
      <div className="van-list-container">{vansHtml}</div>
    </>
  );
}

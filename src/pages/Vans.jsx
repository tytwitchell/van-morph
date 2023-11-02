import React, { useState } from 'react'
import { vansInDb } from "../firebase"

export default function Vans() {
  const [draggedPassenger, setDraggedPassenger] = useState(null)

  function handleDragStart(passenger) {
    setDraggedPassenger(passenger)
  }

  function handleDragEnd(){
    setDraggedPassenger(null);
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrag (e) {
    e.currentTarget.classList.add("dragged-passenger");
  }

  function handleDragEnter(e, van) {
    e.preventDefault()
    van.classList.add("drag-over")
  }

  function handleDragLeave(van) {
    van.classList.remove("drag-over")
    e.currentTarget.classList.remove("dragged-passenger");
  }

   function handleDrop(van) {
     van.classList.remove("drag-over")
      e.currentTarget.classList.remove("dragged-passenger");
      

     // Implement the logic to move the passenger from one van to another here
     // You'll need to update the state and re-render the component
     // Example: movePassenger(draggedPassenger, van);
   }
  
  console.log("vansInDb", vansInDb);
  const vansHtml = vansInDb.map( van => {

      const passengerHtml = van.passengers.map((passenger) => {
          const { passengerName, location } = passenger;
        return (
          <p
            className="passenger"
            key={passengerName + location}
            draggable="true"
            onDragStart={() => handleDragStart(passenger)}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
          >
            {passengerName}
          </p>
        );
      })
  
      return (
        <div
          className="van-container"
          key={van.employee + van.numSeats}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, van)}
          onDragLeave={() => handleDragLeave(van)}
          onDrop={() => handleDrop(van)}
        >
          <h4 className="employee-txt">Employee</h4>
          <p className="employee-name">{van.employee}</p>
          <h4>Route</h4>
          <p>{van.route}</p>
          <h4 className="passenger-txt">Passengers</h4>
          <div className="passenger-container">{passengerHtml}</div>
        </div>
      );
  })
  

  return (
    <>
      <h1>Van List</h1>
      <div className="van-list-container">
          {vansHtml}
      </div>
    </>
  )
}
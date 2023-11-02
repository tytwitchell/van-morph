import React from 'react'
import { vansInDb } from "../firebase"

export default function Vans() {
    console.log("vansInDb", vansInDb);
    const vansHtml = vansInDb.map( van => {

        const passengerHtml = van.passengers.map((passenger) => {
            const { passengerName, location } = passenger;
          return <p className="passenger" key={passengerName + location}>{passengerName}</p>;
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
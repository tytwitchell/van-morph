import React, { useState } from "react";
import { addToDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function AddVan() {
  const [numPassengers, setNumPassengers] = useState(null);

  function mapNumToValues(writtenNum) {
    const numMap = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
    };

    return numMap[writtenNum] || null;
  }

  function handleNumPassengers(e) {
    const selectedValue = e.target.value;
    const numValue = mapNumToValues(selectedValue);
    setNumPassengers(numValue);
  }

  function passengerInputHtml() {
    const passengerInputs = [];

    if (numPassengers) {
      for (let i = 0; i < numPassengers; i++) {
        passengerInputs.push(
          <li key={`passenger-${i}`}>
            <label htmlFor={`passenger-name-${i}`}>Passenger Name</label>
            <input
              type="text"
              name={`passenger-${i}`}
              id={`passenger-name-${i}`}
            ></input>
            <span>Enter passenger name</span>
          </li>
        );

        passengerInputs.push(
          <li key={`location-${i}`}>
            <label htmlFor={`location-${i}`}>Location</label>
            <input
              type="text"
              name={`location-${i}`}
              id={`location-${i}`}
            ></input>
            <span>Enter passenger location</span>
          </li>
        );
      }
      return passengerInputs;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const employee = document.getElementById("input-employee").value;
    const route = document.getElementById("route").value;
    const numSeats = numPassengers;
    const passengers = [];
    // const vanId = uuidv4();

    for (let i = 0; i < numPassengers; i++) {
      const passengerName = document.getElementById(
        `passenger-name-${i}`
      ).value;
      const location = document.getElementById(`location-${i}`).value;
      const uuid = uuidv4();
      passengers.push({ passengerName, location, uuid });
    }

    const formData = {
      employee,
      route,
      numSeats,
      passengers,
    };

    console.log(formData);
    addToDb(formData);
  }

  return (
    <div>
      <form className="form-add" onSubmit={handleSubmit}>
        <h1>Create New Van</h1>
        <ul>
          <li>
            <label htmlFor="employee-name">Employee Name</label>
            <input type="text" name="employee-name" id="input-employee"></input>
            <span>Enter employee name here</span>
          </li>

          <li>
            <label htmlFor="route">Route</label>
            <input type="text" name="route" id="route"></input>
            <span>Enter the route location for this van</span>
          </li>

          <li>
            <label htmlFor="number">Passenger Count</label>
            <select
              type="select"
              name="number"
              id="select"
              onChange={handleNumPassengers}
            >
              <option></option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
              <option>Four</option>
              <option>Five</option>
              <option>Six</option>
            </select>
            <span>Select number of passengers</span>
          </li>
          {passengerInputHtml()}
          <li>
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { vanContext } from "../components/Layout";
import { AiOutlineArrowRight } from "react-icons/Ai";


export default function Employee() {

  const { dbVans } = useContext(vanContext);

  const employeeSelectHtml = dbVans.map( van => {
    return <option key={van.employee}> {van.employee} </option>;
  })


  function handleBtnNextClick() {
    console.log("YOU CLICKED ME??!!")
  }

  return (
    <div className="employee-container">
      <h1>Select Employee</h1>
      <ul>
        <li>
          <label htmlFor="ee-select">Employee Name</label>
          <select
            type="select"
            name="ee-select"
            id="ee-select"
            className="select-employee"
          >
            <option></option>
            {employeeSelectHtml}
          </select>
          <span>Select Out of Office Employee</span>
        </li>
        <li>
          <button onClick={handleBtnNextClick} className="btn-next">
            Next Step
            <AiOutlineArrowRight size="1rem" />
          </button>
        </li>
      </ul>
    </div>
  );
}

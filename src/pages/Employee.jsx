import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { vanContext } from "../components/Layout";
import { AiOutlineArrowRight } from "react-icons/ai";
import Banner from "../components/Banner/index";

export default function Employee() {
  const { dbVans, selectedEmployee, setSelectedEmployee } =
    useContext(vanContext);
  const [warningBanner, setWarningBanner] = useState(false);
  const [errorBanner, setErrorBanner] = useState(false);
  const navigate = useNavigate();
  const selectRef = useRef(null);
  const inactiveVanFromStorage = [];
  const employeeSelectHtml = dbVans.map((van) => {
    return <option key={van.employee}> {van.employee} </option>;
  });
  const handleOptionChange = (e) => {
    setSelectedEmployee(e.target.value);
    e.target.value && setWarningBanner(false);
  };
  const handleBtnNextClick = () => {
    const selectedEmployeeVan = dbVans.find((van) => {
      if (selectedEmployee && van.employee === selectedEmployee) {
        return van;
      }
    });
    if (!selectRef.current.value) {
      setWarningBanner(true);
      setTimeout(() => setWarningBanner(false), 3250);
    } else if (selectedEmployeeVan.passengers.length < 1) {
      setErrorBanner(true);
      setTimeout(() => setErrorBanner(false), 3250);
    } else if (
      inactiveVanFromStorage &&
      selectedEmployee === inactiveVanFromStorage.employee
    ) {
    } else if (selectedEmployee) {
      navigate("../today")
    } else {
      console.error();
    }
  };
  return (
    <div className="employee-container">
      <h1>Select Employee</h1>
      <ul>
        <li>
          <label htmlFor="ee-select">Employee Name</label>
          <select
            ref={selectRef}
            type="select"
            name="ee-select"
            id="ee-select"
            className="select-employee"
            onChange={handleOptionChange}
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
      {warningBanner && (
        <Banner>
          <Banner.Element
            varient="warning"
            text="Please select an employee before proceeding to the next step"
          />
        </Banner>
      )}
      {errorBanner && (
        <Banner>
          <Banner.Element
            varient="error"
            text="There are no passengers in the van that you selected"
          />
        </Banner>
      )}
    </div>
  );
}

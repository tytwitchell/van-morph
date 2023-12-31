import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { vanContext } from "../components/Layout";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loading from "../components/Loading";
import Banner from "../components/Banner/index";

/**
 * 
 * Create option to select amount of OOO employees.  Then ability to assign employee names to drop down
 * employee option length should be determined by amount of employees/vans 
 * 
 */

export default function Employee() {
  const {
    dbVans,
    selectedEmployee,
    setSelectedEmployee
  } = useContext(vanContext);
  const [loading, setLoading] = useState(false);
  const [warningBanner, setWarningBanner] = useState(false);
  const [errorBanner, setErrorBanner] = useState(false);
  const navigate = useNavigate();
  const selectRef = useRef(null);


  const inactiveVanFromStorage = JSON.parse(
    localStorage.getItem("inactiveVan")
  );


  selectedEmployee
    ? localStorage.setItem("selectedEmployee", JSON.stringify(selectedEmployee))
    : "";

  const employeeSelectHtml = dbVans.map((van) => {
    return <option key={van.employee}> {van.employee} </option>;
  });

  useEffect(() => {
    if (inactiveVanFromStorage && !selectRef.current.value) {
      setSelectedEmployee(inactiveVanFromStorage.employee);
    }
  }, [inactiveVanFromStorage]);

  function handleOptionChange(e) {
    setSelectedEmployee(e.target.value);
    e.target.value && setWarningBanner(false);
  }

  function handleBtnNextClick() {
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
      console.log(
        "Inactive employee is the same as previous inactive employee.  Data in Today's van will be reset. Continue??"
      );
    } else if (selectedEmployee) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2500);
      setTimeout(() => navigate("../today"), 2500);
    } else {
      console.log("error");
    }
  }

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
      {loading && <Loading />}
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

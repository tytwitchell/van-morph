import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vanContext } from "../components/Layout";
import { AiOutlineArrowRight } from "react-icons/Ai";
import Loading from "../components/Loading";
import Banner from "../components/Banner/index";

export default function Employee() {
  const { dbVans } = useContext(vanContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState(false);
  const navigate = useNavigate();

  const employeeSelectHtml = dbVans.map((van) => {
    return <option key={van.employee}> {van.employee} </option>;
  });

  function handleOptionChange(e) {
    setSelectedEmployee(e.target.value);
    e?.target.value && setErrorBanner(false);
  }

  function handleBtnNextClick() {
    // write logic to initiate the below if option selected is 'true'
    // if option selected is null => produce a warning saying no option is selected
    if (selectedEmployee) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2500);
      setTimeout(() => navigate("../today"), 2500);
    } else {
      setErrorBanner(true);
      setTimeout(() => setErrorBanner(false), 3250);
    }
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
      {errorBanner && (
        <Banner>
          <Banner.Element
            varient="warning"
            text="Please select an employee before proceeding to the next step"
          />
        </Banner>
      )}
    </div>
  );
}

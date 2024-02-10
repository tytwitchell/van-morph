import { useContext, useState, useEffect } from "react";
import { vanContext } from "../components/Layout";
import InactiveVan from "../components/VansForTodayHtml/InactiveVan";
import UpdatedVans from "../components/VansForTodayHtml/UpdatedVans";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const [allVans, setAllVans] = useState(dbVans);
  const [inactiveVan, setInactiveVan] = useState([]);
  const [availableVans, setAvailableVans] = useState([]);
  const [fullVans, setFullVans] = useState([]);
  const [updatedVans, setUpdatedVans] = useState([]);

  useEffect(() => {
    const storedInactiveVan =
      JSON.parse(localStorage.getItem("inactiveVan")) || [];
    const storedUpdatedVans =
      JSON.parse(localStorage.getItem("updatedVans")) || [];
    const storedAllVans = JSON.parse(localStorage.getItem("allVans")) || [];
    setInactiveVan(storedInactiveVan);
    setUpdatedVans(storedUpdatedVans);
    setAllVans(storedAllVans);
  }, []);
  useEffect(() => {
    localStorage.setItem("inactiveVan", JSON.stringify(inactiveVan));
  }, [inactiveVan]);
  useEffect(() => {
    localStorage.setItem("updatedVans", JSON.stringify(updatedVans));
  }, [updatedVans]);
  useEffect(() => {
    localStorage.setItem("allVans", JSON.stringify(allVans));
  }, [allVans]);
  useEffect(() => {
    const absentVanArr = [];
    const availableVansArr = [];
    const fullVansArr = [];
    const passengerArr = [];
    const updatedVansArr = [];
    let remainingPassengers = [];

    if (selectedEmployee) {
      for (let van of dbVans) {
        if (van.employee === selectedEmployee) {
          absentVanArr.push(van);
          passengerArr.push(...van.passengers);
        } else if (van.passengers.length < 6) {
          availableVansArr.push(van);
        } else {
          fullVansArr.push(van);
        }
      }
      setInactiveVan(absentVanArr);
      setAvailableVans(availableVansArr);
      setFullVans(fullVansArr);
    }
    const newVans = availableVans.map((van) => {
      if (van.passengers.length < 6) {
        const availableSeats = 6 - van.passengers.length;
        const newPassengers = remainingPassengers
          ? [...remainingPassengers.slice(0, availableSeats)]
          : [...passengerArr.slice(0, availableSeats)];
        const updatedPassengers = [...van.passengers, ...newPassengers];
        const newVan = { ...van, passengers: updatedPassengers };
        const unsortedPassengers = passengerArr.filter(
          (passenger) => !updatedPassengers.includes(passenger)
        );
        remainingPassengers = [...unsortedPassengers];
        updatedVansArr.push(newVan);
        return newVan;
      } else {
        return van;
      }
    });
    setUpdatedVans(updatedVansArr);
    setAllVans([...newVans, ...fullVans]);
  }, [selectedEmployee, inactiveVan]);

  return (
    <>
      <h2>Today's Vans</h2>
      <h3>Absent Van</h3>
      <div className="van-list-container">
        <InactiveVan vans={inactiveVan} />
      </div>
      <h3>Vans for Today</h3>
      <div className="van-list-container">
        <UpdatedVans vans={updatedVans} />
      </div>
    </>
  );
}

import { useContext } from "react";
import { vanContext } from "../components/Layout";
import InactiveVan from "../components/VansForTodayHtml/InactiveVan";
import UpdatedVans from "../components/VansForTodayHtml/UpdatedVans";

export default function VansForToday() {
  const { dbVans, selectedEmployee } = useContext(vanContext);
  const renderHtml = () => {
    const targetVan = dbVans.find((van) => van.employee === selectedEmployee);
    const activeVansArr = dbVans.filter(
      (van) => van.employee !== selectedEmployee
    );
    const activeVansCopy = JSON.parse(JSON.stringify(activeVansArr));
    if (selectedEmployee && targetVan) {
      const targetVanPassengersCopy = [...targetVan.passengers];
      const addPassengerToVan = (van, passenger) => {
        van.passengers.push(passenger);
      };
      const findAvailableVan = () => {
        const vanWithAvailableSeats = activeVansCopy.find(
          (van) => van.passengers.length < 6
        );
        return vanWithAvailableSeats;
      };
      const reassignPassengers = () => {
        const availableVan = findAvailableVan();
        const numPassengers = availableVan.passengers.length;
        if (targetVanPassengersCopy.length > 0 && numPassengers < 6) {
          const firstPassenger = targetVanPassengersCopy.shift();
          addPassengerToVan(availableVan, firstPassenger);
          reassignPassengers();
        }
      };
      if (targetVanPassengersCopy.length > 0) {
        reassignPassengers();
      }
    }
    return (
      <>
        <h2>Today's Vans</h2>
        <h3>Absent Van</h3>
        <div className="van-list-container">
          <InactiveVan van={targetVan} />
        </div>
        <h3>Vans for Today</h3>
        <div className="van-list-container">
          <UpdatedVans vans={activeVansCopy} />
        </div>
      </>
    );
  };
  return (
    <div>
      {selectedEmployee ? (
        renderHtml()
      ) : (
        <div className="pendingNoteContainer">
          <h1 className="pendingNoteText">Please select an employee first</h1>
        </div>
      )}
    </div>
  );
}

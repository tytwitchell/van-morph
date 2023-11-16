import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {
  vansInDb,
  handleAddNewPassenger,
  handleRemovePassenger,
} from "../firebase";

const vanContext = createContext();
export { vanContext };

export default function Layout() {
  const [dbVans, setDbVans] = useState(vansInDb);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main>
          <vanContext.Provider
            value={{ dbVans, setDbVans, selectedEmployee, setSelectedEmployee }}
          >
            <Outlet />
          </vanContext.Provider>
        </main>
      </div>
    </>
  );
}

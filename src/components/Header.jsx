import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaVanShuttle } from "react-icons/fa6";


export default function Header() {

  React.useEffect(() => {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header")

      if (window.scrollY > 10) {
        header.style.backgroundColor = "rgba(243, 245, 247, 9)";
        header.style.opacity = ".8";
        header.style.boxShadow = "0 0 8px"
      } else {
        header.style.backgroundColor = "rgba(243, 245, 247, 0)"; // Original background color
        header.style.boxShadow = "0 0 0";
      }

    })
  } ,[])

  const activeStyles = {
    color: "#00497A",
    textDecoration: "underline",
  };

    return (
      <header>
        <Link to="/">
          {/* <FaVanShuttle /> */}
          <h1 className="logo">
            <span>Van</span>
            <FaVanShuttle className="img-logo" />
            Morph
          </h1>
        </Link>
        <nav>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyles : {})}
          >
            Van List
          </NavLink>
          <NavLink
            to="/employee"
            style={({ isActive }) => (isActive ? activeStyles : {})}
          >
            Select Employee
          </NavLink>
          <NavLink
            to="/today"
            style={({ isActive }) => (isActive ? activeStyles : {})}
          >
            Today's Vans
          </NavLink>
          <NavLink
            to="/add"
            style={({ isActive }) => (isActive ? activeStyles : {})}
          >
            Add Van
          </NavLink>
        </nav>
      </header>
    );
}
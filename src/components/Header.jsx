import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaVanShuttle } from "react-icons/fa6";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [fixedHeader, setFixedHeader] = useState(false);
  
  useEffect(() => {
    function handleScroll() {
      const header = document.querySelector("header");
      const currentScrollPos = window.scrollY;
      if (
        currentScrollPos > 5 &&
        currentScrollPos < 20 &&
        currentScrollPos > prevScrollPos
      ) {
        header.classList.remove("header-default");
        header.classList.add("header-top-hidden");
      } else if (currentScrollPos > 20 && currentScrollPos > prevScrollPos) {
        header.classList.remove(
          "header-default",
          "header-scroll-up",
          "header-top-hidden"
        );
        header.classList.add("header-scrolled");
        setFixedHeader(true);
      } else if (fixedHeader && currentScrollPos > 25) {
        header.classList.remove("header-scrolled");
        header.classList.add("header-scroll-up");
      } else {
        header.classList.remove(
          "header-scrolled",
          "header-scroll-up",
          "header-top-hidden"
        );
        header.classList.add("header-default");
        setFixedHeader(false);
      }
      setPrevScrollPos(currentScrollPos);
    }
    window.addEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  const activeStyles = {
    color: "#00497A",
    textDecoration: "underline",
  };

  return (
    <header className="header-default">
      <Link to="/">
        <h1 className="logo">
          <span>Van</span>
          <FaVanShuttle className="img-logo" />
          Morph
        </h1>
      </Link>
      <nav className="nav-default">
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

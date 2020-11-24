import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        className="nav__logo"
      />
      <img
        src="https://occ-0-2483-3647.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABTnff3KYbt0ABMaZvvVs6f7a3ebfrMkPDpQy7SpcBWF5w1HSYb1CkHPhJMrAvs2hYXD4kARaXuIrJx6kjW_6lKI.png?r=b97"
        alt="Account"
        className="nav__avatar"
      />
    </div>
  );
}

export default Navbar;

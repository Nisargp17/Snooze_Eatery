import "./NavBar.css";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function NavBar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    const el = navbarRef.current;

    gsap.set(el, {
      position: "absolute",
      top: 0,
      width: "100%",
    });

    ScrollTrigger.create({
      trigger: el,
      start: "bottom -7vh",
      onEnter: () => {
        gsap.fromTo(
          el,
          { y: "-100%" },
          {
            y: 0,
            backgroundColor: "black",
            position: "fixed",
            duration: 0.5,
          }
        );
      },
      onLeaveBack: () => {
        gsap.to(el, {
          backgroundColor: "transparent",
          position: "absolute",
          duration: 0.5,
        });
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <header
      ref={navbarRef}
      className="absolute NavBar_header z-50 flex justify-evenly items-center"
    >
      <div className="logo flex items-center gap-2">
        <div className="text-white font-bold text-lg">Snooze Eatery</div>
      </div>

      <nav className="nav_titles flex gap-10 h-[8vh]">
        <NavLink
          to="/"
          className="header_item flex items-center justify-center"
        >
          Home
        </NavLink>

        <NavLink
          to="/menu"
          className="header_item flex items-center justify-center"
        >
          Menu
        </NavLink>

        <NavLink
          to="/reservation"
          className="header_item flex items-center justify-center"
        >
          Reservation
        </NavLink>

        <NavLink
          to="/book-table"
          className="header_item flex items-center justify-center"
        >
          Book A Table
        </NavLink>

        <NavLink
          to="/contact"
          className="header_item flex items-center justify-center"
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;

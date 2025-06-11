import "./NavBar.css";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import searchIcon from "/src/assets/search.svg";
import Logo from "/src/assets/logo6.svg";

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
          {
            y: "-100%",
          },
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
    <>
      <header
        ref={navbarRef}
        className="absolute NavBar_header z-50 flex justify-around items-center"
      >
        <div className="logo flex ">
          <img className="invert" src={Logo} alt="" />
          <div className="w-[3rem]">Snooze Eatery</div>
        </div>

        <div className="nav_titles flex gap-15">
          <h1 className="header_item h-[9vh] flex items-center justify-center">
            <NavLink to="/" exact="true">
              Home
            </NavLink>
          </h1>

          <div className="hidden_header_list2 h-[9vh] flex items-center justify-center relative">
            <h1 className="header_item2">Menu</h1>
          </div>

          <div className="hidden_header_list3 h-[9vh] flex items-center justify-center relative">
            <h1 className="header_item3">Reservation</h1>
          </div>

          <h1 className="header_item h-[9vh] flex items-center justify-center">
            <NavLink to="/Portfolio">Book A Table</NavLink>
          </h1>
          <h1 className="header_item h-[9vh] flex items-center justify-center">
            <NavLink to="/Contact">Contact</NavLink>
          </h1>
        </div>

        <div className="search">
          <img className="h-5" src={searchIcon} alt="Search" />{" "}
        </div>
      </header>
    </>
  );
}

export default NavBar;

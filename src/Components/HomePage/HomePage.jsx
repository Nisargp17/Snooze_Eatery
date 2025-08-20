import gsap from "gsap";
import "./HomePage.css";
import { NavLink } from "react-router-dom";
import Img1 from "/src/assets/hero-slider-1.jpg";
import Img2 from "/src/assets/separator.svg";

import { useEffect } from "react";
function HomePage() {
  useEffect(() => {
    gsap.to("#Hero-img", {
      opacity: 1,
      delay: 2,
      yoyo: true,
      ease: "circ",
      duration: 4,
    });
    gsap.fromTo(
      "#Hero-img",
      {
        scale: 1,
        delay: 5,
      },
      { scale: 2, duration: 1000, ease: "power1", yoyo: true, repeat: true }
    );
    gsap.to("#hero_text", {
      opacity: 1,
      bottom: 750,
      yoyo: true,
      ease: "sine",
      duration: 9,
    });
    gsap.to("#hero_text1", {
      opacity: 1,
      bottom: 750,
      delay: 4,
      yoyo: true,
      duration: 2,
    });
    gsap.to("#hero_text2", {
      opacity: 1,
      bottom: 750,
      delay: 5,
      yoyo: true,
      duration: 2,
    });
    gsap.to("#hero_text3", {
      opacity: 1,
      bottom: 750,
      delay: 6,
      yoyo: true,
      duration: 2,
    });
    gsap.to("#hero_text4", {
      opacity: 1,
      bottom: 750,
      delay: 7,
      yoyo: true,
      duration: 2,
    });
    gsap.to("#hero_text5", {
      opacity: 1,
      bottom: 750,
      delay: 8,
      yoyo: true,
      duration: 2,
    });
    gsap.to("#hero_text6", {
      opacity: 1,
      bottom: 750,
      delay: 9,
      yoyo: true,
      duration: 2,
    });
  }, []);
  return (
    <>
      <div className="home max-h-[100vh] overflow-hidden object-fill">
        <div className="relative">
          <div>
            <img
              id="Hero-img"
              className="object-fill h-[100vh] opacity-0 "
              src={Img1}
              alt=""
            />
            <div
              id="hero_text"
              className="flex flex-col justify-center items-center gap-[2rem] opacity-1 relative bottom-[5vh] "
            >
              <div
                id="hero_text1"
                className="text-[bisque] opacity-0 tracking-[10px] bottom-[10vh] font-black"
              >
                DELIGHTFUL EXPERIENCE
              </div>
              <div id="hero_text2" className="img opacity-0">
                <img className="h-[2rem]" src={Img2} alt="" />
              </div>
              <div className=" text-center text-white">
                <div
                  id="hero_text3"
                  className="opacity-0 font-medium text-[5rem]"
                >
                  Flavor Inspired by
                </div>
                <div
                  id="hero_text4"
                  className="opacity-0 font-medium text-[5rem]"
                >
                  the Seasons
                </div>
              </div>
              <div id="hero_text5" className="opacity-0 text-[2rem] text-white">
                Come with family & friends and feel the joy of mouthwatering
                food
              </div>
              <div id="hero_text6" className="opacity-0 btn-view">
                <NavLink to="/menu">
                  <button className="text-[1.1rem] text-white cursor-pointer">
                    View Menu
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;

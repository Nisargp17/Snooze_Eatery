import "./Menu.css";

import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "/src/assets/hero-slider-2.jpg";
import { menuSections } from "../data/MenuData";
import { addToCart } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";
gsap.registerPlugin(ScrollTrigger);

const Section = ({ title, image, items, reverse, onAddToCart }) => {
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !imageLoaded) return;

    const section = sectionRef.current;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none none",
      onEnter: () => {
        if (hasAnimated.current) return;

        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 100 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(
          section.querySelectorAll(".menu-item"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.2,
          }
        );

        hasAnimated.current = true;
      },
    });

    return () => trigger.kill();
  }, [imageLoaded]);

  return (
    <section
      ref={sectionRef}
      className={`opacity-0 flex flex-wrap justify-center items-center gap-10 my-24 px-4 md:px-12 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      {/* Image Container */}
      <div className="h-[75vh] w-full sm:w-[40vw] md:w-[30vw] rounded-t-[100%] overflow-hidden shadow-lg">
        <img
          className="h-full w-full object-cover rounded-t-[100%]"
          src={image}
          alt={`Photo of ${title} section`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Text + Items */}
      <div className="flex flex-col gap-10 max-w-xl px-2 sm:px-6">
        <h2 className="text-gray-800 text-4xl uppercase font-semibold tracking-wide">
          {title}
        </h2>
        <div>
          {items.map((item, index) => (
            <article
              key={index}
              className="menu-item opacity-0 mb-6 p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                {item.tag && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-gray-800 font-bold mt-2">₹ {item.price}</p>
              <div>
                <button
                  className="bg-[#444444] text-white px-[10px] py-[8px] rounded-[20px]"
                  onClick={() => onAddToCart(item)}
                >
                  Add To Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const dispatch = useDispatch();
  const sections = useMemo(() => menuSections, []);
  const [popup, setPopup] = useState(false);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setPopup(true);
    setTimeout(() => setPopup(false), 2000);
  };

  return (
    <>
      <header
        className="flex flex-col justify-center items-center h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <h1 className="text-white font-light text-6xl sm:text-7xl md:text-8xl">
          MENU
        </h1>
      </header>

      <main className="px-4 md:px-12">
        {popup && (
          <div className="fixed top-6 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in">
            Item Added to Cart!
          </div>
        )}

        {sections.map(({ title, image, items, reverse }) => (
          <Section
            key={title}
            title={title}
            image={image}
            items={items}
            reverse={reverse}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>
    </>
  );
};

export default Menu;

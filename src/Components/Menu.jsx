import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "/src/assets/hero-slider-2.jpg";
import img2 from "/src/assets/Menu-img-6.jpg";
import img3 from "/src/assets/Menu-img-7.jpg";
import img4 from "/src/assets/Menu-img-8.jpg";
import img5 from "/src/assets/Menu-img-9.jpg";

gsap.registerPlugin(ScrollTrigger);

const appetizers = [
  {
    name: "Bruschetta",
    description: "Grilled bread with tomatoes, garlic, and basil.",
    price: "₹600",
  },
  {
    name: "Stuffed Bell Peppers",
    description: "Mini peppers filled with spiced rice and herbs.",
    price: "₹640",
  },
  {
    name: "Veg Spring Rolls",
    description: "Crispy rolls stuffed with cabbage and carrots.",
    price: "₹520",
  },
  {
    name: "Paneer Tikka",
    description: "Marinated paneer grilled to perfection.",
    price: "₹720",
  },
  {
    name: "Caprese Skewers",
    description: "Tomatoes, mozzarella & basil with balsamic.",
    price: "₹560",
  },
  {
    name: "Stuffed Tandoori Mushrooms",
    description:
      "Juicy mushrooms stuffed with herbs and cheese, grilled in tandoor.",
    price: "₹260",
    tag: "New",
  },
];

const mainCourse = [
  {
    name: "Vegetable Lasagna",
    description: "Layers of pasta with veggies and cheese.",
    price: "₹1040",
  },
  {
    name: "Palak Paneer",
    description: "Creamy spinach curry with paneer cubes.",
    price: "₹1000",
  },
  {
    name: "Vegetable Stir Fry",
    description: "Seasonal vegetables sautéed in soy sauce.",
    price: "₹880",
  },
  {
    name: "Chana Masala",
    description: "Chickpea curry served with rice or naan.",
    price: "₹920",
  },
  {
    name: "Thai Green Curry",
    description: "Coconut-based curry with veggies and tofu.",
    price: "₹1080",
  },
  {
    name: "Truffle Butter Khichdi",
    description:
      "A luxurious twist on the classic Indian comfort food with white truffle oil.",
    price: "₹320",
    tag: "Chef's Pick",
  },
  {
    name: "Zucchini Kofta Curry",
    description: "Soft zucchini dumplings served in rich Mughlai-style curry.",
    price: "₹290",
  },
  {
    name: "Paneer Steak with Herb Rice",
    description:
      "Grilled paneer slabs served with garlic herb rice and sautéed greens.",
    price: "₹340",
    tag: "Hot",
  },
];

const desserts = [
  {
    name: "Lava Cake",
    description: "Molten chocolate cake with vanilla ice cream.",
    price: "₹520",
  },
  {
    name: "Gulab Jamun",
    description: "Milk balls soaked in cardamom syrup.",
    price: "₹400",
  },
  {
    name: "Tiramisu",
    description: "Coffee-flavored layered dessert.",
    price: "₹560",
  },
  {
    name: "Fruit Custard",
    description: "Mixed fruits in creamy custard.",
    price: "₹440",
  },
  {
    name: "Mango Mousse",
    description: "Light mango-flavored mousse.",
    price: "₹480",
  },
];

const cocktails = [
  {
    name: "Virgin Mojito",
    description: "Mint, lime, sugar, soda – classic and cool.",
    price: "₹440",
  },
  {
    name: "Cucumber Cooler",
    description: "Refreshing cucumber with tonic and lime.",
    price: "₹400",
  },
  {
    name: "Strawberry Lemonade",
    description: "Strawberry puree with lemon and mint.",
    price: "₹440",
  },
  {
    name: "Minty Melon",
    description: "Watermelon juice with mint and lime.",
    price: "₹420",
  },
  {
    name: "Citrus Punch",
    description: "Blend of orange, lime, and soda.",
    price: "₹460",
  },
];

const Section = ({ title, image, items, reverse }) => {
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        if (hasAnimated.current) return;

        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
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
      onLeaveBack: () => {
        // Optional: reset animation if needed (commented out)
        // hasAnimated.current = false;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby={`${title.toLowerCase()}-heading`}
      className={`opacity-0 flex flex-wrap justify-center items-center gap-10 my-24 px-4 md:px-12 ${
        reverse ? "flex-row-reverse" : ""
      } transition-opacity duration-1000`}
    >
      <div className="h-[75vh] w-full sm:w-[40vw] md:w-[30vw] rounded-t-[100%] overflow-hidden shadow-lg">
        <img
          loading="lazy"
          className="h-full w-full object-cover rounded-t-[100%]"
          src={image}
          alt={`Photo of ${title} section`}
        />
      </div>

      <div className="flex flex-col gap-10 max-w-xl px-2 sm:px-6">
        <h2
          id={`${title.toLowerCase()}-heading`}
          className="text-gray-800 text-4xl uppercase font-semibold tracking-wide"
        >
          {title}
        </h2>
        <div>
          {items.map((item, index) => (
            <article
              key={index}
              className="menu-item opacity-0 mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-default"
              tabIndex={0}
              aria-label={`${item.name}, ${item.description}, priced at ${item.price}`}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                {item.tag && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full select-none">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-gray-800 font-bold mt-2">{item.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const sections = useMemo(
    () => [
      {
        title: "Appetizer",
        image: img2,
        items: appetizers,
        reverse: false,
      },
      {
        title: "Main Course",
        image: img3,
        items: mainCourse,
        reverse: true,
      },
      {
        title: "Dessert",
        image: img4,
        items: desserts,
        reverse: false,
      },
      {
        title: "Cocktail",
        image: img5,
        items: cocktails,
        reverse: true,
      },
    ],
    []
  );

  return (
    <>
      <header
        role="banner"
        className="flex flex-col justify-center items-center h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <h1 className="text-white font-light text-6xl sm:text-7xl md:text-8xl select-none">
          MENU
        </h1>
      </header>

      <main
        role="main"
        aria-label="Restaurant menu sections"
        className="px-4 md:px-12"
      >
        {sections.map(({ title, image, items, reverse }) => (
          <Section
            key={title}
            title={title}
            image={image}
            items={items}
            reverse={reverse}
          />
        ))}
      </main>
    </>
  );
};

export default Menu;

import img1 from "/src/assets/home1-main-icon1.png";
import img2 from "/src/assets/home1-main-icon2.png";
import img3 from "/src/assets/home1-main-icon3.png";
import img4 from "/src/assets/home1-main-icon4.png";

const iconData = [
  {
    id: 1,
    image: img1,
    title: "Fresh Ingredients",
    description:
      "We use hand-picked, locally sourced veggies and herbs in every meal.",
  },
  {
    id: 2,
    image: img2,
    title: "Healthy Meals",
    description:
      "Balanced, nutrient-rich dishes prepared with minimal oil and care.",
  },
  {
    id: 3,
    image: img3,
    title: "Mediterranean Taste",
    description:
      "Authentic flavors inspired by Mediterranean traditions and spices.",
  },
  {
    id: 4,
    image: img4,
    title: "Eating Well",
    description:
      "Satisfy your cravings while staying aligned with your wellness goals.",
  },
];

function HomePage5() {
  return (
    <section className="h-[40vh] flex flex-wrap justify-evenly items-center gap-y-8 py-10 px-4 bg-[#ebebeb]">
      {iconData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center gap-3 w-full sm:w-[45%] md:w-[20vw] text-center hover:scale-105 hover:cursor-pointer transition-transform duration-300"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className=" font-semibold text-[#2e2e2e] text-base sm:text-lg md:text-xl">
            {item.title}
          </h3>
          <p className="text-[0.8vw] sm:text-[1vw] text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default HomePage5;

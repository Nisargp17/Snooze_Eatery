import img1 from "/src/assets/hero-slider-2.jpg";
import img2 from "/src/assets/Menu-img-6.jpg";
import img3 from "/src/assets/Menu-img-7.jpg";
import img4 from "/src/assets/Menu-img-8.jpg";
import img5 from "/src/assets/Menu-img-9.jpg";

const appetizers = [
  {
    name: "Bruschetta",
    description: "Grilled bread with tomatoes, garlic, and basil.",
    price: "$7.50",
  },
  {
    name: "Stuffed Bell Peppers",
    description: "Mini peppers filled with spiced rice and herbs.",
    price: "$8.00",
  },
  {
    name: "Veg Spring Rolls",
    description: "Crispy rolls stuffed with cabbage and carrots.",
    price: "$6.50",
  },
  {
    name: "Paneer Tikka",
    description: "Marinated paneer grilled to perfection.",
    price: "$9.00",
  },
  {
    name: "Caprese Skewers",
    description: "Tomatoes, mozzarella & basil with balsamic.",
    price: "$7.00",
  },
];

const mainCourse = [
  {
    name: "Vegetable Lasagna",
    description: "Layers of pasta with veggies and cheese.",
    price: "$13.00",
  },
  {
    name: "Palak Paneer",
    description: "Creamy spinach curry with paneer cubes.",
    price: "$12.50",
  },
  {
    name: "Vegetable Stir Fry",
    description: "Seasonal vegetables sautéed in soy sauce.",
    price: "$11.00",
  },
  {
    name: "Chana Masala",
    description: "Chickpea curry served with rice or naan.",
    price: "$11.50",
  },
  {
    name: "Thai Green Curry",
    description: "Coconut-based curry with veggies and tofu.",
    price: "$13.50",
  },
];

const desserts = [
  {
    name: "Lava Cake",
    description: "Molten chocolate cake with vanilla ice cream.",
    price: "$6.50",
  },
  {
    name: "Gulab Jamun",
    description: "Milk balls soaked in cardamom syrup.",
    price: "$5.00",
  },
  {
    name: "Tiramisu",
    description: "Coffee-flavored layered dessert.",
    price: "$7.00",
  },
  {
    name: "Fruit Custard",
    description: "Mixed fruits in creamy custard.",
    price: "$5.50",
  },
  {
    name: "Mango Mousse",
    description: "Light mango-flavored mousse.",
    price: "$6.00",
  },
];

const cocktails = [
  {
    name: "Virgin Mojito",
    description: "Mint, lime, sugar, soda – classic and cool.",
    price: "$5.50",
  },
  {
    name: "Cucumber Cooler",
    description: "Refreshing cucumber with tonic and lime.",
    price: "$5.00",
  },
  {
    name: "Strawberry Lemonade",
    description: "Strawberry puree with lemon and mint.",
    price: "$5.50",
  },
  {
    name: "Minty Melon",
    description: "Watermelon juice with mint and lime.",
    price: "$5.25",
  },
  {
    name: "Citrus Punch",
    description: "Blend of orange, lime, and soda.",
    price: "$5.75",
  },
];

const Section = ({ title, image, items, reverse }) => (
  <section
    className={`flex justify-center items-center flex-wrap gap-[5vh] ${
      reverse ? "flex-row-reverse" : ""
    } my-[6vh]`}
  >
    <div className="h-[70vh] w-[40vw] rounded-t-[100%] overflow-hidden">
      <img
        className="h-full w-full object-cover rounded-t-[100%]"
        src={image}
        alt={title}
      />
    </div>
    <div className="flex flex-col gap-[5vh] px-8">
      <div className="text-[#2e2e2e] text-[3vw] uppercase">{title}</div>
      <div>
        {items.map((item, index) => (
          <div key={index} className="w-[20vw] mb-4">
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <p className="text-gray-800 font-bold mt-2">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

function Menu() {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="text-[4.5rem] text-white font-[300]">MENU</div>
      </div>

      <Section
        title="Appetizer"
        image={img2}
        items={appetizers}
        reverse={false}
      />
      <Section
        title="Main Course"
        image={img3}
        items={mainCourse}
        reverse={true}
      />
      <Section title="Dessert" image={img4} items={desserts} reverse={false} />
      <Section title="Cocktail" image={img5} items={cocktails} reverse={true} />
    </>
  );
}

export default Menu;

const vegMenu = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes cooked in rich tomato gravy.",
    price: "₹220",
    image: "https://source.unsplash.com/400x300/?paneer",
  },
  {
    id: 2,
    name: "Veg Biryani",
    description: "Fragrant basmati rice with assorted vegetables and spices.",
    price: "₹180",
    image: "https://source.unsplash.com/400x300/?biryani",
  },
  {
    id: 3,
    name: "Aloo Gobi",
    description: "Spiced potatoes and cauliflower sautéed with onions.",
    price: "₹150",
    image: "https://source.unsplash.com/400x300/?aloo-gobi",
  },
  {
    id: 4,
    name: "Dal Tadka",
    description: "Yellow lentils tempered with ghee and spices.",
    price: "₹130",
    image: "https://source.unsplash.com/400x300/?dal",
  },
  {
    id: 5,
    name: "Chole Bhature",
    description: "Spicy chickpeas served with fried bread.",
    price: "₹170",
    image: "https://source.unsplash.com/400x300/?chole",
  },
  {
    id: 6,
    name: "Palak Paneer",
    description: "Spinach puree cooked with paneer and spices.",
    price: "₹200",
    image: "https://source.unsplash.com/400x300/?palak-paneer",
  },
  {
    id: 7,
    name: "Vegetable Pulao",
    description: "Steamed rice with sautéed vegetables and mild spices.",
    price: "₹160",
    image: "https://source.unsplash.com/400x300/?vegetable-pulao",
  },
  {
    id: 8,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced mashed potatoes.",
    price: "₹100",
    image: "https://source.unsplash.com/400x300/?dosa",
  },
  {
    id: 9,
    name: "Pav Bhaji",
    description: "Mashed vegetables cooked in butter served with toasted buns.",
    price: "₹120",
    image: "https://source.unsplash.com/400x300/?pav-bhaji",
  },
  {
    id: 10,
    name: "Rajma Chawal",
    description: "Kidney beans in a thick gravy served with steamed rice.",
    price: "₹150",
    image: "https://source.unsplash.com/400x300/?rajma",
  },
  {
    id: 11,
    name: "Matar Paneer",
    description: "Green peas and paneer cooked in onion-tomato gravy.",
    price: "₹190",
    image: "https://source.unsplash.com/400x300/?matar-paneer",
  },
  {
    id: 12,
    name: "Bhindi Masala",
    description: "Spiced okra sautéed with onions and tomatoes.",
    price: "₹140",
    image: "https://source.unsplash.com/400x300/?bhindi",
  },
];
function HomePage4() {
  return (
    <>
      <section className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-8">
        <div className="text-[3vw] font-bold text-[#2e2e2e] my-6 uppercase border-b-4 ">
          Menu
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-[3vh] px-4 max-h-[70vh] overflow-y-auto scroll-smooth custom-scroll">
          {vegMenu.map((item) => (
            <div
              key={item.id}
              className="card bg-white p-4 shadow-md rounded-lg border transition-transform duration-300 hover:scale-105 hover:shadow-xl max-w-sm"
            >
              {/* <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" /> */}
              <div className="text-xl font-semibold text-[#353535]">
                {item.name}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {item.description}
              </div>
              <div className="text-md font-bold text-gray-700 mt-2">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default HomePage4;

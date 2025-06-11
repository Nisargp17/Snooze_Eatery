const specialDishes = [
  {
    id: 1,
    name: "Truffle Butter Khichdi",
    description:
      "A luxurious twist on the classic Indian comfort food with white truffle oil.",
    price: "₹320",
    image: "https://source.unsplash.com/400x300/?truffle,khichdi",
    tag: "Chef's Pick",
  },
  {
    id: 2,
    name: "Stuffed Tandoori Mushrooms",
    description:
      "Juicy mushrooms stuffed with herbs and cheese, grilled in tandoor.",
    price: "₹260",
    image: "https://source.unsplash.com/400x300/?stuffed-mushroom,tandoori",
    tag: "New",
  },
  {
    id: 3,
    name: "Zucchini Kofta Curry",
    description: "Soft zucchini dumplings served in rich Mughlai-style curry.",
    price: "₹290",
    image: "https://source.unsplash.com/400x300/?kofta,curry",
  },
  {
    id: 4,
    name: "Paneer Steak with Herb Rice",
    description:
      "Grilled paneer slabs served with garlic herb rice and sautéed greens.",
    price: "₹340",
    image: "https://source.unsplash.com/400x300/?paneer,grilled",
    tag: "Hot",
  },
];
function HomePage6() {
  return (
    <>
      <section className="bg-white min-h-screen py-12 px-4 sm:px-6 md:px-20">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          Snooze Special
        </h2>

        <div className="flex flex-col gap-12">
          {specialDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex flex-col md:flex-row items-center bg-[#f9f9f9] border border-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full md:w-[50%] h-[250px] md:h-[300px] object-cover"
              />

              <div className="w-full md:w-[50%] p-6 flex flex-col justify-center gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {dish.name}
                  </h3>
                  <span className="text-green-700 font-bold text-lg">
                    {dish.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dish.description}
                </p>
                {dish.tag && (
                  <span className="mt-2 inline-block w-fit px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    {dish.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default HomePage6;

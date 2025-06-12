import Img1 from "/src/assets/special1.webp";
import Img2 from "/src/assets/special2.jpg";
import Img3 from "/src/assets/special3.jpg";
import Img4 from "/src/assets/special4.jpg";

const specialDishes = [
  {
    id: 1,
    name: "Truffle Butter Khichdi",
    description:
      "A luxurious twist on the classic Indian comfort food with white truffle oil.",
    price: "₹320",
    image: Img1,
    tag: "Chef's Pick",
  },
  {
    id: 2,
    name: "Stuffed Tandoori Mushrooms",
    description:
      "Juicy mushrooms stuffed with herbs and cheese, grilled in tandoor.",
    price: "₹260",
    image: Img2,
    tag: "New",
  },
  {
    id: 3,
    name: "Zucchini Kofta Curry",
    description: "Soft zucchini dumplings served in rich Mughlai-style curry.",
    price: "₹290",
    image: Img3,
  },
  {
    id: 4,
    name: "Paneer Steak with Herb Rice",
    description:
      "Grilled paneer slabs served with garlic herb rice and sautéed greens.",
    price: "₹340",
    image: Img4,
    tag: "Hot",
  },
];

function HomePage6() {
  return (
    <section className="bg-white min-h-screen py-20 px-12 max-w-7xl mx-auto">
      <h2 className="text-center text-5xl font-extrabold text-gray-900 mb-16 tracking-tight">
        Snooze Special
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {specialDishes.map(({ id, name, description, price, image, tag }) => (
          <article
            key={id}
            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              {tag && (
                <span className="absolute top-4 left-4 bg-yellow-300 text-yellow-900 font-semibold text-sm px-3 py-1 rounded-lg shadow-md">
                  {tag}
                </span>
              )}
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold text-gray-900">{name}</h3>
                <span className="text-green-700 font-bold text-2xl">
                  {price}
                </span>
              </div>
              <p className="text-gray-700 text-lg flex-grow leading-relaxed">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage6;

import { useDispatch } from "react-redux";
import { vegMenu } from "../../data/MenuData";
import { addToCart } from "../../features/cart/CartSlice";
import { useState } from "react";
function HomePage4() {
  const dispatch = useDispatch();
  const [isPopup, setIsPopup] = useState(false);

  return (
    <>
      <section className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-8">
        {isPopup && (
          <div className="fixed top-6 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in">
            Item Added to Cart!
          </div>
        )}

        <div className="text-[3vw] font-bold text-[#2e2e2e] my-6 uppercase border-b-4 ">
          Menu
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-[3vh] pt-[30px] px-4 max-h-[90vh] overflow-y-auto scroll-smooth custom-scroll">
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
                ₹ {item.price}
              </div>
              <button
                className="cursor-pointer bg-[#444444] text-white px-[10px] py-[8px] rounded-[20px]"
                onClick={() => {
                  dispatch(addToCart(item));
                  setIsPopup(true);
                  setTimeout(() => setIsPopup(false), 2000);
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default HomePage4;

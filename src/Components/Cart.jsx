import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../features/cart/CartSlice";
import { vegMenu } from "../data/MenuData";

import img1 from "/src/assets/hero-slider-2.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, Total } = useSelector((state) => state.cart);

  return (
    <>
      <header
        className="flex flex-col justify-center items-center h-[30vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <h1 className="text-white font-light text-6xl sm:text-7xl md:text-8xl">
          Cart
        </h1>
      </header>
      <div className="flex min-h-[70vh]">
        <aside className="w-[18vw] bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto pt-[10vh]">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Food Menu</h2>
          <ul className="space-y-2">
            {vegMenu.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-sm font-medium px-2 py-1 hover:bg-white rounded cursor-pointer"
                onClick={() => dispatch(addToCart(item))}
              >
                <span>{item.name}</span>
                <span className="text-green-600">₹{item.price}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-[#f7f7f7] p-10 overflow-y-auto pt-[10vh]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800"> Your Cart</h1>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
            >
              Clear Cart
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex-1 text-gray-800 text-base">
                    {item.name} × {item.quantity}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-green-700">
                      ₹{Number(item.price) * item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.name))}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      −
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-8 text-right text-xl font-bold text-gray-700">
              Total: ₹{Total}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Cart;

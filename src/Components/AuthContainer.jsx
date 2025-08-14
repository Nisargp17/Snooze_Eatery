import { useState, useRef } from "react";
import { gsap } from "gsap";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const sliderRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      sliderRef,
      {
        width: "50%",
      },
      {
        width: "100%",
        x: "100%",
        duration: 1000,
        ease: "power1",
        yoyo: true,
        repeat: true,
      }
    );
  }, [isLogin]);

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center items-center">
      <div className="relative w-[1260px] h-[735px] overflow-hidden rounded-[20px] bg-gray-100 shadow-lg flex">
        <div className="flex relative w-full h-full">
          <div className="w-1/2 flex justify-center items-center">
            <Login />
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <Signup />
          </div>
        </div>
        <div
          ref={sliderRef}
          className={`absolute top-0 h-full w-1/2 bg-gray-700 transition-all duration-1000 ease-in-out rounded-[20px] shadow-xl flex flex-col justify-center items-center`}
          style={{
            transform: isLogin ? "translateX(0%)" : "translateX(100%)",
          }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[#202224]">
            {isLogin ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="mb-6 text-gray-500 text-center px-8">
            {isLogin
              ? "Already have an account? Login to stay connected."
              : "Dont Have an account? Lets create One"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="bg-[#4880FF] text-white px-6 py-2 rounded-[8px] font-semibold"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

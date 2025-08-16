import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const sliderRef = useRef();

  useEffect(() => {
    if (!sliderRef.current) return;

    // Kill existing animations if toggled fast
    gsap.killTweensOf(sliderRef.current);

    // Create a timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
    });

    if (isLogin) {
      // Back to Login Mode
      tl.to(sliderRef.current, { x: "0%", width: "100%" }) // first expand fully
        .to(sliderRef.current, { width: "50%" }); // then slide back + compress
    } else {
      // To Signup Mode
      tl.to(sliderRef.current, { width: "100%" }) // first expand fully
        .to(sliderRef.current, { x: "100%", width: "50%" }); // then slide right + compress
    }
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
          className="absolute top-0 h-full bg-gray-700 rounded-[20px] shadow-xl flex flex-col justify-center items-center"
          style={{
            width: "50%",
            transform: "translateX(0%)",
          }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[#202224]">
            {isLogin ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="mb-6 text-gray-500 text-center px-8">
            {isLogin
              ? "Already have an account? Login to stay connected."
              : "Don't have an account? Let's create one!"}
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

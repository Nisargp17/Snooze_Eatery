function Login() {
  return (
    <>
      <div className="flex h-screen bg-blue-500 justify-center items-center overflow-hidden">
        <div className="flex absolute justify-center items-center bg-white h-[735.36px] w-[630px]  flex-col rounded-[20px]">
          <div className="flex items-center justify-center flex-col w-[516px] h-[556px]">
            <div className=" text-[32px] text-[#202224] font-[700] -tracking-[0.11px] leading-[100%] ">
              Login To Account
            </div>
            <div className="pt-[15px] text-[18px] text-[#202224] font-[600] -tracking-[0.06px] leading-[100%]">
              Please Enter Your Email and Your Password To Continue
            </div>

            <div className="flex flex-col justify-start items-start pt-[37px] w-[516px] h-[96px]">
              <label className="text-[18px] text-[#202224] font-[600] opacity-[80%] -tracking-[0.06px]">
                Email Address:
              </label>
              <input
                className="w-[516px] h-[56px] mt-[15px] bg-[#F1F4F9] py-[15px] border-[1px] border-[#D8D8D8] rounded-[8px] pl-[16px]"
                placeholder="abc@gmail.com"
                type="email"
                name="email"
                // value={form.email}
                // onChange={handleChange}
              />
            </div>

            <div className="flex flex-col justify-start items-start mt-[55px] w-[516px] h-[145px]">
              <div className="flex justify-center items-center gap-[280px]">
                <label className="text-[18px] text-[#202224] font-[600] opacity-[80%] -tracking-[0.06px]">
                  Password:
                </label>
                <span className="text-[18px] text-[#202224] font-[600] opacity-[60%] -tracking-[0.06px] ">
                  Forgot Password?
                </span>
              </div>
              <div className="relative w-full mt-[15px]">
                <input
                  className="w-full h-[56px] bg-[#F1F4F9] border border-[#D8D8D8] rounded-[8px] pl-[16px] pr-[40px]"
                  placeholder="Enter Your Password"
                  // type={showPassword ? "text" : "password"}
                  name="password"
                  // value={form.password}
                  // onChange={handleChange}
                />
                {/* <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                )}
                </button> */}
              </div>
              <div className="pt-[24px] flex justify-center items-center gap-[12px]">
                <input
                  className="h-[24px] w-[24px] border-[#A3A3A3] border-[0.6px]"
                  type="checkbox"
                />
                <label className="text-[18px] text-[#202224] font-[600] opacity-[60%] -tracking-[0.06px]">
                  Remember Password
                </label>
              </div>
            </div>

            {/* {error && (
            <div className="absolute bottom-[220px] text-red-500 text-[18px] font-[600] -tracking-[0.06px] text-center">
              {error}
            </div>
          )} */}

            <button
              type="submit"
              className="bg-[#4880FF] text-[20px] text-[#FFFFFF] py-[14px] font-[700] mt-[55px] w-[418px] h-[56px] opacity-[90%] rounded-[8px]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;

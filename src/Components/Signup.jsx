function Signup() {
  return (
    <div className="flex  justify-center items-center bg-white h-[735.36px] w-[630px] flex-col rounded-[20px]">
      <div className="flex items-center justify-center flex-col w-[516px]">
        <div className="text-[32px] text-[#202224] font-[700] -tracking-[0.11px] leading-[100%]">
          Create Account
        </div>
        <div className="pt-[15px] text-[18px] text-[#202224] font-[600] -tracking-[0.06px] leading-[100%]">
          Please Fill In The Details To Register
        </div>

        {/* Email */}
        <div className="flex flex-col justify-start items-start mt-[25px] w-[516px]">
          <label className="text-[18px] text-[#202224] font-[600] opacity-[80%] -tracking-[0.06px]">
            Email Address:
          </label>
          <input
            className="w-[516px] h-[56px] mt-[15px] bg-[#F1F4F9] py-[15px] border border-[#D8D8D8] rounded-[8px] pl-[16px]"
            placeholder="abc@gmail.com"
            type="email"
            name="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col justify-start items-start mt-[25px] w-[516px]">
          <label className="text-[18px] text-[#202224] font-[600] opacity-[80%] -tracking-[0.06px]">
            Password:
          </label>
          <input
            className="w-full h-[56px] mt-[15px] bg-[#F1F4F9] border border-[#D8D8D8] rounded-[8px] pl-[16px]"
            placeholder="Enter Your Password"
            type="password"
            name="password"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col justify-start items-start mt-[25px] w-[516px]">
          <label className="text-[18px] text-[#202224] font-[600] opacity-[80%] -tracking-[0.06px]">
            Confirm Password:
          </label>
          <input
            className="w-full h-[56px] mt-[15px] bg-[#F1F4F9] border border-[#D8D8D8] rounded-[8px] pl-[16px]"
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-[#4880FF] text-[20px] text-[#FFFFFF] py-[14px] font-[700] mt-[35px] w-[418px] h-[56px] opacity-[90%] rounded-[8px]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
export default Signup;

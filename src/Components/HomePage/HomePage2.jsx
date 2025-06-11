import img1 from "/src/assets/food9.jpg";
import "./HomePage.css";
function HomePage2() {
  return (
    <>
      <section className="h-[75vh] flex flex-col justify-center item-center text-[#242432] text-center ">
        <div className="text-[1.2vw] font-[300] pt-[0.1vh]">
          TASTY AND CRUNCHY
        </div>
        <div className="text-[3vw] font-[500] pt-[0.1vh]">Our Stories</div>
        <div className=" text-[0.8vw] pt-[0.1vh] ">
          <div>Savor the flavors of the season in every bite</div>
          <div>Gather with friends and family where food meets art</div>
          <div>Experience handcrafted dishes made with passion and purpose</div>
        </div>
        <div className="flex justify-center gap-[10vh] pt-[5vh]">
          <div>
            <img className="h-[35vh]" src={img1} alt="" />
          </div>
          <div>
            <img className="h-[35vh]" src={img1} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
export default HomePage2;

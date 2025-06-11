import Img1 from "/src/assets/home1-main-image-4.jpg";
import "./HomePage.css";
function HomePage3() {
  return (
    <>
      <section className="h-[50vh] bg-[#ebebeb] flex justify-center items-center">
        <div className="flex flex-col justify-start w-[40vw]">
          <div className="text-[1.2vw] font-[300] pt-[0.1vh]">
            TASTY AND CRUNCHY
          </div>
          <div className="text-[3vw] font-[500] pt-[0.1vh]">
            I N G R E D I E N T S
          </div>
          <div className="w-[30vw] text-[1vw] pb-[1vh]">
            We use only the finest, freshest ingredients — locally sourced,
            seasonal, and full of flavor. From hand-picked produce to
            high-quality meats and cheeses, every dish begins with ingredients
            we’re proud to serve.
          </div>
          <div className=" pt-[1vh]">
            <button className="home_button py-[2vh] px-[3vw] bg-[white]">
              VIEW MENU
            </button>
          </div>
        </div>
        <div>
          <img src={Img1} alt="" />
        </div>
      </section>
    </>
  );
}
export default HomePage3;

import img1 from "/src/assets/food9.jpg";

function HomePage2() {
  return (
    <section className="h-[75vh] flex flex-col justify-center items-center text-[#242432] text-center px-6">
      <header className="mb-4">
        <p className="text-[1.2vw] font-light">TASTY AND CRUNCHY</p>
        <h2 className="text-[3vw] font-semibold mt-1">Our Stories</h2>
      </header>

      <article className="text-[0.8vw] space-y-1 max-w-3xl mb-12">
        <p>Savor the flavors of the season in every bite</p>
        <p>Gather with friends and family where food meets art</p>
        <p>Experience handcrafted dishes made with passion and purpose</p>
      </article>

      <div className="flex justify-center gap-[10vh]">
        {[0, 1].map((i) => (
          <img
            key={i}
            className="h-[35vh] object-cover rounded-lg shadow-md"
            src={img1}
            alt={`Delicious food presentation ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage2;

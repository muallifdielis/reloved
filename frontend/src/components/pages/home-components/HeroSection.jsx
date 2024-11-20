export default function HeroSection() {
  return (
    <div className="w-full h-80 md:h-[30rem]">
      <div
        style={{
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-full"
      >
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-title text-4xl md:text-6xl text-white text-center">
              Ready to be
            </h1>
            <h1 className="font-title text-4xl md:text-6xl text-white text-center md:mt-2">
              ReLoved
            </h1>
            <button className="bg-accent text-white py-3 px-10 rounded-xl text-sm md:text-base hover:bg-accentHover transition-colors duration-300 ease-in-out">
              Belanja sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { PiCoatHanger } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import Card from "../../../../components/common/Card";
import { Link, useSearchParams } from "react-router-dom";

export default function Profile() {
  const [tabParams] = useSearchParams();
  const tab = tabParams.get("tab");
  console.log("tab", tab);

  return (
    <div className="m-5 md:m-10">
      {/* USER INFO */}
      <div className="container flex flex-col md:flex-row items-center gap-5">
        <img
          src="https://picsum.photos/200"
          alt="Profile Picture"
          className="w-36 h-36 rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <h4 className="text-gray-400 mb-2">@johndoe</h4>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptates.
          </p>

          <div className="flex flex-row gap-3 mt-6">
            <Link to="/settings/edit">
              <button className="bg-secondary/25 hover:bg-secondary/50 transition-colors duration-300 px-4 py-2 rounded-xl">
                Ubah profil
              </button>
            </Link>
            <Link to="/add-product">
              <button className="bg-secondary/25 hover:bg-secondary/50 transition-colors duration-300 px-4 py-2 rounded-xl">
                Tambah produk
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}

      <div className="flex justify-center items-center mt-10 mb-5 mx-4">
        <div className="border-b border-gray-200 w-full md:w-9/12">
          <nav className="-mb-px flex justify-evenly gap-6" aria-label="Tabs">
            <Link
              to="/profile"
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                tab !== "likes"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-gray-500"
              } hover:border-secondary hover:text-secondary px-1 pb-4 text-sm font-medium`}
            >
              <PiCoatHanger className="size-5" />
              Produk
            </Link>

            <Link
              to="/profile?tab=likes"
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                tab === "likes"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-gray-500"
              } hover:border-secondary hover:text-secondary px-1 pb-4 text-sm font-medium`}
            >
              <GoHeart className="size-5" />
              Suka
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 mb-10 md:mx-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

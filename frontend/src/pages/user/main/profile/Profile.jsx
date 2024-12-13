import { PiCoatHanger } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import Card from "../../../../components/common/Card";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useUserStore } from "../../../../store/userStore";

export default function Profile() {
  const { currentUser } = useAuthStore();
  const {
    user,
    getUserById,
    getSellerProducts,
    getLikedProducts,
    sellerProducts,
    likedProducts,
    isLoading,
  } = useUserStore();
  const [tabParams] = useSearchParams();
  const tab = tabParams.get("tab");
  const { id } = useParams();
  const [isProfileOwner, setIsProfileOwner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getUserById(id);
      }
    };
    if (tab !== "likes") {
      getSellerProducts(id);
    } else {
      getLikedProducts(id);
    }

    if (currentUser?._id === id) {
      setIsProfileOwner(true);
    } else {
      setIsProfileOwner(false);
    }
    fetchData();
  }, [
    id,
    tab,
    getUserById,
    getSellerProducts,
    getLikedProducts,
    currentUser?._id,
  ]);

  return (
    <div>
      {!user ? (
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          <img
            src="/user-notfound.svg"
            alt="Error"
            className="lg:w-1/2 h-auto mb-5"
          />
          <h2 className="text-2xl font-semibold">Profil tidak ditemukan</h2>
        </div>
      ) : (
        <div className="m-5 md:m-10">
          {/* USER INFO */}
          <div className="container flex flex-col md:flex-row items-center gap-5">
            <img
              src={user?.image ? user.image : "/avatar.png"}
              alt={`Profil ${user?.name}`}
              className="w-36 h-36 rounded-full object-cover"
            />

            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <h4 className="text-gray-400 mb-2">@{user?.username}</h4>
              <p className="text-sm">{user?.bio}</p>

              {isProfileOwner && (
                <div className="flex flex-row gap-3 mt-6">
                  <Link to="/settings/edit">
                    <button className="bg-secondary/25 hover:bg-secondary/50 transition-colors duration-300 px-4 py-2 rounded-xl">
                      Ubah profil
                    </button>
                  </Link>
                  <Link to="/form-product">
                    <button className="bg-secondary/25 hover:bg-secondary/50 transition-colors duration-300 px-4 py-2 rounded-xl">
                      Tambah produk
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="flex justify-center items-center mt-10 mb-5 mx-4">
            <div className="border-b border-gray-200 w-full md:w-9/12">
              <nav
                className="-mb-px flex justify-evenly gap-6"
                aria-label="Tabs"
              >
                <Link
                  to={`/profile/${id}`}
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
                  to={`/profile/${id}?tab=likes`}
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

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* PRODUCTS */}
              {tab === "likes" ? (
                <>
                  {likedProducts?.length === 0 ? (
                    <div className="flex justify-center items-center mt-10 mb-5 mx-4">
                      <h2 className="text-gray-500">
                        Belum ada produk yang disukai
                      </h2>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 mb-10 md:mx-4">
                      {likedProducts?.map((product) => (
                        <Card key={product._id} product={product} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {sellerProducts?.length === 0 ? (
                    <div className="flex justify-center items-center mt-10 mb-5 mx-4">
                      <h2 className="text-gray-500">
                        Belum ada produk yang dijual
                      </h2>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 mb-10 md:mx-4">
                      {sellerProducts?.map((product) => (
                        <Card key={product._id} product={product} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

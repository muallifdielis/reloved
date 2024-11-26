import { FaInstagram, FaGithub } from "react-icons/fa";
import TitleSection from "../../../components/common/TitleSection";

export default function SearchResults() {
  return (
    <div className="px-4 pt-0 pb-4 bg-white mx-auto">
      {/* Section Judul */}
      <TitleSection title="Tentang Kami" />

      {/* Section Deskripsi */}
      <div className="w-full mt-8 text-center md:px-8 px-3 lg:px-14 transition duration-300 ease-in-out hover:scale-105 pb-8 ">
        <div className="p-6 bg-orange-200 shadow-lg rounded-2xl">
          <p className="text-gray-700 font-semibold p-4 text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            praesentium laborum cumque unde, velit dolores, sed dignissimos quo
            eveniet veritatis, id nostrum placeat! Dignissimos porro quo aperiam
            sapiente, quas rerum maiores distinctio? Delectus odio repudiandae
            pariatur aperiam asperiores quia non ipsum, totam suscipit,
            consectetur beatae laboriosam? Quaerat sunt eveniet minima, cum
            velit doloribus nihil quo rerum, voluptate veniam iusto quos soluta
            ipsa accusamus. Velit maxime magni, officiis quaerat labore
            distinctio sint nam ea, odit at modi architecto quis veritatis
            dignissimos ad sed eos excepturi blanditiis atque? Error explicabo,
            velit fugiat aliquid vero quos corrupti eligendi, repellendus neque
            odit nemo nisi.
          </p>
        </div>
      </div>

      {/* Section Tim Developer */}
      <TitleSection title="Tim Developer" />

      <div className="max-w-screen-2xl mx-auto px-4 py-6 lg:pt-1  ">
        <div className="flex flex-wrap justify-center gap-12 max-w-screen-2xl mx-auto mt-2">
          {/* Anggota Tim 1 */}
          <div className="team-member text-center bg-orange-200 p-8 lg:p-4 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[21rem] transition duration-300 ease-in-out hover:scale-105 ">
            <div>
              <img
                src="https://picsum.photos/100"
                alt="Alfia Meilani Putri"
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Alfia Meilani Putri</p>
              <p className="text-sm text-gray-600">
                UI/UX Designer & Frontend Developer
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/alfiameilani18"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/alfiameilaniputri"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Anggota Tim 2 */}
          <div className="team-member text-center bg-orange-200 p-8 lg:p-4 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[21rem] transition duration-300 ease-in-out hover:scale-105 ">
            <div>
              <img
                src="https://picsum.photos/100"
                alt="Kamilah Syahrabanu"
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Kamilah Syahrabanu</p>
              <p className="text-sm text-gray-600">
                UI/UX Designer & Frontend Developer
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/kamilahabsyi"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/kamilahsyhrbn"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Anggota Tim 3 */}
          <div className="team-member text-center bg-orange-200 p-8 lg:p-4 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[21rem] transition duration-300 ease-in-out hover:scale-105 ">
            <div>
              <img
                src="https://picsum.photos/100"
                alt="Siti Nurlaela"
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full mx-auto object-cover border-4"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Siti Nurlaela</p>
              <p className="text-sm text-gray-600">Backend Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://instagram.com/laelasnl"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/laelasnl"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Anggota Tim 4 */}
          <div className="team-member text-center bg-orange-200 p-8 lg:p-4 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[21rem] transition duration-300 ease-in-out hover:scale-105 ">
            <div>
              <img
                src="https://picsum.photos/100"
                alt="Muhammad Muallif Dielis"
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Muhammad Muallif Dielis
              </p>
              <p className="text-sm text-gray-600">Fullstack Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://www.instagram.com/allif_dielis12"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="hhttps://github.com/muallifdielis"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Anggota Tim 5 */}
          <div className="team-member text-center bg-orange-200 p-8 lg:p-4 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[21rem] transition duration-300 ease-in-out hover:scale-105 ">
            <div>
              <img
                src="https://picsum.photos/100"
                alt="Dimas Fadillah"
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Dimas Fadillah</p>
              <p className="text-sm text-gray-600">Backend Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://www.instagram.com/dimasfdllah_/"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="hhttps://github.com/dimasfdllah"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

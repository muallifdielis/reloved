import { FaInstagram, FaGithub } from "react-icons/fa";
import TitleSection from "../../../components/common/TitleSection";

export default function SearchResults() {
  return (
    <div className="px-4 pt-0 pb-4 bg-white mx-auto">
      {/* Section Judul */}
      <TitleSection title="Tentang Kami" />

      {/* Section Deskripsi */}
      <div className="w-full mt-8 text-center md:px-8 px-3 lg:px-14 pb-8">
        <div className="p-6 bg-orange-200 shadow-lg rounded-2xl">
          <p className="text-gray-700 font-medium p-4 text-start md:text-justify">
            Reloved lahir dari perpaduan kata <b>re</b> (mengulang atau memberi
            kehidupan baru) dan <b>loved</b> (dicintai). Nama ini mencerminkan
            semangat kami untuk menghadirkan perubahan positif melalui
            produk-produk preloved yang penuh cerita. Kami berkomitmen untuk
            menghidupkan kembali barang-barang thrift, memberi mereka kesempatan
            kedua untuk menjadi berharga di tangan pemilik baru. Dengan
            mendukung gaya hidup ramah lingkungan, kami berupaya mengurangi
            limbah fashion dan mendaur ulang produk yang masih layak pakai.
            Setiap produk yang kami tawarkan memiliki cerita dan karakter unik,
            menjadikannya lebih dari sekadar barang, tetapi pengalaman yang
            spesial untuk pelanggan kami. Kami juga percaya bahwa keindahan
            fashion preloved dapat dinikmati semua orang. Melalui produk
            berkualitas tinggi dengan harga terjangkau, kami membuka akses bagi
            lebih banyak orang untuk menemukan gaya yang berkesan tanpa
            membebani bumi. Dengan filosofi ini, Reloved tidak hanya menjadi
            platform untuk menemukan barang thrift, tetapi juga mengajak semua
            orang untuk menjalani gaya hidup yang lebih sadar lingkungan, penuh
            cinta, dan menghargai keberlanjutan.
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
                src="/aboutUs/alfi.png"
                alt="Alfia Meilani Putri"
                className="w-28 h-28 mx-auto object-cover"
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
                target="_blank"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/alfiameilaniputri"
                target="_blank"
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
                src="/aboutUs/mila.png"
                alt="Kamilah Syahrabanu"
                className="w-28 h-28 mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Kamilah Syahrabanu</p>
              <p className="text-sm text-gray-600">
                UI/UX Designer & Fullstack Developer
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/kamilahabsyi"
                target="_blank"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/kamilahsyhrbn"
                target="_blank"
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
                src="/aboutUs/laela.png"
                alt="Siti Nurlaela"
                className="w-28 h-28 mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Siti Nurlaela</p>
              <p className="text-sm text-gray-600">Backend Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://instagram.com/laelasnl"
                target="_blank"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com/laelasnl"
                target="_blank"
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
                src="/aboutUs/muallif.png"
                alt="Muhammad Muallif Dielis"
                className="w-28 h-28 mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Muhammad Muallif Dielis
              </p>
              <p className="text-sm text-gray-600">Backend Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://www.instagram.com/allif_dielis12"
                target="_blank"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="hhttps://github.com/muallifdielis"
                target="_blank"
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
                src="/aboutUs/dimas.png"
                alt="Dimas Fadillah"
                className="w-28 h-28 mx-auto object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Dimas Fadillah</p>
              <p className="text-sm text-gray-600">Backend Developer</p>
            </div>
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://www.instagram.com/dimasfdllah_/"
                target="_blank"
                className="text-gray-600 hover:text-secondaryHover"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="hhttps://github.com/dimasfdllah"
                target="_blank"
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

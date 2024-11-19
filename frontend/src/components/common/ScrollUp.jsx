import { IoArrowUp } from "react-icons/io5";
import ScrollToTop from "react-scroll-up";

export default function ScrollUp() {
  return (
    <div className="relative z-[300]">
      <ScrollToTop showUnder={160}>
        <div className="relative overflow-hidden">
          <p className="font-bold cursor-pointer bg-primaryDark text-white text-xl rounded-full p-3">
            <IoArrowUp />
          </p>
        </div>
      </ScrollToTop>
    </div>
  );
}

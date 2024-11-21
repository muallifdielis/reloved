import { useLocation } from "react-router-dom";

export default function TitleSection({ title }) {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname === "/orders/detail" ||
        location.pathname === "/purchases/detail"
          ? "mb-6"
          : "my-6"
      } flex flex-col justify-center items-center`}
    >
      <h2 className="text-3xl font-semibold text-center">{title}</h2>
      <div className="w-1/6 md:w-1/12 h-1.5 mt-1 bg-primaryDark"></div>
    </div>
  );
}

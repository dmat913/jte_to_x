import { memo } from "react";

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center pl-4 md:pl-10 bg-gradient-to-r from-pink-300 to-yellow-300 text-white font-extrabold text-2xl md:text-4xl rounded-b-lg shadow-lg tracking-wide">
      <span className="font-[Poppins] drop-shadow-md">DMATBOT</span>
    </header>
  );
};

export default memo(Header);

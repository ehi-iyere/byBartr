// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
//import { FiList } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function Header() {
  //const [isExpanded, setIsExpanded] = useState(false);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex felx-wrap">
            <span className="text-stone-950">by</span>
            <span className="text-red-950">Bartr</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
      </div>
    </header>
  );
}

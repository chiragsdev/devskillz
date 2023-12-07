import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../Redux/Slices/CourseSlice";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const { suggestions } = useSelector((state) => state.course);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    await dispatch(getSuggestions(searchQuery));
  };

  return (
    <div className="col-span-10 px-2 z-10 relative">
      <div>
        <input
          className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full outline-none border-none"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
          <FaSearch />
        </button>
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-0 bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100 opacity-90 z-50">
          <ul>
            {suggestions.map((s) => (
              <li
                key={s}
                className="py-2 px-3 flex items-center justify-start gap-2 shadow-sm text-black hover:bg-gray-100"
              >
                <FaSearch /> {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

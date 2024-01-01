import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions, searchCourse } from "../Redux/Slices/CourseSlice";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const { suggestions } = useSelector((state) => state.course);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getSuggestions(searchQuery));
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // async function getSearchSuggestions() {
  //   await dispatch(getSuggestions(searchQuery));
  // }

  function onSuggestionClick(selectedSuggestion) {
    console.log(selectedSuggestion);
    setSearchQuery(selectedSuggestion);
    setShowSuggestions(false);
    dispatch(searchCourse(selectedSuggestion));
  }

  async function onSearchCourse(searchText) {
    console.log(searchText);
    dispatch(searchCourse(searchText));
  }

  return (
    <div className="col-span-10 px-16 relative">
      <div>
        <input
          className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full outline-none border-none"
          type="text"
          id="searchBar"
          name="searchBar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button
          onClick={() => onSuggestionClick(searchQuery)}
          className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-500 text-white font-bold outline-none border-none"
        >
          Search
        </button>
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-20 mt-5 bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100 opacity-90 z-50">
          <ul>
            {suggestions.map((s) => (
              <div
              onClick={()=>{console.log("hit")}}
                key={s}
                className="cursor-pointer py-2 px-3 flex items-center justify-start gap-2 shadow-sm text-black hover:bg-gray-100"
              >
                <FaSearch /> {s}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

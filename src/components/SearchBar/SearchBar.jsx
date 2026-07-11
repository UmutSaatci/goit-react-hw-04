import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css";
import clsx from "clsx";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (term.trim() === "") {
      toast.error("Please enter a text to search for images!", {
        duration: 3000,
        style: {
          background: "#fff",
          color: "#dc2626",
          fontWeight: "500",
          borderRadius: "8px",
        },
      });
      return;
    }

    onSearch(term);
    setTerm("");
  };
  return (
    <header className={css.headerBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          className={css.searchInput}
          type="text"
          value={term}
          onChange={(evt) => setTerm(evt.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;

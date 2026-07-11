import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css"; // Senin kendi CSS Module importun
import clsx from "clsx";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState(""); // İnput değerini tutan state
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (term.trim() === "") {
      // 2. Şık ve modern bir hata bildirimi fırlatıyoruz
      toast.error("Please enter a text to search for images!", {
        duration: 3000, // Bildirim ekranda 3 saniye kalır
        style: {
          background: "#fff",
          color: "#dc2626",
          fontWeight: "500",
          borderRadius: "8px",
        },
      });
      return; // Fonksiyonu burada kesiyoruz (Arama tetiklenmez)
    }

    // Aksi takdirde, propları çağırın
    // ve ona alanın değerini aktarın
    onSearch(term);
    setTerm("");
  };
  return (
    <header className={css.headerBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          className={css.searchInput} // Eski "input" yerine modül sınıfını verdik
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

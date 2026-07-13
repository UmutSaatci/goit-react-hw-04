import { useState, useEffect } from "react";

import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import searchImages from "./articles-api.js";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import css from "./App.module.css";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", alt: "" });

  const handleSearch = async (topic) => {
    if (topic.trim() === "") return;
    try {
      setQuery(topic);
      setPage(1);
      setImages([]);
      setError(false);
      setLoading(true);

      const results = await searchImages(topic);

      setImages(results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (largeUrl, altText) => {
    setSelectedImage({ url: largeUrl, alt: altText });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage({ url: "", alt: "" });
  };

  useEffect(() => {
    if (page === 1) return;

    const fetchMoreImages = async () => {
      setLoading(true);
      try {
        const nextResults = await searchImages(query, page);

        setImages((prevImages) => [...prevImages, ...nextResults]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreImages();
  }, [page]);
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      {error ? (
        <ErrorMessage message="Whoops, something went wrong! Please try reloading the page." />
      ) : (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {loading && <Loader />}

      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        Close={closeModal}
        url={selectedImage.url}
        alt={selectedImage.alt}
      />
    </>
  );
}

export default App;

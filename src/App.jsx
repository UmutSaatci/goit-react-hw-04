import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import searchImages from "./articles-api.js";
import css from "./App.module.css";

if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}
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

  const openModal = (largeUrl, altText) => {
    setSelectedImage({ url: largeUrl, alt: altText });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage({ url: "", alt: "" });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={css.modalContent}
        overlayClassName={css.modalOverlay}
      >
        <div className={css.imageWrapper}>
          {selectedImage.url ? (
            <img
              src={selectedImage.url}
              alt={selectedImage.alt || "Large Image"}
              className={css.modalImage}
            />
          ) : null}

          {selectedImage.alt && (
            <p className={css.modalText}>{selectedImage.alt}</p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default App;

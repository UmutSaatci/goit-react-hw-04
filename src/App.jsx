import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx"; // Dahil ettik
import searchImages from "./articles-api.js";
import css from "./App.module.css";

if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}
function App() {
  const [images, setImages] = useState([]); // Gelen resim dizisini tutar
  const [query, setQuery] = useState(""); // Arama kelimesini hafızada tutmak için şart!
  const [page, setPage] = useState(1); // Güncel sayfa numarası
  const [loading, setLoading] = useState(false); // Yükleniyor animasyonu için
  const [error, setError] = useState(false); // Hata durum kontrolü
  // MODAL İÇİN GEREKLİ STATE'LER
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", alt: "" });

  // Form gönderildiğinde tetiklenecek asenkron fonksiyon
  const handleSearch = async (topic) => {
    if (topic.trim() === "") return;
    try {
      setQuery(topic); // Kelimeyi hafızaya alıyoruz
      setPage(1); // Yeni aramada sayfayı 1'e sıfırlıyoruz
      setImages([]);
      setError(false);
      setLoading(true);
      // 2. Api fonksiyonunu çağırıp input değerini (query) gönderiyoruz
      const results = await searchImages(topic);

      // 3. Gelen diziyi images state'ine kaydediyoruz
      setImages(results);
    } catch (err) {
      // API anahtarı yanlışsa veya bağlantı koptuysa hata durumunu aktif et
      setError(true);
    } finally {
      // İstek başarılı veya başarısız bitse de yükleniyor durumunu kapat
      setLoading(false);
    }
  };

  // Bir resme tıklanıldığında modalı açacak fonksiyon
  const openModal = (largeUrl, altText) => {
    setSelectedImage({ url: largeUrl, alt: altText });
    setModalIsOpen(true);
  };

  // Modalı kapatacak fonksiyon
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage({ url: "", alt: "" });
  };

  // 2. Durum: Kullanıcı "Load More" Butonuna Bastığında Sayfayı 1 Artırıyoruz
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 3. Durum: Sayfa Numarası (page) Değiştiğinde ve 1'den Büyük Olduğunda Yeni Resimleri Çekiyoruz
  useEffect(() => {
    if (page === 1) return; // Eğer ilk sayfadaysak bu efekti çalıştırma (handleSearch zaten yaptı)

    const fetchMoreImages = async () => {
      setLoading(true);
      try {
        const nextResults = await searchImages(query, page);

        // SİHİRLİ NOKTA: Eski resimleri koruyup, yeni gelenleri sonuna ekliyoruz
        setImages((prevImages) => [...prevImages, ...nextResults]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreImages();
  }, [page]); // Sayfa numarası
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

      {/* ÖDEV KURALI: Yalnızca yüklenmiş resim varsa (dizi boş değilse) buton görünür */}

      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {/* REACT MODAL BİLEŞENİ */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={css.modalContent}
        overlayClassName={css.modalOverlay}
      >
        <div className={css.imageWrapper}>
          {/* KESİN ÇÖZÜM: Yalnızca selectedImage.url doluysa <img> etiketini render et! */}
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

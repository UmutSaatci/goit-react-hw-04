import css from "./ImageModal.module.css";
import Modal from "react-modal";

if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}
const ImageModal = ({ isOpen, Close, url, alt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={Close}
      contentLabel="Image Modal"
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <div className={css.imageWrapper}>
        {url ? (
          <img
            src={url}
            alt={alt || "Large Image"}
            className={css.modalImage}
          />
        ) : null}

        {alt && <p className={css.modalText}>{alt}</p>}
      </div>
    </Modal>
  );
};

export default ImageModal;

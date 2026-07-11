import ImageCard from "../ImageCard/ImageCard.jsx";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;
  return (
    <ul className={css.galleryList}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.galleryItem}>
            <ImageCard
              url={image.urls.small}
              alt={image.description}
              onClick={() =>
                onImageClick(image.urls.regular, image.description)
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;

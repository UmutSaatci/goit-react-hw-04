import css from "./ImageCard.module.css";

const ImageCard = ({ url, alt, onClick }) => {
  return (
    <div className={css.cardContainer} onClick={onClick}>
      <img src={url} alt={alt || "Unsplash Image"} className={css.cardImage} />
    </div>
  );
};

export default ImageCard;

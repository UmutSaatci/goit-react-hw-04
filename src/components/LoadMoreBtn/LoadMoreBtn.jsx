import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.btnWrapper}>
      <button type="button" className={css.loadMoreBtn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;

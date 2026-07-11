import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <ThreeDots width="150" color="#2563eb" />
    </div>
  );
};
export default Loader;

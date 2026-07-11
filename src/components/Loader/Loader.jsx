import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      {/* Şık ve renkli bir yüklenme animasyonu */}
      <ThreeDots
        width="150"
        color="#2563eb" // Projedeki mavi buton rengiyle uyumlu
      />
    </div>
  );
};
export default Loader;

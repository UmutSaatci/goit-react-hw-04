import css from "./ErrorMessage.module.css";

const ErrorMessage = ({
  message = "Something went wrong. Please try again later!",
}) => {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;

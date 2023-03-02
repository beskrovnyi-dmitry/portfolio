import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAdminButton}>
      Додати продукт
    </div>
  );
};

export default AddButton;

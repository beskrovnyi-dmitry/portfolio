import Image from "next/image";
import styles from "../styles/PieCard.module.css";
import Link from "next/link";

const PieCard = ({pie}) => {
  return (
    <div className={styles.container}>
      <Link href={`/products/${pie._id}`} passHref>
        <Image src={pie.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{pie.title}</h1>
      <span className={styles.price}>{pie.prices[0]} UAH</span>
      <p className={styles.desc}>
        {pie.description}
      </p>
    </div>
  );
};

export default PieCard;

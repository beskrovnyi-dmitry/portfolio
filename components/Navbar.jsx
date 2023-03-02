import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ЗРОБИ ЗАМОВЛЕННЯ!</div>
          <div className={styles.text}><a href="tel:+380955476617">0955476617</a></div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
        <Link href={"/"} passHref>
            <li className={styles.listItem}>ГОЛОВНА</li>
          </Link>
          <li className={styles.listItem}>ПРОДУКТИ</li>
          <li className={styles.listItem}>МЕНЮ</li>
          <Link href={"/"} passHref>
            <div style={{ width: '110px', height: '60px', cursor: 'pointer', position: 'relative', margin: '0 5px' }}>
              <Image src="/img/logo.png" alt="" layout="fill" />
            </div>
          </Link>
          <li className={styles.listItem}>ПОДІЇ</li>
          <li className={styles.listItem}>БЛОГ</li>
          <li className={styles.listItem}>КОНТАКТИ</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href={"/cart"} passHref>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

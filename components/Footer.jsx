import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          ТАК, МИ РОБИМО НАЙКРАЩІ АВТОРСЬКІ ПИРОГИ
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>НАШІ ЗАКЛАДИ:</h1>
          <p className={styles.text}>
          просп. Гагаріна, 15.
            <br /> Дніпро, 49000
            <br /> 3(80)99-419-2716
          </p>
          <p className={styles.text}>
          вул. Новожучківська, 21-1.
            <br /> Чернівці, 58000
            <br /> 3(80)66-867-1011
          </p>
          <p className={styles.text}>
            вул. Патержинськаб 104.
            <br /> Полтава, 85022
            <br /> 3(80)66-867-1012
          </p>
          <p className={styles.text}>
          вул. Космічна, 13.
            <br /> Хмельницьк, 32022
            <br /> 3(80)95-867-6534
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>РОБОЧІ ГОДИНИ:</h1>
          <p className={styles.text}>
          ПОНЕДІЛОК - П'ЯТНИЦЯ
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
          СУБОТА - НЕДІЛЯ
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import styles from "../styles/PieList.module.css";
import PieCard from "./PieCard"

const PieList = ({pieList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Більш ніж пиріг: навіщо Pastry Kitchen робить орігамі</h1>
      <p className={styles.desc}>
      Дуже любимо експериментувати над новими виробами, досвід дозволяє створювати власні технології та секрети.
Віддаємо перевагу багатогранним смакам, коли в процесі їжі поступово розкриваються нюанси, текстури, приємно і несподівано дивують поєднання, коли хочеться затриматися в задоволенні, це вчить уповільнюватися в моменті.
      </p>
      <div className={styles.wrapper}>
        {pieList.map(pie=>(
          <PieCard key={pie._id} pie={pie}/>
        ))}
      </div>
    </div>
  );
};

export default PieList;

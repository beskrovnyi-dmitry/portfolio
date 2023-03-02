import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PieList from "../components/PieList";
import styles from "../styles/Home.module.css";

export default function Home({pieList}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pastry Kitchen</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      <PieList pieList={pieList}/>
    </div>
  );
}

export async function getServerSideProps(){
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      pieList: res.data,
    }
  }
} 
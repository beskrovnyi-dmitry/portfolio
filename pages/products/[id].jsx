import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addProduct} from "../../redux/cartSlice";

const Product = ({pie}) => {
  const [price, setPrice] = useState(pie.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]); //collecting extra adds
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  function handleSize(sizeIndex){
    const difference = pie.prices[sizeIndex] - pie.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }
  function changePrice(num){
    setPrice(price + num);
  }

  function handleChange(e, option){
    const checked = e.target.checked;
    if(checked){
      changePrice(option.price);
      setExtras(prev => [...prev, option]);
    }else{
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pie.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pie.title}</h1>
        <span className={styles.price}>{price} UAH</span>
        <p className={styles.desc}>{pie.description}</p>
        <h3 className={styles.choose}>Ваш улюблений розмір:</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Малий</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Середній</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Великий</span>
          </div>
        </div>
        <h3 className={styles.choose}>Вам може сподобатися з: </h3>
        <div className={styles.ingredients}>
          {pie.extraOptions.map((option, i)=>(
            <div className={styles.option} key={i}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e, option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          ))}
        </div>
        <div className={styles.add}>
            <input 
              type="number" 
              min={1}
              className={styles.quantity} 
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
            />
            <button 
              className={styles.button}
              onClick={()=>dispatch(addProduct({...pie, extras, price, quantity}))}  
            >
                Додати у кошик
            </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({params}){
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pie: res.data
    }
  }
} 

export default Product;

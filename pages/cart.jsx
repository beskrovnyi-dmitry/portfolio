import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { LiqPayPay } from "react-liqpay";
import LiqpayButton from "../components/LiqpayButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 200) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map(product => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map(extra => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price} UAH</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>{product.price * product.quantity} UAH</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>ЗАМОВЛЕННЯ</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Знижка: </b>0.00 UAH
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Цiна: </b>{cart.total} UAH
          </div>
          {open ? (
            <div className={styles.form}>
              <label htmlFor="">Iм'я: </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="">Телефон: </label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label htmlFor="">Адреса: </label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button
                className={styles.button}
                onClick={() => createOrder({ name, phone, address, total: cart.total, status: 0 })}
              >
                ЗАМОВИТИ!
              </button>
            </div>
          ) : (
            <div className={styles.buttons}>
              <button onClick={() => setOpen(true)}>Олатити готiвкою</button>
              <LiqPayPay
                publicKey="sandbox_i15015619628"
                privateKey="sandbox_nNj3TuaempejrBwXvgOdLwGh8WBVeWyFg8VKSX1z"
                amount={cart.total}
                description="payment for product"
                currency="UAH"
                orderId={Date.now()}
                result_url="#"
                server_url="localhost:3000/cart"
                product_description="pies"
                extra={[<LiqpayButton />]}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;

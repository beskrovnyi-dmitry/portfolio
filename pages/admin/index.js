import styles from '../../styles/Admin.module.css';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import AddButton from '../../components/AddButton';
import Add from '../../components/Add';

function Index({ orders, products }) {
    const [pieList, setPieList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const [close, setClose] = useState(true);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("http://localhost:3000/api/products/" + id);
            setPieList(pieList.filter((pie) => pie._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put("http://localhost:3000/api/orders/" + id, { status: currentStatus + 1, });
            setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelOrders = async () => {
        try {
            const res = await axios.delete("http://localhost:3000/api/orders/");
            setOrderList([]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            {!close && <Add setClose={setClose} />}
            <div className="item">
                <div className={styles.header}>
                    <h1 className={styles.title}>Страви</h1>
                    <AddButton setClose={setClose} />
                </div>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Зображення</th>
                            <th>Назва</th>
                            <th>Добавки</th>
                            <th>Цiна</th>
                            <th>Редагування</th>
                        </tr>
                    </tbody>
                    {pieList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td className={styles.extras}>
                                    {product.extraOptions.map(extra => (
                                        <span key={extra._id}>{extra.text}, </span>
                                    ))}
                                </td>
                                <td>{product.prices[0]} UAH</td>
                                <td>
                                    <button
                                        className={`${styles.button} ${styles.delButton}`}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Видалити
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className="item">
                <div className={styles.header}>
                    <h1 className={styles.title}>Замовлення</h1>
                    <button 
                    className={styles.delOrders}
                    onClick={handleDelOrders}
                    >
                        Видалити замовлення
                    </button>
                </div>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Номер</th>
                            <th>Iм'я</th>
                            <th>Телефон</th>
                            <th>Адреса</th>
                            <th>Цiна</th>
                            <th>Статус</th>
                            <th>Редагування</th>
                        </tr>
                    </tbody>
                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className={!order.status ? `${styles.trTitle} ${styles.nopaid}` : `${styles.trTitle} ${styles.paid}`}>
                                <td>{order._id.slice(0, 8)}...</td>
                                <td>{order.name}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>{order.total} UAH</td>
                                <td className={styles.status}>{!order.status ?
                                    <div>В роботi</div> :
                                    <div>Виконано</div>}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatus(order._id)}
                                        className={`${styles.button} ${styles.payButton}`}
                                    >
                                        Завершити
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || '';

    if (myCookie.token !== 'SWdw4CV||663Z{p3|ZXtP%0k6Ejj;F') {
        return {
            redirect: {
                destination: './admin/login',
                permanent: false
            }
        }
    }

    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");
    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        },
    };
};

export default Index;
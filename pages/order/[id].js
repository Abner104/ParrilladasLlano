import { client } from '../../lib/client';
import Layout from '../../components/Layout';
import css from '../../styles/Order.module.css';
import { UilCheck, UilFileCheck } from '@iconscout/react-unicons';
import Stp from '../../assets/STP01.png';
import StpN2 from '../../assets/STP02.png';
import Spinner from '../../assets/Spinner.gif';
import Image from 'next/image';
import { useEffect } from 'react';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  return {
    props: {
      order: order[0],
    },
  };
};

export default function Orders({ order }) {
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);
  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>Proceso de Orden</span>
        <div className={css.details}>
          <div>
            <span> ID:</span>
            <span> {order._id}</span>
          </div>
          <div>
            <span>Nombre:</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Telefono:</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Metodo de pago:</span>
            <span>{order.method === 0 ? 'Efectivo' : 'Tarjeta(Pagado)'}</span>
          </div>
          <div>
            <span>Total:</span>
            <span>${order.total}</span>
          </div>
        </div>
        <div className={css.statusContainer}>
          <div className={css.status}>
            <UilFileCheck width={30} height={30} />
            <span>Pago</span>
            {order.method === 0 ? (
              <span className={css.pending}>En la entrega</span>
            ) : (
              <span className={css.completed}>Completado</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Stp} alt="" width={30} height={30} />
            <span>Preparando</span>

            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}
            {order.status > 1 && (
              <span className={css.completed}>Completado</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={StpN2} alt="" width={30} height={30} />
            <span className={css.title}>En camino</span>

            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}
            {order.status > 2 && (
              <span className={css.completed}>Completado</span>
            )}
          </div>

          <div className={css.status}>
            <UilCheck width={30} height={30} />
            <span>Entregado</span>

            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}
            {order.status > 3 && (
              <span className={css.completed}>Completado</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

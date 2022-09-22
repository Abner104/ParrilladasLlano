import Layout from '../components/Layout';
import { useStore } from '../store/strore';
import { urlFor } from '../lib/client';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {
  UilTrashAlt,
  UilUsdSquare,
  UilCreditCard,
} from '@iconscout/react-unicons';
import toast, { Toaster } from 'react-hot-toast';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import OrderModal from '../components/OrderModal';
import { useRouter } from 'next/router';

export default function Cart() {
  const CartData = useStore((state) => state.cart);
  const removeParrilla = useStore((state) => state.removeParrilla);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [Order, setOrder] = useState(
    typeof window !== 'undefined' && localStorage.getItem('order')
  );

  const handleRemove = (i) => {
    removeParrilla(i);
    toast.error('Procuto eliminado');
  };
  const router = useRouter();
  const total = () =>
    CartData.parrilla.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  };
  const handleCheckout = async () => {
    typeof window !== 'undefined' && localStorage.setItem('total', total());
    setPaymentMethod(1);
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CartData.parrilla),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading('Cargando...');
    router.push(data.url);
  };

  return (
    <Layout>
      <div className="cart-container">
        {CartData.parrilla.length > 0 &&
          CartData.parrilla.map((parrilla, i) => {
            return (
              <Card key={i} sx={{ display: 'flex' }} className="tarjetaCard">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent
                    sx={{ flex: '1 0 auto' }}
                    className="cart-content"
                  >
                    <div className="ctn">Cantidad: {parrilla.quantity}</div>
                    <div>
                      <div className="title-product-cart">{parrilla.name}</div>
                      <img src={urlFor(parrilla?.image)} className="imageTd" />
                      <div className="trahs">
                        <UilTrashAlt
                          className="basura"
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleRemove(i)}
                        />
                      </div>
                    </div>
                    <div></div>
                  </CardContent>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  ></Typography>
                </Box>
              </Card>
            );
          })}
      </div>
      <div className="cart-total">
        <div>
          <span>Productos:</span>
          <span>{CartData.parrilla.length}</span>
        </div>

        <span>Total:</span>
        <span>${total()}</span>
      </div>
      {!Order && CartData.parrilla.length > 0 ? (
        <div className="method-page">
          <p>Metodos de pago:</p>
          <Button onClick={handleOnDelivery}>
            {' '}
            <UilUsdSquare />
            Efectivo
          </Button>

          <Button onClick={handleCheckout}>
            <UilCreditCard /> Tarjeta
          </Button>
        </div>
      ) : null}
      <div className="shopping">
        <Link href="/">
          <Button variant="contained" color="success">
            INICIO
          </Button>
        </Link>
      </div>
      <Toaster />

      <OrderModal
        opened={PaymentMethod === 0}
        setOpened={setPaymentMethod}
        PaymentMethod={PaymentMethod}
      />
    </Layout>
  );
}

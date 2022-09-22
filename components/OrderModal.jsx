import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createOrder } from '../lib/orderHandler';
import { useRouter } from 'next/router';
import css from '../styles/OrderModal.module.css';
import { useStore } from '../store/strore';

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [FormData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const resetCart = useStore((state) => state.resetCart);

  const total = typeof window !== 'undefined' && localStorage.getItem('total');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });
    toast.success('Pedido Realizado');
    resetCart();
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id);
    }

    router.push(`/order/${id}`);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Nombre"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Telefono"
        />
        <textarea
          onChange={handleInput}
          name="direccion"
          cols={8}
          rows={3}
          placeholder="Direccion"
        ></textarea>
        <textarea
          onChange={handleInput}
          name="comentario"
          cols={8}
          rows={3}
          placeholder="Agrega un comentario"
        ></textarea>

        <span>
          Vas a pagar <span>${total}</span>con delivery
        </span>

        <button type="submit" className="btn">
          Realizar pedido
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}

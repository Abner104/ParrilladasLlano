export const createOrder = async ({
  name,
  phone,
  direccion,
  comentario,
  total,
  PaymentMethod,
}) => {
  const res = await fetch('/api/order', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      phone: phone,
      direccion: direccion,
      comentario: comentario,
      total: parseFloat(total),
      method: PaymentMethod,
      status: 1,
    }),
  });
  const id = await res.json();
  return id;
};

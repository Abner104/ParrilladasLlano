import Layout from '../components/Layout';
import OrderModal from '../components/OrderModal';
export default function success() {
  return (
    <Layout>
      <OrderModal opened={true} PaymentMethod={1} />
    </Layout>
  );
}

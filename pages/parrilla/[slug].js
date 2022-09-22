import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { UilMinusCircle, UilPlusCircle } from '@iconscout/react-unicons';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useStore } from '../../store/strore';

const ProductDetails = ({ parrilla, parrrillas }) => {
  const { image, name, detalle, price } = parrilla;

  const [Quantity, setQuantity] = useState(1);

  const handleQuan = (type) => {
    type === 'inc'
      ? setQuantity((prev) => prev + 1)
      : Quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  const addParrilla = useStore((state) => state.addParrilla);
  const addToCart = () => {
    addParrilla({ ...parrilla, price: parrilla.price, quantity: Quantity });
    toast.success('Producto Agregado');
  };

  return (
    <Layout>
      <Card className="product-details" sx={{ maxWidth: 1000 }}>
        <CardActionArea>
          <img src={urlFor(image)} className="image-details" />
          <CardContent>
            <div className="details-title">
              <h1>{name}</h1>
            </div>
            <Typography variant="body2" color="text.secondary">
              <h4>Detalle:</h4>
              {detalle}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <TableContainer>
        <Table sx={{ minWidth: 250 }}>
          <TableHead>
            <TableRow>
              <TableCell>Contiene:</TableCell>
              <TableCell align="right">Porciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell component="th" scope="row">
              Lomo liso
            </TableCell>
            <TableCell align="right">2</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Aciento
            </TableCell>
            <TableCell align="right">2</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Costillar
            </TableCell>
            <TableCell align="right">2</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Chunchules
            </TableCell>
            <TableCell align="right">2</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Prietas
            </TableCell>
            <TableCell align="right">3</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Ubre
            </TableCell>
            <TableCell align="right">3</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Potito
            </TableCell>
            <TableCell align="right">3</TableCell>
          </TableBody>
          <TableBody>
            <TableCell component="th" scope="row">
              Longaniza
            </TableCell>
            <TableCell align="right">3</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="cantidad">
        <h3>Cantidad:</h3>
        <p className="cantidad-desc">
          <span className="minus" onClick={() => handleQuan('dec')}>
            <UilMinusCircle />
          </span>
          <span className="num" onClick="">
            {Quantity}
          </span>
          <span className="plus" onClick={() => handleQuan('inc')}>
            <UilPlusCircle />
          </span>
        </p>
      </div>
      <button
        onClick={addToCart}
        variant="outlined"
        color="error"
        className="agregar"
      >
        Agregar por: ${price}
      </button>

      <Toaster />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "parrilla"]{
    slug {
      current
    }

  }
  `;
  const parrillas = await client.fetch(query);
  const paths = parrillas.map((parrilla) => ({
    params: {
      slug: parrilla.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "parrilla" && slug.current == '${slug}' ][0]`;
  const parrillasQuery = '*[_type == "parrilla"]';
  const parrilla = await client.fetch(query);
  const parrillas = await client.fetch(parrillasQuery);
  console.log(parrilla);
  return {
    props: {
      parrillas,
      parrilla,
    },
  };
};

export default ProductDetails;

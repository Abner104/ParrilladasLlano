import React from 'react';
import { urlFor } from '../lib/client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';

const Product = ({ parrilla: { image, price, slug, name } }) => {
  return (
    <div className="product">
      <Link href={`./parrilla/${slug.current}`}>
        <Card sx={{ display: 'flex' }}>
          <img src={urlFor(image)} width={110} height={140} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <div className="product-title">
                <h3>{name}</h3>
              </div>
              <div className="product-price">
                <div>
                  <h4>Precio:</h4>
                </div>

                <span>$</span>
                <h3 className="price">{price}</h3>
              </div>
              <div></div>
            </CardContent>
          </Box>
        </Card>
      </Link>
    </div>
  );
};

export default Product;

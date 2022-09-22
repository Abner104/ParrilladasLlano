import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UilShoppingBag, UilReceipt } from '@iconscout/react-unicons';
import { useStore } from '../store/strore';
import Image from 'next/image';
import Logo from '../assets/PPPP.png';
import css from '../styles/Header.module.css';
import Link from 'next/link';

const Header = () => {
  const [Order, setOrder] = useState('');

  useEffect(() => {
    setOrder(localStorage.getItem('order'));
  }, []);

  const items = useStore((state) => state.cart.parrilla.length);

  return (
    <Navbar bg="white" expand="lg" className={css.header}>
      <Container>
        <Navbar.Brand href="/" className={css.logoContainer}>
          <Image
            src={Logo}
            alt=""
            width={180}
            height={180}
            className={css.logo}
          />
          <Link href="/cart">
            <div className={css.cart}>
              <UilShoppingBag size={35} color="#2E2E2E" />
              <div className={css.badge}>{items}</div>
            </div>
          </Link>
          {Order && (
            <Link href={`/order/${Order}`}>
              <div className={css.cart}>
                <UilReceipt size={35} color="#2E2E2E" />
                {Order != '' && <div className={css.badge}>1</div>}
              </div>
            </Link>
          )}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;

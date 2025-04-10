/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: 'rgb(128, 128, 128)' }}>
      <Container>
        {/* Logo */}
        <Link passHref href="/" className="navbar-brand">
          <Navbar.Brand>
            <img src="/images/GiftSupNoText.png" alt="Logo" style={{ height: '60px', width: '60px' }} />
          </Navbar.Brand>
        </Link>

        {/* Navigation Buttons */}
        <Nav className="ms-3 d-flex align-items-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link passHref href="/wishlists">
              <Button type="button" size="md" className="copy-btn" style={{ marginLeft: '5px', marginRight: '5px', height: '40px' }}>
                My Wishlists
              </Button>
            </Link>
            <Link passHref href="/items">
              <Button type="button" size="md" className="copy-btn" style={{ marginLeft: '5px', marginRight: '5px', height: '40px' }}>
                My Items
              </Button>
            </Link>
          </div>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {/* <Nav>
            <Link passHref href="/notifications">
              <img
                src="/images/notifications.png"
                alt=""
                style={{
                  marginRight: '10px',
                  height: '35px',
                  width: '35px',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Nav> */}
          <Nav>
            <Link passHref href="/profile/uid">
              <Button type="button" className=" copy-btn flex items-center justify-center rounded-full p-2 bg-blue-500 text-red" style={{ height: '40px', width: '120px' }}>
                Profile
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

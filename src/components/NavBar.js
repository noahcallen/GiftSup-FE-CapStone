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
          <Link passHref href="/stores">
            <Button type="button" size="md" className="copy-btn" style={{ marginLeft: '15px', marginRight: '15px', height: '40px' }}>
              My Stores
            </Button>
          </Link>
          <Link passHref href="/wishlists">
            <Button type="button" size="md" className="copy-btn" style={{ marginLeft: '15px', marginRight: '15px', height: '40px' }}>
              My Wishlists
            </Button>
          </Link>
          <Link passHref href="/items">
            <Button type="button" size="md" className="copy-btn" style={{ marginLeft: '15px', marginRight: '15px', height: '40px' }}>
              My Items
            </Button>
          </Link>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Profile Icon */}
            <Link passHref href="/notifications">
              <img
                src="/images/notifications.png" // Path to your profile icon image
                alt=""
                style={{
                  marginRight: '10px',
                  height: '35px',
                  width: '35px',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Nav>
          <Nav>
            {/* Profile Icon */}
            <Link passHref href="/profile/uid">
              <img
                src="/images/user_profile.png" // Path to your profile icon image
                alt=""
                style={{
                  height: '70px',
                  width: '70px',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

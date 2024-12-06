import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        margin: 0,
      }}
    >
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '30px',
          maxWidth: '400px',
          width: '100%', // Ensure the inner content stays centered
        }}
      >
        <Image src="/images/GiftSupNoBNG.png" alt="" style={{ maxWidth: '700px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }} />
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;

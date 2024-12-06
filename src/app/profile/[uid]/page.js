/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser } from '../../../api/userData';
import ProfileCard from '../../../components/profileCard';
import { signOut } from '../../../utils/auth';

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.fbUser?.uid) {
      getSingleUser(user.fbUser.uid).then((data) => {
        setUserData(data);
      });
    }
  }, [user]);

  if (!userData) return <div>Loading...</div>;

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '20px' }}>
      {/* Settings Icon in top right corner */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <img src="/images/settings.png" alt="Settings" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={handleToggleMenu} />
        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '0',
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 999,
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={handleEditProfile}
              style={{
                display: 'block',
                width: '140%',
                padding: '10px',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={signOut}
              style={{
                display: 'flex',
                width: '140%',
                padding: '10px',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Profile Content */}
      <ProfileCard userData={userData} />
    </div>
  );
}

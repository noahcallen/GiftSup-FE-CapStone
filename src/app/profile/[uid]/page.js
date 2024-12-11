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
      <div className="settings-container">
        <img src="/images/settings.png" alt="Settings" className="settings-icon" onClick={handleToggleMenu} />
        {showMenu && (
          <div className="settings-menu">
            <button type="button" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button type="button" onClick={signOut}>
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

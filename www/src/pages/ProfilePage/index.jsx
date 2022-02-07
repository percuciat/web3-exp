import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from 'store/slices/auth/action';
import { selectUserData } from 'store/slices/auth';
import { useOutletContext } from 'react-router-dom';
import { ProfileForm } from 'containers';
import { WaxBtn } from 'components';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const { ual, withUAL } = useOutletContext();
  const WaxBtnUAL = withUAL(WaxBtn);

  useEffect(() => {
    if (ual.activeUser) {
      dispatch(getProfileData())
        .then((r) => {
          setProfileData(r.payload.wallet);
        })
        .catch((e) => {
          console.log('E catch userProfile data', e);
        });
    }
  }, []);
  if (userData.status === 0) {
    return <h1>please verify your account</h1>;
  }

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <h1>Profile update</h1>
      {ual.activeUser ? (
        <>
          <ProfileForm initialValue={profileData} />
        </>
      ) : (
        <WaxBtnUAL />
      )}
    </div>
  );
};

export default ProfilePage;

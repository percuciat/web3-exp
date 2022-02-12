import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from 'store/slices/auth/action';
import { selectUserData, selectUserProfile } from 'store/slices/auth';
import { useOutletContext } from 'react-router-dom';
import { ProfileForm } from 'containers';
import { WaxBtn } from 'components';

const ProfilePage = () => {
  const userData = useSelector(selectUserData);
  const userProfile = useSelector(selectUserProfile);
  const status = userData?.status;
  const dispatch = useDispatch();
  const { ual, withUAL } = useOutletContext();
  const WaxBtnUAL = withUAL(WaxBtn);

  useEffect(() => {
    if (ual.activeUser) {
      dispatch(getProfileData());
    }
  }, [dispatch, ual.activeUser]);

  if (!status) {
    return <h1>please verify your account</h1>;
  }

  return (
    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <h1>Profile update</h1>
      {ual.activeUser ? <ProfileForm userProfile={userProfile} /> : <WaxBtnUAL />}
    </div>
  );
};

export default ProfilePage;

'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const LogoutPage = () => {
  useEffect(() => {
    void signOut({ callbackUrl: '/sign-in' });
  }, []);

  return <></>;
};

export default LogoutPage;

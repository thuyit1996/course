'use client';

import 'aos/dist/aos.css';

import AOS from 'aos';
import { type ReactNode, useEffect } from 'react';

const AosProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);
  return children;
};
export default AosProvider;
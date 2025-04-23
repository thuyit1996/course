// src/components/Header.tsx
import React from 'react';

interface Props {
  onMenuClick: () => void;
}

const Header: React.FC<Props> = ({ onMenuClick }) => {
  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center md:hidden">
      <h1 className="text-lg font-bold">Grade 12</h1>
      <button onClick={onMenuClick}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </header>
  );
};

export default Header;
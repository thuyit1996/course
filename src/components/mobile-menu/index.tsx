// src/components/MobileMenu.tsx
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">MS.LAN ENGLISH</h1>
        <button onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <nav className="p-4">
        <p className="font-semibold text-gray-500">Account</p>
        <a href="#" className="block py-2 text-black">Teacher</a>
        <a href="#" className="block py-2 text-black">Staff</a>
        <p className="font-semibold text-gray-500 mt-4">Exam</p>
        <a href="#" className="block py-2 text-black">All Exam</a>
        <p className="font-semibold text-gray-500 mt-4">Class</p>
        <a href="#" className="block py-2 bg-pink-100 text-pink-600 rounded">Grade 12</a>
        {['Grade 11', 'Grade 10', 'Grade 9', 'Grade 8', 'Grade 7', 'Grade 6', 'Grade 5'].map((grade) => (
          <a key={grade} href="#" className="block py-2">{grade}</a>
        ))}
        <div className="mt-10 flex items-center space-x-4 p-4 border rounded-xl">
          <img src="https://randomuser.me/api/portraits/women/1.jpg" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">Lily Colin</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
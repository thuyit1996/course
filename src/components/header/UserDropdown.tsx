"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useSession } from "next-auth/react";
import ChangeUserView from '@/public/images/icons/change-user-view.svg';
import ChangeAvatar from '@/public/images/icons/change-avatar.svg';
import ChangePassword from '@/public/images/icons/change-password.svg';
import Logout from '@/public/images/icons/logout.svg';
import { alert } from "@/libs/alert";

export default function UserDropdown({ isAdminSite }: { isAdminSite?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  const showAlert = () => {
    setTimeout(() => {
      if (isAdminSite) {
        alert.success(<div>
          <p className='text-[#2c2c2c] text-base font-semibold mb-1'>{`You're now in User View.`}</p>
          <Link className='text-[#079455] underline text-sm' href='/admin/questions'>Undo</Link>
        </div>, "bottom-right")
      } else {
        alert.success(<div>
          <p className='text-[#2c2c2c] text-base font-semibold mb-1'>{`You're now in Admin View.`}</p>
          <Link className='text-[#079455] underline text-sm' href='/'>Undo</Link>
        </div>, "bottom-right")
      }
    }, 2000)
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle"
      >
        <span className="mr-2 overflow-hidden rounded-full h-11 w-11">
          <Image
            width={40}
            height={40}
            src="/images/user/owner.jpg"
            alt="User"
          />
        </span>
        <div className="flex flex-col mr-4 text-left">
          <span className="block mr-1 font-bold text-sm text-[#2c2c2c]">{session?.data?.user.displayName ?? ''}</span>
          <span className="block mr-1 font-medium text-sm text-[#757575]">{session?.data?.user?.roles?.includes("ROLE_ADMIN") ? 'Admin' : 'User'}</span>

        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className={`absolute right-0 mt-4 flex w-[240px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800  ${isAdminSite ? 'top-[-220px] right-[-80px]' : ''}`}
      >
        <ul className="flex flex-col gap-1 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            {session.data?.user?.roles?.includes("ROLE_ADMIN") ?
              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  showAlert();
                }}
                tag="a"
                href={`${isAdminSite ? '/' : '/admin/questions'}`}
                className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]"
              >
                {isAdminSite ? 'User View' : 'Admin View'}
                <ChangeUserView />
              </DropdownItem>
              : null
            }
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]"
            >
              Change Avatar
              <ChangeAvatar />
            </DropdownItem>

            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]"
            >
              Change Password
              <ChangePassword />
            </DropdownItem>
          </li>

        </ul>
        <Link
          href="/logout"
          className="flex justify-between items-center gap-3 px-4 py-2 mt-3 text-gray-700 rounded-lg group text-sm hover:bg-rose-100 text-rose-600"
        >
          Logout
          <Logout />
        </Link>
      </Dropdown>
    </div>
  );
}

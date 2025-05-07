'use client';
import React, { use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Button from '@/components/ui/button/Button';
import PlusIcon from '@/public/images/icons/plus.svg';
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { User } from "@/types/admin";
import { useParams, useSearchParams } from "next/navigation";
import Checkbox from "../form/input/Checkbox";
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function Students({ users, total }: { users: User[], total: number }) {
  const params = useSearchParams();
  console.log(params.get('grade'));
  return (
    <>

      <div className='flex justify-between px-6 py-4'>
        <div className='flex items-center'>
          <span className='text-semibold text-lg'>{params.get('grade')}</span>
          <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{total} {total > 1 ? 'students' : 'student'}</div>
        </div>
        <Button variant='primary' startIcon={<PlusIcon className="fill-rose-600" />}>Add teacher</Button>
      </div>
      <div className=''>
        <div className="overflow-hidden border-t border-gray-100 bg-white ">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1102px]">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 flex text-[#757575] text-xs font-semibold text-start"
                    >
                      <Checkbox onChange={console.log} checked={true} className="mr-2" />
                      <span>Name</span>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Attendance
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Homework
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Gender
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Date of birth
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      <>Action</>
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                  {users?.length ? <>
                    {users.map((user) => (
                      <TableRow key={user.userId}>
                        {/* <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell> */}
                        <TableCell className="px-4 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400">
                          <Checkbox onChange={console.log} checked={true} className="mr-2" />
                          <span>{user.displayName}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <></>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <></>
                          {/* <div className="flex -space-x-2">
                      {order.team.images.map((teamImage, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div> */}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <>
                          </>
                          {/* <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge> */}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {user.phone}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {user.address}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <></>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex gap-4">
                            <EditIcon className="cursor-pointer" />
                            <LockIcon className="cursor-pointer" />
                            <TrashIcon className="cursor-pointer" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </> : <TableRow>
                    <TableCell  className="text-center py-10 text-gray-500" colSpan={9}>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg
                          className="w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008H14.25V9.75zM21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                          />
                        </svg>
                        <p className="text-[#757575] italic text-lg">No data available to display</p>
                      </div>
                    </TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

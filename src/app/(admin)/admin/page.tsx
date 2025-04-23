'use client'
import Header from '@/components/admin-header';
import MobileMenu from '@/components/mobile-menu';
import Sidebar from '@/components/sidebar';
// src/pages/Dashboard.tsx
import React, { useState } from 'react';

interface Student {
    id: number;
    name: string;
    gender: string;
    score: number;
    status: 'Present' | 'Absent';
}

const students: Student[] = [
    { id: 1, name: 'Nguyen Van A', gender: 'Male', score: 7.5, status: 'Present' },
    { id: 2, name: 'Tran Thi B', gender: 'Female', score: 8.0, status: 'Absent' },
];

const Dashboard: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Sidebar />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <Header onMenuClick={() => setIsMenuOpen(true)} />
            <main className="md:ml-64 p-6 mt-4">
                <h2 className="text-2xl font-semibold mb-4">Grade 12 - Attendance</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">Score</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b">
                                    <td className="px-6 py-4">{student.id}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4">{student.gender}</td>
                                    <td className="px-6 py-4">{student.score}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className={`px-3 py-1 text-sm rounded ${student.status === 'Present'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {student.status}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
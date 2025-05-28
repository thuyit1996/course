import { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BasicModal from "../ui/basic-modal";
import { useGetAttendanceDetail } from "@/api/admin/query";

const AttendanceDetail = ({ isOpen, closeModal, userId }: { isOpen: boolean, closeModal: () => void, userId: string }) => {
    const { data } = useGetAttendanceDetail(userId);
    console.log(JSON.stringify(data));
    const [attendance, setAttendance] = useState<{date: string, status: 'absent' | 'present'}[]>([]);

    const events = attendance.map(item => ({
        start: item.date,
        allDay: true,
        backgroundColor: item.status === 'present' ? 'green' : 'red',
        borderColor: item.status === 'present' ? 'green' : 'red',
        display: 'background'
    }));

    const handleDateClick = (arg) => {
        const dateStr = arg.dateStr;
        const current = attendance.find(item => item.date === dateStr);
        const newStatus = window.prompt(
            `Cập nhật trạng thái điểm danh cho ngày ${dateStr} (present/absent):`,
            current ? current.status : ''
        );

        if (newStatus === 'present' || newStatus === 'absent') {
            setAttendance(prev => {
                const existingIndex = prev.findIndex(item => item.date === dateStr);
                if (existingIndex >= 0) {
                    const updated = [...prev];
                    updated[existingIndex].status = newStatus;
                    return updated;
                } else {
                    return [...prev, { date: dateStr, status: newStatus }];
                }
            });
        } else if (newStatus !== null) {
            alert('Chỉ nhập "present" hoặc "absent"');
        }
    };
    return (
        <BasicModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={`Update attendance`}
            buttonLabel={['Cancel', 'Update']}
            handleSave={console.log}
            rootClassName="max-w-[900px]"
        >
            <div className="max-h-[70vh] overflow-y-auto">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                    editable={false}
                    dayMaxEvents={true}
                />
            </div>

        </BasicModal>
    )
}
export default AttendanceDetail;
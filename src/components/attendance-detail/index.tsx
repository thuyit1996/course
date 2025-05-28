import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import BasicModal from "../ui/basic-modal";
import { useGetAttendanceDetail } from "@/api/admin/query";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { createAttendance, deleteAttendance } from "@/api/admin/fetches";
import { toast } from "react-toastify";

const AttendanceDetail = ({ isOpen, closeModal, userId }: { isOpen: boolean, closeModal: () => void, userId: string }) => {
    const { data, refetch } = useGetAttendanceDetail(userId);
    const [attendance, setAttendance] = useState<{ date: string, status: 'absent' | 'present' }[]>([]);
    const [dropDownInfo, setDropdownInfo] = useState<{ isOpen: boolean, status: 'absent' | 'present' | 'idle', date: string }>({ isOpen: false, status: 'idle', date: '' });
    const [style, setStyle] = useState<React.CSSProperties>({});
    useEffect(() => {
        if (data && data.responseData && data.responseData.months) {
            const mappedAttendance = data.responseData.months.reduce((acc: any, month: any) => {
                const days = month.attendanceDays.map((day: any) => {
                    const [year, monthNum, dayNum] = day.date;
                    const dateStr = `${year.toString().padStart(4, '0')}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                    return {
                        date: dateStr,
                        status: day.status.toLowerCase() === 'present' ? 'present' : 'absent'
                    };
                });
                return acc.concat(days);
            }, []);

            setAttendance(mappedAttendance);
        }
    }, [data]);
    const events = attendance.map(item => ({
        start: item.date,
        allDay: true,
        backgroundColor: item.status === 'present' ? 'green' : 'red',
        borderColor: item.status === 'present' ? 'green' : 'red',
        display: 'background'
    }));

    const handleDateClick = (arg: DateClickArg) => {
        const dateStr = arg.dateStr;
        const current = attendance.find(item => item.date === dateStr);
        setDropdownInfo({
            isOpen: true,
            status: current ? current.status : 'idle',
            date: dateStr

        });
        const rect = arg.dayEl.getBoundingClientRect();
        setStyle({
            position: 'fixed',
            top: rect.bottom,
            left: rect.left,
            zIndex: 9999,
            width: 140,
        });
    };
    const updateStatus = async (status: 'absent' | 'present' | 'idle') => {
        const date = new Date(dropDownInfo.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        setDropdownInfo(prev => ({
            ...prev,
            isOpen: false,
        }))
        if (status !== 'idle') {
            const body = {
                students: [
                    { userId, status: status === 'present' ? 0 : 1 }
                ],
                month,
                year,
                date: dropDownInfo.date,
            };
            try {
                const resp = await createAttendance(body);
                if (resp.responseData) {
                    toast.success("Update status successfully");
                    refetch();
                }
                else {
                    toast.error('Something went wrong');
                }
            } catch (error) {
                toast.error('Something went wrong');
            }
        } else {
            const body = {
                "userId": userId,
                month,
                year,
                "date": dropDownInfo.date
            }
            try {
                const resp = await deleteAttendance(body);
                if (resp.responseData) {
                    toast.success("Remove status successfully")
                    refetch();
                } else {
                    toast.error('Something went wrong');
                }
            } catch (error) {
                toast.error('Something went wrong');
            }
        }
    }
    const refreshCalendar = () => {
        refetch();
    }
    console.log(dropDownInfo);
    return (
        <BasicModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={`Update attendance`}
            isShowFooter={false}
            handleSave={console.log}
            rootClassName="max-w-[900px]"
        >
            <div className="max-h-[70vh] overflow-y-auto relative">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                    editable={false}
                    dayMaxEvents={true}
                />
                <Dropdown
                    isOpen={dropDownInfo.isOpen}
                    onClose={() => {
                        setDropdownInfo({
                            isOpen: false,
                            status: 'idle',
                            date: ''
                        })
                    }}
                    className={`absolute z-999  mt-[4px] flex flex-col rounded-lg bg-white p-4 shadow-[0px_4px_8px_0px_#00000014]`}
                    style={style}
                >
                    {dropDownInfo.status === 'idle' || dropDownInfo.status === 'absent' ?
                        <DropdownItem className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]" onClick={() => updateStatus('present')}>
                            Present
                        </DropdownItem> : null
                    }
                    {dropDownInfo.status === 'idle' || dropDownInfo.status === 'present' ?
                        <DropdownItem className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]" onClick={() => updateStatus('absent')}>
                            Absent
                        </DropdownItem>
                        : null}
                    {
                        dropDownInfo.status !== 'idle' ?
                            <DropdownItem className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg group text-sm hover:bg-gray-100 !text-[#2c2c2c]" onClick={() => updateStatus('idle')}>
                                Clear
                            </DropdownItem>
                            : null
                    }
                </Dropdown>
            </div>

        </BasicModal>
    )
}
export default AttendanceDetail;
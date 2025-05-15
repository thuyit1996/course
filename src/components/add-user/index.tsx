import Input from "../form/input/InputField";
import Select from "../form/Select";
import BasicModal from "../ui/basic-modal";
import CalenderIcon from '@/public/images/icons/calender.svg';
import DatePicker from 'react-date-picker';
import { GENDERS, ROLES } from "@/libs/constant";
import { useState, useTransition } from "react";
import { z } from 'zod';
import { useGetAllClass } from "@/api/admin/query";
import { createUser } from "@/api/admin/fetches";
import { toast } from "react-toastify";
import 'react-date-picker/dist/DatePicker.css';
import moment from "moment";


const AdminRoleSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'This field is required' }),
    lastName: z.string().trim().min(1, { message: 'This field is required' }),
    gender: z.string().trim().min(1, { message: 'This field is required' }),
    email: z
        .string()
        .trim()
        .min(1, { message: 'This field is required' })
        .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
            message: 'Invalid email address',
        })
        .default(''),
    address: z.string().trim().min(1, { message: 'This field is required' }),
    phone: z.string().trim().min(1, { message: 'This field is required' }),
    dob: z.string().trim().min(1, { message: 'This field is required' }),
})
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const UserRoleSchema = AdminRoleSchema.extend({
    classroomId: z.string().trim().min(1, { message: 'This fied is required' }),
    password: z
        .object({
            password: z
                .string()
                .trim()
                .min(1, { message: 'This field is required' })
                .refine((value) => passwordRegex.test(value), {
                    message:
                        'Your password must be minimum 8 Characters. Must contain 1 uppercase letter and 1 number.',
                }),
            rePassword: z
                .string()
                .trim()
                .min(1, { message: 'This field is required' }),
        })
        .refine((data) => data.password === data.rePassword, {
            path: ['confirmPassword'],
            message: 'Confirm password does not match',
        }),
})
type FormFields = z.infer<typeof UserRoleSchema | typeof AdminRoleSchema>;
const AddUser = ({ isOpen, closeModal, role, gradeId }: { isOpen: boolean, closeModal: (isSuccess?: boolean) => void, role: 'TEACHER' | 'STAFF' | 'USER', gradeId?: string }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data } = useGetAllClass()
    const modalTile = role === 'STAFF' ? 'Staff' : role === 'TEACHER' ? 'Teacher' : 'User';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [classroomId, setClassroomId] = useState(gradeId);
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [isPending, startTransition] = useTransition();

    const onCreateUser = async () => {
        try {
            startTransition(async () => {
                const body = {
                    firstName,
                    lastName,
                    gender,
                    password: 'Abcd1234@',
                    classroomId,
                    email,
                    address,
                    phone,
                    dob: moment(dob).format('DD/MM/YYYY'),
                    role: role === 'USER' ? ROLES.USER : role === 'TEACHER' ? ROLES.TEACHER : ROLES.STAFF
                }
                const resp = await createUser(body);
                if (resp.responseData) {
                    closeModal(true);
                    toast.success(`Create ${modalTile} successfully!`);
                }
                else {
                    closeModal();
                    toast.error('Something went wrong')
                }
            })
        }
        catch (error) {
            closeModal();
            toast.error('Something went wrong')
            console.error(error);
        }
    }

    return (
        <BasicModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={`Add ${modalTile}`}
            buttonLabel={['Cancel', 'Create']}
            handleSave={onCreateUser}
            isLoading={isPending}
        >
            <form>
                <div className="overflow-y-auto custom-scrollbar max-h-[450px] scroll-hidden">
                    <div className="mt-6">
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Enter first name
                            </label>
                            <Input placeholder={`First name`} wrapperClass='w-full' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            {/* 
                            {errors.firstName &&
                                <span className="text-rose-600 text-xs">This filed is required</span>
                            } */}
                        </div>
                    </div>
                    <div className="mt-6">
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Enter last name
                            </label>
                            <Input placeholder={`Last name`} wrapperClass='w-full' value={lastName} onChange={(event) => setLastName(event.target.value)} />
                        </div>
                    </div>
                    <div className={`w-full grid grid-cols-1 md:grid-cols-2 mt-6 gap-3 lg:gap-6`}>
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Class
                            </label>
                            <Select
                                options={data?.responseData?.classroom?.map(item => ({
                                    label: item.name,
                                    value: item.id
                                })) ?? []}
                                placeholder="Choose class"
                                defaultValue={classroomId}
                                className="bg-gray-50 text-base"
                                onChange={(value) => setClassroomId(value)}
                            />
                            {/* <span className="text-rose-600 text-xs">This filed is required</span> */}
                        </div>
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Gender
                            </label>
                            <Select
                                options={GENDERS}
                                placeholder="Choose gender"
                                defaultValue={gender}
                                className="bg-gray-50 text-base"
                                onChange={(value) => setGender(value)}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Email
                            </label>
                            <Input placeholder="Enter email" wrapperClass='w-full'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                    </div>
                    <div className="mt-6">
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Address
                            </label>
                            <Input placeholder="Enter address" wrapperClass='w-full' value={address} onChange={(event) => setAddress(event.target.value)} />
                        </div>

                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-6 gap-3 lg:gap-6">
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Phone
                            </label>
                            <Input placeholder="Enter phone" wrapperClass='w-full' value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div>
                            <label className="mb-2 block text-base text-[#2c2c2c]">
                                Date of Birth
                            </label>
                            <div className="relative w-full flatpickr-wrapper">
                                <div className="relative">
                                    <DatePicker onChange={(value: any) => setDob(value)} value={dob} className="w-full" calendarIcon={<CalenderIcon />} format="dd/MM/yyyy" clearIcon={null} />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* {role === 'USER' ?
                        <>
                            <div className="mt-6">
                                <div>
                                    <label className="mb-1 block text-base text-[#2c2c2c]">
                                        Password
                                    </label>
                                    <p className="text-[#757575] mb-2 text-sm">Minimum 8 Characters. Must contain 1 uppercase letter and 1 number.</p>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder="Enter your password"
                                            className="w-full border border-gray-200 rounded-md "
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div>
                                    <label className="mb-2 block text-base text-[#2c2c2c]">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            placeholder="Enter your confirm password"
                                            className="w-full border border-gray-200 rounded-md "
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </> : null
                    } */}
                </div>
            </form>
        </BasicModal>
    )
}
export default AddUser;
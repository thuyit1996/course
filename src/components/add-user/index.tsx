import Input from "../form/input/InputField";
import Select from "../form/Select";
import BasicModal from "../ui/basic-modal";
import Flatpickr from "react-flatpickr";
import CalenderIcon from '@/public/images/icons/calender.svg';
import "flatpickr/dist/themes/light.css";
import { GENDERS } from "@/libs/constant";

const AddUser = ({ isOpen, closeModal, role }: { isOpen: boolean, closeModal: () => void, role: 'TEACHER' | 'STAFF' | 'USER' }) => {
    console.log(isOpen);
    const onCreateTeacher = () => {

    }
    return (
        <BasicModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Add Teacher'
            buttonLabel={['Cancel', 'Create']}
            handleSave={onCreateTeacher}
        >
            <div className="mt-6">
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Name
                    </label>
                    <Input placeholder="Enter teacher name" wrapperClass='w-full' />
                </div>

            </div>
            <div className="mt-6">
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Gender
                    </label>
                    <Select
                        options={GENDERS}
                        onChange={console.log}
                        placeholder="Choose gender"
                        defaultValue=""
                        className="bg-gray-50 text-base"
                    />
                </div>
            </div>
            <div className="mt-6">
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Email
                    </label>
                    <Input placeholder="Enter email" wrapperClass='w-full' />
                </div>

            </div>
            <div className="mt-6">
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Address
                    </label>
                    <Input placeholder="Enter address" wrapperClass='w-full' />
                </div>

            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-6 gap-3 lg:gap-6">
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Phone
                    </label>
                    <Input placeholder="Enter phone" wrapperClass='w-full' />
                </div>
                <div>
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Date of Birth
                    </label>
                    <div className="relative w-full flatpickr-wrapper">
                        <Flatpickr
                            options={{
                                dateFormat: "Y-m-d",
                            }}
                            placeholder="Choose date of birth"
                            className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <CalenderIcon />
                        </span>
                    </div>
                </div>

            </div>
        </BasicModal>
    )
}
export default AddUser;
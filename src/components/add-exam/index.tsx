import { useState } from "react";
import Input from "../form/input/InputField"
import Select from "../form/Select"
import CustomModal from "../ui/custom-modal"
import { MultiSelect } from "react-multi-select-component";
import { useGetAllClass } from "@/api/admin/query";
import { useGetAllAdminTopic } from "@/api/writing-test/query";
import { getQuestionByTopicId } from "@/api/admin/fetches";
const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];
const AddExam = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
    const [selected, setSelected] = useState([]);
    const { data: classResp } = useGetAllClass();
    const { data: topicResp } = useGetAllAdminTopic();
    const [questions, setQuestions] = useState()
    const getQuestionByTopic = async (topicId: string) => {
        const resp = await getQuestionByTopicId(topicId);
        console.log(resp);
        if(resp?.responseData) {
            // setQuestions(resp.responseData.)
        }
    } 
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Create exam'
            buttonLabel={['Cancel', 'Create']}
            handleSave={console.log}
        >
            <div className="flex flex-col overflow-y-auto custom-scrollbar max-h-[450px]">
                <div className="mt-6">
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Exam
                    </label>
                    <Input placeholder="Enter exam name" wrapperClass='w-full' />
                </div>
                <div className="mt-6">
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Class
                    </label>
                    <Select
                        options={classResp?.responseData?.classroom?.map(item => ({
                            label: item.name,
                            value: item.id
                        })) ?? []}
                        onChange={console.log}
                        placeholder="Choose class"
                        defaultValue=""
                        className="bg-gray-50 text-base"
                    />
                </div>
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block text-base text-[#2c2c2c]">
                            Topic List
                        </label>
                        <Select
                            options={topicResp?.topics?.map(item => ({
                                label: item.name,
                                value: item.id
                            })) ?? []}
                            onChange={getQuestionByTopic}
                            placeholder="Choose topic"
                            defaultValue=""
                            className="bg-gray-50 text-base"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block text-base text-[#2c2c2c]">
                            Question List
                        </label>
                        <MultiSelect
                            options={[]}
                            value={selected}
                            onChange={setSelected}
                            overrideStrings={{
                                selectSomeItems: 'Select questions'
                            }}
                            labelledBy="Select questions"
                        />
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}
export default AddExam;
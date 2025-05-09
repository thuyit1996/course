import { useEffect, useState } from "react";
import Input from "../form/input/InputField"
import Select from "../form/Select"
import CustomModal from "../ui/custom-modal"
import { useGetAllClass } from "@/api/admin/query";
import { useGetAllAdminTopic } from "@/api/writing-test/query";
import { createExam, getQuestionByTopicId } from "@/api/admin/fetches";
import ArrowSelect from '@/public/images/icons/arrow-select.svg';
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import SearchIcon from '@/public/images/icons/search.svg';
import SortIcon from '@/public/images/icons/sort.svg';
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { QuestionList } from "@/types/exam";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddExam = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
    const [isOpenDropdown, setIsOpen] = useState(false);
    const [isOpenTopic, setIsOpenTopic] = useState(false);
    const [topic, setTopic] = useState('');
    const router = useRouter();
    const { data: classResp } = useGetAllClass();
    const { data: topicResp } = useGetAllAdminTopic();
    const [questions, setQuestions] = useState<any>([]);
    const [tempQuestions, setTempQuestions] = useState<any>([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [displayQuestionText, setDisplayQuestionText] = useState('');
    const [name, setName] = useState('');
    const [classroomId, setClassroomId] = useState('');
  
    const [topics, setTopics] = useState<{ id: string, name: string }[]>([]);
    const [isSelectAllTopics, setIsSelectAllTopics] = useState(false);
    const [displayTopics, setDisplayTopics] = useState('');
    useEffect(() => {
        if (topicResp?.topics) {
            setTopics(topicResp.topics)
        }
    }, [topicResp])
    function closeDropdown() {
        setIsOpen(false);
    }
    const selectQuestion = (status: boolean, id: string) => {
        const newQuestions = tempQuestions.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: status
                }
            } else {
                return {
                    ...item
                }
            }
        })
        setTempQuestions(newQuestions);
    }
    useEffect(() => {
        const countActive = tempQuestions?.filter((item: any) => item.checked === true);
        if (countActive?.length === tempQuestions?.length) {
            setIsSelectAll(true);
        } else {
            setIsSelectAll(false);
        }
    }, [tempQuestions]);

    const onChangeSelectAll = (value: boolean) => {
        setIsSelectAll(value);
        if (value) {
            const newQuestions = tempQuestions.map((item: any) => {
                return {
                    ...item,
                    checked: true
                }
            })
            setTempQuestions(newQuestions);
        } else {
            const newQuestions = tempQuestions.map((item: any) => {
                return {
                    ...item,
                    checked: false
                }
            })
            setTempQuestions(newQuestions);
        }
    }
    const onApplyQuestion = () => {
        closeDropdown();
        const countActive = tempQuestions?.filter((item: any) => item.checked === true);
        if (countActive?.length) {
            setDisplayQuestionText(`${countActive.length} ${countActive.length > 1 ? 'questions' : 'question'}` as string)
        } else {
            setDisplayQuestionText('');
        }
    }
    console.log(displayQuestionText);
    const onCreateExam = async () => {
        try {
            const body = {
                name,
                "topicIds":  topics?.filter((item: any) => item.checked === true)?.map(item => item.id),
                "classroomId": classroomId,
                "cardIds": tempQuestions?.filter((item: any) => item.checked)?.map((item: any) => item.id)
            }
            const resp = await createExam(body);
            if (resp?.responseData) {
                toast.success("Create exam successfully!");
                router.push('/admin/exams');
            } else {
                toast.error("Something went wrong")
            }
            closeModal();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const onChangeSelectAllTopics = (value: boolean) => {
        setIsSelectAllTopics(value);
        if (value) {
            const newTopics = topics.map((item: any) => {
                return {
                    ...item,
                    checked: true
                }
            })
            setTopics(newTopics);
        } else {
            const newTopics = topics.map((item: any) => {
                return {
                    ...item,
                    checked: false
                }
            })
            setTopics(newTopics);
        }
    }

    const selectTopic = (status: boolean, id: string) => {
        const newTopics = topics.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: status
                }
            } else {
                return {
                    ...item
                }
            }
        })
        setTopics(newTopics);
    }
    const onApplyTopic = () => {
        setIsOpenTopic(false);
        const countActive = topics?.filter((item: any) => item.checked === true);
        if (countActive?.length) {
            setDisplayTopics(`${countActive.length} ${countActive.length > 1 ? 'topics' : 'topic'}` as string);
            console.log(countActive.map(item => item.id));
            getQuestionByTopics(countActive.map(item => item.id))
        } else {
            setDisplayTopics('');
        }
    }

    const getQuestionByTopics = async (topicIds: string[]) => {
        const resp = await getQuestionByTopicId(topicIds);
        if (resp?.cards) {
            setTempQuestions(resp.cards);
        }
    }
    const activeTopics = topics?.filter((item: any) => item.checked === true);
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Create exam'
            buttonLabel={['Cancel', 'Create']}
            handleSave={onCreateExam}
            showLeftButton={false}
        >
            <div className="flex flex-col overflow-y-auto custom-scrollbar max-h-[450px]">
                <div className="mt-6">
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Exam
                    </label>
                    <Input placeholder="Enter exam name" wrapperClass='w-full' value={name} onChange={(event) => setName(event.target.value)} />
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
                        onChange={value => setClassroomId(value)}
                        placeholder="Choose class"
                        className="bg-gray-50 text-base"
                    />
                </div>
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block text-base text-[#2c2c2c]">
                            Topic List
                        </label>
                        {/* <Select
                            options={topicResp?.topics?.map(item => ({
                                label: item.name,
                                value: item.id
                            })) ?? []}
                            onChange={getQuestionByTopic}
                            placeholder="Choose topic"
                            className="bg-gray-50 text-base"
                        /> */}
                        <div className={`border border-gray-300 cursor-pointer flex items-center px-4 text-base rounded-lg h-11 leading-11 text-sm text-gray-500 shadow-theme-xs w-full relative`} onClick={() => {
                            if (isOpenTopic) {
                                setIsOpenTopic(false);
                            } else {
                                setIsOpenTopic(true);
                            }
                        }}>{displayTopics || 'Select topics'}
                            <ArrowSelect className="absolute right-3 top-4" />
                        </div>
                        <Dropdown
                            isOpen={isOpenTopic}
                            onClose={() => setIsOpenTopic(false)}
                            className={`absolute right-7.5 z-999  mt-[4px] flex w-[536px] flex-col rounded-lg bg-white p-4 shadow-[0px_4px_8px_0px_#00000014]`}
                        >
                            <span className="text-[#757575] text-xs">Topic count: {topics?.length ?? 0}</span>
                            <div className="mt-4 min-h-[332px] max-h-[332px] mb-5 overflow-y-auto">
                                {topics?.length ?
                                    <div className="flex items-center gap-3 mt-2">
                                        <Checkbox checked={isSelectAllTopics} onChange={(value) => {
                                            onChangeSelectAllTopics(value);
                                        }} className="w-5 h-5   text-sm text-[#2c2c2c]" label={`All (${topics?.length} topics)`} />
                                    </div> : null
                                }
                                {topics?.map((item, index: number) => {
                                    return (
                                        <div className="flex items-center gap-3 mt-4" key={index}>
                                            <Checkbox checked={(item as any).checked} onChange={(status) => selectTopic(status, item.id)} className="w-5 h-5  text-sm text-[#2c2c2c]" label={item.name} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex w-full">
                                <Button variant='outline' className='w-1/2 mr-2.5' onClick={() => onChangeSelectAllTopics(false)}>Reset</Button>
                                <Button variant='primary' className='w-1/2' onClick={() => onApplyTopic()}>
                                    Apply
                                </Button>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block t  ext-base text-[#2c2c2c]">
                            Question List
                        </label>
                        <div className={`border border-gray-300 cursor-pointer flex items-center px-4 text-base rounded-lg h-11 leading-11 text-sm text-gray-500 shadow-theme-xs w-full relative ${!activeTopics?.length ? 'pointer-events-none bg-gray-100' : ''}`} onClick={() => {
                            if (isOpenDropdown) {
                                closeDropdown();
                            } else {
                                setIsOpen(true);
                            }
                        }}>{displayQuestionText || 'Select questions'}
                            <ArrowSelect className="absolute right-3 top-4" />
                        </div>
                        <Dropdown
                            isOpen={isOpenDropdown}
                            onClose={closeDropdown}
                            className={`absolute right-7.5 z-999  mt-[4px] flex w-[536px] flex-col rounded-lg bg-white p-4 shadow-[0px_4px_8px_0px_#00000014]`}
                        >
                            <span className="text-[#757575] text-xs">Question count: {questions?.length ?? 0}</span>
                            <div className="mt-4 min-h-[332px] max-h-[332px] mb-5 overflow-y-auto">
                                {questions?.length ?
                                    <div className="flex items-center gap-3 mt-2">
                                        <Checkbox checked={isSelectAll} onChange={(value) => {
                                            onChangeSelectAll(value);
                                        }} className="w-5 h-5   text-sm text-[#2c2c2c]" label={`All (${questions?.length} questions)`} />
                                    </div> : null
                                }
                                {tempQuestions?.map((item: any, index: number) => {
                                    return (
                                        <div className="flex items-center gap-3 mt-4" key={index}>
                                            <Checkbox checked={item.checked} onChange={(status) => selectQuestion(status, item.id)} className="w-5 h-5  text-sm text-[#2c2c2c]" label={item.question?.text} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex w-full">
                                <Button variant='outline' className='w-1/2 mr-2.5' onClick={() => onChangeSelectAll(false)}>Reset</Button>
                                <Button variant='primary' className='w-1/2' onClick={() => onApplyQuestion()}>
                                    Apply
                                </Button>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}
export default AddExam;
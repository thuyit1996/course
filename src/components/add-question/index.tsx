import TextArea from '@/components/form/input/TextArea';
import Select from '@/components/form/Select';
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import CustomModal from '@/components/ui/custom-modal';
import CloseIcon from '@/public/images/icons/close.svg';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import PlusIcon from '@/public/images/icons/plus.svg';
import PlusFile from '@/public/images/icons/plus-file.svg';
import MiniDelete from '@/public/images/icons/mini-delete.svg';
import { useState } from 'react';
import Switch from '@/components/form/switch/Switch';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import { v4 } from 'uuid'
import { useGetAllAdminTopic } from '@/api/writing-test/query';
import { createQuestion, uploadFile } from '@/api/writing-test/fetches';
import { toast } from 'react-toastify';
import FileIcon from '@/public/images/icons/file.svg';
import MP3Icon from '@/public/images/icons/mp3.svg';


const AddQuestion = ({ isOpen, closeModal, openModal, goBack, questionType: questionTypeProp }: { isOpen: boolean, closeModal: () => void, openModal: () => void, goBack?: () => void, questionType: 0 | 1 }) => {
    const [isQuestionGroup, setIsQuestionGroup] = useState(false);
    const { data: topics } = useGetAllAdminTopic();
    const [imageSrc, setImageSrc] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [questionMultipleList, setQuestionMultipleList] = useState<{ option: { content: '', isCorrect: boolean, }[], question: string, id: string }[]>([{
        id: v4(), option: [
            { content: '', isCorrect: false, },
            { content: '', isCorrect: false, },
            { content: '', isCorrect: false, },
            { content: '', isCorrect: false, },
        ],
        question: ''
    }])
    const [topicId, setTopicId] = useState('');
    const [question, setQuestion] = useState({
        text: '',
        sound: '',
        image: ''
    });
    const [answerNotQuestionGroup, setAnswerNotQuestionGroup] = useState([
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
    ])
    const [textResponse, setTextResponse] = useState('');

    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append('file', file);
            const resp = await uploadFile(formData);
            if (resp.responseData) {
                setQuestion(prev => ({
                    ...prev,
                    image: resp.responseData
                }))
            }
        }
    };

    const handleAudioChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setAudioSrc(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append('file', file);
            const resp = await uploadFile(formData);
            if (resp.responseData) {
                setQuestion(prev => ({
                    ...prev,
                    sound: resp.responseData
                }))
            }
        }
    };

    const removeImage = () => {
        setImageSrc(null as any);
    };

    const removeAudio = () => {
        setAudioSrc(null as any);
    };

    const addQuestion = () => {
        setQuestionMultipleList(prev => [...prev, {
            id: v4(),
            question: '',
            option: [
                { content: '', isCorrect: false, },
                { content: '', isCorrect: false, },
                { content: '', isCorrect: false, },
                { content: '', isCorrect: false, },
            ]
        }])
    }
    const deleteQuestion = (id: string) => {
        setQuestionMultipleList(questionMultipleList.filter(item => item.id !== id))
    }
    const updateQuestionNotGroup = (index: number, value: boolean | string, type: string) => {
        if (type === 'status') {
            const newData = answerNotQuestionGroup.map((item, idx) => {
                if (idx !== index) {
                    return {
                        ...item,
                    }
                } else {
                    return {
                        ...item,
                        isCorrect: value
                    }
                }
            })
            setAnswerNotQuestionGroup(newData as typeof answerNotQuestionGroup);
        }
        if (type === 'content') {
            const newData = answerNotQuestionGroup.map((item, idx) => {
                if (idx !== index) {
                    return {
                        ...item,
                    }
                } else {
                    return {
                        ...item,
                        content: value
                    }
                }
            })
            setAnswerNotQuestionGroup(newData as typeof answerNotQuestionGroup);
        }
    }

    const updateQuestionGroup = (questionId: string, value: boolean | string, type: string, childIndex?: number) => {
        if (type === 'question') {
            const newData = questionMultipleList.map((item, idx) => {
                if (item.id !== questionId) {
                    return {
                        ...item
                    }
                } else {
                    return {
                        ...item,
                        question: value
                    }
                }
            })
            setQuestionMultipleList(newData as typeof questionMultipleList);
        }
        if (type === 'status') {
            const newData = questionMultipleList.map((item, idx) => {
                if (questionId !== item.id) {
                    return {
                        ...item,
                    }
                } else {
                    return {
                        ...item,
                        option: item.option.map((option, childIdx) => {
                            if (childIdx !== childIndex) {
                                return {
                                    ...option
                                }
                            } else {
                                return {
                                    ...option,
                                    isCorrect: value
                                }
                            }
                        })
                    }
                }
            })
            setQuestionMultipleList(newData as typeof questionMultipleList);
        }
        if (type === 'content') {
            const newData = questionMultipleList.map((item, idx) => {
                if (questionId !== item.id) {
                    return {
                        ...item
                    }
                } else {
                    return {
                        ...item,
                        option: item.option.map((option, childIdx) => {
                            if (childIdx !== childIndex) {
                                return {
                                    ...option
                                }
                            } else {
                                return {
                                    ...option,
                                    content: value
                                }
                            }
                        })
                    }
                }
            })
            setQuestionMultipleList(newData as typeof questionMultipleList);
        }
    }
    console.log(questionMultipleList);
    const createQuestionHandle = async () => {
        let body: any;
        if (questionTypeProp === 0) {
            body = {
                "topicId": topicId,
                "question": question,
                "answer": {
                    "text": textResponse
                },
                "type": "1"
            }
        } else {
            if (isQuestionGroup && questionTypeProp === 1) {
                body = {
                    "topicId": topicId,
                    "question": question,
                    "type": 0,
                    "isQuestionGroup": true,
                    childCards: questionMultipleList.map(item => ({
                        question: {
                            text: item.question
                        },
                        answer: {
                            choices: item.option
                        }
                    }))
                }
            } else {
                body = {
                    "topicId": topicId,
                    "question": question,
                    "answer": {
                        "choices": answerNotQuestionGroup,
                    },
                    "type": "0",
                    "isQuestionGroup": false
                }
            }
        }
        try {
            const resp = await createQuestion(body);
            if (resp.responseData) {
                closeModal()
                toast.success('Create question successfully')
            } else {
                closeModal();
                toast.error('Something went wrong')
            }
            console.log(resp);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Create question'
            buttonLabel={['Cancel', 'Create']}
            showAddQuestion={isQuestionGroup}
            addQuestion={addQuestion}
            handleSave={createQuestionHandle}
            goBack={() => goBack?.()}
        >
            <div className="flex flex-col overflow-y-auto custom-scrollbar max-h-[450px] scroll-hidden">
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block text-base text-[#2c2c2c]">
                            Topic
                        </label>
                        <Select
                            options={topics?.topics?.map(item => ({
                                ...item,
                                value: item.id,
                                label: item.name
                            })) ?? []}
                            onChange={setTopicId}
                            placeholder="Select topics or add your own"
                            defaultValue=""
                            className="bg-gray-50 text-base"
                        />
                    </div>

                </div>
                <div className="mt-6">
                    <div>
                        <label className="mb-2 block text-base text-[#2c2c2c]">
                            Questions
                        </label>
                        <TextArea
                            rows={3}
                            placeholder='Enter question'
                            value={question?.text}
                            onChange={value => {
                                setQuestion(prev => ({
                                    ...prev,
                                    text: value
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        {/* Image Upload */}
                        {imageSrc ? <div className="flex px-6 py-4 border-dotted border-gray-200 mr-2 border w-1/2">
                            <div className="w-[96px] h-[80px] mr-2 relative border rounded">
                                <img src={imageSrc} alt="preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-[-10px] flex justify-center items-center border border-gray-200 right-[-10px] bg-white text-black rounded-full px-1 w-4.5 h-4.5"
                                >
                                    <MiniDelete />
                                </button>
                            </div>
                            <label className="w-[96px] h-[80px] flex items-center justify-center border rounded cursor-pointer">
                                <PlusFile />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div> : <div className="border-dotted border-gray-200 mr-2 border w-1/2">
                            <label className="w-full h-full flex items-center justify-center cursor-pointer py-3 flex-col">
                                <FileIcon />
                                <p className='mt-2 text-indigo-600 text-xs font-semibold'>Click to upload image</p>
                                <p className='mt-0.5 text-[#757575] text-xs'>JPG, JPEG less than 1MB</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>}

                        {audioSrc ? <div className="flex px-6 py-4 border-dotted border-gray-200 border w-1/2">
                            <div className="w-[96px] h-[80px] mr-2 relative border rounded flex items-center justify-center p-2">
                                <audio controls src={audioSrc} className="w-full" />
                                <button
                                    onClick={removeAudio}
                                    className="absolute top-[-10px] flex justify-center items-center border border-gray-200 right-[-10px] bg-white text-black rounded-full px-1 w-4.5 h-4.5"
                                >
                                    <MiniDelete />
                                </button>
                            </div>
                            <label className="w-[96px] h-[80px] flex items-center justify-center border border-dotted rounded cursor-pointer">
                                <PlusFile />
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleAudioChange}
                                    className="hidden"
                                />
                            </label>
                        </div> :  <div className="border-dotted border-gray-200 mr-2 border w-1/2"> <label className="w-full h-full flex items-center justify-center cursor-pointer py-3 flex-col">
                            <MP3Icon />
                            <p className='mt-2 text-indigo-600 text-xs font-semibold'>Click to upload sound</p>
                            <p className='mt-0.5 text-[#757575] text-xs'>MP3 less than 4MB</p>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleAudioChange}
                                className="hidden"
                            />
                        </label>
                        </div>}
                        {/* Audio Upload */}
                        {/* <div className="border-dotted border-gray-200 border w-1/2">
                            {audioSrc && (
                                <div className="flex px-6 py-4  w-[96px] h-[80px] mr-2 relative border rounded items-center justify-center p-2">
                                    <audio controls src={audioSrc} className="w-full" />
                                    <button
                                        onClick={removeAudio}
                                        className="absolute top-[-10px] flex justify-center items-center border border-gray-200 right-[-10px] bg-white text-black rounded-full px-1 w-4.5 h-4.5"
                                    >
                                        <MiniDelete />
                                    </button>
                                </div>
                            )}
                            <label className="w-full h-full flex items-center justify-center cursor-pointer py-3 flex-col">
                                <MP3Icon />
                                <p className='mt-2 text-indigo-600 text-xs font-semibold'>Click to upload sound</p>
                                <p className='mt-0.5 text-[#757575] text-xs'>MP3 less than 4MB</p>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleAudioChange}
                                    className="hidden"
                                />
                            </label>
                        </div> */}
                    </div>
                </div>
                {questionTypeProp == 0 ?
                    <>
                        <label className="block text-base text-[#2c2c2c] mt-6">
                            Answer
                        </label>
                        <div className=''>
                            <TextArea
                                rows={3}
                                className='mt-2'
                                placeholder='Enter answer hint'
                                value={textResponse}
                                onChange={setTextResponse}
                            />
                        </div>
                    </> : <>
                        <div className="mt-2">
                            <Switch
                                label="Is question group?"
                                defaultChecked={false}
                                onChange={setIsQuestionGroup}
                            />
                        </div>
                        {!isQuestionGroup ? <div className='mt-6'>
                            <label className="block text-base text-[#2c2c2c]">
                                Answer
                            </label>
                            <p className='text-sm text-[#757575] mt-[2px]'>Tick the correct answers. Each question may have up to two correct options.</p>
                            {answerNotQuestionGroup.map((item, index) => {
                                return (
                                    <div className="flex mt-2 w-full" key={index}>
                                        <Checkbox
                                            className="w-5 h-5 mr-4"
                                            onChange={value => {
                                                updateQuestionNotGroup(index, value, 'status')
                                            }}
                                            checked={item.isCorrect}
                                        />
                                        <Input placeholder={`Enter answer ${index + 1}`} wrapperClass='w-full' value={item.content} onChange={(event) => updateQuestionNotGroup(index, event.target.value,
                                            'content'
                                        )} />
                                    </div>

                                )
                            })}
                        </div> : <div className='mt-2'>
                            {questionMultipleList.map((item, index) => {
                                return (
                                    <div className="mt-2 bg-gray-50 rounded-lg p-4" key={item.id}>
                                        <div className='flex justify-between'>
                                            <span className='text-base text-[#2c2c2c]'>Question {index + 1}</span>
                                            <CloseIcon onClick={() => deleteQuestion(item.id)} />
                                        </div>
                                        <TextArea
                                            rows={3}
                                            className='mt-2'
                                            placeholder='Enter question'
                                            value={item.question}
                                            onChange={(value) => updateQuestionGroup(item.id, value, 'question')}
                                        />
                                        {item.option.map((option, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <div className="flex mt-2 w-full">
                                                        <Checkbox
                                                            className="w-5 h-5 mr-4"
                                                            onChange={(value) => updateQuestionGroup(item.id, value, 'status', idx)}
                                                            checked={option.isCorrect}
                                                        />
                                                        <Input placeholder='Enter answer 1' wrapperClass='w-full' value={option.content} onChange={(event) => updateQuestionGroup(item.id, event?.target.value, 'content', idx)} />
                                                    </div>
                                                </div>
                                            )

                                        })}
                                    </div>
                                )
                            })}
                        </div>}
                    </>
                }
            </div>
        </CustomModal>
    )
}
export default AddQuestion
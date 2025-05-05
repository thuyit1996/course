'use client'
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
import { createQuestion } from '@/api/writing-test/fetches';
import { toast } from 'react-toastify';
const QuestionType = [
    {
        value: 'text',
        label: 'Text response'
    },
    {
        value: 'multiple',
        label: 'Multiple choice'
    },
];
const QuestionPage: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const [isQuestionGroup, setIsQuestionGroup] = useState(false);
    const { data: topics } = useGetAllAdminTopic();
    const [imageSrc, setImageSrc] = useState('https://engnovatewebsitestorage.blob.core.windows.net/ielts-writing-task-1-images/f94aab25c631c4ad');
    const [audioSrc, setAudioSrc] = useState('https://github.com/rafaelreis-hotmart/Audio-Sample-files/blob/master/sample2.mp3');
    const [questionType, setQuestionType] = useState('text');
    const [questionTextList, setQuestionTextList] = useState<{ question: string, answer: string, id: string }[]>([{ id: v4(), question: '', answer: '' }])
    const [questionMultipleList, setQuestionMultipleList] = useState<{ question: string, answer: string, id: string }[]>([{ id: v4(), question: '', answer: '' }])
    const [topicId, setTopicId] = useState('');
    const [question, setQuestion] = useState({
        text: '',
        sound: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/blob/master/sample2.mp3',
        image: 'https://engnovatewebsitestorage.blob.core.windows.net/ielts-writing-task-1-images/f94aab25c631c4ad'
    });
    const [answerNotQuestionGroup, setAnswerNotQuestionGroup] = useState([
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
    ])
    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    };

    const handleAudioChange = (e : any) => {
        const file = e.target.files[0];
        if (file) {
            setAudioSrc(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageSrc(null as any);
    };

    const removeAudio = () => {
        setAudioSrc(null as any);
    };

    const addQuestion = () => {
        if (questionType === 'text') {
            setQuestionTextList(prev => [...prev, { id: v4(), question: '', answer: '' }])
        }
        if (questionType === 'multiple') {
            setQuestionMultipleList(prev => [...prev, { id: v4(), question: '', answer: '' }])
        }
    }
    const deleteQuestion = (id: string) => {
        if (questionType === 'text') {
            setQuestionTextList(questionTextList.filter(item => item.id !== id))
        }
        if (questionType === 'multiple') {
            setQuestionMultipleList(questionTextList.filter(item => item.id !== id))
        }
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
    console.log(answerNotQuestionGroup);
    const createQuestionHandle = async () => {
        if (!isQuestionGroup) {
            const body = {
                "topicId": topicId,
                "question": question,
                "answer": {
                    "choices": answerNotQuestionGroup,
                },
                "type": "0",
                "isQuestionGroup": false
            }
            try {
                const resp = await createQuestion(body);
                if(resp.responseData) {
                    toast.success('Create question successfully')
                }else {
                    toast.error('Something went wrong')
                }
                console.log(resp);
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong')
            }
        }
    }
    return (
        <>

            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Teacher list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>100 teachers</div>
                        </div>
                        <Button variant='primary' onClick={() => openModal()} startIcon={<PlusIcon className="fill-rose-600" />}>Add question</Button>
                    </div>
                    <div className=''>
                        <Teachers />
                    </div>
                </div>
                <CustomModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    title='Create question'
                    buttonLabel={['Cancel', 'Create']}
                    showAddQuestion={isQuestionGroup}
                    addQuestion={addQuestion}
                    handleSave={createQuestionHandle}
                >
                    <div className="flex flex-col overflow-y-auto custom-scrollbar max-h-[450px]">
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
                        <div className="mt-6">
                            <div className="flex">
                                {/* Image Upload */}
                                <div className="flex px-6 py-4 border-dotted border-gray-200 mr-2 border w-1/2">
                                    {imageSrc && (
                                        <div className="w-[96px] h-[80px] mr-2 relative border rounded">
                                            <img src={imageSrc} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={removeImage}
                                                className="absolute top-[-10px] flex justify-center items-center border border-gray-200 right-[-10px] bg-white text-black rounded-full px-1 w-4.5 h-4.5"
                                            >
                                                <MiniDelete />
                                            </button>
                                        </div>
                                    )}
                                    <label className="w-[96px] h-[80px] flex items-center justify-center border rounded cursor-pointer">
                                        <PlusFile />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Audio Upload */}
                                <div className="flex px-6 py-4 border-dotted border-gray-200 border w-1/2">
                                    {audioSrc && (
                                        <div className="w-[96px] h-[80px] mr-2 relative border rounded flex items-center justify-center p-2">
                                            <audio controls src={audioSrc} className="w-full" />
                                            <button
                                                onClick={removeAudio}
                                                className="absolute top-[-10px] flex justify-center items-center border border-gray-200 right-[-10px] bg-white text-black rounded-full px-1 w-4.5 h-4.5"
                                            >
                                                <MiniDelete />
                                            </button>
                                        </div>
                                    )}
                                    <label className="w-[96px] h-[80px] flex items-center justify-center border border-dotted rounded cursor-pointer">
                                        <PlusFile />
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleAudioChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
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
                            {/* <div className="flex mt-2 w-full">
                                <Checkbox
                                    className="w-5 h-5 mr-4"
                                    onChange={console.log}
                                    checked={false}
                                />
                                <Input placeholder='Enter answer 2' wrapperClass='w-full' />
                            </div>
                            <div className="flex mt-2 w-full">
                                <Checkbox
                                    className="w-5 h-5 mr-4"
                                    onChange={console.log}
                                    checked={false}
                                />
                                <Input placeholder='Enter answer 3' wrapperClass='w-full' />
                            </div>
                            <div className="flex mt-2 w-full">
                                <Checkbox
                                    className="w-5 h-5 mr-4"
                                    onChange={console.log}
                                    checked={false}
                                />
                                <Input placeholder='Enter answer 4' wrapperClass='w-full' />
                            </div> */}
                        </div> : <div className='mt-2'>
                            <Select
                                options={QuestionType}
                                onChange={(value) => setQuestionType(value)}
                                placeholder="Question type"
                                defaultValue={questionType}
                                className="bg-gray-50 text-base"
                            />
                            {questionType === 'text' ?
                                <div className='mt-6'>
                                    <span className='text-base text-[#2c2c2c]'>Child Questions</span>
                                    <p className='text-sm text-[#757575]'>Tick the correct answers. Each question may have up to two correct options.</p>
                                    {
                                        questionTextList.map((item, index) => {
                                            return (
                                                <div className="mt-2 bg-gray-50 rounded-lg p-4" key={item.id}>
                                                    <div className='flex justify-between'>
                                                        <span className='text-base text-[#2c2c2c]'>Question {index + 1}</span>
                                                        <CloseIcon onClick={() => deleteQuestion(item.id)} />
                                                    </div>

                                                    <TextArea
                                                        rows={3}
                                                        className='mt-2'
                                                        value={item.answer}
                                                        placeholder='Enter question'
                                                    />
                                                    <TextArea
                                                        rows={3}
                                                        className='mt-2'
                                                        value={item.question}
                                                        placeholder='Enter answer'
                                                    />
                                                </div>
                                            )
                                        })
                                    }

                                </div> :
                                <>
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
                                                />
                                                <div className="flex mt-2 w-full">
                                                    <Checkbox
                                                        className="w-5 h-5 mr-4"
                                                        onChange={console.log}
                                                        checked={false}
                                                    />
                                                    <Input placeholder='Enter answer 1' wrapperClass='w-full' />
                                                </div>
                                                <div className="flex mt-2 w-full">
                                                    <Checkbox
                                                        className="w-5 h-5 mr-4"
                                                        onChange={console.log}
                                                        checked={false}
                                                    />
                                                    <Input placeholder='Enter answer 2' wrapperClass='w-full' />
                                                </div>
                                                <div className="flex mt-2 w-full">
                                                    <Checkbox
                                                        className="w-5 h-5 mr-4"
                                                        onChange={console.log}
                                                        checked={false}
                                                    />
                                                    <Input placeholder='Enter answer 3' wrapperClass='w-full' />
                                                </div>
                                                <div className="flex mt-2 w-full">
                                                    <Checkbox
                                                        className="w-5 h-5 mr-4"
                                                        onChange={console.log}
                                                        checked={false}
                                                    />
                                                    <Input placeholder='Enter answer 4' wrapperClass='w-full' />
                                                </div>
                                                <TextArea
                                                    rows={3}
                                                    className='mt-2'
                                                    placeholder='Enter answer hint'
                                                />
                                            </div>
                                        )
                                    })}
                                </>

                            }

                        </div>}

                    </div>
                </CustomModal>
            </main>
        </>
    );
};

export default QuestionPage;
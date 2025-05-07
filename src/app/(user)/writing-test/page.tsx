import Pen from '@/public/images/icons/logo-writing-test.svg';
import Setting from '@/public/images/icons/setting.svg';
import Light from '@/public/images/icons/light.svg';
import Button from '@/components/ui/button/Button';
import { getAllTopic, getWritingTestList } from '@/api/writing-test/fetches';
import Link from 'next/link';

const WritingTestPage = async () => {
    const topicResp = await getAllTopic();
    const writingTestResp = topicResp?.responseData?.[0] ? await getWritingTestList(topicResp?.responseData?.[0].id) : null
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4">
            <div className="flex items-center w-full">
                <h3 className="text-lg text-[#2c2c2c] mr-3 font-semibold">All Writing Test</h3>
                <div className='border rounded-2xl  border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{writingTestResp?.responseData?.exams?.length || 0} tests</div>
            </div>
            
            {writingTestResp?.responseData?.exams?.length ? <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 mb-10">
                {writingTestResp?.responseData?.exams.map((item) => {
                    return <div className="rounded-2xl p-6 relative bg-indigo-800 bg-[url('/images/grid-image/test.png')] bg-cover bg-center" key={item.id} data-aos="fade-up">
                        <p className="flex items-center justify-center">
                            <Pen className="mr-2" />
                            <span className='uppercase textlg 4xl:text-[24px] leading-[100%] text-indigo-25 line-clamp-1'>{item.name}</span>
                        </p>
                        <p className='mt-2 text-indigo-25 text-sm text-center line-clamp-1'>ID: {item.code}</p>
                        {/* <div className='mt-4 mx-auto bg-[#1f235b] rounded-[100px] text-base text-indigo-25 py-4.5 text-center px-[44px] xl:px-[52px]'>
                            <span>
                            </span>
                            </div> */}
                        <div className={`block mt-4 w-[200px] mx-auto bg-[#1f235b] rounded-[100px] text-base text-indigo-25 py-4.5 text-center ${item.score == undefined ? 'text-indigo-600 text-semibold' : ''}`}>
                            {item.score !== undefined ? `SCORE: ${item.score}` : 'YOUR SCORE'}
                        </div>
                        <div className='mt-10 text-indigo-25 text-base'>
                            <div className='flex  items-center'>
                                <Setting className="mr-3" />
                                <span>{item.total > 1 ? `${item.total}: questions` : `${item.total} question`}</span>
                            </div>
                            <div className='flex  items-center mt-4'>
                                <Light className="mr-3" />
                                <span>Free explanation</span>
                            </div>
                        </div>
                        <div className='mt-10 flex justify-center items-center'>
                            {item.score !== undefined ? <>
                                <Link href={`/writing-test/review/${item.id}`} className='w-1/2 mr-2.5'>
                                    <Button variant='outline' className='w-full'>Review</Button>
                                </Link>
                                <Link href={`/writing-test/start/${item.id}`} className='w-1/2'>
                                    <Button variant='secondary' className='w-full'>
                                        Retake
                                    </Button>
                                </Link>
                            </>
                                :
                                <Link href={`/writing-test/start/${item.id}`} className='w-full'>
                                    <Button variant='secondary' className='w-full'>
                                        Start Now
                                    </Button>
                                </Link>
                            }
                        </div>
                    </div>
                })}
            </div> : null}

        </div>
    )
}
export default WritingTestPage
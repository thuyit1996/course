import Pen from '@/public/images/icons/pen.svg';
import Setting from '@/public/images/icons/setting.svg';
import Light from '@/public/images/icons/light.svg';
import Button from '@/components/ui/button/Button';
const QuizTestPage = () => {
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4">
            <div className="flex items-center w-full">
                <h3 className="text-lg text-[#2c2c2c] mr-3 font-semibold">All Writing Test</h3>
                <div className='border rounded-2xl  border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>8 tests</div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
                {new Array(15).fill({}).map((item, index) => {
                    return <div className="rounded-2xl p-6 relative bg-indigo-800" key={index}>
                        <img src={"/images/grid-image/test.png"} className='absolute inset-0 w-full h-full' />
                        <p className="flex items-center justify-center">
                            <Pen className="mr-2" />
                            <span className='uppercase text-[24px] leading-[100%] text-indigo-25'>Test {index + 1}</span>
                        </p>
                        <div className='mt-4 mx-auto bg-[#1f235b] rounded-[100px] text-base text-indigo-25 py-4.5 text-center px-[44px] xl:px-[52px]'>
                            SCORE: 4.5

                        </div>
                        <div className='mt-10 text-indigo-25 text-base'>
                            <div className='flex  items-center'>
                                <Setting className="mr-3" />
                                <span>200 questions</span>
                            </div>
                            <div className='flex  items-center mt-4'>
                                <Light className="mr-3" />
                                <span>Free explanation</span>
                            </div>
                        </div>
                        <div className='mt-10 flex justify-center items-center'>
                            <Button variant='outline' className='w-1/2 mr-2.5'>Review</Button>
                            <Button variant='secondary' className='w-1/2'>Retake</Button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default QuizTestPage
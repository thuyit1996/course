import { getWritingTest, submitWritingTest } from "@/api/writing-test/fetches"
import Writing from "@/components/writing";

const WritingTestPage = async () => {
    const resp = await getWritingTest();
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4 grid grid-cols-12">

            <Writing exam={resp.responseData} />
            <div className='rounded-lg col-span-0'>
                <div className='4xl:p-10 p-3 md:p4 2xl:p-6 relative overflow-hidden' style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F71] to-[#252C8C] z-0" />
                    <svg
                        className="absolute bottom-0 right-0 z-10"
                        width="100%"
                        height="100%"
                        viewBox="0 0 454 150"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M454,100 C370,180 100,120 0,160 L0,150 L454,150 Z"
                            fill="rgba(255, 255, 255, 0.03)" // nhẹ nhàng thôi để không đè gradient
                        />
                    </svg>
                    <div className='relative z-20 flex items-center justify-between'>
                        <p className="text-base lg:text-lg 4xl:text-[24px] leading-[100%] tracking-[2px] text-white font-bold">OVERALL <br />BAND SCORE</p>
                        <p className="text-lg lg:text-4xl 4xl:text-6xl text-white font-bold">4.5</p>
                    </div>
                </div>
                <ul className='uppercase border-indigo-100 rounded-lg shadow' style={{
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                        </div>
                    </li>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                        </div>
                    </li>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                        </div>
                    </li>
                    <li className='bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}
export default WritingTestPage
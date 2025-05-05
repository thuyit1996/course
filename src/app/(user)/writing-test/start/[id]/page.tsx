import { getWritingTest } from "@/api/writing-test/fetches"
import Writing from "@/components/writing";
import CaretRight from '@/public/images/icons/CaretRight.svg';
import Link from "next/link";

const WritingTestPage = async ({params}: {params: {id: string}}) => {
    const resp = await getWritingTest(params.id);
    console.log(resp);
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6  px-4 ">
             <div className="flex items-center w-full mb-6">
                <Link href={'/writing-test'}>
                    <h3 className="text-lg text-[#2c2c2c] mr-3 font-semibold">All Writing Test</h3>
                </Link>
                <CaretRight className="mr-3"/>
                <span className="text-indigo-600 text-base 2xl:text-lg text-semibold">{resp.responseData?.name ?? ''}</span>
            </div>
            <Writing exam={resp.responseData} examId={params.id}/>
        </div>
    )
}
export default WritingTestPage
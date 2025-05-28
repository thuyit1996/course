import { getQuizExamTest } from "@/api/exam/fetches"
import { QuizTest } from "@/components/quiz-test";
import CaretRight from '@/public/images/icons/CaretRight.svg';
import Link from "next/link";

const QuizTestPage = async ({ params }: { params: { id: string } }) => {
    const resp = await getQuizExamTest(params.id);
    console.log('QuizTestPage', JSON.stringify(resp))
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6  px-4 ">
            <div className="flex items-center w-full mb-6">
                <Link href={'/quiz-test'}>
                    <h3 className="text-lg text-[#2c2c2c] mr-3 font-semibold">All Quiz Test</h3>
                </Link>
                <CaretRight className="mr-3" />
                <span className="text-indigo-600 text-base 2xl:text-lg text-semibold">{resp.responseData?.name ?? ''}</span>
            </div>
            <QuizTest exam={resp.responseData} examId={params.id} />
        </div>
    )
}
export default QuizTestPage
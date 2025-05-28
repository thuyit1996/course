import { getQuizExamHistoryDetail, getQuizExamTest } from "@/api/exam/fetches";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import CaretRight from '@/public/images/icons/CaretRight.svg';
import Link from "next/link";
import { QuizTestReview } from "@/components/quiz-test-review";

const ReviewQuizTest = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);
    const testResp = await getQuizExamTest(params.id);
    const historyDetail = await getQuizExamHistoryDetail(params.id, session?.user?.userId ?? '');
    console.log('ReviewQuizTest', JSON.stringify(historyDetail))
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6  px-4 ">
            <div className="flex items-center w-full mb-6">
                <Link href={'/quiz-test'}>
                    <h3 className="text-lg text-[#2c2c2c] mr-3 font-semibold">All Quiz Test</h3>
                </Link>
                <CaretRight className="mr-3" />
                <span className="text-indigo-600 text-base 2xl:text-lg text-semibold">{testResp.responseData?.name ?? ''}</span>
            </div>
            <QuizTestReview history={historyDetail.responseData.examResults} exam={testResp.responseData} examId={params.id} />
        </div>
    )
}
export default ReviewQuizTest;
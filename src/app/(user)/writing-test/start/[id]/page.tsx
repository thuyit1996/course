import { getWritingTest } from "@/api/writing-test/fetches"
import Writing from "@/components/writing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WritingTestPage = async ({params}: any) => {
    const resp = await getWritingTest(params.id);
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6  px-4 ">
            <Writing exam={resp.responseData} examId={params.id}/>
        </div>
    )
}
export default WritingTestPage
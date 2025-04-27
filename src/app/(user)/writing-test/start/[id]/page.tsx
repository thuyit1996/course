import { getWritingTest } from "@/api/writing-test/fetches"
import Writing from "@/components/writing";

const WritingTestPage = async ({params}: {params: {id: string}}) => {
    const resp = await getWritingTest(params.id);
    return (
        <div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4 grid grid-cols-12">
            <Writing exam={resp.responseData} examId={params.id}/>
        </div>
    )
}
export default WritingTestPage
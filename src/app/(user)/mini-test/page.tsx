import { getMiniTestList } from '@/api/exam/fetches';
import MiniTest from '@/components/mini-test';

const MiniTestPage = async () => {
	const miniTestsResp = await getMiniTestList();

	return (
		<div className="mt-[104px] 4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6  px-4 ">
      <MiniTest data={miniTestsResp.responseData}/>
    </div>
	)
}
export default MiniTestPage
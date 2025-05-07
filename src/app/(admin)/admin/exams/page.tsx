import { getExams } from "@/api/admin/fetches";
import Exams from "@/components/exams";

const ExamPage = async () => {
    const resp = await getExams();
    return (
        <>
            <Exams exams={resp?.exams} />
        </>
    );
};

export default ExamPage;
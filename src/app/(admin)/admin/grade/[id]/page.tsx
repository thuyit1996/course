import { getUserInClass } from '@/api/admin/fetches';
import Students from '@/components/students';
const GradePage = async ({params}: {params: {id: string}}) => {
    const resp = await getUserInClass(params.id);
    return (
        <>
            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                   <Students users={resp.users ?? []} total={resp.total}/>
                </div>
            </main>
        </>
    );
};

export default GradePage;
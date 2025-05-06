import { getUserInClass } from '@/api/admin/fetches';
import Students from '@/components/students';
import Button from '@/components/ui/button/Button';
import PlusIcon from '@/public/images/icons/plus.svg';
import dynamic from 'next/dynamic';
const GradePage: React.FC = async ({params}: {params: {id: string}}) => {
    const resp = await getUserInClass(params.id);
    console.log(resp);
    return (
        <>
            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Teacher list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>100 teachers</div>
                        </div>
                        <Button variant='primary' startIcon={<PlusIcon className="fill-rose-600" />}>Add teacher</Button>
                    </div>
                    <div className=''>
                        <Students users={resp.users ?? []}/>
                    </div>
                </div>
            </main>
        </>
    );
};

export default GradePage;
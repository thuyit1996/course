import Verification from '@/components/verification';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const OTPVerification: React.FC = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
    return (
        <div className="min-h-screen bg-white">
            <div className="4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4 py-10">
                <img src="/images/logo/logo-main.svg" alt="logo" className="h-10" />

                <div className="flex items-center justify-center mt-[170px]">
                    <Verification />
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
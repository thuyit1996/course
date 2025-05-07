import { redirect } from "next/navigation";
import SignInForm from "@/components/signin-form";
import { getServerSession } from "next-auth";
// {
//   "email": "25p000008@gmail.com",
//   "password": "P01012000@" 
// }
const SignInPage = async ({
  searchParams,
}: { searchParams: {callbackUrl: string}}) => {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div >
      <div className="flex flex-col items-center justify-center md:flex-row w-full mx-auto h-[100vh] max-w-[1440px] overflow-hidden">
        {/* Left image */}
        <div className="md:w-1/2 p-4 md:p-6 flex justify-center w-full relative" data-aos="zoom-in">
          <img src="/images/auth/Image.png" />
        </div>
        <div className="md:w-1/2 w-full p-8 flex flex-col md:mt-[80px]" ata-aos="fade-left">
          <div className="mb-6 md:mr-[120px] xl:mr-[134px] text-center md:text-left" data-aos="fade-down">
            <img src="/images/logo/logo-main.svg" alt="Logo"
              className="h-10 mx-auto md:mx-0 mb-4" />

            <h2 className="text-2xl font-bold mt-10 lg:mt-15 xl:text-[48px] xl:leading-[60px] text-[#2c2c2c]">
              Welcome to<br />
              <span className="">Your Workspace 🌟</span>
            </h2>
            <p className="mt-3 text-lg text-[#757575]">
              Log in to start fresh or pick up where you left off.
            </p>
          </div>
          <SignInForm callbackUrl={searchParams?.callbackUrl ?? ''} />
          <div className="text-center mt-4 text-base" data-aos="fade">
            <span className="text-[#757575]">{`Don't have an account?`}</span>
            <a href="#" className="text-rose-600 font-medium hover:underline ml-2"> Sign Up</a>
          </div>

        </div>

      </div>

    </div>
  )
}
export default SignInPage;
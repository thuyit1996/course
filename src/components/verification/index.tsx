'use client';
import { verifyUser } from "@/api/admin/fetches";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useTransition } from "react";
import Button from "../ui/button/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { getSession, signIn } from "next-auth/react";
import { decryptAES } from "@/libs/helper";
import SpinnerIcon from '@/public/images/icons/spinner.svg';

const Verification = () => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const [fullName, setFullName] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };
    console.log(searchParams.get('email'));
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        try {
            startTransition(async () => {
                const resp = await verifyUser({ email: searchParams.get('email'), otp: code })
                if (resp.responseData) {
                    setIsSuccess(true);
                    toast.success("Verify otp successfully");
                    setFullName(searchParams.get('email') as string);
                    // const resp = await signIn('credentials', {
                    //     redirect: false,
                    //     identifier: searchParams.get('email'),
                    //     password: decryptAES(searchParams.get('password') as string),
                    // });
                    // console.log(resp, 3232);
                    // if (resp?.ok) {
                    //     const session = await getSession();
                    //     setFullName(session?.user?.displayName as string);
                    // } else {
                    //     toast.error(`Invalid login credentials.`);
                    // }
                }else {
                    toast.error("This account has already been verified or OTP has already been completed.")
                }
            })
        } catch (error) {
            console.error('error');
        }
    };

    const setRef = (i: number) => (el: HTMLInputElement | null) => {
        inputs.current[i] = el;
    };
    return (
        <div className={`w-full 2xl:min-w-[614px] ${!isSuccess ? 'max-w-[614px]' : 'max-w-[700px]'} px-12`}>
            <div className="text-center">
                {!isSuccess ?
                    <form onSubmit={handleVerify}>
                        <h1 className="text-4xl font-bold mb-3 text-[#2c2c2c]">OTP Verification</h1>
                        <p className="mb-10 text-lg text-[#757575]">
                            Enter the 4 digit code we sent you via email to continue.
                        </p>

                        <div className="flex justify-center gap-4 2xl:gap-10 mb-6 2xl:mb-15">
                            {otp.map((digit, i) => (
                                <div key={i} className="relative w-14 h-14 2xl:w-[100px] 2xl:h-[100px] flex items-center justify-center">
                                    <input
                                        ref={setRef(i)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        className="w-full h-full text-2xl text-center border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                                    />
                                    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#757575]" />
                                </div>
                            ))}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-rose-100 text-rose-600 font-semibold text-lg py-2.5 rounded-lg hover:bg-rose-200 transition"
                            startIcon={isPending ? <SpinnerIcon /> : null}
                        >
                            Verify
                        </Button>

                        <p className="mt-4 text-base text-[#757575]">
                            Didn't receive the code?{' '}
                            <a href="#" className="text-rose-600 font-medium hover:underline">
                                Try Again
                            </a>
                        </p>
                    </form> : <>
                        <h1 className="text-4xl mb-6 text-[#2c2c2c] font-bold">Welcome aboard, {fullName} 🎉</h1>
                        <p className="text-3xl text-[#2c2c2c] font-medium mb-15">Your account has been successfully verified.<br />Let’s begin your journey with us!</p>
                        <Link href={'/sign-in'}><Button variant="primary">Get Started</Button></Link>
                    </>
                }
            </div>
        </div>
    )
}
export default Verification
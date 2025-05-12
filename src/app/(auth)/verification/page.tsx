'use client';
import React, { useRef, useState } from 'react';

const OTPVerification: React.FC = () => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState(['', '', '', '']);

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

    const handleVerify = () => {
        const code = otp.join('');
        alert(`Entered OTP: ${code}`);
    };

    const setRef = (i: number) => (el: HTMLInputElement | null) => {
        inputs.current[i] = el;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="4xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 gap-6 px-4 py-10">
                <img src="/images/logo/logo-main.svg" alt="logo" className="h-10" />

                <div className="flex items-center justify-center mt-[170px]">
                    <div className="w-full 2xl:min-w-[614px] max-w-[614px] px-12">
                        <div className="text-center">
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

                            <button
                                onClick={handleVerify}
                                className="w-full bg-rose-100 text-rose-600 font-semibold text-lg py-2.5 rounded-lg hover:bg-rose-200 transition"
                            >
                                Verify
                            </button>

                            <p className="mt-4 text-base text-[#757575]">
                                Didn't receive the code?{' '}
                                <a href="#" className="text-rose-600 font-medium hover:underline">
                                    Try Again
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
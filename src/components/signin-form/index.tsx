'use client';

import { useState, useTransition } from "react";
import Input from "../form/input/InputField"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { toast } from "react-toastify";

const SignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        if (e.target.value && !e.target.value.includes("@")) {
            setEmail(e.target.value + "@gmail.com");
        }
    };

    const onLogin = async () => {
        try {
            startTransition(async () => {
                const resp = await signIn('credentials', {
                    redirect: false,
                    identifier: email,
                    password: password,
                });
                if (!resp?.error) {
                    router.push(callbackUrl);
                    router.refresh();
                } else {
                    toast.error(`Invalid login credentials.`);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="mt-6 lg:mt-10">
            <div className="mb-6">
                <label className="block text-base mb-2 text-[#2c2c2c]">Email</label>
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="@example.com"
                    className="w-full border border-gray-200 rounded-md text-[#FDFDFD]"
                />
            </div>
            <div>
                <label className="block text-base mb-2 text-[#2c2c2c]">Password</label>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-200 rounded-md "
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                        {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                    </button>
                </div>
                <div className="text-right mt-2.5">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">Forgot Password?</a>
                </div>
            </div>

            {/* <button
          className="w-full bg-primary mt-6 text-lg border-rose-50 font-semibold xl:mt-10 hover:text-white hover:bg-rose-700 text-rose-600 py-2.5 rounded-lg border border- bg-rose-100 transition-all duration-300 transform hover:scale-105"
        >
          Log In
        </button> */}
            <button
                type="submit"
                disabled={isPending || !(email && password)}
                className={`w-full mt-6 text-lg font-semibold xl:mt-10 py-2.5 rounded-lg border transition-all duration-300 transform
    ${isPending
                        ? "bg-rose-300 cursor-not-allowed text-white"
                        : "bg-rose-100 text-rose-600 hover:bg-rose-700 hover:text-white hover:scale-105"
                    } flex items-center justify-center gap-1`
                }
                onClick={onLogin}
            >
                {isPending ? (
                    <div className="flex items-center gap-1">
                        Logging in
                        <span className="dot-animation">.</span>
                        <span className="dot-animation" style={{ animationDelay: "0.2s" }}>.</span>
                        <span className="dot-animation" style={{ animationDelay: "0.4s" }}>.</span>
                    </div>
                ) : (
                    "Log In"
                )}
            </button>

        </form>
    )
}
export default SignInForm
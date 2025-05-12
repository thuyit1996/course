import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/images/auth/auth-bg.png')" }}
            ></div>
            {children}
            <div
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/images/auth/auth-bg-2.png')" }}
            ></div>
        </div>
    )
}
export default AuthLayout
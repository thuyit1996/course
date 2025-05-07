// app/components/TokenGuard.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/api/auth/fetches';

export default function TokenGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            if (status === 'loading') return;
            if(session){
                try {
                    const resp = await validateToken();
                    if (!resp.responseData) {
                        await signOut({
                            callbackUrl: '/sign-in'
                        });
                    } else {
                        console.log("ok")
                    }
                } catch (error) {
                    await signOut({
                        callbackUrl: '/sign-in'
                    });
                }
            }
        };
        checkToken();
    }, [session]);

    return <>{children}</>;
}

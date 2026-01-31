'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            const isLoginPage = pathname === '/login';

            if (!isLoggedIn && !isLoginPage) {
                setIsAuthorized(false);
                router.replace('/login');
            } else if (isLoggedIn && isLoginPage) {
                router.replace('/');
            } else {
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (!isAuthorized && pathname !== '/login') {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                color: '#64748b',
                fontFamily: 'system-ui'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loader"></div>
                    <p style={{ marginTop: '1rem', fontWeight: 600 }}>Authenticating Doctor Session...</p>
                </div>
                <style jsx>{`
                    .loader {
                        border: 3px solid #e2e8f0;
                        border-top: 3px solid #3b82f6;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        animation: spin 0.8s linear infinite;
                        margin: 0 auto;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}

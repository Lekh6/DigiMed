'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import {
    Stethoscope,
    Lock,
    Mail,
    ArrowRight,
    ShieldCheck,
    Activity,
    Loader2,
    User
} from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock Login Logic
        setTimeout(() => {
            if (email === 'doctor@digimed.health' && password === 'admin123') {
                localStorage.setItem('isLoggedIn', 'true');
                router.push('/');
            } else {
                setError('Invalid clinical credentials. Use demo account.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.glassBackground}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
            </div>

            <main className={styles.loginCard}>
                <div className={styles.branding}>
                    <div className={styles.logoIcon}>
                        <Stethoscope size={32} color="white" />
                    </div>
                    <h1>DigiMed <span className={styles.portal}>Portal</span></h1>
                    <p>Clinical Intelligence & Patient Records (Demo Access)</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Doctor Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.fieldIcon} size={18} />
                            <input
                                type="email"
                                placeholder="doctor@digimed.health"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Security Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.fieldIcon} size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className={styles.errorMsg}>{error}</p>}

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className={styles.spin} size={20} />
                        ) : (
                            <>
                                <span>Access Dashboard</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <footer className={styles.footer}>
                    <div className={styles.demoHint}>
                        <p>Demo Credentials:</p>
                        <code>doctor@digimed.health / admin123</code>
                    </div>

                    <div className={styles.secureLine}>
                        <ShieldCheck size={14} />
                        <span>HIPAA Compliant & End-to-End Encrypted</span>
                    </div>
                </footer>
            </main>
            ...
            <div className={styles.sideInfo}>
                <div className={styles.insightCard}>
                    <Activity size={24} className={styles.insightIcon} />
                    <h3>AI Diagnostic Support</h3>
                    <p>Unlock advanced OCR extraction and trend analysis for your patients.</p>
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            className={styles.toggleBtn}
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <div className={`${styles.iconContainer} ${isDark ? styles.isDark : ''}`}>
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </div>
        </button>
    );
}

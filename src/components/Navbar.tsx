'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  LogOut,
  PlusCircle,
  User
} from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Search, label: 'Records', href: '/records' },
  { icon: PlusCircle, label: 'Upload Report', href: '/upload' },
  { icon: User, label: 'Doctor Profile', href: '/settings' },
];

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.plus}>+</div>
            </div>
            <span className={styles.logoText}>DigiMed</span>
          </Link>

          <div className={styles.navLinks}>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.rightSection}>
          <ThemeToggle />
          <button
            className={styles.logoutBtn}
            title="Logout"
            onClick={handleLogout}
          >
            <span className={styles.logoutText}>Logout</span>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  BarChart2, 
  Settings, 
  LogOut,
  PlusCircle,
  Database
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Search, label: 'Search Records', href: '/records' },
  { icon: BarChart2, label: 'Trend Analysis', href: '/analytics' },
  { icon: Database, label: 'Secure Storage', href: '/storage' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <div className={styles.plus}>+</div>
        </div>
        <span className={styles.logoText}>DigiMed</span>
      </div>

      <div className={styles.uploadSection}>
        <Link href="/upload" className={styles.uploadBtn}>
          <PlusCircle size={20} />
          <span>Upload Report</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>DR</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Dr. Roberts</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>
        <button className={styles.logoutBtn}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

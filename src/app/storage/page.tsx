'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { Shield, Lock, HardDrive, File, Search, MoreHorizontal } from 'lucide-react';

const storedFiles = [
    { name: 'Report_XP203.pdf', size: '2.4 MB', date: '2024-01-31', encryption: 'AES-256', status: 'Secure' },
    { name: 'BloodWork_JohnDoe.pdf', size: '1.1 MB', date: '2024-01-31', encryption: 'AES-256', status: 'Secure' },
    { name: 'MRI_Scan_Final.zip', size: '124.5 MB', date: '2024-01-30', encryption: 'AES-256', status: 'Secure' },
    { name: 'PatientConsent_A9.pdf', size: '450 KB', date: '2024-01-29', encryption: 'AES-256', status: 'Secure' },
    { name: 'LabResults_Jan.xlsx', size: '1.8 MB', date: '2024-01-28', encryption: 'AES-256', status: 'Secure' },
];

export default function StoragePage() {
    return (
        <div className="dashboard-grid">
            <Navbar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Secure Data Storage</h1>
                    <p className={styles.subtitle}>HIPAA-compliant encrypted storage for all medical assets.</p>
                </header>

                <section className={styles.storageOverview}>
                    <div className={`glass ${styles.overviewCard}`}>
                        <HardDrive size={32} className={styles.cardIcon} />
                        <div>
                            <h3>Storage Usage</h3>
                            <p>124.5 GB of 1.0 TB used</p>
                            <div className={styles.usageBar}>
                                <div className={styles.usageFill} style={{ width: '12%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`glass ${styles.overviewCard}`}>
                        <Shield size={32} className={styles.cardIcon} style={{ color: 'var(--success)' }} />
                        <div>
                            <h3>Security Status</h3>
                            <p>All files encrypted (AES-256)</p>
                            <span className={styles.statusBadge}>Compliant</span>
                        </div>
                    </div>
                    <div className={`glass ${styles.overviewCard}`}>
                        <Lock size={32} className={styles.cardIcon} style={{ color: 'var(--primary)' }} />
                        <div>
                            <h3>Access Control</h3>
                            <p>Multi-factor authentication active</p>
                            <button className={styles.manageBtn}>Manage Keys</button>
                        </div>
                    </div>
                </section>

                <section className={`glass ${styles.fileTableContainer}`}>
                    <div className={styles.tableHeader}>
                        <h2>Recent Files</h2>
                        <div className={styles.searchBox}>
                            <Search size={18} />
                            <input type="text" placeholder="Search files..." />
                        </div>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Size</th>
                                <th>Date Modified</th>
                                <th>Encryption</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedFiles.map((file, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <File size={20} className={styles.fileIcon} />
                                            <span className={styles.fileName}>{file.name}</span>
                                        </div>
                                    </td>
                                    <td>{file.size}</td>
                                    <td>{file.date}</td>
                                    <td>
                                        <span className={styles.encryptionTag}>{file.encryption}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <div className={styles.secureDot}></div>
                                            <span className={styles.statusText}>{file.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button className={styles.moreBtn}><MoreHorizontal size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

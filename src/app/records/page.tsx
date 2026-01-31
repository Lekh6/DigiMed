'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';
import { Search, Filter, MoreVertical, FileText, ChevronRight } from 'lucide-react';

const patients = [
    { id: '1', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-01-31', reports: 12 },
    { id: '2', name: 'Sarah Jenkins', age: 32, gender: 'Female', lastVisit: '2024-01-30', reports: 8 },
    { id: '3', name: 'Michael Chen', age: 58, gender: 'Male', lastVisit: '2024-01-25', reports: 15 },
    { id: '4', name: 'Emma Wilson', age: 29, gender: 'Female', lastVisit: '2024-01-15', reports: 5 },
    { id: '5', name: 'Robert Taylor', age: 52, gender: 'Male', lastVisit: '2024-01-10', reports: 22 },
    { id: '6', name: 'Lisa Anderson', age: 41, gender: 'Female', lastVisit: '2024-01-05', reports: 9 },
];

export default function RecordsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-grid">
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Patient Records</h1>
                    <p className={styles.subtitle}>Manage and search through centralized patient medical history.</p>
                </header>

                <section className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or condition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className={styles.filterBtn}>
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </section>

                <section className={styles.patientGrid}>
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className={`glass ${styles.patientCard}`}>
                            <div className={styles.patientAvatar}>{patient.name.split(' ').map(n => n[0]).join('')}</div>
                            <div className={styles.patientInfo}>
                                <div className="flex justify-between items-start">
                                    <h3>{patient.name}</h3>
                                    <button className={styles.moreBtn}><MoreVertical size={18} /></button>
                                </div>
                                <p className={styles.patientMeta}>{patient.age} yrs • {patient.gender}</p>

                                <div className={styles.patientStats}>
                                    <div className={styles.statLine}>
                                        <span className={styles.statLabel}>Last Visit:</span>
                                        <span className={styles.statValue}>{patient.lastVisit}</span>
                                    </div>
                                    <div className={styles.statLine}>
                                        <span className={styles.statLabel}>Total Reports:</span>
                                        <span className={styles.statValue}>{patient.reports}</span>
                                    </div>
                                </div>

                                <div className={styles.patientActions}>
                                    <button className={styles.viewRecordsBtn}>
                                        <FileText size={16} />
                                        <span>View History</span>
                                        <ChevronRight size={16} className={styles.chevron} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

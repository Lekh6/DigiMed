'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
import { Search, Filter, MoreVertical, FileText, ChevronRight, Check } from 'lucide-react';

const patients = [
    { id: 'P-10023', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-01-31', reports: 12, primaryReport: 'Cardiac Assessment' },
    { id: 'P-10245', name: 'Sarah Jenkins', age: 32, gender: 'Female', lastVisit: '2024-01-30', reports: 8, primaryReport: 'Full Blood Work' },
    { id: 'P-10567', name: 'Michael Chen', age: 58, gender: 'Male', lastVisit: '2024-01-25', reports: 15, primaryReport: 'MRI Neuro Scan' },
    { id: 'P-10892', name: 'Emma Wilson', age: 29, gender: 'Female', lastVisit: '2024-01-15', reports: 5, primaryReport: 'Thyroid Profile' },
    { id: 'P-11034', name: 'Robert Taylor', age: 52, gender: 'Male', lastVisit: '2024-01-10', reports: 22, primaryReport: 'Chest X-Ray' },
    { id: 'P-11321', name: 'Lisa Anderson', age: 41, gender: 'Female', lastVisit: '2024-01-05', reports: 9, primaryReport: 'Urinalysis' },
];

export default function RecordsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<'All' | 'Male' | 'Female'>('All');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredPatients = patients.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.primaryReport.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.lastVisit.includes(searchTerm);

        const matchesFilter = activeFilter === 'All' || p.gender === activeFilter;

        return matchesSearch && matchesFilter;
    });

    const handleFilterSelect = (filter: 'All' | 'Male' | 'Female') => {
        setActiveFilter(filter);
        setShowDropdown(false);
    };

    return (
        <div className="dashboard-grid">
            <Navbar />
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

                    <div className={styles.filterWrapper} ref={dropdownRef}>
                        <button
                            className={`${styles.filterBtn} ${activeFilter !== 'All' ? styles.filterActive : ''} ${showDropdown ? styles.filterOpen : ''}`}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <Filter size={18} />
                            <span>Filter: {activeFilter}</span>
                        </button>

                        {showDropdown && (
                            <div className={`glass ${styles.filterDropdown}`}>
                                <div className={styles.dropdownHeader}>Filter by Gender</div>
                                <button
                                    className={`${styles.dropdownItem} ${activeFilter === 'All' ? styles.itemActive : ''}`}
                                    onClick={() => handleFilterSelect('All')}
                                >
                                    <span>All Patients</span>
                                    {activeFilter === 'All' && <Check size={16} />}
                                </button>
                                <button
                                    className={`${styles.dropdownItem} ${activeFilter === 'Male' ? styles.itemActive : ''}`}
                                    onClick={() => handleFilterSelect('Male')}
                                >
                                    <span>Male Patients</span>
                                    {activeFilter === 'Male' && <Check size={16} />}
                                </button>
                                <button
                                    className={`${styles.dropdownItem} ${activeFilter === 'Female' ? styles.itemActive : ''}`}
                                    onClick={() => handleFilterSelect('Female')}
                                >
                                    <span>Female Patients</span>
                                    {activeFilter === 'Female' && <Check size={16} />}
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                <section className={styles.patientGrid}>
                    {filteredPatients.map((patient) => (
                        <Link key={patient.id} href={`/records/${patient.id}`} className={`glass ${styles.patientCard}`}>
                            <div className={styles.patientAvatar}>{patient.name.split(' ').map(n => n[0]).join('')}</div>
                            <div className={styles.patientInfo}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3>{patient.name}</h3>
                                        <span className={styles.patientId}>ID: {patient.id} • {patient.primaryReport}</span>
                                    </div>
                                    <ChevronRight size={18} className={styles.chevronIcon} />
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

                                <div className={styles.viewLabel}>
                                    <span>Open Medical History</span>
                                    <div className={styles.arrowBox}>
                                        <FileText size={14} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}

'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';
import { TrendingUp, Activity, Filter, Download } from 'lucide-react';

const glucoseData = [
    { date: 'Jan 1', value: 95 },
    { date: 'Jan 5', value: 102 },
    { date: 'Jan 10', value: 88 },
    { date: 'Jan 15', value: 92 },
    { date: 'Jan 20', value: 110 },
    { date: 'Jan 25', value: 85 },
    { date: 'Jan 31', value: 96 },
];

const cholesterolData = [
    { name: 'Total', value: 185 },
    { name: 'LDL', value: 110 },
    { name: 'HDL', value: 55 },
    { name: 'Trigly', value: 120 },
];

export default function AnalyticsPage() {
    return (
        <div className="dashboard-grid">
            <Navbar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <h1>Trend Analysis</h1>
                            <p className={styles.subtitle}>Longitudinal health data visualization for patient: John Doe</p>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.filterBtn}>
                                <Filter size={18} />
                                <span>Filters</span>
                            </button>
                            <button className={styles.downloadBtn}>
                                <Download size={18} />
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>
                </header>

                <section className={styles.chartsGrid}>
                    <div className={`glass ${styles.chartCard} ${styles.fullWidth}`}>
                        <div className={styles.chartHeader}>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={20} className={styles.chartIcon} />
                                <h3>Glucose Levels Over Time (mg/dL)</h3>
                            </div>
                            <span className={styles.trendInfo}>-2% vs last month</span>
                        </div>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={glucoseData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={`glass ${styles.chartCard}`}>
                        <div className={styles.chartHeader}>
                            <div className="flex items-center gap-2">
                                <Activity size={20} className={styles.chartIcon} />
                                <h3>Cholesterol Profile</h3>
                            </div>
                        </div>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={cholesterolData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={`glass ${styles.chartCard}`}>
                        <div className={styles.chartHeader}>
                            <h3>Parameter Distribution</h3>
                        </div>
                        <div className={styles.distributionList}>
                            <div className={styles.distItem}>
                                <div className="flex justify-between mb-2">
                                    <span>Hemoglobin</span>
                                    <span className="font-bold">14.2/16.0</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '88%', background: '#10b981' }}></div>
                                </div>
                            </div>
                            <div className={styles.distItem}>
                                <div className="flex justify-between mb-2">
                                    <span>Vitamin D</span>
                                    <span className="font-bold">24.0/30.0</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '60%', background: '#f59e0b' }}></div>
                                </div>
                            </div>
                            <div className={styles.distItem}>
                                <div className="flex justify-between mb-2">
                                    <span>Calcium</span>
                                    <span className="font-bold">9.5/10.5</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '90%', background: '#10b981' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

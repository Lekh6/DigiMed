'use client';

import React, { use, useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
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
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    TrendingUp,
    Activity,
    ArrowLeft,
    Download,
    FileText,
    ShieldCheck,
    AlertCircle,
    Heart,
    Scale,
    Stethoscope,
    Clipboard,
    Plus,
    Thermometer,
    Droplets
} from 'lucide-react';

// Enhanced Mock data for patients
const patientsData: Record<string, any> = {
    '1': {
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        id: 'P-10023',
        bloodType: 'A+',
        condition: 'Type 2 Diabetes, Hypertension',
        notes: 'Patient shows consistent improvement in glucose management. Recommended to continue current diet and light aerobic exercise. Monitor BP weekly.',
        bloodPicture: [
            { test: 'Hemoglobin', result: '14.2 g/dL', range: '13.5-17.5', status: 'Normal' },
            { test: 'WBC Count', result: '6,200 /µL', range: '4,500-11,000', status: 'Normal' },
            { test: 'Platelets', result: '245,000 /µL', range: '150k-450k', status: 'Normal' },
            { test: 'RBC Count', result: '4.8 M/µL', range: '4.7-6.1', status: 'Normal' },
        ],
        glucoseData: [
            { date: 'Jan 1', value: 95 },
            { date: 'Jan 5', value: 102 },
            { date: 'Jan 10', value: 88 },
            { date: 'Jan 15', value: 92 },
            { date: 'Jan 20', value: 110 },
            { date: 'Jan 25', value: 85 },
            { date: 'Jan 31', value: 96 },
        ],
        bpmData: [
            { week: 'Week 1', rate: 72 },
            { week: 'Week 2', rate: 78 },
            { week: 'Week 3', rate: 85 },
            { week: 'Week 4', rate: 74 },
            { week: 'Week 5', rate: 68 },
        ],
        weightData: [
            { month: 'Aug', kg: 88 },
            { month: 'Sep', kg: 87.2 },
            { month: 'Oct', kg: 86.5 },
            { month: 'Nov', kg: 85.8 },
            { month: 'Dec', kg: 85.2 },
            { month: 'Jan', kg: 84.5 },
        ],
        cholesterolData: [
            { name: 'Total', value: 185 },
            { name: 'LDL', value: 110 },
            { name: 'HDL', value: 55 },
            { name: 'Trigly', value: 120 },
        ]
    },
    '2': {
        name: 'Sarah Jenkins',
        age: 32,
        gender: 'Female',
        id: 'P-10024',
        bloodType: 'O-',
        condition: 'Iron Deficiency Anemia',
        notes: 'Starting oral iron supplements. Re-test hemoglobin in 4 weeks. Patient reports slight fatigue during morning hours.',
        bloodPicture: [
            { test: 'Hemoglobin', result: '10.5 g/dL', range: '12.0-15.5', status: 'Low' },
            { test: 'Serum Iron', result: '45 µg/dL', range: '60-170', status: 'Low' },
            { test: 'Ferritin', result: '15 ng/mL', range: '10-150', status: 'Borderline' },
            { test: 'MCV', result: '78 fL', range: '80-100', status: 'Low' },
        ],
        glucoseData: [
            { date: 'Jan 1', value: 110 },
            { date: 'Jan 31', value: 125 },
        ],
        bpmData: [
            { week: 'Week 1', rate: 65 },
            { week: 'Week 2', rate: 70 },
        ],
        weightData: [
            { month: 'Dec', kg: 62 },
            { month: 'Jan', kg: 61.5 },
        ],
        cholesterolData: [
            { name: 'Total', value: 210 },
            { name: 'LDL', value: 135 },
            { name: 'HDL', value: 45 },
            { name: 'Trigly', value: 150 },
        ]
    }
};

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

export default function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const patientId = resolvedParams.id;
    const patient = patientsData[patientId] || patientsData['1']; // Default to 1 if not found for mock

    return (
        <div className="dashboard-grid">
            <Navbar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <Link href="/records" className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        <span>Back to Central Registry</span>
                    </Link>

                    <div className={styles.profileHero}>
                        <div className={styles.heroLeft}>
                            <div className={styles.avatarLarge}>
                                {patient.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className={styles.basicInfo}>
                                <div className="flex items-center gap-3">
                                    <h1>{patient.name}</h1>
                                    <span className={styles.statusBadgeActive}>Verified Profile</span>
                                </div>
                                <p className={styles.metaText}>
                                    ID: <strong>{patient.id}</strong> • {patient.gender}, {patient.age} yrs • Blood: <span className={styles.bloodType}>{patient.bloodType}</span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.heroActions}>
                            <button className={styles.btnSecondary} onClick={() => window.print()}>
                                <Download size={18} /> Download Dossier
                            </button>
                            <Link href={`/upload?id=${patient.id}`} className={styles.btnPrimary}>
                                <Plus size={18} /> Add Medical Report
                            </Link>
                        </div>
                    </div>
                </header>

                <div className={styles.contentLayout}>
                    <div className={styles.leftColumn}>
                        {/* Quick Stats Grid */}
                        <section className={styles.vitalsSection}>
                            <div className={`glass ${styles.vitalCard}`}>
                                <Droplets className={styles.vitalIcon} color="#ef4444" />
                                <div className={styles.vitalContent}>
                                    <label>Blood Type</label>
                                    <span>{patient.bloodType}</span>
                                </div>
                            </div>
                            <div className={`glass ${styles.vitalCard}`}>
                                <Activity className={styles.vitalIcon} color="#3b82f6" />
                                <div className={styles.vitalContent}>
                                    <label>Average Glucose</label>
                                    <span>{Math.round(patient.glucoseData.reduce((acc: number, curr: any) => acc + curr.value, 0) / patient.glucoseData.length)} <small>mg/dL</small></span>
                                </div>
                            </div>
                            <div className={`glass ${styles.vitalCard}`}>
                                <Heart className={`${styles.vitalIcon} ${styles.heartBeat}`} color="#ef4444" />
                                <div className={styles.vitalContent}>
                                    <label>Heart Rate</label>
                                    <span className={styles.bpmValue}>{patient.bpmData[patient.bpmData.length - 1].rate} <small>BPM</small></span>
                                </div>
                            </div>
                            <div className={`glass ${styles.vitalCard}`}>
                                <Scale className={styles.vitalIcon} color="#8b5cf6" />
                                <div className={styles.vitalContent}>
                                    <label>Body Weight</label>
                                    <span>{patient.weightData[patient.weightData.length - 1].kg} <small>kg</small></span>
                                </div>
                            </div>
                        </section>

                        {/* Charts Grid */}
                        <section className={styles.trendsGrid}>
                            {/* Glucose Area Chart */}
                            <div className={`glass ${styles.chartBox}`}>
                                <div className={styles.boxHeader}>
                                    <TrendingUp size={20} color="var(--primary)" />
                                    <h3>Glucose Concentration Trend</h3>
                                </div>
                                <div className={styles.chartArea}>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <AreaChart data={patient.glucoseData}>
                                            <defs>
                                                <linearGradient id="colorGluc" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGluc)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* BPM Bar Chart */}
                            <div className={`glass ${styles.chartBox}`}>
                                <div className={styles.boxHeader}>
                                    <Heart size={20} color="#ef4444" />
                                    <h3>Heart Rate Trend (BPM)</h3>
                                </div>
                                <div className={styles.chartArea}>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <LineChart data={patient.bpmData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <YAxis domain={['dataMin - 10', 'dataMax + 10']} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="rate"
                                                stroke="#ef4444"
                                                strokeWidth={3}
                                                dot={{ fill: '#ef4444', r: 4 }}
                                                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                                                className={styles.ecgLine}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Weight Line Chart */}
                            <div className={`glass ${styles.chartBox}`}>
                                <div className={styles.boxHeader}>
                                    <Scale size={20} color="#8b5cf6" />
                                    <h3>Weight Management Trend</h3>
                                </div>
                                <div className={styles.chartArea}>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <LineChart data={patient.weightData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                                            <Tooltip />
                                            <Line type="step" dataKey="kg" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Cholesterol Profile Pie Chart */}
                            <div className={`glass ${styles.chartBox}`}>
                                <div className={styles.boxHeader}>
                                    <Droplets size={20} color="#06b6d4" />
                                    <h3>Cholesterol Distribution</h3>
                                </div>
                                <div className={styles.chartArea}>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <PieChart>
                                            <Pie
                                                data={patient.cholesterolData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {patient.cholesterolData.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className={styles.pieLegend}>
                                        {patient.cholesterolData.map((item: any, i: number) => (
                                            <div key={i} className={styles.legendItem}>
                                                <div className={styles.dot} style={{ backgroundColor: COLORS[i] }}></div>
                                                <span>{item.name}: {item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className={styles.rightColumn}>
                        {/* Blood Picture Table */}
                        <div className={`glass ${styles.sideBox}`}>
                            <div className={styles.boxHeader}>
                                <Droplets size={20} color="#ef4444" />
                                <h3>Recent Blood Picture</h3>
                            </div>
                            <div className={styles.bloodTableWrapper}>
                                <table className={styles.bloodTable}>
                                    <thead>
                                        <tr>
                                            <th>Test Name</th>
                                            <th>Result</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patient.bloodPicture.map((row: any, i: number) => (
                                            <tr key={i}>
                                                <td>{row.test} <br /><small>{row.range}</small></td>
                                                <td>{row.result}</td>
                                                <td>
                                                    <span className={`${styles.statusDot} ${styles[row.status.toLowerCase()]}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Disease Report & Condition */}
                        <div className={`glass ${styles.sideBox}`}>
                            <div className={styles.boxHeader}>
                                <Stethoscope size={20} color="var(--primary)" />
                                <h3>Clinical Analysis</h3>
                            </div>
                            <div className={styles.reportContent}>
                                <div className={styles.conditionTag}>
                                    <AlertCircle size={16} />
                                    <span>Primary Diagnosis:</span>
                                    <strong>{patient.condition}</strong>
                                </div>
                                <div className={styles.notesSection}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clipboard size={16} />
                                        <h4>Consultation Notes</h4>
                                    </div>
                                    <textarea
                                        className={styles.notesArea}
                                        defaultValue={patient.notes}
                                        placeholder="Add clinical observations..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

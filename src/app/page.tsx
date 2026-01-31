'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';
import {
  Users,
  FileCheck,
  Clock,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ClipboardList,
  Bell,
  Plus,
  Search,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock3,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const activityData = [
  { day: 'Mon', reports: 42, patients: 28 },
  { day: 'Tue', reports: 58, patients: 35 },
  { day: 'Wed', reports: 45, patients: 30 },
  { day: 'Thu', reports: 62, patients: 40 },
  { day: 'Fri', reports: 75, patients: 48 },
  { day: 'Sat', reports: 30, patients: 15 },
  { day: 'Sun', reports: 20, patients: 10 },
];

const demographicData = [
  { name: 'Adults', value: 400, color: 'var(--primary)' },
  { name: 'Seniors', value: 300, color: 'var(--accent)' },
  { name: 'Pediatrics', value: 200, color: '#8b5cf6' },
];

const alerts = [
  { id: 1, type: 'critical', title: 'Critical Glucose Level', patient: 'Michael Chen', time: '10m ago' },
  { id: 2, type: 'pending', title: 'New Lab Results', patient: 'Emma Wilson', time: '1h ago' },
];

const appointments = [
  { id: 1, time: '09:30 AM', patient: 'Robert Taylor', type: 'Follow-up' },
  { id: 2, time: '11:00 AM', patient: 'Lisa Anderson', type: 'Initial Consult' },
  { id: 3, time: '02:15 PM', patient: 'James Wilson', type: 'Surgeon Review' },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const stats = [
    { label: 'Total Patients', value: '1,284', icon: Users, color: '#3b82f6', change: '+12%', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Reports Analyzed', value: '4,521', icon: FileCheck, color: '#10b981', change: '+18%', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Pending Reviews', value: '12', icon: Clock, color: '#f59e0b', change: '-5%', bg: 'rgba(245, 158, 11, 0.1)' },
  ];

  const recentReports = [
    { id: 'P-10023', idShort: '1', patient: 'John Doe', type: 'Cardiac Assessment', date: '2024-01-31', status: 'Completed', entities: 12 },
    { id: 'P-10245', idShort: '2', patient: 'Sarah Jenkins', type: 'Full Blood Work', date: '2024-01-30', status: 'In Analysis', entities: 8 },
    { id: 'P-10567', idShort: '3', patient: 'Michael Chen', type: 'MRI Neuro Scan', date: '2024-01-30', status: 'Completed', entities: 15 },
    { id: 'P-10892', idShort: '4', patient: 'Emma Wilson', type: 'Thyroid Profile', date: '2024-01-29', status: 'Completed', entities: 10 },
  ];

  return (
    <div className="dashboard-grid">
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.welcomeSection}>
            <div className={styles.greeting}>
              <h1>{greeting}, Dr. Sarah Roberts</h1>
              <div className={styles.badge}>Surgeon • Cardiology</div>
            </div>
            <p className={styles.subtitle}>Here is your clinical overview for today.</p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.quickSearch}>
              <Search size={18} />
              <input type="text" placeholder="Search patient ID..." />
            </div>
            <div className={styles.dateDisplay}>
              {mounted ? new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '...'}
            </div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={`glass ${styles.statCard}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>
                  <stat.icon size={22} />
                </div>
                <div className={styles.statTrend} style={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                  {stat.change}
                </div>
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.label}</span>
                <h2 className={styles.statValue}>{stat.value}</h2>
              </div>
            </div>
          ))}
        </section>

        <div className={styles.topActions}>
          <Link href="/upload" className={styles.actionBtn}>
            <Plus size={20} />
            <span>New Report Analysis</span>
          </Link>
          <Link href="/records" className={styles.actionBtnSecondary}>
            <ClipboardList size={20} />
            <span>Patient Registry</span>
          </Link>
        </div>

        <div className={styles.dashboardLayout}>
          <div className={styles.leftColumn}>
            {/* Clinic Performance Chart */}
            <div className={`glass ${styles.performanceBox}`}>
              <div className={styles.sectionHeader}>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
                  <h2>Clinical Throughput (Weekly)</h2>
                </div>
                <div className={styles.chartLegend}>
                  <div className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--primary)' }}></span> Reports</div>
                  <div className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--accent)' }}></span> Patients</div>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                {mounted && (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--secondary)', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--secondary)', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }}
                      />
                      <Area type="monotone" dataKey="reports" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                      <Area type="monotone" dataKey="patients" stroke="var(--accent)" strokeWidth={3} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Recent Reports Table */}
            <div className={`glass ${styles.tableBox}`}>
              <div className={styles.sectionHeader}>
                <div className="flex items-center gap-2">
                  <ClipboardList size={20} style={{ color: 'var(--primary)' }} />
                  <h2>Queue for Review</h2>
                </div>
                <Link href="/records" className={styles.viewLink}>View All</Link>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Case / Analysis</th>
                      <th>Timeline</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports.map((report) => (
                      <tr key={report.id} onClick={() => window.location.href = `/records/${report.idShort}`}>
                        <td>
                          <div className={styles.patientCell}>
                            <div className={styles.avatar}>{report.patient.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                              <div className={styles.pName}>{report.patient}</div>
                              <div className={styles.pId}>{report.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.caseText}>{report.type}</div>
                          <div className={styles.entitiesFound}>{report.entities} insights found</div>
                        </td>
                        <td>{report.date}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[report.status.toLowerCase().replace(' ', '')]}`}>
                            {report.status}
                          </span>
                        </td>
                        <td><ArrowUpRight size={16} className={styles.rowIcon} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className={styles.rightColumn}>
            {/* Critical Alerts */}
            <div className={`glass ${styles.alertsBox}`}>
              <div className={styles.sectionHeader}>
                <div className="flex items-center gap-2">
                  <Bell size={18} style={{ color: '#ef4444' }} />
                  <h2>System Alerts</h2>
                </div>
                <div className={styles.alertCount}>3 New</div>
              </div>
              <div className={styles.alertsList}>
                {alerts.map((alert) => (
                  <div key={alert.id} className={styles.alertItem}>
                    <div className={`${styles.alertIcon} ${styles[alert.type]}`}>
                      {alert.type === 'critical' ? <AlertTriangle size={16} /> :
                        alert.type === 'success' ? <CheckCircle2 size={16} /> : <Activity size={16} />}
                    </div>
                    <div className={styles.alertContent}>
                      <div className={styles.alertTitle}>{alert.title}</div>
                      <div className={styles.alertMeta}>{alert.patient} • {alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Load (Pie Chart) */}
            <div className={`glass ${styles.sideBox}`}>
              <div className={styles.sectionHeader}>
                <div className="flex items-center gap-2">
                  <Activity size={18} style={{ color: 'var(--primary)' }} />
                  <h2>Demographics</h2>
                </div>
              </div>
              <div className={styles.chartArea}>
                {mounted && (
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={demographicData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className={styles.pieLegendSimple}>
                  {demographicData.map((item, i) => (
                    <div key={i} className={styles.legendItem}>
                      <span className={styles.dot} style={{ background: item.color }}></span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className={`glass ${styles.sideBox}`}>
              <div className={styles.sectionHeader}>
                <div className="flex items-center gap-2">
                  <Calendar size={18} style={{ color: 'var(--primary)' }} />
                  <h2>Today's Schedule</h2>
                </div>
                <div className={styles.viewLink}>See All</div>
              </div>
              <div className={styles.scheduleList}>
                {appointments.map((apt) => (
                  <div key={apt.id} className={styles.scheduleItem}>
                    <div className={styles.timeBox}>
                      <Clock3 size={12} />
                      {apt.time}
                    </div>
                    <div className={styles.aptInfo}>
                      <div className={styles.aptPatient}>{apt.patient}</div>
                      <div className={styles.aptType}>{apt.type}</div>
                    </div>
                    <ChevronRight size={14} className={styles.aptLink} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

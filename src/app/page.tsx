import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';
import {
  Users,
  FileCheck,
  Clock,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Total Patients', value: '1,284', icon: Users, color: '#3b82f6', change: '+12%' },
    { label: 'Reports Analyzed', value: '4,521', icon: FileCheck, color: '#10b981', change: '+18%' },
    { label: 'Pending Reviews', value: '12', icon: Clock, color: '#f59e0b', change: '-5%' },
    { label: 'Success Rate', value: '99.2%', icon: TrendingUp, color: '#06b6d4', change: '+0.4%' },
  ];

  const recentReports = [
    { id: '1', patient: 'John Doe', type: 'Blood Work', date: '2024-01-31', status: 'Completed', entities: 12 },
    { id: '2', patient: 'Sarah Jenkins', type: 'MRI Scan', date: '2024-01-30', status: 'In Analysis', entities: 8 },
    { id: '3', patient: 'Michael Chen', type: 'X-Ray Chest', date: '2024-01-30', status: 'Completed', entities: 15 },
    { id: '4', patient: 'Emma Wilson', type: 'Urine Analysis', date: '2024-01-29', status: 'Completed', entities: 10 },
  ];

  return (
    <div className="dashboard-grid">
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>Medical Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, Dr. Roberts. Here's what's happening today.</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={`glass ${styles.statCard}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <stat.icon size={24} />
                </div>
                <span className={stat.change.startsWith('+') ? styles.trendUp : styles.trendDown}>
                  {stat.change}
                </span>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>{stat.label}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={`glass ${styles.mainContent}`}>
            <div className={styles.sectionHeader}>
              <div className="flex items-center gap-2">
                <ClipboardList size={20} className={styles.sectionIcon} />
                <h2>Recent Medical Reports</h2>
              </div>
              <button className={styles.viewAll}>View All</button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Analysis Type</th>
                  <th>Date</th>
                  <th>Entities Found</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className={styles.patientName}>{report.patient}</div>
                    </td>
                    <td>{report.type}</td>
                    <td>{report.date}</td>
                    <td>{report.entities}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[report.status.replace(' ', '').toLowerCase()]}`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className={`glass ${styles.sidePanel}`}>
            <div className={styles.sectionHeader}>
              <div className="flex items-center gap-2">
                <Activity size={20} className={styles.sectionIcon} />
                <h2>AI Health Insights</h2>
              </div>
            </div>

            <div className={styles.insightsList}>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}><TrendingUp size={16} /></div>
                <div className={styles.insightText}>
                  <strong>Hypoglycemia Risk:</strong> Patient Michael Chen shows a 15% downward trend in glucose levels.
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}><Activity size={16} /></div>
                <div className={styles.insightText}>
                  <strong>Data Consistency:</strong> 98% of extracted entities match historical patient records.
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

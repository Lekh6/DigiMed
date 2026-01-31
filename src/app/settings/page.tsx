'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import {
    User,
    Stethoscope,
    Mail,
    Phone,
    MapPin,
    Award,
    Shield,
    Camera,
    Save,
    Clock,
    BookOpen,
    Star,
    Activity,
    Calendar,
    ChevronRight,
    ExternalLink,
    Plus
} from 'lucide-react';

export default function SettingsPage() {
    const [doctorData, setDoctorData] = useState({
        name: 'Dr. Sarah Roberts',
        title: 'Senior Cardiologist',
        specialization: 'Interventional Cardiology',
        license: 'MC-7782091',
        email: 'sarah.roberts@digimed.health',
        phone: '+1 (555) 982-0192',
        hospital: 'City General Hospital',
        address: '402 HighTech Plaza, Medical District, NY',
        bio: 'Board-certified cardiologist with 12+ years of experience in interventional cardiac procedures and clinical research. Dedicated to providing trauma-informed care and leveraging AI for early diagnosis.',
        experience: '12 Years',
        education: [
            { degree: 'MD in Cardiology', university: 'Johns Hopkins School of Medicine', year: '2012' },
            { degree: 'MBBS', university: 'Stanford University', year: '2008' }
        ],
        expertise: ['Coronary Artery Disease', 'Heart Failure', 'Hyperlipidemia', 'AI in Healthcare']
    });

    return (
        <div className="dashboard-grid">
            <Navbar />
            <main className={styles.main}>
                <div className={styles.profileContainer}>
                    {/* Premium Profile Header */}
                    <div className={styles.headerWrapper}>
                        <div className={styles.bannerContainer}>
                            <div className={styles.bannerGlow}></div>
                        </div>
                        <div className={styles.profileMainInfo}>
                            <div className={styles.avatarContainer}>
                                <div className={styles.avatar}>SR</div>
                                <button className={styles.cameraBtn} title="Update Photo">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div className={styles.doctorIdentifier}>
                                <div className={styles.nameRow}>
                                    <h2>{doctorData.name}</h2>
                                    <div className={styles.verifiedBadge}>
                                        <Shield size={14} />
                                        <span>Verified Surgeon</span>
                                    </div>
                                </div>
                                <p className={styles.titleText}>{doctorData.title} • {doctorData.hospital}</p>
                                <div className={styles.quickStats}>
                                    <div className={styles.stat}>
                                        <Star size={14} fill="currentColor" />
                                        <span>4.9 (1.2k Reviews)</span>
                                    </div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.stat}>
                                        <Activity size={14} />
                                        <span>450+ Surgeries</span>
                                    </div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.stat}>
                                        <Calendar size={14} />
                                        <span>Joined Jan 2021</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                <button className={styles.saveBtn}>
                                    <Save size={18} />
                                    <span>Sync Changes</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dualGrid}>
                        {/* Left Side: Professional Info */}
                        <div className={styles.leftCol}>
                            <section className={`glass ${styles.profileCard}`}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}><User size={18} /></div>
                                    <h3>Identity & Practice</h3>
                                </div>
                                <div className={styles.formGrid}>
                                    <div className={styles.formItem}>
                                        <label>Full Name</label>
                                        <input value={doctorData.name} readOnly className={styles.clinicalInput} />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Specialization</label>
                                        <input value={doctorData.specialization} readOnly className={styles.clinicalInput} />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Clinic Address</label>
                                        <input value={doctorData.address} readOnly className={styles.clinicalInput} />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Working Hours</label>
                                        <div className={styles.inputWithIcon}>
                                            <Clock size={16} />
                                            <input value="09:00 AM - 05:00 PM" readOnly className={styles.clinicalInput} />
                                        </div>
                                    </div>
                                    <div className={`${styles.formItem} ${styles.fullWidth}`}>
                                        <label>Professional Biography</label>
                                        <textarea rows={3} value={doctorData.bio} readOnly className={styles.clinicalTextarea} />
                                    </div>
                                </div>
                            </section>

                            <section className={`glass ${styles.profileCard}`}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}><Shield size={18} /></div>
                                    <h3>Expertise & Skills</h3>
                                </div>
                                <div className={styles.expertiseTags}>
                                    {doctorData.expertise.map((skill, i) => (
                                        <div key={i} className={styles.tag}>
                                            {skill}
                                            <button className={styles.tagRemove}>×</button>
                                        </div>
                                    ))}
                                    <button className={styles.addTag}>
                                        <Plus size={14} />
                                        Add New
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Right Side: Credentials & Digital Tools */}
                        <div className={styles.rightCol}>
                            <section className={`glass ${styles.profileCard}`}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}><BookOpen size={18} /></div>
                                    <h3>Education</h3>
                                </div>
                                <div className={styles.eduTimeline}>
                                    {doctorData.education.map((edu, i) => (
                                        <div key={i} className={styles.eduItem}>
                                            <div className={styles.eduPoint}></div>
                                            <div className={styles.eduInfo}>
                                                <h4>{edu.degree}</h4>
                                                <p>{edu.university}</p>
                                                <span>Class of {edu.year}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className={`glass ${styles.profileCard}`}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}><Mail size={18} /></div>
                                    <h3>Communication</h3>
                                </div>
                                <div className={styles.commGroup}>
                                    <div className={styles.commItem}>
                                        <div className={styles.commIcon}><Mail size={14} /></div>
                                        <div className={styles.commText}>
                                            <span>Email Address</span>
                                            <p>{doctorData.email}</p>
                                        </div>
                                        <ExternalLink size={14} className={styles.extIcon} />
                                    </div>
                                    <div className={styles.commItem}>
                                        <div className={styles.commIcon}><Phone size={14} /></div>
                                        <div className={styles.commText}>
                                            <span>Phone Number</span>
                                            <p>{doctorData.phone}</p>
                                        </div>
                                        <ChevronRight size={14} className={styles.extIcon} />
                                    </div>
                                </div>
                            </section>

                            <section className={`glass ${styles.signatureSection}`}>
                                <div className={styles.signatureHeader}>
                                    <Award size={18} />
                                    <h3>Clinical Signature</h3>
                                </div>
                                <div className={styles.signatureBox}>
                                    <div className={styles.placeholderSig}>{doctorData.name}</div>
                                    <button className={styles.updateSigBtn}>Update Signature</button>
                                </div>
                                <p className={styles.sigNotice}>Used for authenticating generated medical reports.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

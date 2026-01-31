'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import {
    Upload as UploadIcon,
    File,
    X,
    CheckCircle2,
    Loader2,
    UserPlus,
    UserCheck,
    Search,
    Mail
} from 'lucide-react';

export default function UploadPage() {
    const searchParams = useSearchParams();
    const [patientId, setPatientId] = useState(searchParams.get('id') || '');
    const [patientData, setPatientData] = useState<any>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setPatientId(id);
            // Auto check if ID is present
            setIsChecking(true);
            setTimeout(() => {
                if (id === '123' || id === 'P-10023' || id === '1' || id === '2') {
                    const name = id === '1' || id === 'P-10023' ? 'John Doe' : 'Sarah Jenkins';
                    setPatientData({ id, name, status: 'Existing' });
                    setShowRegistration(false);
                } else {
                    setPatientData(null);
                    setShowRegistration(true);
                }
                setIsChecking(false);
            }, 500);
        }
    }, [searchParams]);

    // New Patient Form State
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newGender, setNewGender] = useState('Male');
    const [newDob, setNewDob] = useState('');
    const [newBloodGroup, setNewBloodGroup] = useState('A+');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const checkPatient = () => {
        if (!patientId) return;
        setIsChecking(true);
        // Mock API call
        setTimeout(() => {
            if (patientId === '123' || patientId === 'P-10023') {
                setPatientData({ id: patientId, name: 'John Doe', status: 'Existing' });
                setShowRegistration(false);
            } else {
                setPatientData(null);
                setShowRegistration(true);
            }
            setIsChecking(false);
        }, 800);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration
        setPatientData({
            id: patientId || 'NEW-001',
            name: newName,
            status: 'Newly Registered',
            details: { age: newAge, gender: newGender, dob: newDob, blood: newBloodGroup, phone: newPhone, address: newAddress, email: newEmail }
        });
        setShowRegistration(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const clearFile = () => {
        setFile(null);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!file) return;
        setAnalyzing(true);
        setTimeout(() => {
            setResult({
                patient: patientData?.name || "Unknown",
                date: "2024-01-31",
                entities: [
                    { label: "Glucose", value: "95 mg/dL", status: "Normal" },
                    { label: "Hemoglobin", value: "14.2 g/dL", status: "Normal" },
                    { label: "Blood Pressure", value: "120/80 mmHg", status: "Optimal" },
                    { label: "Cholesterol", value: "185 mg/dL", status: "Normal" },
                ],
                summary: "Analysis complete. Data extracted successfully and mapped to patient profile."
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="dashboard-grid">
            <Navbar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Medical Data Extraction</h1>
                    <p className={styles.subtitle}>Verify patient and upload reports for automated analysis.</p>
                </header>

                <div className={styles.uploadContainer}>
                    {/* Step 1: Patient Verification */}
                    <section className={`glass ${styles.card} ${patientData ? styles.cardSuccess : ''}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Patient Identification</h3>
                        </div>

                        {!patientData && !showRegistration && (
                            <div className={styles.inputGroup}>
                                <div className={styles.searchWrapper}>
                                    <Search size={18} className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Enter Patient ID (e.g. P-10023)"
                                        value={patientId}
                                        onChange={(e) => setPatientId(e.target.value)}
                                        className={styles.idInput}
                                    />
                                </div>
                                <button
                                    onClick={checkPatient}
                                    className={styles.verifyBtn}
                                    disabled={isChecking || !patientId}
                                >
                                    {isChecking ? <Loader2 size={18} className={styles.spin} /> : 'Verify ID'}
                                </button>
                            </div>
                        )}

                        {showRegistration && (
                            <div className={styles.registrationForm}>
                                <div className={styles.regNotice}>
                                    <UserPlus size={18} />
                                    <span>Patient ID not found. Please register new patient.</span>
                                </div>
                                <form id="regForm" onSubmit={handleRegister} className={styles.formGrid}>
                                    <div className={styles.formItem}>
                                        <label>Full Name</label>
                                        <input type="text" placeholder="John Doe" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Email Address</label>
                                        <input type="email" placeholder="john@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Phone Number</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Age</label>
                                        <input type="number" placeholder="45" value={newAge} onChange={(e) => setNewAge(e.target.value)} required />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Gender</label>
                                        <select value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Date of Birth</label>
                                        <input type="date" value={newDob} onChange={(e) => setNewDob(e.target.value)} required />
                                    </div>
                                    <div className={styles.formItem}>
                                        <label>Blood Group</label>
                                        <select value={newBloodGroup} onChange={(e) => setNewBloodGroup(e.target.value)}>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={`${styles.formItem} ${styles.fullWidth}`}>
                                        <label>Residential Address</label>
                                        <input type="text" placeholder="123 Medical Way, Health City" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} required />
                                    </div>
                                </form>
                            </div>
                        )}

                        {patientData && (
                            <div className={styles.patientVerified}>
                                <div className={styles.verifiedInfo}>
                                    <div className={styles.userCircle}>
                                        <UserCheck size={20} />
                                    </div>
                                    <div>
                                        <h4>{patientData.name}</h4>
                                        <p>ID: {patientData.id} • {patientData.status}</p>
                                    </div>
                                </div>
                                <button className={styles.changeBtn} onClick={() => { setPatientData(null); setPatientId(''); setFile(null); setResult(null); }}>Change Patient</button>
                            </div>
                        )}
                    </section>

                    {/* Step 2: File Upload (Only visible if patient identified) */}
                    <section className={`glass ${styles.card} ${(!patientData && !showRegistration) ? styles.disabled : ''}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Upload Medical Report</h3>
                        </div>

                        {!file ? (
                            <div className={styles.dropzone}>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    className={styles.fileInput}
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                    disabled={!patientData && !showRegistration}
                                />
                                <label htmlFor="fileUpload" className={styles.dropzoneLabel}>
                                    <div className={styles.uploadIconWrapper}>
                                        <UploadIcon size={32} />
                                    </div>
                                    <h3>Click to select report</h3>
                                    <p>PDF, JPEG or PNG (Max 10MB)</p>
                                </label>
                            </div>
                        ) : (
                            <div className={styles.filePreview}>
                                <div className={styles.fileInfo}>
                                    <File size={32} className={styles.fileIcon} />
                                    <div>
                                        <p className={styles.fileName}>{file.name}</p>
                                        <p className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button className={styles.removeBtn} onClick={clearFile} disabled={analyzing}>
                                    <X size={18} />
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Unified Footer Actions */}
                    <div className={styles.actionFooter}>
                        {showRegistration && (
                            <button form="regForm" type="submit" className={styles.primaryActionBtn}>
                                Complete Registration & Process Report
                            </button>
                        )}

                        {patientData && file && !result && (
                            <button className={styles.primaryActionBtn} onClick={handleUpload} disabled={analyzing}>
                                {analyzing ? (
                                    <>
                                        <Loader2 size={20} className={styles.spin} />
                                        <span>Analyzing Clinical Data...</span>
                                    </>
                                ) : (
                                    <span>Process & Extract Report</span>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Step 3: Result Analysis */}
                    {result && (
                        <section className={`glass ${styles.card} ${styles.resultCard}`}>
                            <div className={styles.cardHeader}>
                                <CheckCircle2 size={24} color="var(--success)" />
                                <h3>Extraction Complete</h3>
                            </div>
                            <div className={styles.entitiesGrid}>
                                {result.entities.map((entity: any, i: number) => (
                                    <div key={i} className={styles.entityItem}>
                                        <span className={styles.entityLabel}>{entity.label}</span>
                                        <span className={styles.entityValue}>{entity.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.resultActions}>
                                <button className={styles.saveBtn}>Finalize & Save to Profile</button>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}

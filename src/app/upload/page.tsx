'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';
import { Upload as UploadIcon, File, X, CheckCircle2, Loader2, Search } from 'lucide-react';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

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
        // Mock analysis delay
        setTimeout(() => {
            setResult({
                patient: "John Doe",
                date: "2024-01-31",
                entities: [
                    { label: "Glucose", value: "95 mg/dL", status: "Normal" },
                    { label: "Hemoglobin", value: "14.2 g/dL", status: "Normal" },
                    { label: "Blood Pressure", value: "120/80 mmHg", status: "Optimal" },
                    { label: "Cholesterol", value: "185 mg/dL", status: "Normal" },
                    { label: "Vitamin D", value: "24 ng/mL", status: "Low" },
                ],
                summary: "Patient's general blood work looks good. Vitamin D levels are slightly below recommended range."
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="dashboard-grid">
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Extract Medical Data</h1>
                    <p className={styles.subtitle}>Upload scanned reports or images to automatically extract structured data.</p>
                </header>

                <section className={styles.uploadContainer}>
                    <div className={`glass ${styles.uploadCard}`}>
                        {!file ? (
                            <div className={styles.dropzone}>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    className={styles.fileInput}
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                />
                                <label htmlFor="fileUpload" className={styles.dropzoneLabel}>
                                    <div className={styles.uploadIconWrapper}>
                                        <UploadIcon size={32} />
                                    </div>
                                    <h3>Click to upload or drag & drop</h3>
                                    <p>Supports PDFs, JPGs, or PNGs (Max 10MB)</p>
                                </label>
                            </div>
                        ) : (
                            <div className={styles.filePreview}>
                                <div className={styles.fileInfo}>
                                    <File size={40} className={styles.fileIcon} />
                                    <div>
                                        <p className={styles.fileName}>{file.name}</p>
                                        <p className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className={styles.previewActions}>
                                    {!result && (
                                        <button
                                            className={styles.analyzeBtn}
                                            onClick={handleUpload}
                                            disabled={analyzing}
                                        >
                                            {analyzing ? (
                                                <>
                                                    <Loader2 size={18} className={styles.spin} />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <span>Start Analysis</span>
                                            )}
                                        </button>
                                    )}
                                    <button className={styles.removeBtn} onClick={clearFile} disabled={analyzing}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {result && (
                        <div className={`glass ${styles.resultCard}`}>
                            <div className={styles.resultHeader}>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={24} className={styles.successIcon} />
                                    <h2>Extraction Result</h2>
                                </div>
                                <div className={styles.patientBadge}>Patient: {result.patient}</div>
                            </div>

                            <div className={styles.entitiesGrid}>
                                {result.entities.map((entity: any, i: number) => (
                                    <div key={i} className={styles.entityItem}>
                                        <span className={styles.entityLabel}>{entity.label}</span>
                                        <div className="flex justify-between items-end">
                                            <span className={styles.entityValue}>{entity.value}</span>
                                            <span className={`${styles.entityStatus} ${styles[entity.status.toLowerCase()]}`}>
                                                {entity.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.analysisSummary}>
                                <h3>Clinical Summary</h3>
                                <p>{result.summary}</p>
                            </div>

                            <div className={styles.resultActions}>
                                <button className={styles.saveBtn}>Save to Patient Record</button>
                                <button className={styles.printBtn}>Download PDF</button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

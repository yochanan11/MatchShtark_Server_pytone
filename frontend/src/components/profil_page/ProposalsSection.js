import React from "react";
import { Heart, CheckCircle, XCircle, FileText, Users, AlertCircle } from 'lucide-react';

function ProposalsSection({ proposals = [] }) {
    const containerStyle = {
        backgroundColor: '#F9FAFB',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        direction: 'rtl',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    };

    const headerStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'flex-end'
    };

    const proposalCardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        border: '2px solid #FEF3C7',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    const successCardStyle = {
        ...proposalCardStyle,
        borderColor: '#D1FAE5',
        backgroundColor: '#F0FDF4'
    };

    const failedCardStyle = {
        ...proposalCardStyle,
        borderColor: '#FEE2E2',
        backgroundColor: '#FEF2F2'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#6B7280',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px dashed #E5E7EB'
    };

    const nameStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'flex-end'
    };

    const statusStyle = {
        fontSize: '14px',
        fontWeight: '600',
        padding: '6px 12px',
        borderRadius: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '8px'
    };

    const successStatusStyle = {
        ...statusStyle,
        backgroundColor: '#D1FAE5',
        color: '#065F46'
    };

    const failedStatusStyle = {
        ...statusStyle,
        backgroundColor: '#FEE2E2',
        color: '#991B1B'
    };

    const reasonStyle = {
        fontSize: '14px',
        color: '#6B7280',
        fontStyle: 'italic',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        justifyContent: 'flex-end'
    };

    return (
        <div style={containerStyle}>
            <h5 style={headerStyle}>
                <Heart size={24} style={{ color: '#D97706' }} />
                הצעות שידוכין
            </h5>

            {proposals.length > 0 ? (
                <div>
                    {proposals.map((p, i) => {
                        const isSuccess = p.status === "success";
                        const cardStyle = isSuccess ? successCardStyle : failedCardStyle;
                        const statusStyleToUse = isSuccess ? successStatusStyle : failedStatusStyle;

                        return (
                            <div
                                key={i}
                                style={cardStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                {/* Decorative element */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '-10px',
                                    width: '60px',
                                    height: '60px',
                                    background: `radial-gradient(circle, ${isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'} 0%, transparent 70%)`,
                                    borderRadius: '50%'
                                }}></div>

                                <div style={nameStyle}>
                                    <Users size={18} style={{ color: '#6B7280' }} />
                                    {p.boyName || p.girlName}
                                </div>

                                <div style={{ marginBottom: '12px' }}>
                                    <span style={statusStyleToUse}>
                                        {isSuccess ? (
                                            <>
                                                <CheckCircle size={16} />
                                                שידוך הצליח
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={16} />
                                                נכשל
                                            </>
                                        )}
                                    </span>
                                </div>

                                {p.reason && (
                                    <div style={reasonStyle}>
                                        <FileText size={14} />
                                        <strong>סיבה:</strong> {p.reason}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={emptyStateStyle}>
                    <AlertCircle size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
                    <p style={{
                        margin: 0,
                        fontSize: '16px',
                        color: '#6B7280',
                        fontWeight: '500'
                    }}>
                        אין הצעות שידוכין כרגע
                    </p>
                    <p style={{
                        margin: '8px 0 0 0',
                        fontSize: '14px',
                        color: '#9CA3AF'
                    }}>
                        הצעות חדשות יופיעו כאן
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProposalsSection;
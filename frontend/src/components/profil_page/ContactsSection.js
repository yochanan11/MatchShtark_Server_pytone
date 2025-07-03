import React from "react";
import { Users, UserCheck, Home, Phone, AlertCircle } from 'lucide-react';

function ContactsSection({ friends = [], neighbors = [] }) {
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

    const sectionStyle = {
        marginBottom: '24px'
    };

    const sectionTitleStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'flex-end',
        padding: '8px 12px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB'
    };

    const contactCardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        border: '2px solid #FEF3C7',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    const friendCardStyle = {
        ...contactCardStyle,
        borderColor: '#DBEAFE',
        backgroundColor: '#F8FAFF'
    };

    const neighborCardStyle = {
        ...contactCardStyle,
        borderColor: '#E0E7FF',
        backgroundColor: '#F5F3FF'
    };

    const contactInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
    };

    const nameStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1F2937',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const phoneStyle = {
        fontSize: '14px',
        color: '#6B7280',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        backgroundColor: '#F3F4F6',
        borderRadius: '6px'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '24px',
        color: '#6B7280',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '2px dashed #E5E7EB',
        marginBottom: '16px'
    };

    const decorativeElementStyle = {
        position: 'absolute',
        top: '-8px',
        left: '-8px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        opacity: 0.6
    };

    const renderContacts = (contacts, type, icon, cardStyle, decorativeColor) => (
        <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
                {icon}
                {type === 'friends' ? 'חברים' : 'שכנים'}
                <span style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    backgroundColor: '#F3F4F6',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    marginRight: '8px'
                }}>
                    {contacts.length}
                </span>
            </div>

            {contacts.length > 0 ? (
                contacts.map((contact, i) => (
                    <div
                        key={`${type}-${i}`}
                        style={cardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        {/* Decorative element */}
                        <div style={{
                            ...decorativeElementStyle,
                            background: `radial-gradient(circle, ${decorativeColor} 0%, transparent 70%)`
                        }}></div>

                        <div style={contactInfoStyle}>
                            <div style={nameStyle}>
                                <UserCheck size={16} style={{ color: '#6B7280' }} />
                                {contact.name}
                            </div>

                            <div style={phoneStyle}>
                                <Phone size={14} />
                                {contact.phone}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div style={emptyStateStyle}>
                    <AlertCircle size={32} style={{ color: '#D1D5DB', margin: '0 auto 8px' }} />
                    <p style={{ margin: 0, fontSize: '14px' }}>
                        אין {type === 'friends' ? 'חברים' : 'שכנים'} רשומים
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div style={containerStyle}>
            <h5 style={headerStyle}>
                <Users size={24} style={{ color: '#D97706' }} />
                שכנים וחברים
            </h5>

            {renderContacts(
                friends,
                'friends',
                <UserCheck size={18} style={{ color: '#3B82F6' }} />,
                friendCardStyle,
                'rgba(59, 130, 246, 0.1)'
            )}

            {renderContacts(
                neighbors,
                'neighbors',
                <Home size={18} style={{ color: '#8B5CF6' }} />,
                neighborCardStyle,
                'rgba(139, 92, 246, 0.1)'
            )}
        </div>
    );
}

export default ContactsSection;
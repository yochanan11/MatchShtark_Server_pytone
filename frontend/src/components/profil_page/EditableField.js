import React, { useState } from "react";
import { Edit3, Lock } from 'lucide-react';

function EditableField({ label, value, onChange, readOnly }) {
    const [focused, setFocused] = useState(false);

    const containerStyle = {
        marginBottom: '20px',
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        justifyContent: 'flex-end'
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    const baseInputStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: `2px solid ${focused ? '#D97706' : '#E5E7EB'}`,
        borderRadius: '12px',
        backgroundColor: readOnly ? '#F9FAFB' : 'white',
        color: readOnly ? '#6B7280' : '#1F2937',
        transition: 'all 0.3s ease',
        outline: 'none',
        textAlign: 'right',
        fontFamily: 'inherit',
        boxShadow: focused ? '0 0 0 3px rgba(217, 119, 6, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
    };

    const iconStyle = {
        position: 'absolute',
        left: '12px',
        color: readOnly ? '#9CA3AF' : '#6B7280',
        pointerEvents: 'none'
    };

    return (
        <div style={containerStyle}>
            <label style={labelStyle}>
                {readOnly && <Lock size={14} style={{ color: '#9CA3AF' }} />}
                {!readOnly && <Edit3 size={14} style={{ color: '#D97706' }} />}
                {label}
            </label>

            <div style={inputWrapperStyle}>
                <input
                    type="text"
                    style={{
                        ...baseInputStyle,
                        paddingLeft: '44px' // Make room for icon
                    }}
                    value={value || ""}
                    onChange={e => onChange && onChange(e.target.value)}
                    readOnly={readOnly}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onMouseEnter={(e) => {
                        if (!readOnly && !focused) {
                            e.target.style.borderColor = '#FCD34D';
                            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!readOnly && !focused) {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                        }
                    }}
                    placeholder={readOnly ? '' : `הכנס ${label.toLowerCase()}...`}
                />

                <div style={iconStyle}>
                    {readOnly ? (
                        <Lock size={16} />
                    ) : (
                        <Edit3 size={16} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditableField;
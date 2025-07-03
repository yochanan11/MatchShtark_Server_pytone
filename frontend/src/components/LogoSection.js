import React, { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, Heart, Shield, ArrowRight, RefreshCw } from "lucide-react";

function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Logo Section Component
function LogoSection() {
    return (
        <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            position: 'relative'
        }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <div style={{
                    color: '#374151',
                    fontSize: '48px',
                    fontFamily: 'serif',
                    letterSpacing: '2px',
                    fontWeight: 'bold'
                }}>
                    MATCH SHTARK
                </div>
                <div style={{ fontSize: '56px' }}>💍💍</div>
            </div>

            <p style={{
                color: '#6B7280',
                fontSize: '20px',
                margin: '0',
                fontWeight: '300'
            }}>
                המוח של הבינה, הלב של השידוך
            </p>
        </div>
    );
}
export default LogoSection;
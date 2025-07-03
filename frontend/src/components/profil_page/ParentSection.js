import React from "react";
import { User, Phone, MapPin, Briefcase, Crown, Heart } from 'lucide-react';

function ParentSection({ label, parentInfo = {} }) {
   const iconStyle = {
       color: label === 'אב' ? '#3B82F6' : '#EC4899',
       flexShrink: 0
   };

   const cardStyle = {
       backgroundColor: '#F9FAFB',
       borderRadius: '12px',
       padding: '20px',
       border: '1px solid #E5E7EB',
       direction: 'rtl'
   };

   const gridStyle = {
       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
       gap: '12px',
       fontSize: '14px'
   };

   const itemStyle = {
       display: 'flex',
       alignItems: 'center',
       gap: '8px',
       color: '#1F2937'
   };

   const labelStyle = {
       fontWeight: '600',
       color: '#374151',
       minWidth: '70px'
   };

   const valueStyle = {
       color: '#6B7280'
   };

   // Enhanced header style
   const headerStyle = {
       backgroundColor: 'white',
       borderRadius: '16px',
       border: `2px solid ${label === 'אב' ? '#DBEAFE' : '#FCE7F3'}`,
       padding: '20px',
       marginBottom: '16px',
       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
       position: 'relative',
       overflow: 'hidden'
   };

   const headerTitleStyle = {
       fontSize: '20px',
       fontWeight: 'bold',
       color: '#1F2937',
       margin: 0,
       display: 'flex',
       alignItems: 'center',
       gap: '12px',
       justifyContent: 'flex-end',
       position: 'relative',
       zIndex: 1
   };

   const decorativeCircleStyle = {
       position: 'absolute',
       top: '-20px',
       right: '-20px',
       width: '80px',
       height: '80px',
       background: `radial-gradient(circle, ${label === 'אב' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)'} 0%, transparent 70%)`,
       borderRadius: '50%'
   };

   const iconWrapperStyle = {
       width: '48px',
       height: '48px',
       backgroundColor: label === 'אב' ? '#3B82F6' : '#EC4899',
       borderRadius: '50%',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       boxShadow: `0 4px 12px ${label === 'אב' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(236, 72, 153, 0.3)'}`
   };

   return (
       <div style={{ textAlign: 'right' }}>
           <div style={cardStyle}>
               {/* Header inside the same card */}
               <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '12px',
                   justifyContent: 'flex-end',
                   marginBottom: '20px',
                   paddingBottom: '16px',
                   borderBottom: '1px solid #E5E7EB'
               }}>
                   <div style={iconWrapperStyle}>
                       {label === 'אב' ? (
                           <User size={24} style={{ color: 'white' }} />
                       ) : (
                           <Heart size={24} style={{ color: 'white' }} />
                       )}
                   </div>
                   <h5 style={{
                       fontSize: '20px',
                       fontWeight: 'bold',
                       color: '#1F2937',
                       margin: 0
                   }}>
                       פרטי {label}
                   </h5>
               </div>

               <div style={{
                   display: 'grid',
                   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                   gap: '16px'
               }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                       <User size={18} style={{ color: '#6B7280' }} />
                       <strong>שם מלא:</strong> {parentInfo.fullName || 'לא זמין'}
                   </div>

                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                       <Phone size={18} style={{ color: '#6B7280' }} />
                       <strong>טלפון:</strong> {parentInfo.phone || 'לא זמין'}
                   </div>

                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                       <MapPin size={18} style={{ color: '#6B7280' }} />
                       <strong>כתובת:</strong> {parentInfo.address || 'לא זמין'}
                   </div>

                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                       <Briefcase size={18} style={{ color: '#6B7280' }} />
                       <strong>עיסוק:</strong> {parentInfo.workplace || 'לא זמין'}
                   </div>

                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                       <Crown size={18} style={{ color: '#6B7280' }} />
                       <strong>סגנון:</strong> {parentInfo.style || 'לא זמין'}
                   </div>

                   {parentInfo.origin && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                           <MapPin size={18} style={{ color: '#6B7280' }} />
                           <strong>מוצא:</strong> {parentInfo.origin}
                       </div>
                   )}

                   {parentInfo.community && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                           <User size={18} style={{ color: '#6B7280' }} />
                           <strong>קהילה:</strong> {parentInfo.community}
                       </div>
                   )}

                   {parentInfo.dress && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                           <Crown size={18} style={{ color: '#6B7280' }} />
                           <strong>לבוש בשבת:</strong> {parentInfo.dress}
                       </div>
                   )}

                   {parentInfo.choice && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                           <Crown size={18} style={{ color: '#6B7280' }} />
                           <strong>כיסוי ראש:</strong> {parentInfo.choice}
                       </div>
                   )}
               </div>
           </div>
       </div>
   );
}

export default ParentSection;
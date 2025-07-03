import React from "react";
import { Building, MapPin, Home, Users, AlertCircle } from 'lucide-react';

function InLawsSection({ inLaws = [] }) {
   const cardStyle = {
       backgroundColor: '#F9FAFB',
       borderRadius: '12px',
       padding: '20px',
       border: '1px solid #E5E7EB',
       direction: 'rtl'
   };

   const iconWrapperStyle = {
       width: '48px',
       height: '48px',
       backgroundColor: '#7C3AED',
       borderRadius: '50%',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
   };

   const emptyStateStyle = {
       textAlign: 'center',
       padding: '40px 20px',
       color: '#6B7280'
   };

   const inLawCardStyle = {
       backgroundColor: 'white',
       borderRadius: '12px',
       padding: '16px',
       marginBottom: '16px',
       border: '2px solid #E0E7FF',
       boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
   };

   if (!inLaws || inLaws.length === 0) {
       return (
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
                       <Building size={24} style={{ color: 'white' }} />
                   </div>
                   <h5 style={{
                       fontSize: '20px',
                       fontWeight: 'bold',
                       color: '#1F2937',
                       margin: 0
                   }}>
                       מחותנים
                   </h5>
               </div>

               <div style={emptyStateStyle}>
                   <AlertCircle size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
                   <p style={{
                       margin: 0,
                       fontSize: '16px',
                       color: '#6B7280',
                       fontWeight: '500'
                   }}>
                       אין מחותנים רשומים במערכת
                   </p>
               </div>
           </div>
       );
   }

   return (
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
                   <Building size={24} style={{ color: 'white' }} />
               </div>
               <h5 style={{
                   fontSize: '20px',
                   fontWeight: 'bold',
                   color: '#1F2937',
                   margin: 0
               }}>
                   מחותנים ({inLaws.length})
               </h5>
           </div>

           <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
               gap: '16px'
           }}>
               {inLaws.map((inLaw, index) => (
                   <div key={index} style={inLawCardStyle}>
                       <div style={{
                           fontSize: '16px',
                           fontWeight: '600',
                           color: '#7C3AED',
                           marginBottom: '12px',
                           display: 'flex',
                           alignItems: 'center',
                           gap: '8px',
                           justifyContent: 'flex-end'
                       }}>
                           <Users size={16} style={{ color: '#7C3AED' }} />
                           משפחה #{index + 1}
                       </div>

                       <div style={{
                           display: 'grid',
                           gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                           gap: '12px'
                       }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                               <Building size={16} style={{ color: '#6B7280' }} />
                               <strong>שם:</strong> {inLaw.name || 'לא זמין'}
                           </div>

                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                               <MapPin size={16} style={{ color: '#6B7280' }} />
                               <strong>עיר:</strong> {inLaw.city || 'לא זמין'}
                           </div>

                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                               <Users size={16} style={{ color: '#6B7280' }} />
                               <strong>קהילה:</strong> {inLaw.Community || 'לא זמין'}
                           </div>

                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                               <Home size={16} style={{ color: '#6B7280' }} />
                               <strong>כתובת:</strong> {inLaw.Address || 'לא זמין'}
                           </div>
                       </div>
                   </div>
               ))}
           </div>
       </div>
   );
}

export default InLawsSection;
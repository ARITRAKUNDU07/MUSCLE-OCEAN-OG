"use client";

import { useSession } from "next-auth/react";

export default function MemberCard() {
  const { data: session } = useSession();

  // Mocking membership data
  const status = "Active"; // Or "Expired"
  const membershipTier = "Premium Member";
  const memberSince = "Oct 12, 2023";
  const expiryDate = "Oct 12, 2024";

  return (
    <div style={{
      background: '#2a2a2a',
      borderRadius: '12px',
      padding: '30px',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h2 className="bebas" style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '1px', color: '#CCFF00' }}>
          MEMBERSHIP STATUS
        </h2>
        <span style={{
          background: status === 'Active' ? 'rgba(204, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
          color: status === 'Active' ? '#CCFF00' : '#FF4444',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '0.85rem',
          textTransform: 'uppercase'
        }}>
          {status}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
        {session?.user?.image ? (
          <img 
            src={session.user.image} 
            alt="Profile" 
            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #CCFF00' }} 
          />
        ) : (
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: '#444', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: '2px solid #CCFF00'
          }}>
            {session?.user?.name?.charAt(0) || 'M'}
          </div>
        )}
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{session?.user?.name || 'Member'}</div>
          <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{session?.user?.email}</div>
        </div>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>Tier</span>
          <span style={{ fontWeight: 'bold' }}>{membershipTier}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>Member Since</span>
          <span style={{ fontWeight: 'bold' }}>{memberSince}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>Valid Until</span>
          <span style={{ fontWeight: 'bold' }}>{expiryDate}</span>
        </div>
      </div>
    </div>
  );
}

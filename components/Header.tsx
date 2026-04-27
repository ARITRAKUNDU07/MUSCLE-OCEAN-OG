"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 5%', 
      background: '#1a1a1a', 
      borderBottom: '1px solid #2a2a2a' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Muscleheads Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {session?.user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>{session.user.name}</span>
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt="Profile" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: '#CCFF00', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold'
              }}>
                {session.user.name?.charAt(0)}
              </div>
            )}
          </div>
        )}
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="btn"
          style={{ 
            background: 'transparent', 
            color: '#CCFF00', 
            border: '1px solid #CCFF00', 
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

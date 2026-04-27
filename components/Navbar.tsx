"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = session?.user?.email === "kundu.aritra2007@gmail.com" || session?.user?.email === "Mayankbisht6121@gmail.com";

  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(18, 18, 18, 0.95)', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
      <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/logo.png" alt="Muscle Ocean Logo" style={{ height: '60px' }} />
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/#classes">Facilities</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/reviews">Reviews</Link>
        {session ? (
          <>
            <Link href={isAdmin ? "/admin" : "/dashboard"} style={{ color: 'var(--primary)' }}>
              {isAdmin ? "Admin Portal" : "Dashboard"}
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>Logout</button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

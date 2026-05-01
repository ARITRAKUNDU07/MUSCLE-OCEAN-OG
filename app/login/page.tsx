import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserLoginClient from '@/components/UserLoginClient';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '1000px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* User Login Card */}
          <UserLoginClient />

          {/* Admin Login Card */}
          <div className="card" style={{ background: 'var(--gray)', padding: '40px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="bebas" style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '2.5rem' }}>Admin Portal</h2>
            <p style={{ color: 'var(--light)', marginBottom: '30px' }}>Access the management dashboard for members and notifications.</p>
            <Link href="/admin" className="btn btn-outline" style={{ display: 'inline-block', width: '100%' }}>
              Go to Admin Login
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

import AdminClient from './AdminClient';

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', color: 'var(--white)' }}>
      <AdminClient />
    </div>
  );
}

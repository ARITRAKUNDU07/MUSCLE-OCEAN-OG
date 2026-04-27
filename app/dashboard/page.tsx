import Header from "@/components/Header";
import MemberCard from "@/components/MemberCard";
import QRCard from "@/components/QRCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  // If not authenticated, redirect to login page (although middleware will also catch this)
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        padding: '40px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          maxWidth: '900px', 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px',
          alignItems: 'start'
        }}>
          <MemberCard />
          <QRCard />
        </div>
      </main>
    </div>
  );
}

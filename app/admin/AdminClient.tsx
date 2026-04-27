"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { QRCodeSVG } from 'qrcode.react';
import { mockMembers, Member } from '@/data/members';
import BulkEmailButton, { SelectedMember } from '@/components/BulkEmailButton';
import CronLogTable from '@/components/CronLogTable';
import ManualTriggerButton from '@/components/ManualTriggerButton';

export default function AdminClient() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQrCode, setActiveQrCode] = useState<string | null>(null);

  // Bulk Email State
  const [selectedExpiredMembers, setSelectedExpiredMembers] = useState<string[]>([]);
  const [sentEmailIds, setSentEmailIds] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sorting state for mock members
  const [sortConfig, setSortConfig] = useState<{ key: keyof Member | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [cronLogKey, setCronLogKey] = useState(0);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const selectable = mockMembers.filter(m => {
        const today = new Date();
        const tillDate = new Date(m.validTill);
        const diffTime = tillDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 0 && !sentEmailIds.includes(m.id);
      }).map(m => m.id);
      setSelectedExpiredMembers(selectable);
    } else {
      setSelectedExpiredMembers([]);
    }
  };

  const handleEmailSuccess = (id: string) => {
    setSentEmailIds(prev => [...prev, id]);
    setSelectedExpiredMembers(prev => prev.filter(mId => mId !== id));
  };

  const handleToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleSort = (key: keyof Member) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMockMembers = [...mockMembers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const exportToCSV = () => {
    const headers = ['Member Name', 'Email', 'Plan', 'Amount Paid', 'Payment Status', 'Valid From', 'Valid Till', 'Days Remaining'];
    const rows = sortedMockMembers.map(m => {
      const today = new Date();
      const tillDate = new Date(m.validTill);
      const diffTime = tillDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return [
        m.name,
        m.email,
        m.plan,
        m.amountPaid,
        m.paymentStatus,
        m.validFrom,
        m.validTill,
        diffDays < 0 ? 'Expired' : diffDays.toString()
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'member_payment_status.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchMembers();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchMembers();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const allowedEmails = ["kundu.aritra2007@gmail.com", "Mayankbisht6121@gmail.com"];
    
    if (!allowedEmails.includes(email.trim())) {
      setError("Unauthorized email address.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      if (signInError.message.includes('Invalid login credentials')) {
        // Try creating account if it's the right email
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
        } else {
            alert("Account created! Please check your email to confirm if Supabase requires it, or try logging in again if auto-login works.");
        }
      } else {
        setError(signInError.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('registeredAt', { ascending: false });
    
    if (data) {
      setMembers(data);
    }
    setLoadingMembers(false);
  };

  const handlePostNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;
    const active = formData.get('active') === 'on';

    const { error } = await supabase.from('notifications').insert([
      { text, active, createdAt: new Date().toISOString() }
    ]);

    if (error) {
      alert("Failed to post notification: " + error.message);
    } else {
      alert("Notification posted successfully!");
      (e.target as HTMLFormElement).reset();
    }
  };

  const generateMissingCode = async (id: number) => {
    const newCode = 'MO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from('members').update({ memberCode: newCode }).eq('id', id);
    if (!error) {
      fetchMembers();
    } else {
      alert("Error generating code. Please ensure you ran the SQL command to add the memberCode column!");
    }
  };

  const filteredMembers = members.filter((m) => {
    const searchString = searchTerm.toLowerCase();
    const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
    const dateStr = new Date(m.registeredAt).toLocaleDateString().toLowerCase();
    return fullName.includes(searchString) || dateStr.includes(searchString);
  });

  if (!session) {
    return (
      <div id="login-section" style={{ position: 'fixed', inset: 0, background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px', background: 'var(--gray)', padding: '30px', borderRadius: '8px' }}>
          <h1 className="bebas" style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '20px' }}>Admin Login</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--light)' }}>MUSCLE OCEAN</p>
          <form onSubmit={handleLogin}>
            <div className="form-grp" style={{ marginBottom: '20px' }}>
              <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '4px' }} />
            </div>
            <div className="form-grp" style={{ marginBottom: '20px' }}>
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '4px' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
          {error && <p style={{ color: '#ff4d4d', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard-section">
      <nav style={{ padding: '20px', background: 'var(--gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="bebas" style={{ margin: 0, color: 'var(--primary)' }}>MUSCLE OCEAN <span style={{ color: 'var(--white)' }}>ADMIN</span></h2>
        <div>
          <a href="/" style={{ color: 'var(--light)', textDecoration: 'none', marginRight: '20px' }}>Return to Site</a>
          <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '1rem' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Notifications */}
        <div className="card" style={{ background: 'var(--gray)', padding: '30px', borderRadius: '8px', marginBottom: '30px' }}>
          <h2 className="bebas" style={{ color: 'var(--primary)', marginBottom: '20px' }}>Post a Notification</h2>
          <form onSubmit={handlePostNotification}>
            <div className="form-grp" style={{ marginBottom: '20px' }}>
              <input type="text" name="text" placeholder="Enter notification message..." required style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '4px' }} />
            </div>
            <div className="form-grp" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" name="active" defaultChecked style={{ width: 'auto' }} /> Make Active immediately
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Publish Notification</button>
          </form>
        </div>

        {/* Members List */}
        <div className="card" style={{ background: 'var(--gray)', padding: '30px', borderRadius: '8px', marginBottom: '30px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 className="bebas" style={{ color: 'var(--primary)', margin: 0 }}>Registered Members</h2>
            <input 
              type="text" 
              placeholder="Search by Name or Date..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '10px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', borderRadius: '4px', minWidth: '250px' }}
            />
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Email / Phone</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Plan</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Message</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {loadingMembers ? (
                <tr><td colSpan={6} style={{ padding: '15px' }}>Loading members...</td></tr>
              ) : filteredMembers.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '15px' }}>No members found.</td></tr>
              ) : (
                filteredMembers.map((m: any) => (
                  <tr key={m.id}>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{new Date(m.registeredAt).toLocaleDateString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {m.firstName} {m.lastName}
                      <br/>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{m.memberCode || 'N/A'}</span>
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m.email}<br/><span style={{ color: 'var(--light)', fontSize: '0.9rem' }}>{m.phone}</span></td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m.plan}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.message}>{m.message}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {!m.memberCode ? (
                        <button onClick={() => generateMissingCode(m.id)} className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: '0.8rem', border: '1px solid var(--primary)' }}>Assign Code</button>
                      ) : activeQrCode === m.id ? (
                        <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '4px' }}>
                          <QRCodeSVG value={JSON.stringify({ code: m.memberCode, name: `${m.firstName} ${m.lastName}` })} size={100} />
                          <button onClick={() => setActiveQrCode(null)} style={{ display: 'block', marginTop: '10px', width: '100%', background: 'transparent', border: '1px solid #000', cursor: 'pointer', padding: '2px' }}>Close</button>
                        </div>
                      ) : (
                        <button onClick={() => setActiveQrCode(m.id)} className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>View QR</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Status Members List (Mock Data) */}
        <div className="card" style={{ background: 'var(--gray)', padding: '30px', borderRadius: '8px', marginBottom: '30px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 className="bebas" style={{ color: 'var(--primary)', margin: 0 }}>Member Payment Status</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleSort('paymentStatus')} 
                className="btn btn-ghost" 
                style={{ padding: '8px 12px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Sort by Status {sortConfig.key === 'paymentStatus' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
              <button 
                onClick={() => handleSort('validTill')} 
                className="btn btn-ghost" 
                style={{ padding: '8px 12px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Sort by Valid Till {sortConfig.key === 'validTill' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
              <BulkEmailButton 
                selectedMembers={sortedMockMembers.filter(m => selectedExpiredMembers.includes(m.id)).map(m => ({ id: m.id, email: m.email, name: m.name }))}
                onEmailSuccess={handleEmailSuccess}
                onComplete={(success, total) => {
                  handleToast(`Renewal emails sent to ${success} of ${total} expired members.`);
                }}
              />
              <button 
                onClick={exportToCSV} 
                className="btn btn-primary" 
                style={{ padding: '8px 15px', fontSize: '0.9rem' }}
              >
                Export CSV
              </button>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={
                      selectedExpiredMembers.length > 0 && 
                      selectedExpiredMembers.length === sortedMockMembers.filter(m => {
                        const today = new Date();
                        const tillDate = new Date(m.validTill);
                        const diffTime = tillDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays < 0 && !sentEmailIds.includes(m.id);
                      }).length
                    }
                  />
                </th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Member Name</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Email</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Plan</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Amount Paid</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Payment Status</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Valid From</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Valid Till</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Days Remaining</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedMockMembers.map((m) => {
                const today = new Date();
                const tillDate = new Date(m.validTill);
                const diffTime = tillDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const isExpiringSoon = diffDays <= 7;

                const isExpired = diffDays < 0;
                const isSent = sentEmailIds.includes(m.id);
                const isSelected = selectedExpiredMembers.includes(m.id);

                return (
                  <tr key={m.id} style={{ backgroundColor: isExpiringSoon ? 'rgba(255, 68, 68, 0.15)' : 'transparent' }}>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {isExpired && !isSent ? (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedExpiredMembers(prev => [...prev, m.id]);
                            } else {
                              setSelectedExpiredMembers(prev => prev.filter(id => id !== m.id));
                            }
                          }}
                          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#CCFF00' }}
                        />
                      ) : null}
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m.name}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m.email}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{m.plan}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>₹{m.amountPaid}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ 
                        background: m.paymentStatus === 'Paid' ? 'rgba(204, 255, 0, 0.2)' : m.paymentStatus === 'Pending' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                        color: m.paymentStatus === 'Paid' ? '#CCFF00' : m.paymentStatus === 'Pending' ? '#FFC107' : '#FF4444',
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' 
                      }}>
                        {m.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{new Date(m.validFrom).toLocaleDateString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{tillDate.toLocaleDateString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: isExpiringSoon ? '#FF4444' : 'inherit', fontWeight: isExpiringSoon ? 'bold' : 'normal' }}>
                      {isExpired ? 'Expired' : diffDays}
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {isExpired ? (
                        isSent ? (
                          <span style={{ color: '#888', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px' }}>✅ Sent</span>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch('/api/send-renewal-email', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ email: m.email, memberId: m.id })
                                });
                                if (res.ok) {
                                  handleEmailSuccess(m.id);
                                  handleToast(`Renewal email sent to ${m.email}`);
                                } else {
                                  handleToast(`Failed to send email to ${m.email}`);
                                }
                              } catch {
                                handleToast(`Error sending email to ${m.email}`);
                              }
                            }}
                            style={{ background: 'transparent', border: '1px solid #CCFF00', color: '#CCFF00', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                          >
                            📧 Send
                          </button>
                        )
                      ) : (
                        <span style={{ color: '#555', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

        {/* Automated Reminder Log */}
        <div className="card" style={{ background: 'var(--gray)', padding: '30px', borderRadius: '8px', marginBottom: '30px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 className="bebas" style={{ color: 'var(--primary)', margin: 0 }}>Automated Reminder Log</h2>
              <p style={{ color: '#666', fontSize: '0.8rem', margin: '4px 0 0' }}>Cron runs daily at 9:00 AM UTC — checks 7-day and 3-day expiry windows</p>
            </div>
            <ManualTriggerButton
              onResult={(msg) => handleToast(msg)}
              onLogRefresh={() => setCronLogKey(prev => prev + 1)}
            />
          </div>
          <CronLogTable key={cronLogKey} />
        </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 1100,
          background: '#2a2a2a', color: '#fff', padding: '16px 24px',
          borderRadius: '10px', border: '1px solid rgba(204, 255, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'toastSlideIn 0.3s ease-out',
          maxWidth: '400px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📧</span>
          <span style={{ fontSize: '0.9rem' }}>{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.1rem', marginLeft: '8px' }}
          >
            ✕
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

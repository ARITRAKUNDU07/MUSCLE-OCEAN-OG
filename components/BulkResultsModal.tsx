"use client";

interface FailedEmail {
  id: string;
  email: string;
  name: string;
}

interface BulkResultsModalProps {
  successCount: number;
  failures: FailedEmail[];
  onRetry: () => void;
  onClose: () => void;
}

export default function BulkResultsModal({ successCount, failures, onRetry, onClose }: BulkResultsModalProps) {
  const total = successCount + failures.length;
  const allSuccess = failures.length === 0;

  return (
    <div style={{ 
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ 
        background: '#2a2a2a', padding: '35px', borderRadius: '16px', 
        width: '100%', maxWidth: '460px',
        border: '1px solid rgba(204, 255, 0, 0.15)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        animation: 'modalFadeIn 0.25s ease-out'
      }}>
        {/* Header icon */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            background: allSuccess ? 'rgba(204, 255, 0, 0.1)' : 'rgba(255, 77, 77, 0.1)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto', fontSize: '1.8rem' 
          }}>
            {allSuccess ? '🎉' : '⚠️'}
          </div>
        </div>

        <h2 className="bebas" style={{ color: '#CCFF00', marginBottom: '20px', textAlign: 'center', fontSize: '1.8rem' }}>
          {allSuccess ? 'All Emails Sent!' : 'Results Summary'}
        </h2>
        
        {/* Stats cards */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ 
            flex: 1, background: '#1a1a1a', padding: '16px', borderRadius: '10px',
            textAlign: 'center', border: '1px solid rgba(204, 255, 0, 0.1)'
          }}>
            <p style={{ color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Sent</p>
            <p style={{ color: '#CCFF00', fontWeight: 'bold', fontSize: '1.6rem' }}>{successCount}</p>
          </div>
          <div style={{ 
            flex: 1, background: '#1a1a1a', padding: '16px', borderRadius: '10px',
            textAlign: 'center', border: failures.length > 0 ? '1px solid rgba(255, 77, 77, 0.2)' : '1px solid rgba(255,255,255,0.05)'
          }}>
            <p style={{ color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Failed</p>
            <p style={{ color: failures.length > 0 ? '#ff4d4d' : '#666', fontWeight: 'bold', fontSize: '1.6rem' }}>{failures.length}</p>
          </div>
          <div style={{ 
            flex: 1, background: '#1a1a1a', padding: '16px', borderRadius: '10px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p style={{ color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Total</p>
            <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.6rem' }}>{total}</p>
          </div>
        </div>

        {failures.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.85rem', fontWeight: '600' }}>
              ❌ Failed emails:
            </p>
            <ul style={{ 
              listStyleType: 'none', padding: 0, margin: 0, 
              maxHeight: '160px', overflowY: 'auto', 
              background: '#1a1a1a', borderRadius: '8px',
              border: '1px solid rgba(255, 77, 77, 0.15)'
            }}>
              {failures.map(f => (
                <li key={f.id} style={{ 
                  padding: '10px 14px', 
                  borderBottom: '1px solid rgba(255,255,255,0.05)', 
                  color: '#ff4d4d', fontSize: '0.85rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span>
                    {f.email} 
                    <span style={{ color: '#666', fontSize: '0.75rem', marginLeft: '6px' }}>({f.name})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          {failures.length > 0 && (
            <button 
              onClick={onRetry} 
              style={{ 
                flex: 1, padding: '12px', background: '#CCFF00', color: '#000', 
                fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontSize: '0.9rem', transition: 'all 0.2s ease'
              }}
            >
              🔄 Retry Failed ({failures.length})
            </button>
          )}
          <button 
            onClick={onClose} 
            style={{ 
              flex: 1, padding: '12px', background: 'transparent', color: '#ccc', 
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.9rem', transition: 'all 0.2s ease'
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

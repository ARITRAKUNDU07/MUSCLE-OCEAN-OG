"use client";

interface BulkProgressModalProps {
  currentIndex: number;
  total: number;
  currentEmail?: string;
}

export default function BulkProgressModal({ currentIndex, total, currentEmail }: BulkProgressModalProps) {
  const percentage = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

  return (
    <div style={{ 
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ 
        background: '#2a2a2a', padding: '35px', borderRadius: '16px', 
        width: '100%', maxWidth: '440px', textAlign: 'center',
        border: '1px solid rgba(204, 255, 0, 0.15)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        animation: 'modalFadeIn 0.25s ease-out'
      }}>
        {/* Animated spinner icon */}
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '50%',
          border: '3px solid rgba(204, 255, 0, 0.15)',
          borderTop: '3px solid #CCFF00',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        
        <h2 className="bebas" style={{ color: '#CCFF00', marginBottom: '8px', fontSize: '1.8rem' }}>
          Sending Emails...
        </h2>
        <p style={{ color: '#fff', marginBottom: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}>
          {currentIndex} of {total} sent
        </p>
        {currentEmail && (
          <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '20px', fontFamily: 'monospace' }}>
            → {currentEmail}
          </p>
        )}
        
        {/* Progress Bar */}
        <div style={{ 
          width: '100%', background: '#1a1a1a', borderRadius: '6px', 
          height: '12px', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ 
            width: `${percentage}%`, 
            background: 'linear-gradient(90deg, #CCFF00, #a8d600)', 
            height: '100%', 
            transition: 'width 0.4s ease',
            borderRadius: '6px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 1.5s infinite',
            }} />
          </div>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '18px' }}>
          ⚠️ Please do not close this window.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

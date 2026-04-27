"use client";

import { useState } from 'react';
import BulkProgressModal from './BulkProgressModal';
import BulkResultsModal from './BulkResultsModal';

export interface SelectedMember {
  id: string;
  email: string;
  name: string;
}

interface BulkEmailButtonProps {
  selectedMembers: SelectedMember[];
  onEmailSuccess: (id: string) => void;
  onComplete: (successCount: number, totalCount: number) => void;
}

export default function BulkEmailButton({ selectedMembers, onEmailSuccess, onComplete }: BulkEmailButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [successes, setSuccesses] = useState<string[]>([]);
  const [failures, setFailures] = useState<SelectedMember[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');

  const [queue, setQueue] = useState<SelectedMember[]>([]);

  if (selectedMembers.length === 0) {
    return null;
  }

  const handleInitiate = () => {
    setQueue(selectedMembers);
    setShowConfirm(true);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const processQueue = async (membersToProcess: SelectedMember[]) => {
    setShowConfirm(false);
    setShowProgress(true);
    setShowResults(false);
    
    let currentSuccesses = [...successes];
    let currentFailures: SelectedMember[] = [];
    
    for (let i = 0; i < membersToProcess.length; i++) {
      setCurrentIndex(i);
      const member = membersToProcess[i];
      setCurrentEmail(member.email);
      
      try {
        const response = await fetch('/api/send-renewal-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: member.email, memberId: member.id })
        });
        
        if (response.ok) {
          currentSuccesses.push(member.id);
          onEmailSuccess(member.id);
        } else {
          currentFailures.push(member);
        }
      } catch (e) {
        currentFailures.push(member);
      }
      
      await delay(500);
    }
    
    setCurrentIndex(membersToProcess.length);
    setSuccesses(currentSuccesses);
    setFailures(currentFailures);
    
    setShowProgress(false);
    setShowResults(true);
  };

  const handleConfirm = () => {
    setSuccesses([]);
    setFailures([]);
    setCurrentIndex(0);
    setCurrentEmail('');
    processQueue(queue);
  };

  const handleRetry = () => {
    const failedMembers = [...failures];
    setQueue(failedMembers);
    setCurrentIndex(0);
    setCurrentEmail('');
    setFailures([]);
    processQueue(failedMembers);
  };

  return (
    <>
      <button 
        onClick={handleInitiate}
        id="bulk-email-send-btn"
        style={{ 
          background: 'linear-gradient(135deg, #CCFF00 0%, #a8d600 100%)', 
          color: '#000', 
          fontWeight: 'bold', 
          padding: '10px 20px', 
          fontSize: '0.9rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(204, 255, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(204, 255, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(204, 255, 0, 0.3)';
        }}
      >
        📧 Send Renewal Emails ({selectedMembers.length} Selected)
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ 
            background: '#2a2a2a', 
            padding: '35px', 
            borderRadius: '16px', 
            width: '100%', 
            maxWidth: '440px', 
            textAlign: 'center',
            border: '1px solid rgba(204, 255, 0, 0.15)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            animation: 'modalFadeIn 0.25s ease-out'
          }}>
            <div style={{ 
              width: '60px', height: '60px', borderRadius: '50%', 
              background: 'rgba(204, 255, 0, 0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 20px', fontSize: '1.8rem' 
            }}>
              📧
            </div>
            <h2 className="bebas" style={{ color: '#CCFF00', marginBottom: '12px', fontSize: '1.8rem' }}>Confirm Send</h2>
            <p style={{ color: '#ccc', marginBottom: '25px', lineHeight: '1.6', fontSize: '0.95rem' }}>
              You are about to send renewal emails to <strong style={{ color: '#CCFF00' }}>{queue.length}</strong> expired members.<br />
              This cannot be undone. Continue?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleConfirm} 
                style={{ 
                  flex: 1, padding: '12px', background: '#CCFF00', color: '#000', 
                  fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '0.95rem', transition: 'all 0.2s ease'
                }}
              >
                ✅ Confirm Send
              </button>
              <button 
                onClick={() => setShowConfirm(false)} 
                style={{ 
                  flex: 1, padding: '12px', background: 'transparent', color: '#ccc', 
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '0.95rem', transition: 'all 0.2s ease'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgress && (
        <BulkProgressModal currentIndex={currentIndex} total={queue.length} currentEmail={currentEmail} />
      )}

      {/* Results Modal */}
      {showResults && (
        <BulkResultsModal 
          successCount={successes.length} 
          failures={failures} 
          onRetry={handleRetry} 
          onClose={() => {
            setShowResults(false);
            onComplete(successes.length, successes.length + failures.length);
          }} 
        />
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}

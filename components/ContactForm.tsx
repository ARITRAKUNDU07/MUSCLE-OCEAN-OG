"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import PaymentButton from './PaymentButton';

const PLAN_PRICES: Record<string, number> = {
  "1 Month Plan": 1500,
  "3 Months Plan": 3600,
  "6 Months Plan": 6000,
  "1 Year Plan": 10000,
  "Group Classes": 900,
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const plan = formData.get('plan') as string;
    const message = formData.get('message') as string;

    const supabase = createClient();
    
    // Generate a random 6 character member code
    const memberCode = 'MO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { error } = await supabase.from('members').insert([
      { firstName, lastName, email, phone, plan, message, memberCode, registeredAt: new Date().toISOString() }
    ]);

    setLoading(false);

    if (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again later.");
    } else {
      alert("Registration submitted successfully!");
      (e.target as HTMLFormElement).reset();
      setSelectedPlan("");
    }
  };

  const selectedAmount = PLAN_PRICES[selectedPlan];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-grp">
          <input type="text" name="firstName" placeholder="First Name" required />
        </div>
        <div className="form-grp">
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-grp">
          <input type="email" name="email" placeholder="Email Address" required />
        </div>
        <div className="form-grp">
          <input type="tel" name="phone" placeholder="Phone Number" required />
        </div>
      </div>
      <div className="form-grp">
        <select 
          name="plan" 
          required 
          value={selectedPlan} 
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          <option value="" disabled>Select Membership Plan</option>
          <option value="1 Month Plan">1 Month Plan</option>
          <option value="3 Months Plan">3 Months Plan</option>
          <option value="6 Months Plan">6 Months Plan</option>
          <option value="1 Year Plan">1 Year Plan</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Group Classes">Group Classes</option>
          <option value="Train via Fitpass">Train via Fitpass</option>
        </select>
      </div>
      <div className="form-grp">
        <textarea name="message" rows={4} placeholder="Tell me about your current fitness level..." required></textarea>
      </div>

      {selectedPlan && selectedAmount > 0 && (
        <div style={{ background: '#2a2a2a', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #CCFF00' }}>
          <div style={{ color: '#fff', marginBottom: '5px' }}>Selected Plan: <span style={{ fontWeight: 'bold' }}>{selectedPlan}</span></div>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>Total Amount: <span style={{ color: '#CCFF00', fontWeight: 'bold' }}>₹{selectedAmount}</span></div>
          <PaymentButton amount={selectedAmount} planName={selectedPlan} />
        </div>
      )}

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Sending...' : 'Send Request / Submit Details'}
      </button>
    </form>
  );
}

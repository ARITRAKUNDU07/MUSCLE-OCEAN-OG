"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const text = formData.get('text') as string;
    const rating = parseInt(formData.get('rating') as string);

    const supabase = createClient();
    
    const { error } = await supabase.from('reviews').insert([
      { name, rating, text, createdAt: new Date().toISOString() }
    ]);

    setLoading(false);

    if (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } else {
      alert("Review submitted successfully! Thank you.");
      (e.target as HTMLFormElement).reset();
      router.refresh(); // refresh the server component to get new reviews
    }
  };

  return (
    <div className="form-box">
      <span className="section-tag">Your Feedback</span>
      <h2 className="section-title bebas" style={{ marginBottom: '20px' }}>Leave a Review</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grp">
          <input type="text" name="name" placeholder="Your Name" required />
        </div>
        <div className="form-grp">
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--light)' }}>Rating:</label>
          <div className="rating-select" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input type="radio" id="star5" name="rating" value="5" defaultChecked style={{ display: 'none' }} />
            <label htmlFor="star5" style={{ cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>5 Stars</label>
            <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
            <label htmlFor="star4" style={{ cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>4 Stars</label>
            <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
            <label htmlFor="star3" style={{ cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>3 Stars</label>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--light)' }}>Note: The selected star button will not turn green in this Next.js conversion without extra CSS, but your choice will be recorded.</p>
        </div>
        <div className="form-grp">
          <textarea name="text" rows={5} placeholder="Share your experience at Muscle Ocean..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewForm from './ReviewForm';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('createdAt', { ascending: false });

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        <ReviewForm />

        <div>
          <h2 className="section-title bebas" style={{ marginBottom: '20px' }}>What People Say</h2>
          <div id="reviews-container">
            {reviews?.length === 0 ? (
              <p style={{ color: 'var(--light)' }}>No reviews yet. Be the first!</p>
            ) : (
              reviews?.map((review: any) => (
                <div className="review-card" key={review.id} style={{ background: 'var(--gray)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                    <div className="review-author" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{review.name}</div>
                    <div className="review-date" style={{ color: 'var(--light)', fontSize: '0.9rem' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="stars" style={{ color: 'var(--primary)', marginBottom: '10px', display: 'flex', gap: '2px' }}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                  <p style={{ color: 'var(--light)', lineHeight: 1.6 }}>{review.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

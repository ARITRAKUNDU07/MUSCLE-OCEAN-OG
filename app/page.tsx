import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ScrollAnimations from '@/components/ScrollAnimations';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(1);

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(6);

  const activeNotification = notifications?.[0]?.active ? notifications[0] : null;

  return (
    <>
      <ScrollAnimations />
      {activeNotification && (
        <div id="notification-banner" style={{ width: '100%', background: 'var(--primary)', color: '#000', textAlign: 'center', padding: '10px', fontWeight: 'bold', zIndex: 1000, position: 'relative' }}>
          <span id="notification-text">{activeNotification.text}</span>
        </div>
      )}
      
      <Navbar />

      <section id="home" className="hero">
        <div className="hero-bg-panel"></div>
        <img src="/IMG_8004.JPG.jpeg" className="hero-image" alt="Hunny Bhardwaj - Muscle Ocean" style={{ objectPosition: 'center', mixBlendMode: 'luminosity' }} />
        
        <div className="hero-content reveal">
          <span className="section-tag">Welcome to</span>
          <h1 className="hero-title bebas">
            MUSCLE <br />
            <span className="outline">OCEAN</span>
          </h1>
          <p className="hero-subtitle">Based in Najafgarh, New Delhi. Specialized strength coaching and personal training tailored for elite performance.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Start Training</a>
            <a href="#about" className="btn btn-ghost">Learn More</a>
          </div>
        </div>

        <div className="hero-stats reveal">
          <div className="stat-item">
            <div className="stat-num bebas">500+</div>
            <div className="stat-label">Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-num bebas">8+</div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-item">
            <div className="stat-num bebas">15+</div>
            <div className="stat-label">Programs</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrapper">
        <div className="marquee-content">
          <span>Personal Training ✦</span>
          <span>Strength Conditioning ✦</span>
          <span>Fat Loss ✦</span>
          <span>Muscle Building ✦</span>
          <span>Nutrition Plans ✦</span>
          <span>Competition Prep ✦</span>
          <span>Personal Training ✦</span>
          <span>Strength Conditioning ✦</span>
          <span>Fat Loss ✦</span>
          <span>Muscle Building ✦</span>
          <span>Nutrition Plans ✦</span>
          <span>Competition Prep ✦</span>
        </div>
        <div className="marquee-content">
          <span>Personal Training ✦</span>
          <span>Strength Conditioning ✦</span>
          <span>Fat Loss ✦</span>
          <span>Muscle Building ✦</span>
          <span>Nutrition Plans ✦</span>
          <span>Competition Prep ✦</span>
          <span>Personal Training ✦</span>
          <span>Strength Conditioning ✦</span>
          <span>Fat Loss ✦</span>
          <span>Muscle Building ✦</span>
          <span>Nutrition Plans ✦</span>
          <span>Competition Prep ✦</span>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about-sec">
        <div className="grid-1-1">
          <div className="about-img-wrap reveal">
            <img src="/IMG_7207.JPEG" alt="Hunny Bhardwaj Gym" className="about-img" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            <div className="about-badge">
              <span className="num">08</span>
              <span className="text">Years<br />Exp.</span>
            </div>
          </div>
          <div className="about-content reveal">
            <span className="section-tag">Meet Your Coach</span>
            <h2 className="section-title bebas">Stronger Every<br />Single Day</h2>
            <div className="divider"></div>
            <p>I am Hunny Bhardwaj, founder of MUSCLE OCEAN, operating out of Najafgarh, New Delhi. My mission is to help dedicated individuals break through plateaus and build resilient, powerful bodies. With years of hands-on experience, I skip the fads and focus on what works: hard work, consistency, and proven science.</p>
            <p>Whether you are aiming to pack on muscle, shred fat, or compete at a high level, I bring the accountability and programming necessary to get you there.</p>
            
            <div className="skill-grid">
              <div className="skill-tag">Hypertrophy</div>
              <div className="skill-tag">Powerlifting</div>
              <div className="skill-tag">Functional</div>
              <div className="skill-tag">Fat Loss</div>
              <div className="skill-tag">Diet Plans</div>
              <div className="skill-tag">Mobility</div>
            </div>
            
            <div style={{ marginTop: '30px' }}>
              <h3 className="bebas" style={{ color: 'var(--primary)', fontSize: '1.5rem', letterSpacing: '1px' }}>Achievements</h3>
              <ul style={{ listStyleType: 'none', marginTop: '10px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '5px' }}>🏆 Sheru Classic 2025 Gold Medal</li>
                <li style={{ marginBottom: '5px' }}>🏆 Amateur Olympia 2025 Gold Medal</li>
                <li style={{ marginBottom: '5px' }}>🏆 Mr India 2022 (WABBA) IABBF</li>
                <li style={{ marginBottom: '5px' }}>🏆 Mr North India 2022</li>
              </ul>

              <h3 className="bebas" style={{ color: 'var(--primary)', fontSize: '1.5rem', letterSpacing: '1px' }}>Sponsored By</h3>
              <ul style={{ listStyleType: 'none', marginTop: '10px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '5px' }}>⭐ One Science Nutrition</li>
                <li style={{ marginBottom: '5px' }}>⭐ Big Muscle Nutrition</li>
                <li style={{ marginBottom: '5px' }}>⭐ Transformium Nutrition</li>
              </ul>
            </div>
            
            <a href="#contact" className="btn btn-primary">Book Consultation</a>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="classes-sec">
        <div className="section-header-row reveal">
          <div>
            <span className="section-tag">Training Options</span>
            <h2 className="section-title bebas">Facilities / Programs</h2>
          </div>
        </div>

        <div className="classes-grid reveal">
          {/* 1 */}
          <div className="class-card">
            <div className="class-bg-num bebas">01</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>
            </div>
            <h3 className="class-name bebas">Powerlifting</h3>
            <div className="class-time">Strength Focus</div>
          </div>
          {/* 2 */}
          <div className="class-card">
            <div className="class-bg-num bebas">02</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <h3 className="class-name bebas">HIT</h3>
            <div className="class-time">High Intensity Training</div>
          </div>
          {/* 3 */}
          <div className="class-card">
            <div className="class-bg-num bebas">03</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
            </div>
            <h3 className="class-name bebas">Bodybuilding</h3>
            <div className="class-time">Muscle Hypertrophy</div>
          </div>
          {/* 4 */}
          <div className="class-card">
            <div className="class-bg-num bebas">04</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h3 className="class-name bebas">Core & Mobility</h3>
            <div className="class-time">Flexibility & Core Strength</div>
          </div>
          {/* 5 */}
          <div className="class-card">
            <div className="class-bg-num bebas">05</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M21 3H3v18h18V3zM9 17H7v-4H5v-2h2V7h2v10zm6 0h-2V7h2v10z"/></svg>
            </div>
            <h3 className="class-name bebas">Cardio</h3>
            <div className="class-time">Endurance Training</div>
          </div>
          {/* 6 */}
          <div className="class-card">
            <div className="class-bg-num bebas">06</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7.5v-2h-2v-1.5h2v-2H6V10h1.5V8.5h1.5V10H11v1.5H9.5v2h2v1.5h-2V17zm8-1.5h-2.5V17H13v-4h4v2.5zM13 11V7h4v4h-4z"/></svg>
            </div>
            <h3 className="class-name bebas">Zumba</h3>
            <div className="class-time">Dance Fitness</div>
          </div>
          {/* 7 */}
          <div className="class-card">
            <div className="class-bg-num bebas">07</div>
            <div className="icon-square">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <h3 className="class-name bebas">Yoga</h3>
            <div className="class-time">Mind & Body Balance</div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery-sec" style={{ padding: '100px 5%' }}>
        <div className="reveal">
          <span className="section-tag">See It In Action</span>
          <h2 className="section-title bebas">Gallery</h2>
        </div>
        
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <img src="/IMG_7204.JPEG" alt="Gallery Image 1" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
          <img src="/IMG_8022.JPG.jpeg" alt="Gallery Image 2" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-sec">
        <div className="section-header-row reveal">
          <span className="section-tag">Invest in yourself</span>
          <h2 className="section-title bebas">Membership Plans</h2>
        </div>

        <div className="pricing-grid reveal">
          {/* Plan 1 */}
          <div className="price-card">
            <div className="price-tag">1 Month</div>
            <div className="price-num-wrap bebas">
              <span className="currency">₹</span>
              <span className="price-num">1500</span>
            </div>
            <div className="price-m">monthly</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                General Gym Access
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Basic Equipment Guide
              </li>
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{ width: '100%' }}>Select Plan</a>
          </div>

          {/* Plan 2 */}
          <div className="price-card">
            <div className="price-tag">3 Months</div>
            <div className="price-num-wrap bebas">
              <span className="currency">₹</span>
              <span className="price-num">3600</span>
            </div>
            <div className="price-m">for 3 months</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                General Gym Access
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Basic Equipment Guide
              </li>
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{ width: '100%' }}>Select Plan</a>
          </div>

          {/* Plan 3 */}
          <div className="price-card">
            <div className="price-tag">6 Months</div>
            <div className="price-num-wrap bebas">
              <span className="currency">₹</span>
              <span className="price-num">6000</span>
            </div>
            <div className="price-m">for 6 months</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                General Gym Access
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Basic Equipment Guide
              </li>
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{ width: '100%' }}>Select Plan</a>
          </div>

          {/* Plan 4 */}
          <div className="price-card popular">
            <div className="popular-badge">Best Value</div>
            <div className="price-tag">1 Year</div>
            <div className="price-num-wrap bebas">
              <span className="currency">₹</span>
              <span className="price-num">10,000</span>
            </div>
            <div className="price-m">for 1 year</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                General Gym Access
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Basic Equipment Guide
              </li>
            </ul>
            <a href="#contact" className="btn btn-dark">Select Plan</a>
          </div>

          {/* Plan 5 */}
          <div className="price-card">
            <div className="price-tag">Personal Training</div>
            <div className="price-num-wrap bebas" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="price-num">Custom</span>
            </div>
            <div className="price-m">by Hunny Bhardwaj</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                3 Months Duration
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                70 Dedicated Sessions
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Advanced Coaching
              </li>
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{ width: '100%' }}>Contact Us</a>
          </div>

          {/* Plan 6 */}
          <div className="price-card">
            <div className="price-tag">Group Classes</div>
            <div className="price-num-wrap bebas">
              <span className="currency">₹</span>
              <span className="price-num">900</span>
            </div>
            <div className="price-m">per month</div>
            <div className="divider"></div>
            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Zumba
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                Yoga
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> 
                HIT (High Intensity)
              </li>
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{ width: '100%' }}>Select Plan</a>
          </div>

          {/* Plan 7 */}
          <div className="price-card">
            <div className="price-tag">Fitpass</div>
            <div className="price-num-wrap bebas" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="price-num" style={{ fontSize: '2rem' }}>Partner</span>
            </div>
            <div className="price-m">Train via Fitpass</div>
            <div className="divider"></div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <img src="/fitpass-logo.png" alt="Fitpass Logo" style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px', objectFit: 'contain' }} />
            </div>
            <a 
              href="https://fitpass.co.in/?srsltid=AfmBOork1jsH2FomMtztAjKnPwn41P7Q8uC6iqk6Qr6_FrxJCxJegXk1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn" 
              style={{ width: '100%', background: '#CCFF00', color: '#000', fontWeight: 'bold', display: 'inline-block', textAlign: 'center', borderRadius: '8px' }}
            >
              Get Fitpass
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-sec">
        <div className="reveal">
          <span className="section-tag">Success Stories</span>
          <h2 className="section-title bebas">Member Results</h2>
        </div>

        <div className="testi-grid reveal">
          {reviews?.length === 0 ? (
            <p style={{ color: 'var(--light)', gridColumn: '1 / -1', textAlign: 'center' }}>No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews?.map((review: any) => (
              <div className="testi-card" key={review.id}>
                <div className="stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
                <p className="quote">"{review.text}"</p>
                <div className="client-name">{review.name}</div>
                <div className="client-achieve" style={{ color: 'var(--light)', fontSize: '0.9rem', marginTop: '5px' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-sec">
        <div className="grid-1-1">
          <div className="reveal">
            <span className="section-tag">Take the first step</span>
            <h2 className="section-title bebas">Let's Work<br />Together</h2>
            <p style={{ color: 'var(--light)', marginBottom: '20px' }}>Ready to transform your physique and strength? Fill out the form or reach out directly. Let's discuss your goals.</p>
            
            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <div className="contact-lbl">Location</div>
                  <div className="contact-val">House no - 24, Z Block, Block X, Shyam Vihar Phase-1, Najafgarh, New Delhi, Delhi, 110043</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div>
                  <div className="contact-lbl">Phone</div>
                  <div className="contact-val">+91 98108 11914, +91 70111 82755</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <div className="contact-lbl">Email</div>
                  <div className="contact-val">Mayankbisht6121@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-box reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import ArticleCard from "../ArticleCard";
import "../landing.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const categories = ["All", "Technology", "Lifestyle", "Design", "Culture", "Science"];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await API.get("/articles");
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles by selected category
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  // Get featured articles (first 3)
  const featuredArticles = articles.slice(0, 3);
  // Get spotlight article (4th article)
  const spotlightArticle = articles[3];

  const handleExploreStories = () => {
    if (!user) {
      navigate('/register');
    }
  };

  return (
    <>
      {/* If user is logged in, show only articles section - skip landing page */}
      {user ? (
        <section className="hero-articles">
          <div className="container">
            <div style={{ marginBottom: 'var(--sp-8)', textAlign: 'center' }}>
              <h2 className="h2">Latest Articles</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--sp-2)' }}>
                Discover insights and inspiration from our community
              </p>
            </div>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              gap: 'var(--sp-3)',
              justifyContent: 'center',
              marginBottom: 'var(--sp-10)',
              flexWrap: 'wrap'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`badge ${selectedCategory === cat ? 'badge-rose' : 'badge-neutral'}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedCategory === cat ? 600 : 500,
                    transition: 'all var(--dur-fast)',
                    border: 'none',
                    background: selectedCategory === cat ? 'var(--accent)' : 'var(--bg-subtle)',
                    color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredArticles.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--sp-10)', color: 'var(--text-muted)' }}>
                <p>No articles found in {selectedCategory === "All" ? "the blog" : `${selectedCategory}`}. Check back soon!</p>
              </div>
            ) : (
              <div className="article-grid">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* LANDING PAGE - Only visible when NOT logged in */}
          {/* ================= HERO SECTION ================= */}
          <section className="hero-landing">
            <div className="hero-landing__bg">
              <div className="glow-orb"></div>
              <div className="glow-orb glow-orb--secondary"></div>
            </div>
            
            <div className="hero-landing__content">
              <h1 className="hero-landing__title">Write. Share. Inspire</h1>
              <p className="hero-landing__description">
               Your Voice , Your Story, Your Community. 
              </p>
              
              <div className="hero-landing__ctas">
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={() => !user ? navigate('/register') : navigate('/article')}
                >
                  Get Started
                </button>
                <button 
                  className="btn btn-secondary btn-lg" 
                  onClick={handleExploreStories}
                >
                  Explore Stories
                </button>
              </div>
            </div>
          </section>

          {/* ================= CATEGORIES SECTION ================= */}
          <section className="categories-section">
            <div className="categories-inner">
              <div className="categories-list">
                {categories.filter(cat => cat !== "All").map((cat) => (
                  <button 
                    key={cat}
                    className="category-tag"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ================= FEATURED ARTICLES SECTION ================= */}
          {articles.length > 0 && (
            <section className="featured-section">
              <div className="featured-section__inner">
                <div style={{ textAlign: 'center', marginBottom: 'var(--sp-12)' }}>
                  <span style={{ display: 'inline-block', padding: 'var(--sp-2) var(--sp-6)', background: 'rgba(91, 141, 239, 0.1)', border: '1px solid rgba(91, 141, 239, 0.3)', borderRadius: 'var(--r-full)', color: 'rgba(91, 141, 239, 0.9)', fontSize: 'var(--text-sm)', fontWeight: '600', letterSpacing: '0.05em', marginBottom: 'var(--sp-6)' }}>
                    ✦ Featured Stories
                  </span>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '400', color: '#f8fafc', marginBottom: 'var(--sp-3)', letterSpacing: '-1px' }}>
                    Handpicked for You
                  </h2>
                  <p style={{ color: 'rgba(179, 179, 179, 0.8)', fontSize: 'var(--text-base)' }}>
                    Discover our most compelling articles curated just for you
                  </p>
                </div>
                <div className="featured-grid">
                  {featuredArticles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ================= SPOTLIGHT SECTION ================= */}
          {spotlightArticle && (
            <section className="spotlight-section">
              <div className="spotlight-inner">
                <div className="spotlight-content">
                  <h2>Harness the Street</h2>
                  <p>
                    Fusce quis nibh porta senectus dignissim suspendisse pellentesque sapien.
                  </p>
                  <div className="spotlight-ctas">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => navigate(`/article/${spotlightArticle._id}`)}
                    >
                      Get Inspired
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setSelectedCategory("All")}
                    >
                      Get Stories
                    </button>
                  </div>
                </div>
                <div className="spotlight-image">
                  {spotlightArticle.coverImage && (
                    <img 
                      src={spotlightArticle.coverImage.startsWith('http') 
                        ? spotlightArticle.coverImage 
                        : `http://localhost:5000/${spotlightArticle.coverImage}`
                      } 
                      alt={spotlightArticle.title} 
                    />
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ================= JOIN OUR COMMUNITY SECTION ================= */}
          <section className="community-section">
            <div className="community-bg">
              <div className="community-orb community-orb-1"></div>
              <div className="community-orb community-orb-2"></div>
              <div className="community-orb community-orb-3"></div>
              <div className="animated-grid"></div>
            </div>
            
            <div className="community-container">
              {/* Header */}
              <div className="community-header">
                <span className="community-badge">✦ Community Awaits</span>
                <h2 className="community-title">Join Our Creative Family</h2>
                <p className="community-subtitle">
                  Be part of a thriving community where voices are heard, stories are shared, and ideas spark inspiration
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="community-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">📚</div>
                  <h4>Read Inspiring Articles</h4>
                  <p>Discover curated stories from talented writers</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✍️</div>
                  <h4>Share Your Voice</h4>
                  <p>Write and publish your own unique perspectives</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💬</div>
                  <h4>Join Conversations</h4>
                  <p>Engage through comments and meaningful discussions</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🌟</div>
                  <h4>Grow Your Reach</h4>
                  <p>Connect with like-minded readers and creators</p>
                </div>
              </div>

              {/* CTA Cards */}
              <div className="community-cards">
                <div 
                  className="community-card community-card--signin"
                  onClick={() => navigate('/login')}
                >
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="card-icon">👤</div>
                    <h3>Welcome Back</h3>
                    <p>Sign in to your account</p>
                    <span className="card-cta">Continue Reading <span className="arrow-icon">→</span></span>
                  </div>
                </div>

                <div 
                  className="community-card community-card--signup"
                  onClick={() => navigate('/register')}
                >
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="card-icon">✨</div>
                    <h3>New Here?</h3>
                    <p>Create your account today</p>
                    <span className="card-cta">Start Your Journey <span className="arrow-icon">→</span></span>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="community-stats">
                <div className="stat">
                  <span className="stat-number">1K+</span>
                  <span className="stat-label">Stories Published</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">1K+</span>
                  <span className="stat-label">Active Members</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Topics Covered</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}


    </>
  );
};

export default Home;
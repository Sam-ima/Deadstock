import React, { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, ArrowRight, Gavel, Package } from "lucide-react";

const DeadstockMarketplace = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion & Apparel",
    "Home & Garden",
    "Industrial Equipment",
    "Food & Beverage",
    "Health & Beauty",
    "Sports & Outdoors",
    "Automotive",
  ];

  const products = [
    { price: "$2,450", time: "2h 15m", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" },
    { price: "$1,200", time: "Ends Soon", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=400" },
    { price: "$890", time: "5h 42m", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400" },
    { price: "$5,600", time: "1h 05m", img: "https://images.unsplash.com/photo-1530124560676-586cad3ad784?q=80&w=400" },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarBg}>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200"
            alt="Navbar background"
            style={styles.navbarImage}
          />
          <div style={styles.navbarOverlay}></div>
        </div>

        <div style={styles.navContent}>
          {/* Logo and Menu */}
          <div style={styles.leftSection}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>D</div>
              <span style={styles.logoText}>DEADSTOCK</span>
            </div>

            <div style={styles.menu}>
              <div
                style={styles.menuItem}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button style={styles.menuButton}>
                  Categories <ChevronDown size={16} style={styles.chevron} />
                </button>

                {isCategoryOpen && (
                  <ul style={styles.dropdown}>
                    {categories.map((cat) => (
                      <li key={cat} style={styles.dropdownItem}>
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button style={styles.menuButton}>
                <span style={styles.liveIndicator}></span>
                Auctions
              </button>

              <button style={styles.menuButton}>Featured Deals</button>

              <button style={styles.menuButton}>
                For Business
                <span style={styles.badge}>B2B & B2C</span>
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div style={styles.rightSection}>
            <button style={styles.iconButton}>
              <Search size={20} />
            </button>

            <div style={styles.cartContainer}>
              <ShoppingCart size={20} />
              <span style={styles.cartBadge}>3</span>
            </div>

            <button style={styles.loginButton}>
              <User size={18} />
              Login / Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            alt="Warehouse"
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay}></div>
        </div>

        <div style={styles.heroContent}>
          {/* Left Content */}
          <div style={styles.leftContent}>
            <h1 style={styles.heading}>
              Turn Excess Inventory <br />
              <span style={styles.headingAccent}>Into Opportunity</span>
            </h1>

            <p style={styles.description}>
              B2B & B2C marketplace for deadstock, overstock, and liquidation goods.
              Connect with thousands of buyers and sellers in real-time auctions.
            </p>

            <div style={styles.buttonGroup}>
              <button style={styles.primaryButton}>
                Start Bidding <ArrowRight size={20} style={styles.arrowIcon} />
              </button>

              <button style={styles.secondaryButton}>
                Browse Categories
              </button>
            </div>

            <div style={styles.stats}>
              <div style={styles.statItem}>
                <div style={styles.statIcon}>
                  <Gavel />
                </div>
                <div>
                  <p style={styles.statNumber}>500+</p>
                  <p style={styles.statLabel}>Active Auctions</p>
                </div>
              </div>

              <div style={styles.statItem}>
                <div style={styles.statIcon}>
                  <Package />
                </div>
                <div>
                  <p style={styles.statNumber}>10K+</p>
                  <p style={styles.statLabel}>Products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards - Ending Soon */}
          <div style={styles.rightCards}>
            <h3 style={styles.cardsSectionTitle}>Ending Soon</h3>
            <div style={styles.cardsGrid}>
              {products.map((item, i) => (
                <div key={i} style={styles.productCard}>
                  <img
                    src={item.img}
                    style={styles.productImage}
                    alt="product"
                  />

                  <div style={styles.priceTag}>{item.price}</div>

                  <div style={styles.timeTag}>
                    <span>Time Left</span>
                    <span style={styles.timeValue}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Typography */}
        <div style={styles.bigTypography}>
          <p style={styles.bigNumber}>100K+</p>
          <p style={styles.bigLabel}>Products</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#000',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    height: '80px',
  },
  navbarBg: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  },
  navbarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.3,
  },
  navbarOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
  },
  navContent: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    borderRadius: '4px',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  menuItem: {
    position: 'relative',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0.5rem 0',
  },
  chevron: {
    marginLeft: '0.25rem',
  },
  liveIndicator: {
    width: '8px',
    height: '8px',
    backgroundColor: '#dc2626',
    borderRadius: '50%',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  badge: {
    backgroundColor: '#ea580c',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 700,
    marginLeft: '0.5rem',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '256px',
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    borderRadius: '12px',
    padding: '1rem 0',
    marginTop: '0.5rem',
    listStyle: 'none',
  },
  dropdownItem: {
    padding: '0.5rem 1.5rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    color: '#fff',
  },
  iconButton: {
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  cartContainer: {
    position: 'relative',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  cartBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#ea580c',
    fontSize: '10px',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontWeight: 700,
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '0.5rem 1.25rem',
    borderRadius: '24px',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  hero: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '120px',
    paddingBottom: '80px',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '92%',
    height: '92%',
    objectFit: 'cover',
    opacity: 0.2,
    borderRadius: '24px',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent)',
    borderRadius: '24px',
  },
  heroContent: {
    position: 'relative',
    zIndex: 20,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  leftContent: {
    paddingTop: '2rem',
  },
  heading: {
    fontSize: '5rem',
    fontWeight: 900,
    color: '#fff',
    lineHeight: 1.05,
    marginBottom: '2rem',
  },
  headingAccent: {
    color: '#f97316',
  },
  description: {
    color: '#d1d5db',
    fontSize: '1.125rem',
    marginBottom: '2.5rem',
    maxWidth: '32rem',
    lineHeight: 1.75,
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '4rem',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#000',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  arrowIcon: {
    marginLeft: '0.5rem',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  stats: {
    display: 'flex',
    gap: '3rem',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statIcon: {
    padding: '0.75rem',
    backgroundColor: 'rgba(234, 88, 12, 0.2)',
    borderRadius: '8px',
    color: '#f97316',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: '#fff',
    margin: 0,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: 0,
  },
  rightCards: {
    paddingTop: '2rem',
  },
  cardsSectionTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '32px',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: '4/5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.5s',
  },
  priceTag: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#10b981',
    color: '#fff',
    fontWeight: 700,
    padding: '0.25rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
  },
  timeTag: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fff',
    padding: '0.5rem 0.75rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
  },
  timeValue: {
    fontWeight: 700,
    color: '#f97316',
  },
  bigTypography: {
    position: 'absolute',
    bottom: '2.5rem',
    right: '3rem',
    zIndex: 10,
    textAlign: 'right',
  },
  bigNumber: {
    fontSize: '4.5rem',
    fontWeight: 900,
    color: 'rgba(255,255,255,0.2)',
    lineHeight: 1,
    margin: 0,
  },
  bigLabel: {
    fontSize: '1.25rem',
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    margin: 0,
  },
};

export default DeadstockMarketplace;
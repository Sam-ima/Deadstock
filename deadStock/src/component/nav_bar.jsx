import React, { useState } from "react";
import logo from "../assets/deadstock_logo.png";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import categories from "../component/data/categories_data";
import styles from "../component/style";

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
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
        <div style={styles.leftSection}>
          <div style={styles.logo}>
            <img src={logo} alt="Deadstock Logo" style={styles.logoImage} />
          </div>

          <div style={styles.menu}>
            <div
              style={styles.menuItem}
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button style={styles.menuButton}>
                Categories <ChevronDown size={16} />
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

            <button style={styles.menuButton}>Auctions</button>
            <button style={styles.menuButton}>Featured Deals</button>
            <button style={styles.menuButton}>
              For Business <span style={styles.badge}>B2B & B2C</span>
            </button>
          </div>
        </div>

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
  );
};

export default Navbar;

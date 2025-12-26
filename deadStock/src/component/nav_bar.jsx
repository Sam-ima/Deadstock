import React, { useState, useEffect } from "react";
import logo from "../assets/deadstock_logo.png";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import categories from "../component/data/categories_data";
import businessOptions from "../component/data/business_data"; // new file for B2B & B2C options
import styles from "../component/style";

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false); // new
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        ...styles.navbar,
        ...(scrolled ? styles.navbarScrolled : styles.navbarTransparent),
      }}
    >
      <div style={styles.navContent}>
        {/* LEFT SECTION */}
        <div style={styles.leftSection}>
          <div style={styles.logo}>
            <img src={logo} alt="Deadstock Logo" style={styles.logoImage} />
          </div>

          <div style={styles.menu}>
            {/* Categories Dropdown */}
            <div
              style={styles.menuItem}
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                style={{
                  ...styles.menuButton,
                  ...(scrolled ? styles.menuButtonScrolled : {}),
                }}
              >
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

            {/* Auctions & Featured Deals */}
            <button
              style={{
                ...styles.menuButton,
                ...(scrolled ? styles.menuButtonScrolled : {}),
              }}
            >
              Auctions
            </button>
            <button
              style={{
                ...styles.menuButton,
                ...(scrolled ? styles.menuButtonScrolled : {}),
              }}
            >
              Featured Deals
            </button>

            {/* Business Dropdown */}
            <div
              style={styles.menuItem}
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
            >
              <button
                style={{
                  ...styles.menuButton,
                  ...(scrolled ? styles.menuButtonScrolled : {}),
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                For Business 
                {/* <span style={styles.badge}>B2B & B2C</span>{" "} */}
                <ChevronDown size={16} />
              </button>
              {isBusinessOpen && (
                <ul style={styles.dropdown}>
            {businessOptions.map((option) => (
  <li
    key={option.label}
    style={{
      ...styles.dropdownItem,
      color: styles.badge.color, 
    }}
  >
    {option.label}
  </li>
))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div style={styles.rightSection}>
          <button
            style={{
              ...styles.iconButton,
              ...(scrolled ? styles.iconButtonScrolled : {}),
            }}
          >
            <Search size={20} />
          </button>

          <div
            style={{
              ...styles.cartContainer,
              color: scrolled ? "#000" : "#fff",
            }}
          >
            <ShoppingCart size={20} />
            <span style={styles.cartBadge}>3</span>
          </div>

          <button
            style={{
              ...styles.loginButton,
              ...(scrolled ? styles.loginButtonScrolled : {}),
            }}
          >
            <User size={18} />
            Login / Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

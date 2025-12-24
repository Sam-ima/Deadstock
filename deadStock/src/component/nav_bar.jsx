import { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { categories } from "../component/data/categories_data";


const Navbar = ({ theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav style={theme.navbar}>
      <div style={theme.navContent}>
        <div style={theme.leftSection}>
          <div style={theme.logo}>
            <div style={theme.logoIcon}>D</div>
            <span style={theme.logoText}>DEADSTOCK</span>
          </div>

          <div style={theme.menu}>
            <div
              style={theme.menuItem}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button style={theme.menuButton}>
                Categories <ChevronDown size={16} />
              </button>

              {open && (
                <ul style={theme.dropdown}>
                  {categories.map((c) => (
                    <li key={c} style={theme.dropdownItem}>{c}</li>
                  ))}
                </ul>
              )}
            </div>

            <button style={theme.menuButton}>Auctions</button>
            <button style={theme.menuButton}>Featured Deals</button>
          </div>
        </div>

        <div style={theme.rightSection}>
          <Search size={20} />
          <ShoppingCart size={20} />
          <button style={theme.loginButton}>
            <User size={18} /> Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

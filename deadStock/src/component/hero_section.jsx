import React from "react";
import { ArrowRight, Gavel, Package } from "lucide-react";
import EndingSoonCards from "./card/endingsoon_card";
import styles from "../component/style";

const Hero = () => {
  return (
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
              Start Bidding <ArrowRight size={20} />
            </button>
            <button style={styles.secondaryButton}>Browse Categories</button>
          </div>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statIcon}><Gavel /></div>
              <div>
                <p style={styles.statNumber}>500+</p>
                <p style={styles.statLabel}>Active Auctions</p>
              </div>
            </div>

            <div style={styles.statItem}>
              <div style={styles.statIcon}><Package /></div>
              <div>
                <p style={styles.statNumber}>10K+</p>
                <p style={styles.statLabel}>Products</p>
              </div>
            </div>
          </div>
        </div>

        <EndingSoonCards />
      </div>

      <div style={styles.bigTypography}>
        <p style={styles.bigNumber}>100K+</p>
        <p style={styles.bigLabel}>Products</p>
      </div>
    </section>
  );
};

export default Hero;

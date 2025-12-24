import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaShieldAlt, FaLock, FaShippingFast } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>DEADSTOCK</h4>
            <p>
              The premier marketplace for authentic deadstock items. 
              Connecting collectors, resellers, and enthusiasts worldwide.
            </p>
            <div className="social-links">
              <a href="#facebook"><FaFacebook /></a>
              <a href="#twitter"><FaTwitter /></a>
              <a href="#instagram"><FaInstagram /></a>
              <a href="#linkedin"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#featured">Featured Items</a></li>
              <li><a href="#bidding">Bidding</a></li>
              <li><a href="#sell">Sell on Deadstock</a></li>
              <li><a href="#authenticity">Authenticity Guarantee</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Account Types</h4>
            <ul>
              <li><a href="#b2c">B2C Individual Account</a></li>
              <li><a href="#b2b">B2B Business Account</a></li>
              <li><a href="#reseller">Reseller Program</a></li>
              <li><a href="#wholesale">Wholesale Portal</a></li>
              <li><a href="#api">API Access</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Trust & Safety</h4>
            <div className="trust-features">
              <div className="trust-item">
                <FaShieldAlt />
                <span>100% Authenticated</span>
              </div>
              <div className="trust-item">
                <FaLock />
                <span>Secure Payments</span>
              </div>
              <div className="trust-item">
                <FaShippingFast />
                <span>Insured Shipping</span>
              </div>
            </div>
            <p className="contact-info">
              Email: support@deadstock.com<br />
              Phone: +1 (555) 123-4567<br />
              Business Hours: 24/7 Support
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Deadstock Marketplace. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a> | 
            <a href="#terms"> Terms of Service</a> | 
            <a href="#cookies"> Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
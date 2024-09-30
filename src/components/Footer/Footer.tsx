import React from 'react';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-links">
          <li><a href="/faq" className="footer-link">FAQ</a></li>
          <li><a href="/help-center" className="footer-link">Help Center</a></li>
          <li><a href="/contact-us" className="footer-link">Contact Us</a></li>
        </ul>
        <ul className="footer-links">
          <li><a href="/work-with-us" className="footer-link">Work With Us</a></li>
          <li><a href="/terms-of-use" className="footer-link">Terms of Use</a></li>
          <li><a href="/cookie-settings" className="footer-link">Cookie Settings</a></li>
        </ul>
        <ul className="footer-links">
          <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
          <li><a href="/sitemap" className="footer-link">Sitemap</a></li>
          <li><a href="/careers" className="footer-link">Careers</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

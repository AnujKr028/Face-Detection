import React from 'react';
import './Footer.css'; // Assuming you will create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="footer-content">
        <p>Made with ❤️ by Anuj</p>
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Anuj. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

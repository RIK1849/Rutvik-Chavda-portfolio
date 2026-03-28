import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} RUTVIK CHAVDA · ENDPOINT SECURITY
          ENGINEER · SOPHOS
        </p>
        <p>AHMEDABAD, GUJARAT, INDIA</p>
      </div>
    </footer>
  );
}
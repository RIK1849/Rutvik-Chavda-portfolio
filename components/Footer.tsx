import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="foot-c">
        © {new Date().getFullYear()} RUTVIK CHAVDA · ENDPOINT SECURITY ENGINEER · SOPHOS
      </p>
      <p className="foot-c" style={{ color:"var(--cyan-dim)" }}>
        AHMEDABAD, GUJARAT, INDIA
      </p>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} Rutvik Chavda. Built for roles in
          endpoint security, technical support, incident management, and
          investigation-driven engineering.
        </p>
      </div>
    </footer>
  );
}
export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        Rutvik Chavda
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', opacity: 0.8 }}>
        Endpoint Security Engineer | EDR XDR | Threat Hunting
      </p>
    </div>
  );
}

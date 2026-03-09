import AnimatedBackground from '../components/AnimatedBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, color: 'white', fontFamily: 'sans-serif' }}>
        <AnimatedBackground />
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
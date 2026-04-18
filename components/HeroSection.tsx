"use client";
import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Endpoint Security Engineer",
  "EDR/XDR Specialist",
  "Incident Responder",
  "Threat Hunter",
  "Sophos SME",
];

const STATS = [
  { value: "3+", label: "Years @ Sophos" },
  { value: "Top 10", label: "FY25 Support Engineer" },
  { value: "CY25", label: "Community Contributor" },
  { value: "Win/Mac/Linux", label: "Platform Coverage" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [tick, setTick] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setTick((t) => !t), 530);
    return () => clearInterval(id);
  }, []);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 18);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコSECURITYXDRSOPHOS";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff9930";
      ctx.font = "13px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Matrix rain */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,200,100,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,100,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,100,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(0,255,100,0.3)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: "2rem",
            background: "rgba(0,255,100,0.05)",
            animation: "fadeSlideDown 0.6s ease both",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00ff64",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#00ff64",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
            margin: "0 0 0.5rem",
            animation: "fadeSlideDown 0.7s ease 0.1s both",
            fontFamily: "'Syne', 'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Rutvik
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(0,255,100,0.6)",
              color: "transparent",
            }}
          >
            Chavda
          </span>
        </h1>

        {/* Typewriter role */}
        <div
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            animation: "fadeSlideDown 0.7s ease 0.2s both",
          }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              color: "#00ff64",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            {displayed}
            <span
              style={{
                opacity: tick ? 1 : 0,
                borderRight: "2px solid #00ff64",
                marginLeft: 2,
                display: "inline-block",
                height: "1.1em",
                verticalAlign: "middle",
              }}
            />
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            maxWidth: 560,
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            animation: "fadeSlideDown 0.7s ease 0.3s both",
          }}
        >
          Deep-rooted in EDR/XDR, incident response, and threat hunting across
          Windows, macOS, and Linux. Building endpoint security expertise one
          escalation at a time.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
            animation: "fadeSlideDown 0.7s ease 0.4s both",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "#00ff64",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.05em",
              fontFamily: "monospace",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(0,255,100,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            HIRE ME →
          </a>
          <a
            href="#projects"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              border: "1px solid rgba(0,255,100,0.4)",
              color: "#00ff64",
              fontWeight: 600,
              fontSize: "0.9rem",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.05em",
              fontFamily: "monospace",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,100,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            VIEW WORK
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1px",
            border: "1px solid rgba(0,255,100,0.15)",
            borderRadius: 8,
            overflow: "hidden",
            background: "rgba(0,255,100,0.05)",
            animation: "fadeSlideDown 0.7s ease 0.5s both",
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "1.2rem 1rem",
                borderRight: "1px solid rgba(0,255,100,0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#00ff64",
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          animation: "fadeSlideDown 1s ease 1s both",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.15em",
            fontFamily: "monospace",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(0,255,100,0.5), transparent)",
            animation: "scrollBar 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,100,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(0,255,100,0); }
        }
        @keyframes scrollBar {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
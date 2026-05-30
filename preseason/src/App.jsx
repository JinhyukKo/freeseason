import { useState, useEffect, useRef } from "react";

const MEMBERS = [
  {
    name: "BARD",
    role: "Producer / Composer",
    img: "/진혁.jpeg",
  },
  {
    name: "성민",
    role: "Producer / Composer",
    img: "/성민.jpeg",
  },
  {
    name: "성빈",
    role: "Composer / Lyricist",
    img: "/성빈.jpeg",
  },
  {
    name: "한서",
    role: "Producer / Arranger",
    img: "/한서.jpeg",
  },
];

const NAV_ITEMS = ["MAIN", "ARTISTS", "WORKS", "SNS"];

export default function FloatingPreseasonSite() {
  const [activeTab, setActiveTab] = useState("MAIN");
  const [activeVideo, setActiveVideo] = useState(null);

  const canvasRef = useRef(null);

  const mainRef = useRef(null);
  const artistsRef = useRef(null);
  const worksRef = useRef(null);
  const snsRef = useRef(null);
  const extraRef = useRef(null);

  const sectionRefs = {
    MAIN: mainRef,
    ARTISTS: artistsRef,
    WORKS: worksRef,
    EXTRA: extraRef,
    SNS: snsRef,
  };

  const WORKS = [
    {
      title: "BREATH",
      artist: "스트릿 우먼 파이터 vietnam",
      role: "작/편곡 참여",
      ytId: "f9Sm9iqy0bI",
    },
    {
      title: "지구정복",
      artist: "미녕이 데려오깨 [ORIGINAL]",
      role: "작/편곡 작사",
      ytId: "rsfFoMuWKBQ",
    },
    {
      title: "Classic",
      artist: "Dolla",
      role: "작/편곡 참여",
      ytId: "o8XM8GlxaRw",
    },
    {
      title: "breath again",
      artist: "Blitzers (블리처스)",
      role: "작/편곡 참여",
      ytId: "HNUYaAkuoiY",
    },
    {
      title: "버블러스 테마곡",
      artist: "버블러스 [ORIGINAL]",
      role: "테마곡 작/편곡",
      ytId: "NHSv9dZOdFI",
    },
    {
      title: "my side / HEUNG",
      artist: "BIGMARVEL",
      role: "작곡 편곡 가사",
      ytId: "otvJLZ3Vlao",
    },
  ];

  const OTHER_WORKS = [
    { title: "Alarm", desc: "싱글 앨범", role: "작사/작곡/발매" },
    { title: "Bring it no more", desc: "싱글 앨범", role: "작사/작곡/발매" },
    { title: "약속", desc: "마지메로", role: "작사/작곡" },
    { title: "기억", desc: "마지메로", role: "작사/작곡" },
    { title: "enkai", desc: "시즈라에", role: "작사/작곡" },
    { title: "Where u at?", desc: "屁孩Ryan", role: "작곡" },
    { title: "dream pilot", desc: "Blitzers", role: "작/편곡 참여" },
    { title: "ocean blue", desc: "Blitzers", role: "편곡 참여" },
    { title: "요즘 너", desc: "브레이브걸스", role: "편곡 참여" },
    { title: "캐리 시리즈", desc: "캐리와 친구들", role: "편곡 참여" },
    { title: "fire", desc: "강철부대 OST", role: "작사/작곡/편곡 참여" },
  ];

  useEffect(() => {
    const sections = [
      { id: "MAIN", ref: mainRef },
      { id: "ARTISTS", ref: artistsRef },
      { id: "WORKS", ref: worksRef },
      { id: "SNS", ref: snsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sec = sections.find(
              (s) => s.ref.current === entry.target
            );

            if (sec) {
              setActiveTab(sec.id);
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    let vertices4D = [];

    for (let x of [-1, 1]) {
      for (let y of [-1, 1]) {
        for (let z of [-1, 1]) {
          for (let w of [-1, 1]) {
            vertices4D.push([x, y, z, w]);
          }
        }
      }
    }

    let edges = [];

    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;

        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
        }

        if (diff === 1) edges.push([i, j]);
      }
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angle += 0.004;

      const projected = vertices4D.map(([x, y, z, w]) => {
        let x1 = x * Math.cos(angle) - y * Math.sin(angle);
        let y1 = x * Math.sin(angle) + y * Math.cos(angle);

        let z1 = z * Math.cos(angle) - w * Math.sin(angle);
        let w1 = z * Math.sin(angle) + w * Math.cos(angle);

        const distance4D = 2.5;
        const factor4D = 1 / (distance4D - w1);

        let x3D = x1 * factor4D;
        let y3D = y1 * factor4D;
        let z3D = z1 * factor4D;

        const distance3D = 2.5;
        const factor2D = 180 / (distance3D - z3D);

        return {
          x: canvas.width / 2 + x3D * factor2D,
          y: canvas.height / 2 + y3D * factor2D,
          depth: w1,
        };
      });

      edges.forEach(([a, b]) => {
        ctx.beginPath();

        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);

        ctx.strokeStyle = "rgba(255,40,0,0.35)";
        ctx.lineWidth = 1;

        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.depth > 0 ? 3 : 2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "#ff2200";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToSection = (tab) => {
    sectionRefs[tab]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="viewport">
      <style>{`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Pretendard',sans-serif;
}

html,
body,
#root{
  width:100%;
  height:100%;
  overflow:hidden;
  background:#020203;
}

body{
  color:white;
}

.viewport{
  width:100%;
  height:100vh;
  overflow:hidden;
  position:relative;
  background:#020203;
}

canvas{
  position:fixed;
  inset:0;
  width:100%;
  height:100%;
  z-index:1;
  pointer-events:none;
}

nav{
  position:fixed;
  top:0;
  left:0;
  right:0;
  height:88px;
  z-index:1000;

  display:flex;
  align-items:center;
  justify-content:space-between;

  padding:0 40px;

  backdrop-filter:blur(20px);
  background:rgba(0,0,0,0.35);

  border-bottom:1px solid rgba(255,255,255,0.05);
}

.logo{
  font-size:1.4rem;
  letter-spacing:0.22em;
  cursor:pointer;
  font-weight:700;
}

.nav-right{
  display:flex;
  gap:36px;
}

.nav-item{
  color:#666;
  cursor:pointer;
  transition:0.4s;
  position:relative;
  letter-spacing:0.15em;
  font-size:0.9rem;
}

.nav-item::after{
  content:"";
  position:absolute;
  left:0;
  bottom:-8px;
  width:0;
  height:2px;
  background:#ff2200;
  transition:0.4s;
}

.nav-item.active{
  color:#ff2200;
}

.nav-item.active::after{
  width:100%;
}

main{
  height:100vh;
  overflow-y:scroll;
  scroll-snap-type:y mandatory;
  position:relative;
  z-index:10;
}

main::-webkit-scrollbar{
  display:none;
}

.panel{
  min-height:100vh;

  scroll-snap-align:start;
  scroll-snap-stop:always;

  position:relative;

  display:flex;
  flex-direction:column;
  justify-content:center;

  padding:120px 80px 80px;
}

.panel::before{
  content:"";
  position:absolute;
  inset:0;

  background:
    radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0,0,0,0.45) 100%
    );

  pointer-events:none;
}

.hero-sub{
  color:#ff2200;
  letter-spacing:0.35em;
  font-size:0.85rem;
  margin-bottom:20px;
}

.hero-title{
  font-size:clamp(4rem,12vw,10rem);
  line-height:0.85;
  letter-spacing:-0.06em;
  margin-bottom:28px;
  font-weight:800;
}

.hero-title span{
  color:#ff2200;
}

.hero-desc{
  max-width:560px;
  color:#999;
  line-height:1.8;
  font-size:1rem;
}

.section-sub{
  color:#ff2200;
  letter-spacing:0.3em;
  margin-bottom:12px;
  font-size:0.8rem;
}

.section-title{
  font-size:clamp(2.8rem,7vw,5rem);
  margin-bottom:40px;
  font-weight:800;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:24px;
  width:100%;
}

.card{
  background:rgba(15,15,18,0.55);

  backdrop-filter:blur(16px);

  border:1px solid rgba(255,255,255,0.05);

  border-radius:24px;

  overflow:hidden;

  transition:0.6s cubic-bezier(.16,1,.3,1);
}

.card:hover{
  transform:translateY(-8px);

  border-color:rgba(255,34,0,0.3);

  box-shadow:
    0 10px 40px rgba(255,34,0,0.12);
}

.member-img{
  width:100%;
  height:380px;
  object-fit:cover;

  filter:grayscale(100%);
  transition:1s;
}

.card:hover .member-img{
  filter:grayscale(0%);
  transform:scale(1.03);
}

.card-content{
  padding:22px;
}

.member-name{
  font-size:1.6rem;
  font-weight:700;
}

.member-role{
  color:#ff2200;
  margin-top:6px;
  font-size:0.8rem;
}

.work-title{
  font-size:1.1rem;
  font-weight:700;
}

.work-role{
  color:#ff2200;
  font-size:0.75rem;
}

.sns-wrap{
  display:flex;
  gap:24px;
  flex-wrap:wrap;
}

.sns-card{
  width:240px;
  height:240px;

  border-radius:28px;

  background:rgba(15,15,18,0.5);

  border:1px solid rgba(255,255,255,0.05);

  backdrop-filter:blur(20px);

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  transition:0.6s;
  cursor:pointer;
}

.sns-card:hover{
  transform:translateY(-10px);

  border-color:rgba(255,34,0,0.3);
}

.sns-icon{
  font-size:3rem;
  margin-bottom:18px;
}

.sns-title{
  font-size:1.4rem;
  font-weight:700;
}

.sns-desc{
  margin-top:8px;
  color:#666;
  font-size:0.8rem;
}

/* ========================= */
/* TABLET */
/* ========================= */

@media (max-width:1024px){

  nav{
    height:72px;
    padding:0 20px;
  }

  .logo{
    font-size:1rem;
  }

  .nav-right{
    gap:18px;
  }

  .nav-item{
    font-size:0.7rem;
  }

  .panel{
    padding:110px 24px 60px;
  }

  .hero-title{
    font-size:clamp(3rem,20vw,6rem);
  }

  .hero-desc{
    font-size:0.92rem;
    max-width:100%;
  }

  .grid{
    grid-template-columns:1fr;
  }

  .member-img{
    height:320px;
  }

  .sns-wrap{
    flex-direction:column;
  }

  .sns-card{
    width:100%;
    height:160px;
  }
}

/* ========================= */
/* MOBILE */
/* ========================= */

@media (max-width:640px){

  nav{
    height:64px;
    padding:0 14px;
  }

  .logo{
    font-size:0.8rem;
    letter-spacing:0.15em;
  }

  .nav-right{
    gap:10px;
  }

  .nav-item{
    font-size:0.58rem;
    letter-spacing:0.05em;
  }

  .panel{
    padding:90px 16px 40px;
  }

  .hero-sub{
    font-size:0.68rem;
  }

  .hero-title{
    font-size:clamp(2.8rem,22vw,5rem);
  }

  .hero-desc{
    font-size:0.82rem;
    line-height:1.7;
  }

  .section-title{
    font-size:2rem;
    margin-bottom:24px;
  }

  .member-img{
    height:240px;
  }

  .member-name{
    font-size:1.2rem;
  }

  .card-content{
    padding:16px;
  }

  .sns-card{
    height:140px;
  }

  .sns-icon{
    font-size:2rem;
    margin-bottom:12px;
  }

  .sns-title{
    font-size:1rem;
  }
}

.video-modal iframe{
  width:80%;
  height:70%;
  border:none;
  border-radius:18px;
}

@media (max-width:768px){WWQ

  .video-modal iframe{
    width:95%;
    height:32%;
  }
}
      `}</style>

      <canvas ref={canvasRef} />

      <nav>
        <div
          className="logo"
          onClick={() => scrollToSection("MAIN")}
        >
          FREESEASON
        </div>

        <div className="nav-right">
          {NAV_ITEMS.map((tab) => (
            <div
              key={tab}
              className={`nav-item ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => scrollToSection(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </nav>

      <main>
        <section ref={mainRef} className="panel">
          <div className="hero-sub">
            HYPER AUDIO DIMENSION
          </div>

          <div className="hero-title">
            FREE
            <br />
            <span>SEA</span>
            <br />
            SON
          </div>

          <div className="hero-desc">
            차트를 해킹하는 비트 아키텍처.
            <br />
            작곡, 편곡, 작사까지
            <br />
            미래적 사운드 솔루션을 구축합니다.
          </div>
        </section>

        <section ref={artistsRef} className="panel">
          <div className="section-sub">
            CORE SYSTEM OPERATORS
          </div>

          <div className="section-title">
            ARTISTS
          </div>

          <div className="grid">
            {MEMBERS.map((m) => (
              <div className="card" key={m.name}>
                <img
                  src={m.img}
                  alt={m.name}
                  className="member-img"
                />

                <div className="card-content">
                  <div className="member-name">
                    {m.name}
                  </div>

                  <div className="member-role">
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={worksRef} className="panel">
          <div className="section-sub">
            SELECTED DISCOGRAPHY
          </div>

          <div className="section-title">
            WORKS
          </div>

          <div className="grid">
            {WORKS.map((w) => (
              <div
                key={w.title}
                className="card"
                onClick={() => setActiveVideo(w.ytId)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://img.youtube.com/vi/${w.ytId}/hqdefault.jpg`}
                  alt={w.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-content">
                  <div className="member-name">
                    {w.title}
                  </div>

                  <div
                    style={{
                      color: "#888",
                      marginTop: "6px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {w.artist}
                  </div>

                  <div className="member-role">
                    {w.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={extraRef}
          className="panel"
          style={{
            height: "auto",
          }}
        >
          <div className="section-sub">
            ADDITIONAL DISCOGRAPHY
          </div>

          <div className="section-title">
            OTHER WORKS
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "16px",
              width: "100%",
            }}
          >
            {OTHER_WORKS.map((w, i) => (
              <div
                key={i}
                style={{
                  background:
                    "rgba(255,255,255,0.06)",

                  padding: "18px",

                  borderRadius: "18px",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  {w.title}
                </div>

                <div
                  style={{
                    color: "#777",
                    fontSize: "0.9rem",
                  }}
                >
                  {w.desc}
                </div>

                <div className="work-role">
                  {w.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={snsRef} className="panel">
          <div className="section-sub">
            UPLINK PROTOCOL
          </div>

          <div className="section-title">
            CONNECT
          </div>

          <div className="sns-wrap">
            <div className="sns-card">
              <div className="sns-icon">
                📸
              </div>

              <div className="sns-title">
                INSTAGRAM
              </div>

              <div className="sns-desc">
                준비중
              </div>
            </div>

            <div className="sns-card">
              <div className="sns-icon">
                𝕏
              </div>

              <div className="sns-title">
                TWITTER / X
              </div>

              <div className="sns-desc">
                준비중
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeVideo && (
        <div
          className="video-modal"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            padding: "20px",
          }}
          onClick={() => setActiveVideo(null)}
        >
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";

const MEMBERS = [
  {
    name: "BARD",
    role: "Producer / Composer",
    img: "/BARD.jpeg",
    color: "#1a0000"
  },
  {
    name: "성민",
    role: "Producer / Composer",
    img: "/성민.jpeg",
    color: "#0a0a0a",
  },
  {
    name: "성빈",
    role: "Composer / Lyricist",
    img: "/성빈.jpeg",
    color: "#1a0a00",
  },
  {
    name: "한서",
    role: "Producer / Arranger",
    img: "/한서.jpeg",
    color: "#000a1a",
  },
  {
    name: "진혁",
    role: "Producer / Arranger",
    img: "/진혁.jpg",
    color: "#0a1a00",
  }
];

const WORKS = [
  {
    title: "BREATH",
    artist: "스트릿 우먼 파이터 vietnam",
    role: "작/편곡 참여",
    youtube: "https://www.youtube.com/watch?v=f9Sm9iqy0bI",
    ytId: "f9Sm9iqy0bI",
  },
  {
    title: "지구정복",
    artist: "미녕이 데려오깨 [ORIGINAL]",
    role: "작/편곡 작사",
    youtube: "https://www.youtube.com/watch?v=rsfFoMuWKBQ",
    ytId: "rsfFoMuWKBQ",
  },
  {
    title: "Classic",
    artist: "Dolla",
    role: "작/편곡 참여",
    youtube: "https://www.youtube.com/watch?v=o8XM8GlxaRw",
    ytId: "o8XM8GlxaRw",
  },
  {
    title: "breath again",
    artist: "Blitzers (블리처스)",
    role: "작/편곡 참여",
    youtube: "https://www.youtube.com/watch?v=HNUYaAkuoiY",
    ytId: "HNUYaAkuoiY",
  },
  {
    title: "버블러스 테마곡 (마롱/하로/세로)",
    artist: "버블러스 [ORIGINAL]",
    role: "테마곡 작/편곡",
    youtube: "https://www.youtube.com/watch?v=NHSv9dZOdFI",
    ytId: "NHSv9dZOdFI",
  },
  {
    title: "my side / thursday party / HEUNG",
    artist: "BIGMARVEL",
    role: "작곡 편곡 가사",
    youtube: "https://www.youtube.com/watch?v=otvJLZ3Vlao",
    ytId: "otvJLZ3Vlao",
  },
];

const OTHER_WORKS = [
  { title: "Alarm", type: "싱글 앨범", role: "작사/작곡/발매" },
  { title: "Bring it no more", type: "싱글 앨범", role: "작사/작곡/발매" },
  { title: "약속", artist: "마지메로", role: "작사/작곡" },
  { title: "기억", artist: "마지메로", role: "작사/작곡" },
  { title: "enkai", artist: "시즈라에", role: "작사/작곡" },
  { title: "Where u at?", artist: "屁孩Ryan", role: "작곡" },
  { title: "dream pilot", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "blitz (next level remix)", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "ocean blue", artist: "Blitzers (블리처스)", role: "편곡 참여" },
  { title: "실수 좀 할게", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "K pop", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "Rain drop", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "Hapoom", artist: "Blitzers (블리처스)", role: "작/편곡 참여" },
  { title: "BuBBle BuBBle!", artist: "버블러스 [ORIGINAL]", role: "작/편곡" },
  { title: "Hello, bubble!", artist: "버블러스 [ORIGINAL]", role: "작/편곡" },
  { title: "버츄버 30문답", artist: "버블러스", role: "편곡" },
  { title: "아카데미 BGM", artist: "모바일 게임 스타시드", role: "작/편곡/믹싱" },
  { title: "요즘 너 (new ver.)", artist: "브레이브걸스", role: "편곡 참여" },
  { title: "날 따라해봐요", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "마이럽럽", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "퐁당퐁당", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "파도타기", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "새마음운동", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "치킨", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "캐리월드", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "슈퍼스타", artist: "캐리와 친구들", role: "편곡 참여" },
  { title: "녹색이념 (상업예술)", artist: "김태균 (테이크원)", role: "편곡 참여" },
  { title: "강남 (상업예술)", artist: "김태균 (테이크원)", role: "편곡 참여" },
  { title: "추억눈", artist: "김영근", role: "작/편곡 참여" },
  { title: "shine", artist: "Terrence", role: "작/편곡 참여" },
  { title: "We don’t care (feat.TRADE L)", artist: "Set The Tone", role: "작/편곡 참여" },
  { title: "cha cha (LIMELIGHT 앨범 수록곡)", artist: "라임라잇", role: "편곡 참여" },
  { title: "데이지", artist: "도진이", role: "작/편곡" },
  { title: "fire", artist: "채널A x sky 강철부대 OST", role: "작사/작곡/편곡 참여" },
];

const NAV_ITEMS = ["MAIN", "ARTISTS", "WORKS", "SNS"];

export default function PreseasonSite() {
  const [activeTab, setActiveTab] = useState("MAIN");
  const [loaded, setLoaded] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div style={{
      background: "#050505",
      minHeight: "100vh",
      fontFamily: "'Bebas Neue', 'Noto Sans KR', sans-serif",
      color: "#f0f0f0",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;700&family=Archivo+Black&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #ff3c00; }

        .nav-item {
          cursor: pointer;
          letter-spacing: 0.2em;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          padding: 8px 0;
          position: relative;
          color: #888;
          transition: color 0.3s;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #ff3c00;
          transition: width 0.3s ease;
        }
        .nav-item:hover { color: #f0f0f0; }
        .nav-item:hover::after, .nav-item.active::after { width: 100%; }
        .nav-item.active { color: #ff3c00; }

        .hero-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .hero-title.loaded { opacity: 1; transform: translateY(0); }

        .member-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s ease;
        }
        .member-card:hover { transform: scale(1.02); }
        .member-card img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: top;
          filter: grayscale(20%) contrast(1.1);
          transition: filter 0.4s;
        }
        .member-card:hover img { filter: grayscale(0%) contrast(1.2); }
        .member-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
        }
        .member-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.1em;
          color: #fff;
        }
        .member-role {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 0.75rem;
          color: #ff3c00;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .work-card {
          border: 1px solid #1a1a1a;
          padding: 0;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          background: #0a0a0a;
        }
        .work-card:hover { border-color: #ff3c00; transform: translateY(-4px); }
        .work-card iframe {
          width: 100%; height: 200px;
          border: none; display: block;
        }
        .work-info { padding: 16px; }
        .work-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          color: #f0f0f0;
        }
        .work-artist {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 0.75rem;
          color: #888;
          margin-top: 4px;
        }
        .work-role-tag {
          display: inline-block;
          margin-top: 8px;
          padding: 3px 10px;
          background: #ff3c00;
          color: #fff;
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
        }

        .other-work-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid #111;
          transition: background 0.2s;
        }
        .other-work-row:hover { background: #111; }

        .section-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          color: #ff3c00;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: -0.01em;
          margin-bottom: 48px;
        }

        .tab-content {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.5s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .sns-card {
          border: 1px solid #1a1a1a;
          padding: 32px;
          text-align: center;
          transition: border-color 0.3s, background 0.3s;
          cursor: pointer;
          background: #0a0a0a;
        }
        .sns-card:hover { border-color: #ff3c00; background: #110500; }
        .sns-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .sns-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.1em;
        }
        .sns-handle {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 0.75rem;
          color: #888;
          margin-top: 4px;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "linear-gradient(rgba(5,5,5,0.95), transparent)",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.6rem",
          letterSpacing: "0.25em",
          color: "#fff",
        }}>
          FREESEASON
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {NAV_ITEMS.map(tab => (
            <div
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ paddingTop: "80px" }}>

        {/* ── MAIN ── */}
        {activeTab === "MAIN" && (
          <div className="tab-content">
            {/* Hero */}
            <section style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "80px 40px 80px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* BG gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 70% 50%, #1a0500 0%, #050505 60%)",
                zIndex: 0,
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="section-label">MUSIC PRODUCTION TEAM</div>
                <h1 className={`hero-title ${loaded ? "loaded" : ""}`}>
                  FREE<br />
                  <span style={{ color: "#ff3c00" }}>SEA</span><br />
                  SON
                </h1>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "#888",
                  marginTop: "32px",
                  maxWidth: "400px",
                  lineHeight: 1.8,
                  letterSpacing: "0.05em",
                }}>
                  작곡, 편곡, 작사까지 —<br />
                  음악의 모든 순간을 만드는 팀.
                </p>
                <button
                  onClick={() => setActiveTab("WORKS")}
                  style={{
                    marginTop: "40px",
                    padding: "14px 36px",
                    background: "#ff3c00",
                    border: "none",
                    color: "#fff",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.2em",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "#cc3000"}
                  onMouseLeave={e => e.target.style.background = "#ff3c00"}
                >
                  VIEW WORKS →
                </button>
              </div>
            </section>

            {/* About strip */}
            <section style={{
              padding: "80px 40px",
              borderTop: "1px solid #111",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}>
              {[
                { num: "30+", label: "발매 / 참여 작업물" },
                { num: "3", label: "멤버" },
                { num: "∞", label: "음악에 대한 열정" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    color: "#ff3c00",
                    lineHeight: 1,
                  }}>{item.num}</div>
                  <div style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: "0.8rem",
                    color: "#888",
                    marginTop: "8px",
                    letterSpacing: "0.1em",
                  }}>{item.label}</div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ── ARTISTS ── */}
        {activeTab === "ARTISTS" && (
          <div className="tab-content" style={{ padding: "60px 40px" }}>
            <div className="section-label">OUR TEAM</div>
            <h2 className="section-title">ARTISTS</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2px",
            }}>
              {MEMBERS.map(m => (
                <div
                  key={m.name}
                  className="member-card"
                  onMouseEnter={() => setHoveredMember(m.name)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <img src={m.img} alt={m.name} />
                  <div className="member-overlay">
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}</div>
                  </div>
                  {hoveredMember === m.name && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      border: "2px solid #ff3c00",
                      pointerEvents: "none",
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WORKS ── */}
        {activeTab === "WORKS" && (
          <div className="tab-content" style={{ padding: "60px 40px" }}>
            <div className="section-label">DISCOGRAPHY</div>
            <h2 className="section-title">WORKS</h2>

            {/* YouTube works grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
              marginBottom: "48px",
            }}>
              {WORKS.map(w => (
                <div key={w.title} className="work-card">
                  <iframe
                    src={`https://www.youtube.com/embed/${w.ytId}`}
                    title={w.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="work-info">
                    <div className="work-title">{w.title}</div>
                    <div className="work-artist">{w.artist}</div>
                    <div className="work-role-tag">{w.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 기타 작업물 타이틀 표기 */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              letterSpacing: "0.15em",
              color: "#f0f0f0",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid #222"
            }}>
              기타 작업물 ({OTHER_WORKS.length})
            </div>

            {/* 별도의 클릭 없이 무조건 리스트 노출 */}
            <div style={{ border: "1px solid #1a1a1a" }}>
              {OTHER_WORKS.map((w, i) => (
                <div key={i} className="other-work-row">
                  <div>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.1rem",
                      letterSpacing: "0.05em",
                    }}>{w.title}</div>
                    {(w.artist || w.type) && (
                      <div style={{
                        fontFamily: "'Noto Sans KR', sans-serif",
                        fontSize: "0.7rem",
                        color: "#666",
                        marginTop: "2px",
                      }}>{w.artist || w.type}</div>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: "0.7rem",
                    color: "#ff3c00",
                    letterSpacing: "0.05em",
                    textAlign: "right",
                    maxWidth: "180px",
                  }}>{w.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SNS ── */}
        {activeTab === "SNS" && (
          <div className="tab-content" style={{ padding: "60px 40px" }}>
            <div className="section-label">CONNECT</div>
            <h2 className="section-title">TEAM SNS</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              maxWidth: "600px",
            }}>
              <div className="sns-card" onClick={() => alert("인스타그램 추후 추가 예정")}>
                <div className="sns-icon">📸</div>
                <div className="sns-name">INSTAGRAM</div>
                <div className="sns-handle">추후 공개</div>
              </div>
              <div className="sns-card" onClick={() => alert("트위터 추후 추가 예정")}>
                <div className="sns-icon">𝕏</div>
                <div className="sns-name">TWITTER / X</div>
                <div className="sns-handle">추후 공개</div>
              </div>
            </div>
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "0.8rem",
              color: "#555",
              marginTop: "32px",
              lineHeight: 1.8,
            }}>
              SNS 계정은 추후 업데이트될 예정입니다.
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #111",
        padding: "32px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.2rem",
          letterSpacing: "0.25em",
          color: "#333",
        }}>FREESEASON</div>
        <div style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: "0.7rem",
          color: "#444",
        }}>© 2025 FREESEASON. All rights reserved.</div>
      </footer>
    </div>
  );
}
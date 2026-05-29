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
  const [activeVideo, setActiveVideo] = useState(null); // 클릭한 영상 정보를 담을 상태
  const canvasRef = useRef(null);

  const mainRef = useRef(null);
  const artistsRef = useRef(null);
  const worksRef = useRef(null);
  const snsRef = useRef(null);
  const extraRef = useRef(null); // 추가!

  const sectionRefs = {
    MAIN: mainRef,
    ARTISTS: artistsRef,
    WORKS: worksRef,
      EXTRA: extraRef, // 추가!
    SNS: snsRef,
  };

  const WORKS = [
  { title: "BREATH", artist: "스트릿 우먼 파이터 vietnam", role: "작/편곡 참여", ytId: "f9Sm9iqy0bI" },
  { title: "지구정복", artist: "미녕이 데려오깨 [ORIGINAL]", role: "작/편곡 작사", ytId: "rsfFoMuWKBQ" },
  { title: "Classic", artist: "Dolla", role: "작/편곡 참여", ytId: "o8XM8GlxaRw" },
  { title: "breath again", artist: "Blitzers (블리처스)", role: "작/편곡 참여", ytId: "HNUYaAkuoiY" },
  { title: "버블러스 테마곡 (마롱/하로/세로)", artist: "버블러스 [ORIGINAL]", role: "테마곡 작/편곡", ytId: "NHSv9dZOdFI" },
  { title: "my side / thursday party / HEUNG", artist: "BIGMARVEL", role: "작곡 편곡 가사", ytId: "otvJLZ3Vlao" }
];

const OTHER_WORKS = [
  { title: "Alarm", desc: "싱글 앨범", role: "작사/작곡/발매" },
  { title: "Bring it no more", desc: "싱글 앨범", role: "작사/작곡/발매" },
  { title: "약속", desc: "마지메로", role: "작사/작곡" },
  { title: "기억", desc: "마지메로", role: "작사/작곡" },
  { title: "enkai", desc: "시즈라에", role: "작사/작곡" },
  { title: "Where u at?", desc: "屁孩Ryan", role: "작곡" },
  { title: "dream pilot", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "blitz (next level remix)", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "ocean blue", desc: "Blitzers", role: "편곡 참여" },
  { title: "실수 좀 할게", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "K pop", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "Rain drop", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "Hapoom", desc: "Blitzers", role: "작/편곡 참여" },
  { title: "BuBBle BuBBle!", desc: "버블러스", role: "작/편곡" },
  { title: "Hello, bubble!", desc: "버블러스", role: "작/편곡" },
  { title: "아카데미 BGM", desc: "스타시드", role: "작/편곡/믹싱" },
  { title: "요즘 너", desc: "브레이브걸스", role: "편곡 참여" },
  { title: "캐리 시리즈", desc: "캐리와 친구들", role: "편곡 참여" },
  { title: "녹색이념/강남", desc: "김태균", role: "편곡 참여" },
  { title: "추억눈", desc: "김영근", role: "작/편곡 참여" },
  { title: "shine", desc: "Terrence", role: "작/편곡 참여" },
  { title: "We don’t care", desc: "Set The Tone", role: "작/편곡 참여" },
  { title: "cha cha", desc: "라임라잇", role: "편곡 참여" },
  { title: "데이지", desc: "도진이", role: "작/편곡" },
  { title: "fire", desc: "강철부대 OST", role: "작사/작곡/편곡 참여" }
];

  // =========================
  // ACTIVE SECTION OBSERVER
  // =========================
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

  // =========================
  // CANVAS
  // =========================
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

  // =========================
  // SCROLL TO SECTION
  // =========================
  const scrollToSection = (tab) => {
    sectionRefs[tab]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };




  // =========================
  // COMPONENT
  // =========================
  
  return (
    <div className="viewport">
      <style>{`
      /* Pretendard 폰트 추가 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 모든 요소에 Pretendard 적용 */
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

/* 제목 등 강조가 필요한 곳은 굵기 조절 */
.hero-title, .section-title {
  font-weight: 600;
  letter-spacing: -0.02em;
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
          font-family:'Bebas Neue', sans-serif;
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

        /* ========================= */
        /* NAV */
        /* ========================= */

        nav{
          position:fixed;
          top:0;
          left:0;
          right:0;

          height:90px;

          z-index:1000;

          display:flex;
          align-items:center;
          justify-content:space-between;

          padding:0 40px;

          backdrop-filter:blur(20px);

          background:rgba(0,0,0,0.3);

          border-bottom:1px solid rgba(255,255,255,0.05);
        }

        .logo{
          font-size:1.6rem;
          letter-spacing:0.25em;
          cursor:pointer;
        }

        .nav-right{
          display:flex;
          gap:40px;
        }

        .nav-item{
          color:#555;
          cursor:pointer;
          transition:0.4s;
          position:relative;
          letter-spacing:0.15em;
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

        /* ========================= */
        /* MAIN SCROLL */
        /* ========================= */

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

        /* ========================= */
        /* PANEL */
        /* ========================= */

        .panel{
          height:100vh;

          scroll-snap-align:start;
          scroll-snap-stop:always;

          position:relative;

          display:flex;
          flex-direction:column;
          justify-content:center;

          padding:120px 80px;

          overflow:hidden;
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

        /* ========================= */
        /* HERO */
        /* ========================= */

        .hero-sub{
          color:#ff2200;
          letter-spacing:0.4em;
          font-size:0.9rem;
          margin-bottom:20px;
        }

        .hero-title{
          font-family:'Archivo Black', sans-serif;

          font-size:clamp(4rem,12vw,10rem);

          line-height:0.85;

          letter-spacing:-0.05em;

          margin-bottom:30px;
        }

        .hero-title span{
          color:#ff2200;
        }

        .hero-desc{
          max-width:540px;

          font-family:'Noto Sans KR', sans-serif;

          color:#999;

          line-height:1.8;

          font-size:1rem;
        }

        /* ========================= */
        /* SECTION TITLE */
        /* ========================= */

        .section-sub{
          color:#ff2200;
          letter-spacing:0.35em;
          margin-bottom:14px;
          font-size:0.85rem;
        }

        .section-title{
          font-size:clamp(3rem,7vw,5rem);

          font-family:'Archivo Black', sans-serif;

          margin-bottom:50px;
        }

        /* ========================= */
        /* CARDS */
        /* ========================= */

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:24px;
        }

        .card{
          background:rgba(15,15,18,0.55);

          backdrop-filter:blur(16px);

          border:1px solid rgba(255,255,255,0.04);

          border-radius:24px;

          overflow:hidden;

          transition:0.7s cubic-bezier(.16,1,.3,1);
        }

        .card:hover{
          transform:translateY(-10px) scale(1.02);

          border-color:rgba(255,34,0,0.35);

          box-shadow:
            0 10px 40px rgba(255,34,0,0.12);
        }

        .member-img{
          width:100%;
          height:400px;

          object-fit:cover;

          filter:grayscale(100%);

          transition:1s;
        }

        .card:hover .member-img{
          filter:grayscale(0%);
          transform:scale(1.04);
        }

        .card-content{
          padding:24px;
        }

        .member-name{
          font-size:2rem;
        }

        .member-role{
          color:#ff2200;
          margin-top:4px;

          font-family:'Noto Sans KR', sans-serif;
          font-size:0.8rem;
        }

        /* ========================= */
        /* WORK BOX */
        /* ========================= */

        .work-box{
          width:100%;
          max-width:700px;

          padding:50px;

          background:rgba(15,15,18,0.5);

          border:1px solid rgba(255,255,255,0.04);

          border-radius:30px;

          backdrop-filter:blur(20px);
        }

        .work-line{
          display:flex;
          justify-content:space-between;

          padding:18px 0;

          border-bottom:1px solid rgba(255,255,255,0.04);
        }

        .work-line:last-child{
          border:none;
        }

        .work-title{
          font-size:1.2rem;
        }

        .work-role{
          color:#ff2200;

          font-family:'Noto Sans KR', sans-serif;

          font-size:0.8rem;
        }

        /* ========================= */
        /* SNS */
        /* ========================= */

        .sns-wrap{
          display:flex;
          gap:24px;
        }

        .sns-card{
          width:240px;
          height:240px;

          border-radius:30px;

          background:rgba(15,15,18,0.5);

          border:1px solid rgba(255,255,255,0.04);

          backdrop-filter:blur(20px);

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          transition:0.7s cubic-bezier(.16,1,.3,1);

          cursor:pointer;
        }

        .sns-card:hover{
          transform:translateY(-10px);

          border-color:rgba(255,34,0,0.35);
        }

        .sns-icon{
          font-size:3rem;
          margin-bottom:20px;
        }

        .sns-title{
          font-size:1.5rem;
        }

        .sns-desc{
          margin-top:8px;

          color:#666;

          font-family:'Noto Sans KR', sans-serif;
          font-size:0.8rem;
        }

      `}</style>

      {/* CANVAS */}
      <canvas ref={canvasRef} />

      {/* NAV */}
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

      {/* CONTENT */}
      <main>
        {/* HERO */}
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

        {/* ARTISTS */}
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

        {/* WORKS */}
{/* ── 3. WORKS (VIDEO) SECTION ── */}
<section ref={worksRef} className="panel">
  <div className="section-sub">SELECTED DISCOGRAPHY</div>
  <div className="section-title">WORKS</div>
  
  <div className="grid">
{WORKS.map(w => (
  <div 
    key={w.title} 
    className="card" 
    onClick={() => setActiveVideo(w.ytId)} 
    style={{ cursor: "pointer" }}
  >
    {/* 유튜브 썸네일 불러오기 */}
    <img 
      src={`https://img.youtube.com/vi/${w.ytId}/hqdefault.jpg`} 
      alt={w.title}
      style={{ width: "100%", height: "200px", objectFit: "cover" }}
    />
    <div className="card-content">
      <div className="member-name">{w.title}</div>
      <div className="member-role">{w.role}</div>
    </div>
  </div>
))}
  </div>
</section>

{/* ── 4. EXTRA WORKS SECTION ── */}
<section ref={extraRef} className="panel" style={{ height: "auto", minHeight: "100vh" }}>
  <div className="section-sub">ADDITIONAL DISCOGRAPHY</div>
  <div className="section-title">OTHER WORKS</div>
  
  {/* 3개의 컬럼으로 자동 배치되는 그리드 레이아웃 */}
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "20px", 
    width: "100%" 
  }}>
    {OTHER_WORKS.map((w, i) => (
      <div key={i} className="work-line" style={{ 
        background: "rgba(255,255,255,0.08)", 
        padding: "15px 20px", 
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ overflow: "hidden" }}>
          <div className="work-title" style={{ fontSize: "1.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.title}</div>
          <div style={{ fontSize: "1rem", color: "#888" }}>{w.desc}</div>
        </div>
        <div className="work-role" style={{ fontSize: "0.8rem", marginLeft: "10px", flexShrink: 0 }}>{w.role}</div>
      </div>
    ))}
  </div>
</section>



        {/* SNS */}
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
    style={{
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%",
      // 여기서 0.85는 85%의 불투명도를 의미합니다. 
      // 0.5로 낮추면 더 투명하게 보입니다.
      background: "rgba(0,0,0,0.85)", 
      backdropFilter: "blur(10px)", // 추가: 배경을 흐릿하게 만들어 더 고급스럽게 보입니다.
      zIndex: 9999,
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      cursor: "pointer"
    }}
    onClick={() => setActiveVideo(null)}
  >
    <iframe
      title="video"
      src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
      style={{ width: "80%", height: "70%", border: "none" }}
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div>
)}
    </div>
  );
}
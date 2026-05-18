import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#f5f0e8",
  charcoal: "#1a1a18",
  ember: "#c8541a",
  gold: "#d4a843",
  warmGray: "#8c8070",
  lightBg: "#faf7f2",
};

const menuData = {
  starters: [
    { name: "Burrata & Heirloom Tomato", price: "$16", desc: "Fresh burrata with slow-roasted heirloom tomatoes, basil oil, and sea salt flakes.", tag: "Vegetarian" },
    { name: "House-Smoked Salmon Crudo", price: "$22", desc: "Cold-smoked salmon with cucumber ribbon, dill crème fraîche, and capers.", tag: "Chef's Pick" },
    { name: "Wild Mushroom Crostini", price: "$14", desc: "Seasonal forest mushrooms on toasted sourdough with truffle oil and aged parmesan.", tag: "Vegetarian" },
    { name: "Charred Octopus", price: "$24", desc: "Slow-braised then wood-grilled octopus with chimichurri, pickled onion, and smoked paprika.", tag: "Seasonal" },
    { name: "Bone Broth Soup", price: "$12", desc: "Rich 48-hour slow-cooked bone broth with gremolata and herb oil.", tag: "" },
    { name: "Roasted Beet Salad", price: "$15", desc: "Red & golden beets with arugula, candied walnuts, goat cheese, and champagne vinaigrette.", tag: "Gluten Free" },
  ],
  mains: [
    { name: "48oz Tomahawk Steak", price: "$145", desc: "USDA Prime, 21-day dry-aged. Served with roasted bone marrow and herb butter.", tag: "Signature" },
    { name: "Slow-Roasted Duck", price: "$52", desc: "Half duck slow-cooked over embers with cherry gastrique and celeriac purée.", tag: "Chef's Pick" },
    { name: "Wild Sea Bass", price: "$48", desc: "Pan-seared with saffron beurre blanc, fennel confit, and crispy capers.", tag: "Gluten Free" },
    { name: "Heritage Pork Chop", price: "$44", desc: "Brined and wood-grilled with apple mostarda and roasted fingerling potatoes.", tag: "" },
    { name: "Truffle Risotto", price: "$38", desc: "Arborio rice with black truffle shavings, aged parmesan, and chive oil.", tag: "Vegetarian" },
    { name: "Wood-Fired Lamb Rack", price: "$68", desc: "Herb-crusted Colorado lamb with roasted garlic jus and spring pea purée.", tag: "Seasonal" },
  ],
  desserts: [
    { name: "Valrhona Chocolate Fondant", price: "$16", desc: "Warm dark chocolate cake with molten center, vanilla bean ice cream, and praline.", tag: "Signature" },
    { name: "Lemon Posset", price: "$13", desc: "Set cream with Meyer lemon, shortbread crumble, and fresh raspberries.", tag: "" },
    { name: "Seasonal Sorbet", price: "$10", desc: "Three scoops of rotating house-made sorbets. Ask your server for today's flavors.", tag: "Vegan" },
    { name: "Cheese Board", price: "$24", desc: "Selection of three artisan cheeses with quince paste, honeycomb, and crackers.", tag: "" },
  ],
  drinks: [
    { name: "Central Old Fashioned", price: "$18", desc: "Smoked bourbon, demerara, house bitters, and expressed orange peel.", tag: "Signature" },
    { name: "Garden & Elderflower Spritz", price: "$15", desc: "Gin, elderflower liqueur, cucumber, and prosecco.", tag: "" },
    { name: "Sommelier's Wine Selection", price: "from $14", desc: "Rotating curated glass pours. Ask for our current selection by the glass or bottle.", tag: "" },
    { name: "House Mocktails", price: "$10", desc: "Seasonal non-alcoholic craft cocktails made with house-pressed juices and botanicals.", tag: "" },
  ],
};

const BASE = "https://raw.githubusercontent.com/Rahathh/resturant/main/";

const slides = [
  { num: "01 / 06", title: "The Tomahawk", desc: "Our 48oz dry-aged masterpiece, finished over an open hardwood fire.", img: BASE + "steak.jpg" },
  { num: "02 / 06", title: "Garden Fresh", desc: "Seasonal produce sourced directly from our partner farms each morning.", img: BASE + "beth-macdonald-vO1h-ZUlSKM-unsplash.jpg" },
  { num: "03 / 06", title: "The Wine Cellar", desc: "Over 300 labels curated by our resident sommelier from six continents.", img: BASE + "javier-balseiro-jDU4yYk5Kgs-unsplash.jpg" },
  { num: "04 / 06", title: "The Open Kitchen", desc: "Watch our chefs work the live fire — theatre and technique in harmony.", img: BASE + "johnathan-macedo-4NQEvxW2_4w-unsplash.jpg" },
  { num: "05 / 06", title: "Pastry Lab", desc: "Desserts built daily from scratch — each one a small work of art.", img: BASE + "food-photographer-jennifer-pallian-OfdDiqx8Cz8-unsplash.jpg" },
  { num: "06 / 06", title: "The Dining Room", desc: "Warm walnut interiors, candlelit tables — an atmosphere built for memories.", img: BASE + "andrius-budrikas-kGP7rp2gWbc-unsplash.jpg" },
];

// ── NAV ──
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["home", "menu", "gallery", "about", "contact"];

  const handleLink = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem clamp(1rem,5vw,4rem)",
      background: scrolled ? "rgba(26,26,24,0.97)" : "rgba(26,26,24,0.92)",
      backdropFilter: "blur(12px)",
      transition: "all 0.3s",
      boxSizing: "border-box",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontStyle: "italic", color: COLORS.gold, letterSpacing: "0.02em" }}>
        Central Plate Kitchen
      </div>

      {/* Desktop links */}
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
        className="nav-desktop">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} onClick={e => handleLink(e, l)}
              style={{
                color: l === "contact" ? "#fff" : COLORS.cream,
                fontSize: "0.82rem", fontWeight: l === "contact" ? 600 : 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none",
                background: l === "contact" ? COLORS.ember : "none",
                padding: l === "contact" ? "0.5rem 1.4rem" : 0,
                borderRadius: l === "contact" ? "2px" : 0,
              }}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button onClick={() => setOpen(o => !o)}
        style={{ display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", zIndex: 1001 }}
        className="hamburger-btn" aria-label="Menu">
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: "24px", height: "2px", background: COLORS.cream, display: "block",
            transition: "0.3s",
            transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "") : "",
            opacity: open && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,26,24,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "2.5rem", zIndex: 999,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={e => handleLink(e, l)}
              style={{ color: COLORS.cream, fontSize: "1.2rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .nav-desktop{display:none!important}
          .hamburger-btn{display:flex!important}
        }
      `}</style>
    </nav>
  );
}

// ── HERO ──
function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(120deg,#1a1a18 55%,#2c1f10 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Playfair Display', serif", fontSize: "clamp(8rem,18vw,20rem)",
        fontWeight: 900, color: "rgba(212,168,67,0.06)", lineHeight: 1,
        userSelect: "none", whiteSpace: "nowrap",
      }}>CPK</div>

      <div className="container" style={{ maxWidth: "680px", position: "relative", zIndex: 2, animation: "fadeUp 1s ease both" }}>
        <span style={{
          display: "inline-block", fontSize: "0.75rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: COLORS.gold,
          border: `1px solid ${COLORS.gold}`, padding: "0.3rem 1rem", marginBottom: "1.5rem",
        }}>Est. 2008 · New York</span>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem,6vw,5.5rem)", lineHeight: 1.05,
          color: COLORS.cream, margin: "0 0 1.5rem",
        }}>
          Where Every<br /><em style={{ color: COLORS.ember, fontStyle: "italic" }}>Plate</em> Tells a Story
        </h1>

        <p style={{ color: COLORS.warmGray, lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2.5rem", maxWidth: "480px" }}>
          Central Plate Kitchen is a neighborhood dining experience rooted in seasonal ingredients, crafted by chefs who believe every meal should tell a story.
        </p>

        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          <a href="#menu" onClick={e => { e.preventDefault(); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: COLORS.ember, color: "#fff", padding: "0.9rem 2.2rem",
              fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none", display: "inline-block",
              transition: "background 0.25s",
            }}>Explore Menu</a>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              border: `1px solid rgba(245,240,232,0.4)`, color: COLORS.cream,
              padding: "0.9rem 2.2rem", fontSize: "0.85rem", fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
              display: "inline-block",
            }}>Reserve a Table</a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        color: COLORS.warmGray, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
      }}>
        <div style={{ width: "1px", height: "50px", background: `linear-gradient(${COLORS.gold}, transparent)`, animation: "scrollLine 1.5s ease-in-out infinite" }} />
        Scroll
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollLine{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:0.4;transform:scaleY(0.5)}}
        @media(max-width:900px){
          #home > div:nth-child(2){padding:0 2rem!important}
        }
      `}</style>
    </section>
  );
}

// ── MENU CARD ──
function MenuCard({ name, price, desc, tag, addToCart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#2a2a26" : "#22221f",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            color: COLORS.cream,
            lineHeight: 1.3,
            maxWidth: "70%",
          }}
        >
          {name}
        </span>

        <span
          style={{
            color: COLORS.gold,
            fontWeight: 600,
            fontSize: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          {price}
        </span>
      </div>

      <p
        style={{
          color: "#7a7060",
          fontSize: "0.88rem",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {desc}
      </p>

      {tag && (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.ember,
            border: `1px solid ${COLORS.ember}`,
            padding: "0.15rem 0.6rem",
            alignSelf: "flex-start",
            marginTop: "0.3rem",
          }}
        >
          {tag}
        </span>
      )}

      <button
        onClick={() => {
  console.log("clicked");
  addToCart({ name, price });
}}
        style={{
          marginTop: "1rem",
          background: COLORS.ember,
          color: "white",
          border: "none",
          padding: "0.8rem 1rem",
          cursor: "pointer",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

function Menu({ addToCart }) {
  const tabs = ["starters", "mains", "desserts", "drinks"];
  const [active, setActive] = useState("starters");

  return (
    <section
      id="menu"
      style={{
        background: COLORS.charcoal,
        color: COLORS.cream,
        padding: "4rem 2rem",
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "3rem",
          marginBottom: "2rem",
        }}
      >
        Our Menu
      </h2>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              padding: "0.7rem 1.2rem",
              cursor: "pointer",
              background:
                active === t ? COLORS.gold : "transparent",
              color: active === t ? "black" : "white",
              border: `1px solid ${COLORS.gold}`,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1rem",
        }}
      >
        {menuData[active].map((item, i) => (
          <MenuCard
            key={i}
            {...item}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

// ── GALLERY ──
function Gallery() {
  const [current, setCurrent] = useState(0);

  const goTo = (n) => setCurrent((n + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(id);
  }, [current]);

  return (
    <section id="gallery" style={{background: COLORS.lightBg, boxSizing: "border-box" }}>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.ember, marginBottom: "0.6rem", display: "block" }}>A Visual Feast</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.2rem" }}>Gallery</h2>
      <p style={{ color: COLORS.warmGray, lineHeight: 1.8, maxWidth: "560px", marginBottom: 0 }}>A glimpse into the warmth, craft, and artistry that defines every visit.</p>
      <div style={{ width: "40px", height: "2px", background: COLORS.gold, margin: "1.5rem 0 3rem" }} />

      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", transform: `translateX(-${current * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="slide" style={{ minWidth: "100%", display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ width: "min(280px,100%)", background: COLORS.charcoal, color: COLORS.cream, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem 2.5rem", flexShrink: 0, boxSizing: "border-box" }}>
                <p style={{ fontSize: "0.7rem", color: COLORS.ember, letterSpacing: "0.15em", marginBottom: "0.8rem" }}>{s.num}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "#7a7060", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "2rem" }}>
        <button onClick={() => goTo(current - 1)} style={{ width: "48px", height: "48px", background: "none", border: `1px solid #ccc`, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.charcoal }}>←</button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ width: i === current ? "20px" : "8px", height: "8px", background: i === current ? COLORS.ember : "#ccc", borderRadius: "4px", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={() => goTo(current + 1)} style={{ width: "48px", height: "48px", background: "none", border: `1px solid #ccc`, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.charcoal }}>→</button>
      </div>

      <style>{`
  @media(max-width:900px){
    #gallery .slide{
      flex-direction:column !important;
    }
  }
`}</style>
    </section>
  );
}

// ── ABOUT ──
function About() {
  const stats = [
    { num: "16+", label: "Years of Excellence" },
    { num: "30", label: "Partner Farms" },
    { num: "3", label: "James Beard Nominations" },
    { num: "★★", label: "Michelin Stars" },
  ];

  return (
    <section id="about" style={{ background: "#fff", boxSizing: "border-box" }}>
      <div style={{ display: "grid",gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
gap: "clamp(2rem,5vw,6rem)", alignItems: "center" }} className="about-grid">
        <div style={{ background: "linear-gradient(135deg,#2c1f10,#1a1a18)", height: "500px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "8rem", zIndex: 1, position: "relative" }}>🏛️</span>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", background: "linear-gradient(transparent,rgba(0,0,0,0.8))", zIndex: 2 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.cream, fontSize: "1.2rem", margin: "0 0 0.3rem" }}>Founded in 2008</h4>
            <p style={{ color: "#9a9080", fontSize: "0.85rem", margin: 0 }}>Lower Manhattan, New York</p>
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.ember, display: "block", marginBottom: "0.6rem" }}>Our Story</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>Born From Passion,<br />Built on Community</h2>
          <div style={{ width: "40px", height: "2px", background: COLORS.gold, marginBottom: "1.5rem" }} />
          <p style={{ color: COLORS.warmGray, lineHeight: 1.9, marginBottom: "1.2rem" }}>
            Central Plate Kitchen began in 2008 when chef Marcus Webb returned from years cooking across Europe, carrying a single conviction: that great food starts with great ingredients and the people who grow them.
          </p>
          <p style={{ color: COLORS.warmGray, lineHeight: 1.9, marginBottom: "2rem" }}>
            What started as a 28-seat supper club in a converted Tribeca townhouse is now one of New York's most beloved dining destinations — but our philosophy hasn't changed. We source from fewer than thirty farms. We change our menu weekly. And we still cook everything over hardwood.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: "1.2rem" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: COLORS.charcoal }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: COLORS.warmGray, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #about{padding:4rem 2rem!important}
          .about-grid{grid-template-columns:1fr!important;gap:3rem!important}
        }
      `}</style>
    </section>
  );
}

// ── CONTACT ──
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ background: COLORS.charcoal, color: COLORS.cream, boxSizing: "border-box" }}>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.ember, marginBottom: "0.6rem", display: "block" }}>Find Us</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: COLORS.cream, marginBottom: "1.2rem" }}>Get in Touch</h2>
      <p style={{ color: "#9a9080", lineHeight: 1.8, maxWidth: "560px", marginBottom: 0 }}>Reserve your table or send us a message — we'd love to hear from you.</p>
      <div style={{ width: "40px", height: "2px", background: COLORS.gold, margin: "1.5rem 0 3rem" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="contact-grid">
        <div>
          <div style={{ background: "#2a2a26", height: "360px", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00425!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1628cb27ef%3A0x3a8c1b7e73a58e6e!2sTribeca%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              style={{ width: "100%", height: "100%", border: "none", filter: "grayscale(80%)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map"
            />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", background: "rgba(26,26,24,0.95)", color: COLORS.cream, padding: "0.6rem 1.4rem", fontSize: "0.8rem", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
              📍 142 Hudson St, Tribeca, New York
            </div>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p style={{ color: "#9a9080", fontSize: "0.9rem", margin: 0 }}>📞 <a href="tel:+12129876543" style={{ color: COLORS.gold, textDecoration: "none" }}>+1 (212) 987-6543</a></p>
            <p style={{ color: "#9a9080", fontSize: "0.9rem", margin: 0 }}>✉️ <a href="mailto:rh@centralplatekitchen.com" style={{ color: COLORS.gold, textDecoration: "none" }}>rh@centralplatekitchen.com</a></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }} className="form-row">
            {[["name", "Name", "Your full name", "text"], ["email", "Email", "your@email.com", "email"]].map(([id, label, ph, type]) => (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.warmGray }}>{label}</label>
                <input type={type} placeholder={ph} value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  style={{ background: "#2a2a26", border: "1px solid rgba(255,255,255,0.08)", color: COLORS.cream, padding: "0.85rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", outline: "none" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.warmGray }}>Message</label>
            <textarea placeholder="Reservation request, dietary needs, private event inquiry..." value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ background: "#2a2a26", border: "1px solid rgba(255,255,255,0.08)", color: COLORS.cream, padding: "0.85rem 1rem", fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", outline: "none", height: "140px", resize: "none" }} />
          </div>
          <button type="submit" style={{ background: COLORS.ember, color: "#fff", border: "none", cursor: "pointer", padding: "1rem 2.5rem", fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", alignSelf: "flex-start" }}>
            Send Message
          </button>
          {submitted && <p style={{ color: "#6fcf97", fontSize: "0.9rem", margin: 0 }}>✓ Your message has been sent. We'll be in touch within 24 hours.</p>}
        </form>
      </div>

      <style>{`
        @media(max-width:900px){
          #contact{padding:4rem 2rem!important}
          .contact-grid{grid-template-columns:1fr!important;gap:3rem!important}
          .form-row{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}

// ── FOOTER ──
function Footer() {
  const navLinks = ["Home", "Menu", "Gallery", "About", "Contact"];
  const visitLinks = ["Private Events", "Gift Cards", "Careers", "Press", "Accessibility"];
  const hours = [["Mon – Thu", "5 – 10pm"], ["Fri – Sat", "5 – 11pm"], ["Sunday", "4 – 9pm"]];

  return (
    <footer style={{ background: "#111110", color: "#7a7060", padding: "4rem", boxSizing: "border-box" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontStyle: "italic", color: COLORS.gold, marginBottom: "1rem" }}>Central Plate Kitchen</div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.8, maxWidth: "260px", margin: 0 }}>A neighborhood kitchen with a fine dining soul — rooted in community, craft, and the finest seasonal ingredients New York has to offer.</p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            {["f", "◎", "𝕏", "▲"].map((icon, i) => (
              <a key={i} href="#" style={{ width: "38px", height: "38px", background: "#1e1e1c", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a7060", textDecoration: "none", fontSize: "0.9rem" }}>{icon}</a>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.cream, marginBottom: "1.2rem" }}>Navigate</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {navLinks.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} style={{ color: "#7a7060", textDecoration: "none", fontSize: "0.88rem" }}>{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.cream, marginBottom: "1.2rem" }}>Visit</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {visitLinks.map(l => (
              <li key={l}><a href="#" style={{ color: "#7a7060", textDecoration: "none", fontSize: "0.88rem" }}>{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.cream, marginBottom: "1.2rem" }}>Hours</p>
          {hours.map(([day, time]) => (
            <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
              <span style={{ color: "#9a9080" }}>{day}</span>
              <span style={{ color: COLORS.cream }}>{time}</span>
            </div>
          ))}
          <p style={{ marginTop: "1.2rem", fontSize: "0.8rem", color: "#555548" }}>Lunch service available<br />Fri – Sun · 12 – 2:30pm</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.8rem" }}>
        <span>© 2025 Central Plate Kitchen. All rights reserved.</span>
        <span>142 Hudson St · Tribeca · New York, NY 10013</span>
      </div>

      <style>{`
        @media(max-width:900px){
          footer{padding:3rem 1.5rem!important}
          .footer-grid{grid-template-columns:1fr 1fr!important;gap:2rem!important}
        }
        @media(max-width:600px){
          .footer-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </footer>
  );
}

function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace("$", ""));
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <section
      style={{
        background: "#1a1a18",
        color: "white",
        padding: "4rem 2rem",
      }}
    >
      <div className="container">
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3rem",
            marginBottom: "2rem",
          }}
        >
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.name)}
                  style={{
                    background: "crimson",
                    border: "none",
                    color: "white",
                    padding: "0.6rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3
              style={{
                marginTop: "2rem",
                fontSize: "1.5rem",
                color: COLORS.gold,
              }}
            >
              Total: ${total.toFixed(2)}
            </h3>

            <button
              onClick={clearCart}
              style={{
                marginTop: "1.5rem",
                background: COLORS.ember,
                border: "none",
                color: "white",
                padding: "1rem 1.5rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </section>
  );
}

// ── APP ──
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Jost:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}

        body{
          font-family:'Jost',sans-serif;
          background:#faf7f2;
          color:#1a1a18;
          overflow-x:hidden;
        }

        section{
          padding: clamp(3rem, 6vw, 6rem)
          clamp(1.5rem, 5vw, 4rem);
        }

        .container{
          max-width:1200px;
          margin:0 auto;
          width:100%;
          padding:0 clamp(1.5rem, 5vw, 4rem);
        }
      `}</style>

      <Nav />
      <Hero />

      <Menu addToCart={addToCart} />

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      <Gallery />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
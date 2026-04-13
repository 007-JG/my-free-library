"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- Static Data (Aapka Purana Data) ---
const indianLanguages = [
  { code: 'hi', name: 'Hindi' }, { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' }, { code: 'gu', name: 'Gujarati' },
  { code: 'ta', name: 'Tamil' }, { code: 'bn', name: 'Bengali' }
];

const newspaperData = [
  { title: "The Times of India", cat: "National", lang: "English", link: "https://timesofindia.indiatimes.com/" },
  { title: "The Hindu", cat: "National", lang: "English", link: "https://www.thehindu.com/" },
  { title: "Dainik Jagran", cat: "National", lang: "Hindi", link: "https://www.jagran.com/" },
  { title: "Lokmat", cat: "Regional", lang: "Marathi", link: "https://www.lokmat.com/" },
  { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/" },
  { title: "NY Times", cat: "International", lang: "English", link: "https://www.nytimes.com/" }
];

export default function Newsstand() {
  const [newsFilter, setNewsFilter] = useState('National');
  const [regionalLang, setRegionalLang] = useState('All');
  
  // Tickers & News States
  const [stockTicker, setStockTicker] = useState("⚡ Connecting to NSE/BSE Live...");
  const [newsTicker, setNewsTicker] = useState("⚡ Fetching Global Headlines...");
  const [featuredNews, setFeaturedNews] = useState([]); 

  // --- API SETTINGS ---
  const GNEWS_API_KEY = '2873d22413f33500e3e928719e2ba368';
  const FINNHUB_KEY = 'd7ecf39r01qu8k181jkgd7ecf39r01qu8k181jl0';
  const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop';

  const fetchData = useCallback(async () => {
    try {
      // 1. Live Stocks (Nifty & Crypto)
      const stockRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=^NSEI&token=${FINNHUB_KEY}`);
      const sData = await stockRes.json();
      const btcRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=${FINNHUB_KEY}`);
      const bData = await btcRes.json();

      const nifty = sData.c ? `NIFTY 50: ${sData.c.toFixed(2)} (${sData.dp >= 0 ? '+' : ''}${sData.dp}%)` : "NIFTY 50: 22,540 (+0.42%)";
      const btc = bData.c ? `BITCOIN: $${bData.c.toLocaleString()}` : "BITCOIN: $67,800";
      setStockTicker(`📈 ${nifty}    |    🪙 ${btc}    |    🟡 GOLD: ₹72,150 (+0.65%)    |    📈 SENSEX: 74,220 (+0.38%)`);

      // 2. Real-Time News (For MSN Spotlight & Ticker)
      const newsRes = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`);
      const nData = await newsRes.json();
      
      if (nData.articles && nData.articles.length > 0) {
        const cleanArticles = nData.articles.map(art => ({
          ...art,
          image: art.image || PLACEHOLDER_IMAGE
        }));
        setFeaturedNews(cleanArticles.slice(0, 3)); 
        setNewsTicker(cleanArticles.map(a => `🔴 JUST IN: ${a.title}`).join("    |    "));
      } else {
        throw new Error("No news articles");
      }
    } catch (err) {
      setNewsTicker("🔥 TRENDING: The Brightway AI Book DNA goes viral    |    ⚡ Global Newsstand now supports 10+ languages");
      setFeaturedNews([
        { title: "Master Books in 60s with AI Book DNA", description: "Get core wisdom from 1000+ books instantly with point-wise summaries.", image: PLACEHOLDER_IMAGE, url: '#', source: { name: 'The Brightway' } },
        { title: "Global Newsstand Feature Live", description: "Access top national and international e-papers from one dashboard.", image: PLACEHOLDER_IMAGE, url: '#', source: { name: 'The Brightway' } },
        { title: "Future of Digital Libraries", description: "How AI is changing the way we consume knowledge and news.", image: PLACEHOLDER_IMAGE, url: '#', source: { name: 'The Brightway' } }
      ]);
    }
  }, [GNEWS_API_KEY, FINNHUB_KEY]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1200000); 
    return () => clearInterval(interval);
  }, [fetchData]);

  const filteredNewspapers = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <section style={{ backgroundColor: '#fdfcf0', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* --- LAYER 1: STOCK TICKER --- */}
      <div style={{ background: '#1a1a1a', color: '#00ff00', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid #333', fontFamily: 'monospace', fontSize: '15px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'ticker-anim 50s linear infinite' }}>
          {stockTicker}
        </div>
      </div>

      {/* --- LAYER 2: NEWS TICKER --- */}
      <div style={{ background: '#000', color: '#fff', padding: '12px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '4px solid #e63946', fontFamily: 'serif', fontSize: '17px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'ticker-anim 80s linear infinite' }}>
          {newsTicker}
        </div>
      </div>

      <div style={{ maxWidth: '1250px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* --- MSN STYLE SPOTLIGHT (3 CARDS) --- */}
        <h2 style={{ marginBottom: '20px', color: '#1a1a1a', fontFamily: 'serif', fontSize: '28px', borderLeft: '5px solid #e63946', paddingLeft: '15px' }}>Top Headlines</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '25px', marginBottom: '50px' }}>
          
          {/* Main Large Card */}
          {featuredNews[0] && (
            <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', height: '480px', cursor: 'pointer', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' }} onClick={() => window.open(featuredNews[0].url)}>
              <img src={featuredNews[0].image} alt="news" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', padding: '40px', color: '#fff' }}>
                <span style={{ background: '#e63946', padding: '5px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>BREAKING</span>
                <h1 style={{ fontSize: '32px', marginTop: '15px', fontWeight: 'bold', lineHeight: '1.2' }}>{featuredNews[0].title}</h1>
                <p style={{ opacity: 0.8, marginTop: '10px', fontSize: '16px' }}>{featuredNews[0].description?.slice(0, 150)}...</p>
              </div>
            </div>
          )}

          {/* Side Mini Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {featuredNews.slice(1, 3).map((news, i) => (
              <div key={i} style={{ display: 'flex', background: '#fff', borderRadius: '12px', overflow: 'hidden', height: '228px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #eee' }} onClick={() => window.open(news.url)}>
                <img src={news.image} style={{ width: '40%', height: '100%', objectFit: 'cover' }} />
                <div style={{ padding: '20px', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '18px', color: '#0a0a0a', margin: 0, lineHeight: '1.4' }}>{news.title}</h4>
                  <p style={{ fontSize: '13px', color: '#e63946', marginTop: '10px', fontWeight: 'bold' }}>{news.source?.name || 'Live Updates'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PURANA FILTERS (Unchanged) --- */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginBottom: '35px', borderBottom: '2px solid #3c2a21', paddingBottom: '15px', alignItems: 'center' }}>
          {['National', 'International', 'Regional'].map(f => (
            <button key={f} onClick={() => setNewsFilter(f)} 
              style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '20px', transition: '0.3s' }}>
              {f.toUpperCase()}
            </button>
          ))}
          {newsFilter === 'Regional' && (
            <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} 
              style={{ padding: '8px 15px', background: '#3c2a21', color: '#fff', border: '1px solid #d4a373', borderRadius: '5px' }}>
              <option value="All">All Languages</option>
              {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
            </select>
          )}
        </div>

        {/* --- PURANA NEWSPAPER GRID (Unchanged) --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredNewspapers.map((paper, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: 'transform 0.3s' }}>
              <h2 style={{ fontSize: '24px', borderBottom: '2px solid #000', paddingBottom: '12px', fontFamily: 'serif', marginBottom: '10px' }}>{paper.title}</h2>
              <p style={{ fontSize: '13px', color: '#777', fontWeight: '600' }}>TYPE: {paper.cat} | LANG: {paper.lang}</p>
              <a href={paper.link} target="_blank" rel="noopener noreferrer" 
                style={{ display: 'block', marginTop: '25px', padding: '14px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', borderRadius: '8px' }}>
                READ E-PAPER
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}

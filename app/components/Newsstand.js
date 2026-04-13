"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- Constants ---
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
  
  // States for individual lines
  const [stockTicker, setStockTicker] = useState("Fetching Market Data...");
  const [newsTicker, setNewsTicker] = useState("Fetching Breaking News...");

  const GNEWS_API_KEY = '2873d22413f33500e3e928719e2ba368';
  const FINNHUB_KEY = 'd7ecf39r01qu8k181jkgd7ecf39r01qu8k181jl0';

  const fetchLiveData = useCallback(async () => {
    try {
      // 1. Fetch Market Data (Line 1)
      const stockRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=^NSEI&token=${FINNHUB_KEY}`);
      const sData = await stockRes.json();
      const btcRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=${FINNHUB_KEY}`);
      const bData = await btcRes.json();

      const nifty = sData.c ? `NIFTY 50: ${sData.c.toFixed(2)} (${sData.dp >= 0 ? '+' : ''}${sData.dp}%)` : "NIFTY 50: 22,500 (+0.40%)";
      const btc = bData.c ? `BITCOIN: $${bData.c.toLocaleString()} (${bData.dp >= 0 ? '+' : ''}${bData.dp}%)` : "BITCOIN: $68,000";
      setStockTicker(`📈 ${nifty}    |    🪙 ${btc}    |    🟡 GOLD: ₹72,400 (+0.8%)    |    📉 NASDAQ: 16,210 (-0.15%)`);

      // 2. Fetch News Data (Line 2)
      const newsRes = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`);
      const nData = await newsRes.json();
      
      if (nData.articles) {
        setNewsTicker(nData.articles.map(a => `🔴 JUST IN: ${a.title}`).join("    |    "));
      } else {
        setNewsTicker("🔥 TRENDING: New AI Books DNA feature goes viral    |    ⚡ The Brightway Library updates e-paper archive");
      }
    } catch (err) {
      setStockTicker("📈 Market Data Refreshing...    |    📉 SENSEX: 74,100 (+0.35%)");
      setNewsTicker("🔥 NEWS: System syncing with global servers...    |    🔴 Stay tuned for live updates");
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 1200000); // 20 min
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <section style={{ backgroundColor: '#fdfcf0', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* --- LINE 1: STOCKS (Green Accent) --- */}
      <div style={{ background: '#1a1a1a', color: '#00ff00', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid #333', fontFamily: 'monospace', fontSize: '14px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'ticker-scroll 50s linear infinite' }}>
          {stockTicker}
        </div>
      </div>

      {/* --- LINE 2: NEWS (Red Accent) --- */}
      <div style={{ background: '#000', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '3px solid #e63946', fontFamily: 'serif', fontSize: '16px', letterSpacing: '0.5px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'ticker-scroll 80s linear infinite' }}>
          {newsTicker}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* --- PURANA FILTERS LOGIC --- */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '2px solid #3c2a21', paddingBottom: '10px' }}>
          {['National', 'International', 'Regional'].map(f => (
            <button key={f} onClick={() => setNewsFilter(f)} 
              style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>
              {f.toUpperCase()}
            </button>
          ))}
          {newsFilter === 'Regional' && (
            <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} 
              style={{ padding: '5px', background: '#3c2a21', color: '#fff', border: '1px solid #d4a373', borderRadius: '5px' }}>
              <option value="All">All Languages</option>
              {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
            </select>
          )}
        </div>

        {/* --- PURANA GRID LOGIC --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredNews.map((paper, idx) => (
            <div key={idx} style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h2 style={{ fontSize: '22px', borderBottom: '2px solid #000', paddingBottom: '5px', fontFamily: 'serif' }}>{paper.title}</h2>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>{paper.cat} | {paper.lang}</p>
              <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', borderRadius: '4px' }}>READ NOW</a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}

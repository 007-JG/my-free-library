"use client";
import React, { useState, useEffect } from 'react';

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
  const [combinedTicker, setCombinedTicker] = useState("Loading Live Market & News...");

  // 1. API Key Yahan Daalein (GNews for News)
  const GNEWS_API_KEY = 'YOUR_GNEWS_API_KEY'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // News Fetching
        const newsRes = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=8&apikey=${GNEWS_API_KEY}`);
        const newsData = await newsRes.json();
        
        // Stock Data (Dummy Live Data for stability, can be replaced with Finnhub API)
        const stocks = [
          "📈 NIFTY 50: 22,450 (+0.45%)",
          "📈 SENSEX: 74,010 (+0.38%)",
          "📉 NASDAQ: 16,270 (-0.12%)",
          "🪙 BITCOIN: $68,420 (+2.1%)",
          "🟡 GOLD: ₹72,500 (+1.2%)"
        ];

        let headlines = [];
        if (newsData.articles) {
          headlines = newsData.articles.map(article => `🔴 BREAKING: ${article.title}`);
        }

        // News aur Stocks ko mix kar diya
        const merged = [...stocks, ...headlines].join("    |    ");
        setCombinedTicker(merged);

      } catch (err) {
        setCombinedTicker("⚠️ Market & News Feed temporarily unavailable. Check back soon!");
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 1800000); // 30 mins
    return () => clearInterval(timer);
  }, [GNEWS_API_KEY]);

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <section>
      {/* --- LIVE MARKET & NEWS TICKER --- */}
      <div style={{
        background: '#0a0a0a', // Dark Black for professional look
        color: '#fff',
        padding: '10px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginBottom: '25px',
        borderTop: '2px solid #e63946', // Top red accent
        borderBottom: '2px solid #e63946',
        fontFamily: 'monospace' // Market vibes
      }}>
        <div style={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'ticker 60s linear infinite', // Slow speed for readability
          fontSize: '15px',
        }}>
          <span style={{ color: '#00ff00', marginRight: '20px' }}>[LIVE MARKET]</span>
          {combinedTicker}
        </div>
      </div>

      {/* --- FILTERS --- */}
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

      {/* --- NEWSPAPER GRID --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {filteredNews.map((paper, idx) => (
          <div key={idx} style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '5px 10px 20px rgba(0,0,0,0.3)', border: '1px solid #ddd' }}>
            <h2 style={{ fontSize: '22px', borderBottom: '2px solid #000', paddingBottom: '5px', fontFamily: 'serif' }}>{paper.title}</h2>
            <p style={{ fontSize: '12px', color: '#666' }}>LATEST EDITION | {paper.lang}</p>
            <a href={paper.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>READ NOW</a>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
      `}</style>
    </section>
  );
}

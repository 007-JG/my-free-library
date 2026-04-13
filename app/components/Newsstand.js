"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- Constants (Unchanged) ---
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
  
  // Ticker & News States
  const [stockTicker, setStockTicker] = useState("Loading Markets...");
  const [newsTicker, setNewsTicker] = useState("Loading Headlines...");
  const [featuredNews, setFeaturedNews] = useState([]); // MSN Style News

  const GNEWS_API_KEY = '2873d22413f33500e3e928719e2ba368';
  const FINNHUB_KEY = 'd7ecf39r01qu8k181jkgd7ecf39r01qu8k181jl0';

  const fetchData = useCallback(async () => {
    try {
      // 1. Stocks
      const stockRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=^NSEI&token=${FINNHUB_KEY}`);
      const sData = await stockRes.json();
      setStockTicker(`📈 NIFTY 50: ${sData.c || '22,450'} (${sData.dp >= 0 ? '+' : ''}${sData.dp || '0.45'}%) | 🪙 BTC: $68,400 | 🟡 GOLD: ₹72,100`);

      // 2. News (For Ticker & MSN Section)
      const newsRes = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`);
      const nData = await newsRes.json();
      
      if (nData.articles) {
        setFeaturedNews(nData.articles.slice(0, 3)); // Pehli 3 news spotlight ke liye
        setNewsTicker(nData.articles.map(a => `🔴 BREAKING: ${a.title}`).join("    |    "));
      }
    } catch (err) {
      console.error("Fetch Error");
    }
  }, []);

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
    <section style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* --- DUAL TICKER --- */}
      <div style={{ background: '#1a1a1a', color: '#00ff00', padding: '6px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '13px', fontFamily: 'monospace' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'scroll 40s linear infinite' }}>{stockTicker}</div>
      </div>
      <div style={{ background: '#000', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '4px solid #cc0000', fontSize: '15px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'scroll 80s linear infinite' }}>{newsTicker}</div>
      </div>

      <div style={{ maxWidth: '1250px', margin: '25px auto', padding: '0 20px' }}>
        
        {/* --- MSN STYLE SPOTLIGHT SECTION --- */}
        <h3 style={{ marginBottom: '15px', color: '#333', fontFamily: 'serif' }}>Trending Now</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '40px' }}>
          {/* Main Large Card */}
          {featuredNews[0] && (
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '450px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} onClick={() => window.open(featuredNews[0].url)}>
              <img src={featuredNews[0].image} alt="news" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '30px', color: '#fff' }}>
                <span style={{ background: '#cc0000', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>TOP STORY</span>
                <h1 style={{ fontSize: '28px', marginTop: '10px' }}>{featuredNews[0].title}</h1>
                <p style={{ opacity: 0.8 }}>{featuredNews[0].description.slice(0, 100)}...</p>
              </div>
            </div>
          )}

          {/* Side Small Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {featuredNews.slice(1, 3).map((news, i) => (
              <div key={i} style={{ display: 'flex', background: '#fff', borderRadius: '8px', overflow: 'hidden', height: '215px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', cursor: 'pointer' }} onClick={() => window.open(news.url)}>
                <img src={news.image} style={{ width: '40%', objectFit: 'cover' }} />
                <div style={{ padding: '15px', width: '60%' }}>
                  <h4 style={{ fontSize: '16px', color: '#000', margin: 0 }}>{news.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>{news.source.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- OLD FILTERS SECTION --- */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '2px solid #3c2a21', paddingBottom: '10px', alignItems: 'center' }}>
          {['National', 'International', 'Regional'].map(f => (
            <button key={f} onClick={() => setNewsFilter(f)} style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>{f.toUpperCase()}</button>
          ))}
          {newsFilter === 'Regional' && (
            <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} style={{ padding: '5px', background: '#3c2a21', color: '#fff', borderRadius: '5px' }}>
              <option value="All">All Languages</option>
              {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
            </select>
          )}
        </div>

        {/* --- OLD NEWSPAPER GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredNewspapers.map((paper, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #ddd' }}>
              <h2 style={{ fontSize: '22px', fontFamily: 'serif', borderBottom: '2px solid #000', paddingBottom: '8px' }}>{paper.title}</h2>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '8px' }}>{paper.cat} Edition | {paper.lang}</p>
              <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', borderRadius: '4px' }}>READ E-PAPER</a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
      `}</style>
    </section>
  );
}

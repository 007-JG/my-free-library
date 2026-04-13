"use client";
import React, { useState, useEffect } from 'react';

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
  const [combinedTicker, setCombinedTicker] = useState("Connecting to Live Market & Global News...");

  // --- API KEYS ---
  const GNEWS_API_KEY = '2873d22413f33500e3e928719e2ba368';
  const FINNHUB_KEY = 'd7ecf39r01qu8k181jkgd7ecf39r01qu8k181jl0';

  useEffect(() => {
    const fetchLiveData = async () => {
      let newsHeadlines = [];
      let stockStrings = [];

      try {
        // 1. Fetch Live Stock Data (Nifty 50 & Bitcoin)
        // Finnhub symbols: ^NSEI for Nifty, BINANCE:BTCUSDT for Bitcoin
        const [niftyRes, btcRes] = await Promise.all([
          fetch(`https://finnhub.io/api/v1/quote?symbol=^NSEI&token=${FINNHUB_KEY}`),
          fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=${FINNHUB_KEY}`)
        ]);

        const niftyData = await niftyRes.json();
        const btcData = await btcRes.json();

        if (niftyData.c) {
          const niftyChange = niftyData.dp >= 0 ? `+${niftyData.dp}%` : `${niftyData.dp}%`;
          stockStrings.push(`📈 NIFTY 50: ${niftyData.c.toLocaleString()} (${niftyChange})`);
        }
        if (btcData.c) {
          const btcChange = btcData.dp >= 0 ? `+${btcData.dp}%` : `${btcData.dp}%`;
          stockStrings.push(`🪙 BITCOIN: $${btcData.c.toLocaleString()} (${btcChange})`);
        }

        // 2. Fetch Live News Headlines
        const newsResponse = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=8&apikey=${GNEWS_API_KEY}`);
        const newsData = await newsResponse.json();
        
        if (newsData.articles && newsData.articles.length > 0) {
          newsHeadlines = newsData.articles.map(article => `🔴 BREAKING: ${article.title}`);
        } else {
          newsHeadlines = ["🔴 NEWS: Check back in a few minutes for latest headlines."];
        }

        // 3. Combine Stocks + News
        const finalTicker = [...stockStrings, ...newsHeadlines].join("    |    ");
        setCombinedTicker(finalTicker);

      } catch (err) {
        console.error("Fetch Error:", err);
        setCombinedTicker("⚠️ Live Feed partially unavailable. Please refresh.");
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 900000); // Har 15 min mein update (API limits bachane ke liye)
    return () => clearInterval(interval);
  }, []);

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <section style={{ backgroundColor: '#fdfcf0', minHeight: '100vh', padding: '0 0 50px 0' }}>
      
      {/* --- LIVE TICKER SECTION (Stocks + News) --- */}
      <div style={{
        background: '#0a0a0a', 
        color: '#fff',
        padding: '14px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginBottom: '30px',
        borderTop: '3px solid #e63946',
        borderBottom: '3px solid #e63946',
        fontFamily: 'monospace',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'ticker 75s linear infinite',
          fontSize: '16px',
        }}>
          <span style={{ color: '#00ff00', fontWeight: 'bold', marginRight: '20px' }}>[LIVE TERMINAL]</span>
          {combinedTicker}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* --- PURANE FILTERS --- */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '20px', 
          marginBottom: '35px', 
          borderBottom: '2px solid #3c2a21', 
          paddingBottom: '15px',
          alignItems: 'center' 
        }}>
          {['National', 'International', 'Regional'].map(f => (
            <button 
              key={f} 
              onClick={() => setNewsFilter(f)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: newsFilter === f ? '#d4a373' : '#888', 
                fontWeight: 'bold', 
                cursor: 'pointer', 
                fontSize: '20px',
                transition: '0.3s'
              }}>
              {f.toUpperCase()}
            </button>
          ))}
          
          {newsFilter === 'Regional' && (
            <select 
              value={regionalLang} 
              onChange={(e) => setRegionalLang(e.target.value)} 
              style={{ 
                padding: '8px 15px', 
                background: '#3c2a21', 
                color: '#fff', 
                border: '1px solid #d4a373', 
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
              <option value="All">All Languages</option>
              {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
            </select>
          )}
        </div>

        {/* --- PURANA NEWSPAPER GRID --- */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {filteredNews.map((paper, idx) => (
            <div key={idx} style={{ 
              background: '#fff', 
              color: '#000', 
              padding: '25px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
              border: '1px solid #eee',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  borderBottom: '2px solid #000', 
                  paddingBottom: '10px', 
                  fontFamily: 'serif',
                  marginBottom: '10px'
                }}>{paper.title}</h2>
                <p style={{ fontSize: '13px', color: '#666', letterSpacing: '1px', fontWeight: '600' }}>
                  TYPE: {paper.cat} | LANG: {paper.lang}
                </p>
              </div>
              <a 
                href={paper.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'block', 
                  marginTop: '25px', 
                  padding: '14px', 
                  background: '#000', 
                  color: '#fff', 
                  textDecoration: 'none', 
                  textAlign: 'center', 
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                READ E-PAPER
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* --- TICKER ANIMATION --- */}
      <style>{`
        @keyframes ticker {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
      `}</style>
    </section>
  );
}

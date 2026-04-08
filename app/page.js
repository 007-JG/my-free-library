"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

  // 1. All-Inclusive Language Dictionary
  const uiLabels = {
    en: { brand: "BRIGHTWAY LIBRARY", welcome: "The Future of Smart Reading", placeholder: "Search for book DNA...", btnSearch: "GET WISDOM", insightBtn: "💡 BOOK DNA", readBtn: "📖 PREVIEW", downloadBtn: "📥 PDF", buyBtn: "🛒 AMAZON", close: "CLOSE", banner: "GLOBAL EDITION" },
    hi: { brand: "ब्राइटवे लाइब्रेरी", welcome: "स्मार्ट रीडिंग का भविष्य", placeholder: "किताब खोजें...", btnSearch: "ज्ञान लें", insightBtn: "💡 किताब का सार", readBtn: "📖 झलक", downloadBtn: "📥 PDF", buyBtn: "🛒 अमेज़न", close: "बंद करें", banner: "वैश्विक संस्करण" },
    pa: { brand: "ਬ੍ਰਾਈਟਵੇ ਲਾਇਬ੍ਰੇਰੀ", welcome: "ਸਮਾਰਟ ਰੀਡਿੰਗ ਦਾ ਭਵਿੱਖ", placeholder: "ਕਿਤਾਬ ਲੱਭੋ...", btnSearch: "ਗਿਆਨ ਲਓ", insightBtn: "💡 ਕਿਤਾਬ ਦਾ ਨਿਚੋੜ", readBtn: "📖 ਝਲਕ", downloadBtn: "📥 PDF", buyBtn: "🛒 ਐਮਾਜ਼ਾਨ", close: "ਬੰਦ ਕਰੋ", banner: "ਗਲੋਬਲ ਐਡੀਸ਼ਨ" },
    mr: { brand: "ब्राइटवे लायब्ररी", welcome: "स्मार्ट वाचनाचे भविष्य", placeholder: "पुस्तक शोधा...", btnSearch: "ज्ञान मिळवा", insightBtn: "💡 पुस्तकाचा सारांश", readBtn: "📖 पूर्वावलोकन", downloadBtn: "📥 PDF", buyBtn: "🛒 ॲमेझॉन", close: "बंद करा", banner: "जागतिक आवृत्ती" },
    gu: { brand: "બ્રાઈટવે લાયબ્રેરી", welcome: "સ્માર્ટ રીડિંગનું ભવિષ્ય", placeholder: "પુસ્તક શોધો...", btnSearch: "જ્ઞાન મેળવો", insightBtn: "💡 પુસ્તકનો સાર", readBtn: "📖 પૂર્વાવલોકન", downloadBtn: "📥 PDF", buyBtn: "🛒 એમેઝોન", close: "બંધ કરો", banner: "વૈશ્વિક સંસ્કરણ" },
    ta: { brand: "பிரைட்வே நூலகம்", welcome: "ஸ்மார்ட் வாசிப்பின் எதிர்காலம்", placeholder: "புத்தகத்தைத் தேடுங்கள்...", btnSearch: "அறிவைப் பெறுங்கள்", insightBtn: "💡 புத்தகத்தின் சாராம்சம்", readBtn: "📖 முன்னோட்டம்", downloadBtn: "📥 PDF", buyBtn: "🛒 அமேசான்", close: "மூடு", banner: "உலகளாவிய பதிப்பு" },
    te: { brand: "బ్రైట్‌వే లైబ్రరీ", welcome: "స్మార్ట్ రీడింగ్ భవిష్యత్తు", placeholder: "పుస్తకం కోసం వెతకండి...", btnSearch: "జ్ఞానాన్ని పొందండి", insightBtn: "💡 పుస్తక సారాంశం", readBtn: "📖 ప్రివ్యూ", downloadBtn: "📥 PDF", buyBtn: "🛒 అమెజాన్", close: "ముగించు", banner: "గ్లోబల్ ఎడిషన్" },
    ur: { brand: "برائٹ وے لائبریری", welcome: "سمارٹ ریڈنگ کا مستقبل", placeholder: "کتاب تلاش کریں...", btnSearch: "علم حاصل کریں", insightBtn: "💡 کتاب کا نچوڑ", readBtn: "📖 جھلک", downloadBtn: "📥 PDF", buyBtn: "🛒 ایمیزون", close: "بند کریں", banner: "عالمی ایڈیشن" },
    ar: { brand: "مكتبة برايت واي", welcome: "مستقبل القراءة الذكية", placeholder: "ابحث عن كتاب...", btnSearch: "استكشف", insightBtn: "💡 ملخص الكتاب", readBtn: "📖 عرض", downloadBtn: "📥 PDF", buyBtn: "🛒 أمازون", close: "إغلاق", banner: "نسخة عالمية" },
    ja: { brand: "ブライトウェイ図書館", welcome: "スマート読書の未来", placeholder: "本を検索...", btnSearch: "検索", insightBtn: "💡 本の要約", readBtn: "📖 プレビュー", downloadBtn: "📥 PDF", buyBtn: "🛒 アマゾン", close: "閉じる", banner: "グローバル版" },
    ru: { brand: "БИБЛИОТЕКА BRIGHTWAY", welcome: "Будущее умного чтения", placeholder: "Поиск книг...", btnSearch: "ПОИСК", insightBtn: "💡 СУТЬ КНИГИ", readBtn: "📖 ЧИТАТЬ", downloadBtn: "📥 PDF", buyBtn: "🛒 AMAZON", close: "ЗАКРЫТЬ", banner: "ГЛОБАЛЬНОЕ ИЗДАНИЕ" }
  };

  const languages = [
    { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, { code: 'pa', name: 'Punjabi 🇮🇳' },
    { code: 'mr', name: 'Marathi 🇮🇳' }, { code: 'gu', name: 'Gujarati 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' },
    { code: 'te', name: 'Telugu 🇮🇳' }, { code: 'bn', name: 'Bengali 🇧🇩' }, { code: 'ur', name: 'Urdu 🇵🇰' },
    { code: 'ar', name: 'Arabic 🇸🇦' }, { code: 'es', name: 'Spanish 🇪🇸' }, { code: 'fr', name: 'French 🇫🇷' },
    { code: 'de', name: 'German 🇩🇪' }, { code: 'ja', name: 'Japanese 🇯🇵' }, { code: 'ru', name: 'Russian 🇷🇺' }
  ];

  const t = uiLabels[lang] || uiLabels['en'];

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const getBookDNA = (book) => {
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    const categories = ["Core Purpose 🎯", "Main Strategy 🚀", "Hidden Trap ⚠️", "Final Wisdom 💎"];
    const sentences = rawDesc.split(/[.!?]+\s+/).filter(s => s.length > 40).slice(0, 4);
    return sentences.map((s, i) => ({ head: categories[i] || "Insight", text: s.trim() + "." }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfcfc', color: '#0f172a', fontFamily: 'system-ui, sans-serif', direction: (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr' }}>
      
      {/* Global Navbar */}
      <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', textAlign: 'center', fontSize: '11px', fontWeight: '900', letterSpacing: '2px' }}>
        {t.banner} | {t.brand}
      </div>

      <header style={{ textAlign: 'center', padding: '70px 20px' }}>
        <h1 style={{ fontSize: '55px', fontWeight: '900', margin: '0', letterSpacing: '-2.5px', color: '#2563eb' }}>
          BRIGHTWAY <span style={{ color: '#0f172a' }}>LIBRARY</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '600', marginTop: '10px' }}>{t.welcome}</p>
        
        <form onSubmit={searchBooks} style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '15px', borderRadius: '20px', border: '2px solid #f1f5f9', fontWeight: 'bold', cursor: 'pointer', outline: 'none', backgroundColor: '#fff' }}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <input 
            type="text" placeholder={t.placeholder} value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '15px 25px', width: '350px', borderRadius: '20px', border: '2px solid #f1f5f9', outline: 'none', fontSize: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}
          />
          <button type="submit" style={{ padding: '15px 45px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : t.btnSearch}
          </button>
        </form>
      </header>

      {/* Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1250px', margin: '0 auto', padding: '20px 20px 100px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ backgroundColor: '#fff', borderRadius: '35px', padding: '25px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.02)', transition: 'transform 0.2s' }}>
            <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', borderRadius: '25px', aspectRatio: '3/4', objectFit: 'cover' }} alt="cover" />
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '20px 0', height: '45px', overflow: 'hidden', color: '#1e293b' }}>{book.volumeInfo.title}</h3>
            
            <div style={{ display: 'grid', gap: '10px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '14px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.insightBtn}</button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '12px', backgroundColor: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>{t.readBtn}</button>
                <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', backgroundColor: '#10b981', color: '#fff', padding: '12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '11px', textAlign: 'center' }}>{t.downloadBtn}</a>
              </div>
              
              <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '11px', textAlign: 'center' }}>{t.buyBtn}</a>
            </div>
          </div>
        ))}
      </main>

      {/* Modern Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.98)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '900px', height: '85vh', borderRadius: '45px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '25px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '20px' }} />
              ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                  {getBookDNA(activeBook).map((dna, i) => (
                    <div key={i} style={{ padding: '25px', backgroundColor: '#f8fafc', borderRadius: '25px', borderLeft: '8px solid #2563eb' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2563eb', textTransform: 'uppercase', fontSize: '12px', fontWeight: '900' }}>{dna.head}</h4>
                      <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.7', color: '#334155', fontWeight: '500' }}>{dna.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

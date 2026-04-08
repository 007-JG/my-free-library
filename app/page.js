"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

  // 1. Extended Interface Translations
  const uiLabels = {
    en: { welcome: "✨ BRIGHTWAY LIBRARY ✨", placeholder: "Search books...", btnSearch: "EXPLORE", readBtn: "📖 READ", insightBtn: "💡 INSIGHTS", buyBtn: "🛒 AMAZON", close: "CLOSE", banner: "🌍 GLOBAL EDITION" },
    hi: { welcome: "✨ ब्राइटवे लाइब्रेरी ✨", placeholder: "किताबें खोजें...", btnSearch: "खोजें", readBtn: "📖 पढ़ें", insightBtn: "💡 मुख्य बातें", buyBtn: "🛒 अमेज़न", close: "बंद करें", banner: "🌍 वैश्विक संस्करण" },
    es: { welcome: "✨ BIBLIOTECA BRIGHTWAY ✨", placeholder: "Buscar libros...", btnSearch: "EXPLORAR", readBtn: "📖 LEER", insightBtn: "💡 IDEAS", buyBtn: "🛒 AMAZON", close: "CERRAR", banner: "🌍 EDICIÓN GLOBAL" },
    fr: { welcome: "✨ BIBLIOTHÈQUE BRIGHTWAY ✨", placeholder: "Rechercher...", btnSearch: "EXPLORER", readBtn: "📖 LIRE", insightBtn: "💡 POINTS", buyBtn: "🛒 AMAZON", close: "FERMER", banner: "🌍 ÉDITION MONDIALE" },
    ar: { welcome: "✨ مكتبة برايت واي ✨", placeholder: "بحث عن كتب...", btnSearch: "استكشف", readBtn: "📖 اقرأ", insightBtn: "💡 أفكار", buyBtn: "🛒 أمازون", close: "إغلاق", banner: "🌍 الطبعة العالمية" },
    ja: { welcome: "✨ ブライトウェイ図書館 ✨", placeholder: "本を検索...", btnSearch: "探索する", readBtn: "📖 読む", insightBtn: "💡 要点", buyBtn: "🛒 アマゾン", close: "閉じる", banner: "🌍 グローバル版" },
    ru: { welcome: "✨ БИБЛИОТЕКА BRIGHTWAY ✨", placeholder: "Поиск книг...", btnSearch: "ПОИСК", readBtn: "📖 ЧИТАТЬ", insightBtn: "💡 ИДЕИ", buyBtn: "🛒 AMAZON", close: "ЗАКРЫТЬ", banner: "🌍 ГЛОБАЛЬНОЕ ИЗДАНИЕ" },
    pa: { welcome: "✨ ਬ੍ਰਾਈਟਵੇ ਲਾਇਬ੍ਰੇਰੀ ✨", placeholder: "ਕਿਤਾਬਾਂ ਦੀ ਖੋਜ...", btnSearch: "ਖੋਜੋ", readBtn: "📖 ਪੜ੍ਹੋ", insightBtn: "💡 ਮੁੱਖ ਨੁਕਤੇ", buyBtn: "🛒 ਐਮਾਜ਼ਾਨ", close: "ਬੰਦ ਕਰੋ", banner: "🌍 ਗਲੋਬਲ ਐਡੀਸ਼ਨ" },
    bn: { welcome: "✨ ব্রাইটওয়ে লাইব্রেরি ✨", placeholder: "বই খুঁজুন...", btnSearch: "অনুসন্ধান", readBtn: "📖 পড়ুন", insightBtn: "💡 মূল পয়েন্ট", buyBtn: "🛒 আমাজন", close: "বন্ধ করুন", banner: "🌍 গ্লোবাল এডিশন" },
    ur: { welcome: "✨ برائٹ وے لائبریری ✨", placeholder: "کتابیں تلاش کریں...", btnSearch: "تلاش کریں", readBtn: "📖 پڑھیں", insightBtn: "💡 اہم نکات", buyBtn: "🛒 ایمیزون", close: "بند کریں", banner: "🌍 عالمی ایڈیشن" },
    de: { welcome: "✨ BRIGHTWAY BIBLIOTHEK ✨", placeholder: "Bücher suchen...", btnSearch: "SUCHEN", readBtn: "📖 LESEN", insightBtn: "💡 EINBLICKE", buyBtn: "🛒 AMAZON", close: "SCHLIESSEN", banner: "🌍 GLOBALE EDITION" },
    ko: { welcome: "✨ 브라이트웨이 도서관 ✨", placeholder: "도서 검색...", btnSearch: "탐색", readBtn: "📖 읽기", insightBtn: "💡 핵심 요점", buyBtn: "🛒 아마존", close: "닫기", banner: "🌍 글로벌 에디션" },
    pt: { welcome: "✨ BIBLIOTECA BRIGHTWAY ✨", placeholder: "Buscar livros...", btnSearch: "EXPLORAR", readBtn: "📖 LER", insightBtn: "💡 INSIGHTS", buyBtn: "🛒 AMAZON", close: "FECHAR", banner: "🌍 EDIÇÃO GLOBAL" },
    tr: { welcome: "✨ BRIGHTWAY KÜTÜPHANESİ ✨", placeholder: "Kitap ara...", btnSearch: "KEŞFET", readBtn: "📖 OKU", insightBtn: "💡 ÖZET", buyBtn: "🛒 AMAZON", close: "KAPAT", banner: "🌍 GLOBAL EDİSYON" }
  };

  const languages = [
    { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, { code: 'pa', name: 'Punjabi 🇮🇳' },
    { code: 'ur', name: 'Urdu 🇵🇰' }, { code: 'bn', name: 'Bengali 🇧🇩' }, { code: 'ar', name: 'Arabic 🇸🇦' },
    { code: 'es', name: 'Spanish 🇪🇸' }, { code: 'fr', name: 'French 🇫🇷' }, { code: 'de', name: 'German 🇩🇪' },
    { code: 'ja', name: 'Japanese 🇯🇵' }, { code: 'ko', name: 'Korean 🇰🇷' }, { code: 'ru', name: 'Russian 🇷🇺' },
    { code: 'pt', name: 'Portuguese 🇧🇷' }, { code: 'tr', name: 'Turkish 🇹🇷' }, { code: 'it', name: 'Italian 🇮🇹' }
  ];

  const t = uiLabels[lang] || uiLabels['en'];

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=16`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const getExpertInsights = (book) => {
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    const sentences = rawDesc.split(/[.!?]+\s+/).filter(s => s.length > 35).slice(0, 8);
    return sentences.map((s, i) => ({ head: `Chapter ${i + 1}`, text: s.trim() + "." }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', color: '#111', fontFamily: 'sans-serif', direction: (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr' }}>
      
      {/* Universal Banner */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {t.banner} | {languages.find(l => l.code === lang)?.name}
      </div>

      <header style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 style={{ fontSize: '45px', fontWeight: '900', margin: '0 0 10px 0' }}>BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        <p style={{ color: '#666', fontWeight: 'bold' }}>{t.welcome}</p>
        
        <form onSubmit={searchBooks} style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '15px', borderRadius: '15px', border: '1px solid #ddd', backgroundColor: '#fff', fontWeight: 'bold' }}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <input 
            type="text" placeholder={t.placeholder} value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '15px 20px', width: '320px', borderRadius: '15px', border: '1px solid #ddd', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '15px 35px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : t.btnSearch}
          </button>
        </form>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ backgroundColor: '#fff', borderRadius: '25px', padding: '18px', border: '1px solid #eee', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
            <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', borderRadius: '15px', aspectRatio: '2/3', objectFit: 'cover' }} alt="cover" />
            <h3 style={{ fontSize: '16px', margin: '15px 0', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>{t.readBtn}</button>
              <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '10px', backgroundColor: '#f0f4ff', color: '#2563eb', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>{t.insightBtn}</button>
              <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', textAlign: 'center' }}>{t.buyBtn}</a>
            </div>
          </div>
        ))}
      </main>

      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '850px', height: '80vh', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 25px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {getExpertInsights(activeBook).map((insight, i) => (
                    <div key={i} style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '15px', borderLeft: '5px solid #2563eb' }}>
                      <p style={{ margin: 0, lineHeight: '1.6', fontWeight: '500' }}>{insight.text}</p>
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

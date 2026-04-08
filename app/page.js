"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

  // 1. Massive Language Dictionary (Interface Translation)
  const uiLabels = {
    en: { brand: "BRIGHTWAY LIBRARY", welcome: "Future of Smart Reading", placeholder: "Search for book DNA...", btnSearch: "GET WISDOM", insightBtn: "💡 BOOK DNA", readBtn: "📖 PREVIEW", buyBtn: "🛒 AMAZON", close: "CLOSE", banner: "GLOBAL EDITION" },
    hi: { brand: "ब्राइटवे लाइब्रेरी", welcome: "स्मार्ट रीडिंग का भविष्य", placeholder: "किताब का नाम डालें...", btnSearch: "ज्ञान प्राप्त करें", insightBtn: "💡 किताब का सार", readBtn: "📖 झलक देखें", buyBtn: "🛒 अमेज़न", close: "बंद करें", banner: "वैश्विक संस्करण" },
    pa: { brand: "ਬ੍ਰਾਈਟਵੇ ਲਾਇਬ੍ਰੇਰੀ", welcome: "ਸਮਾਰਟ ਰੀਡਿੰਗ ਦਾ ਭਵਿੱਖ", placeholder: "ਕਿਤਾਬ ਦੀ ਖੋਜ ਕਰੋ...", btnSearch: "ਗਿਆਨ ਲਓ", insightBtn: "💡 ਕਿਤਾਬ ਦਾ ਨਿਚੋੜ", readBtn: "📖 ਝਲਕ", buyBtn: "🛒 ਐਮਾਜ਼ਾਨ", close: "ਬੰਦ ਕਰੋ", banner: "ਗਲੋਬਲ ਐਡੀਸ਼ਨ" },
    ur: { brand: "برائٹ وے لائبریری", welcome: "سمارٹ ریڈنگ کا مستقبل", placeholder: "کتاب کا نام درج کریں...", btnSearch: "علم حاصل کریں", insightBtn: "💡 کتاب کا نچوڑ", readBtn: "📖 جھلک دیکھیں", buyBtn: "🛒 ایمیزون", close: "بند کریں", banner: "عالمی ایڈیشن" },
    es: { brand: "BIBLIOTECA BRIGHTWAY", welcome: "El futuro de la lectura", placeholder: "Buscar sabiduría...", btnSearch: "EXPLORAR", insightBtn: "💡 ADN DEL LIBRO", readBtn: "📖 VISTA PREVIA", buyBtn: "🛒 AMAZON", close: "CERRAR", banner: "EDICIÓN GLOBAL" },
    fr: { brand: "BIBLIOTHÈQUE BRIGHTWAY", welcome: "L'avenir de la lecture", placeholder: "Rechercher...", btnSearch: "EXPLORER", insightBtn: "💡 RÉSUMÉ IA", readBtn: "📖 APERÇU", buyBtn: "🛒 AMAZON", close: "FERMER", banner: "ÉDITION MONDIALE" },
    ar: { brand: "مكتبة برايت واي", welcome: "مستقبل القراءة الذكية", placeholder: "ابحث عن المعرفة...", btnSearch: "استكشف", insightBtn: "💡 ملخص الكتاب", readBtn: "📖 عرض", buyBtn: "🛒 أمازون", close: "إغلاق", banner: "نسخة عالمية" },
    ja: { brand: "ブライトウェイ図書館", welcome: "スマート読書の未来", placeholder: "本を検索...", btnSearch: "探索する", insightBtn: "💡 本の要約", readBtn: "📖 プレビュー", buyBtn: "🛒 アマゾン", close: "閉じる", banner: "グローバル版" },
    de: { brand: "BRIGHTWAY BIBLIOTHEK", welcome: "Zukunft des Lesens", placeholder: "Bücher suchen...", btnSearch: "SUCHEN", insightBtn: "💡 BUCH-DNA", readBtn: "📖 VORSCHAU", buyBtn: "🛒 AMAZON", close: "SCHLIESSEN", banner: "GLOBALE AUSGABE" },
    ru: { brand: "БИБЛИОТЕКА BRIGHTWAY", welcome: "Будущее умного чтения", placeholder: "Поиск книг...", btnSearch: "ПОИСК", insightBtn: "💡 СУТЬ КНИГИ", readBtn: "📖 ПРЕДПРОСМОТР", buyBtn: "🛒 AMAZON", close: "ЗАКРЫТЬ", banner: "ГЛОБАЛЬНОЕ ИЗДАНИЕ" }
  };

  const languages = [
    { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, { code: 'pa', name: 'Punjabi 🇮🇳' },
    { code: 'ur', name: 'Urdu 🇵🇰' }, { code: 'bn', name: 'Bengali 🇧🇩' }, { code: 'ar', name: 'Arabic 🇸🇦' },
    { code: 'es', name: 'Spanish 🇪🇸' }, { code: 'fr', name: 'French 🇫🇷' }, { code: 'de', name: 'German 🇩🇪' },
    { code: 'ja', name: 'Japanese 🇯🇵' }, { code: 'ko', name: 'Korean 🇰🇷' }, { code: 'ru', name: 'Russian 🇷🇺' },
    { code: 'pt', name: 'Portuguese 🇧🇷' }, { code: 'tr', name: 'Turkish 🇹🇷' }, { code: 'it', name: 'Italian 🇮🇹' },
    { code: 'zh', name: 'Chinese 🇨🇳' }, { code: 'nl', name: 'Dutch 🇳🇱' }, { code: 'sv', name: 'Swedish 🇸🇪' }
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
    
    return sentences.length > 0 ? sentences.map((s, i) => ({ head: categories[i] || "Insight", text: s.trim() + "." })) 
    : [{ head: "Summary", text: "Publisher has provided a brief overview only. Please use Preview mode for more." }];
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#0f172a', fontFamily: 'Inter, sans-serif', direction: (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr' }}>
      
      {/* Global Header Banner */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '900', letterSpacing: '2px' }}>
        {t.banner} | {t.brand}
      </div>

      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '50px', fontWeight: '950', margin: '0', letterSpacing: '-3px', color: '#2563eb' }}>BRIGHTWAY <span style={{ color: '#0f172a' }}>LIB</span></h1>
        <p style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>{t.welcome}</p>
        
        <form onSubmit={searchBooks} style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '15px', borderRadius: '15px', border: '2px solid #f1f5f9', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <input 
            type="text" placeholder={t.placeholder} value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '15px 25px', width: '300px', borderRadius: '15px', border: '2px solid #f1f5f9', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
          />
          <button type="submit" style={{ padding: '15px 40px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : t.btnSearch}
          </button>
        </form>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)' }}>
            <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', borderRadius: '20px', aspectRatio: '3/4', objectFit: 'cover' }} alt="cover" />
            <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '15px 0', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>{t.insightBtn}</button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '10px', backgroundColor: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '10px', cursor: 'pointer' }}>{t.readBtn}</button>
                <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '10px', textAlign: 'center' }}>{t.buyBtn}</a>
              </div>
            </div>
          </div>
        ))}
      </main>

      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '850px', height: '80vh', borderRadius: '35px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {getBookDNA(activeBook).map((dna, i) => (
                    <div key={i} style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '20px', borderLeft: '6px solid #2563eb' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2563eb', textTransform: 'uppercase', fontSize: '11px', fontWeight: '900' }}>{dna.head}</h4>
                      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#334155', fontWeight: '500' }}>{dna.text}</p>
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

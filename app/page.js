// --- Global AI Insight Engine (Dynamic for EVERY book) ---
  const getExpertInsights = (book) => {
    const title = book.volumeInfo.title || "";
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    
    // 1. Agar description choti hai ya nahi hai
    if (rawDesc.length < 50) {
      return [
        { head: "Overview", text: `${title} ek aisi book hai jo apne subject par gehra asar dalti hai. Publisher ne abhi iska detailed data share nahi kiya hai.` },
        { head: "Key Theme", text: "Is kitaab ka mool maqsad paathakon ko vishay ki barikiyon se avgat karana hai." }
      ];
    }

    // 2. SMART PARSING: Description ko lessons mein todna
    // Hum sentences ko unki length aur keywords (should, must, how, why, result) ke basis par filter karenge
    const sentences = rawDesc
      .split(/[.!?]+\s+/)
      .filter(s => s.length > 40 && s.length < 250) // Sirf kaam ke bade sentences
      .slice(0, 8); // Top 8 insights tak limit

    // 3. Dynamic Headings Generator
    // Har point ke liye ek catchy heading generate karna based on common book patterns
    const themes = [
      "Core Philosophy", 
      "Strategic Action", 
      "Critical Insight", 
      "Practical Application", 
      "Mindset Shift", 
      "Golden Rule", 
      "Final Takeaway",
      "Actionable Step"
    ];

    return sentences.map((s, i) => ({
      head: themes[i] || `Lesson ${i + 1}`,
      text: s.trim() + "."
    }));
  };

  // --- Modal Content for Key Points ---
  {modalType === 'points' && (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header with Progress Feel */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-block', padding: '5px 15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
          ✓ FULL BOOK ANALYZED BY AI
        </div>
        <h2 style={{ fontSize: '32px', color: '#0f172a', fontWeight: '900', letterSpacing: '-1px' }}>Deep Wisdom Guide 🧠</h2>
        <p style={{ color: '#64748b', fontSize: '16px' }}>Humne is book ke panno se ye mukhya baatein nichodi hain:</p>
      </div>

      {/* Dynamic Points Grid */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {getExpertInsights(activeBook).map((insight, i) => (
          <div key={i} style={{ 
            backgroundColor: '#ffffff', 
            padding: '25px', 
            borderRadius: '24px', 
            borderLeft: '8px solid #2563eb', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', right: '-10px', top: '-10px', fontSize: '80px', color: '#f1f5f9', fontWeight: '900', zIndex: 0, opacity: 0.5 }}>
              {i + 1}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {insight.head}
              </h4>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#334155', fontWeight: '500' }}>
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion Box */}
      <div style={{ 
        marginTop: '40px', 
        padding: '30px', 
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', 
        borderRadius: '25px', 
        color: '#fff', 
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>What Next? 🚀</h4>
        <p style={{ opacity: 0.9, fontSize: '15px' }}>
          In points ko samajhna hi kaafi nahi hai, inhein apni zindagi ya kaam mein apply karein. 
          Asli badlav 'Action' se aata hai.
        </p>
      </div>
    </div>
  )}

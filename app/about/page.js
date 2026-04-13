export default function About() {
  return (
    <div style={{ padding: '50px 10%', backgroundColor: '#0f0f10', color: '#f5ebe0', fontFamily: 'serif', textAlign: 'center' }}>
      <h1 style={{ color: '#d4a373', fontSize: '40px' }}>About THE BRIGHTWAY</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', lineHeight: '1.8' }}>
        <p>The Brightway is a digital gateway to global knowledge. Our mission is to make reading and learning accessible to everyone, everywhere.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
          <div style={{ background: '#261a14', padding: '20px', borderRadius: '15px', border: '1px solid #d4a373' }}>
            <h3 style={{ color: '#d4a373' }}>AI-Powered DNA</h3>
            <p>We extract core insights from books so you can learn faster.</p>
          </div>
          <div style={{ background: '#261a14', padding: '20px', borderRadius: '15px', border: '1px solid #d4a373' }}>
            <h3 style={{ color: '#d4a373' }}>Global News</h3>
            <p>Access international newspapers and trending news in 10+ languages.</p>
          </div>
        </div>

        <p style={{ marginTop: '40px' }}>Created for the curious minds, The Brightway helps you find your next big idea.</p>
      </div>
      <a href="/" style={{ color: '#d4a373', display: 'inline-block', marginTop: '30px' }}>← Back to Home</a>
    </div>
  );
}

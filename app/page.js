import fs from 'fs';
import path from 'path';

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let posts = [];

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'Strategic Insight';
      const date = fileContents.match(/date: '(.*?)'/)?.[1] || '2026';
      return { slug: fileName.replace(/\.md$/, ''), title, date };
    });
  }

  const newspapers = [
    { name: 'The New York Times', lang: 'English' },
    { name: 'Le Monde', lang: 'French' },
    { name: 'Dainik Jagran', lang: 'Hindi' },
    { name: 'The Guardian', lang: 'UK' }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', color: '#1c1917' }}>
      {/* Header */}
      <nav style={{ borderBottom: '1px solid #ddd', padding: '20px 40px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontWeight: '900', fontSize: '24px', letterSpacing: '-1px' }}>
          THE BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span>
        </h1>
        <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          AI Book DNA &nbsp; | &nbsp; Global News
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '50px' }}>
        
        {/* Main Section */}
        <div style={{ flex: 2 }}>
          <h2 style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', color: '#2563eb', marginBottom: '30px' }}>
            Latest Strategic Analysis
          </h2>
          {posts.map((post) => (
            <div key={post.slug} style={{ marginBottom: '40px', borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <p style={{ fontSize: '12px', color: '#888', margin: '0 0 5px 0' }}>{post.date} • BEHAVIORAL PSYCHOLOGY</p>
              <h3 style={{ fontSize: '28px', margin: '0 0 10px 0', fontWeight: 'bold', cursor: 'pointer' }}>{post.title}</h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>Exploring behavioral science through AI-driven insights from "Atomic Habits" and global library data.</p>
              <button style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>Read Analysis →</button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            Global Newspapers
          </h2>
          {newspapers.map((paper) => (
            <div key={paper.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 'bold' }}>{paper.name}</span>
              <span style={{ fontSize: '10px', background: '#f1f1f1', padding: '2px 6px', borderRadius: '3px' }}>{paper.lang}</span>
            </div>
          ))}

          <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '30px', borderRadius: '15px', marginTop: '40px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>AI BOOK DNA</h3>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>Get 10-minute deep dives into influential books like "The Psychology of Money".</p>
            <button style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', background: '#fff', color: '#2563eb', fontWeight: 'bold', marginTop: '10px' }}>Start Reading</button>
          </div>
        </div>
      </div>
    </div>
  );
}

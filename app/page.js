import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let posts = [];

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'New Strategy';
      const date = fileContents.match(/date: '(.*?)'/)?.[1] || '2026';
      return { slug: fileName.replace(/\.md$/, ''), title, date };
    }).reverse(); 
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', color: '#1c1917' }}>
      <header style={{ borderBottom: '1px solid #eee', padding: '30px 50px', backgroundColor: '#fff', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontWeight: '950', fontSize: '32px', letterSpacing: '-2px' }}>THE BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        <p style={{ color: '#888', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', marginTop: '10px' }}>AI-Powered Strategic Vision Hub</p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.slug} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #eee', transition: 'transform 0.2s' }}>
              <span style={{ fontSize: '12px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase' }}>{post.date}</span>
              <h3 style={{ fontSize: '32px', margin: '15px 0 25px 0', fontWeight: '900', lineHeight: '1.2' }}>{post.title}</h3>
              <a href={`/posts?slug=${post.slug}`} style={{ background: '#2563eb', color: '#fff', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
                Read AI Analysis
              </a>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '100px', border: '2px dashed #ddd', borderRadius: '20px' }}>
              <p style={{ color: '#aaa', fontWeight: 'bold' }}>Our AI Bot is currently reading "Atomic Habits"... Insights coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

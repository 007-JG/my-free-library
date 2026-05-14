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
      <header style={{ padding: '30px', textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <h1 style={{ margin: 0, fontWeight: '950', fontSize: '28px' }}>THE BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '50px 20px' }}>
        {posts.map((post) => (
          <div key={post.slug} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #eee' }}>
            <p style={{ color: '#2563eb', fontWeight: '900', fontSize: '12px' }}>{post.date}</p>
            <h2 style={{ fontSize: '28px', margin: '10px 0 20px 0' }}>{post.title}</h2>
            <a href={`/posts?slug=${post.slug}`} style={{ background: '#2563eb', color: '#fff', padding: '10px 25px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Read AI Analysis
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

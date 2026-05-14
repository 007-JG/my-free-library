import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function Post({ searchParams }) {
  const slug = searchParams.slug;
  
  if (!slug) return <div style={{padding: '50px', textAlign: 'center'}}>No Article Selected</div>;

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{fontSize: '32px', fontWeight: '900'}}>AI ANALYSIS IN PROGRESS...</h1>
        <p style={{color: '#666', marginTop: '10px'}}>Hamara automated bot naya data fetch kar raha hai. 2 minute mein refresh karein.</p>
        <a href="/" style={{color: '#2563eb', fontWeight: 'bold', textDecoration: 'none'}}>← Back to Library</a>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'Strategic Analysis';
  const content = fileContents.split('---').pop();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#fff', padding: '60px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginBottom: '40px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>← Library Home</a>
        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', color: '#111', lineHeight: '1.1', letterSpacing: '-1px' }}>{title}</h1>
        <div style={{ height: '6px', width: '100px', backgroundColor: '#2563eb', borderRadius: '10px', marginBottom: '40px' }}></div>
        <div style={{ lineHeight: '1.9', color: '#222', fontSize: '20px', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
          {content}
        </div>
      </div>
    </div>
  );
}

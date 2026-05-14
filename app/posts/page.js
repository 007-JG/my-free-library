import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function Post({ searchParams }) {
  const slug = searchParams.slug;
  
  if (!slug) return <div style={{padding: '50px', textAlign: 'center'}}>Select an Article</div>;

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{fontSize: '32px'}}>ANALYSIS NOT FOUND</h1>
        <p style={{color: '#666'}}>AI Bot is generating this content. Please wait 1-2 minutes.</p>
        <a href="/" style={{color: '#2563eb', fontWeight: 'bold'}}>Back Home</a>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'Strategic Analysis';
  const content = fileContents.split('---').pop();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '50px', borderRadius: '24px', border: '1px solid #eee' }}>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', display: 'block', marginBottom: '30px' }}>← HOME</a>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#111', lineHeight: '1.2' }}>{title}</h1>
        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />
        <div style={{ lineHeight: '1.9', color: '#333', fontSize: '19px', whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
      </div>
    </div>
  );
}

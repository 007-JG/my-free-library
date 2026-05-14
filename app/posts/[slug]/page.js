import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default function Post({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  // Debugging ke liye check
  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{fontSize: '40px'}}>Analysis Not Found</h1>
        <p style={{color: '#666'}}>File path checked: {`content/posts/${slug}.md`}</p>
        <a href="/" style={{color: '#2563eb', fontWeight: 'bold'}}>Go Back Home</a>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const titleMatch = fileContents.match(/title: '(.*?)'/);
  const title = titleMatch ? titleMatch[1] : 'Strategic Analysis';
  const content = fileContents.split('---').pop();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', border: '1px solid #eee' }}>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', display: 'block', marginBottom: '20px' }}>
          ← Back to Library
        </a>
        <h1 style={{ fontSize: '40px', fontWeight: '900', margin: '0 0 20px 0', lineHeight: '1.1', color: '#111' }}>
          {title}
        </h1>
        <div style={{ height: '4px', width: '60px', backgroundColor: '#2563eb', marginBottom: '30px' }}></div>
        <div style={{ lineHeight: '1.8', color: '#333', fontSize: '19px', whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
      </div>
    </div>
  );
}

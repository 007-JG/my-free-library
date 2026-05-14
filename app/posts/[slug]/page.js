import fs from 'fs';
import path from 'path';

export default function Post({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) return <div>Post not found</div>;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Title aur Content ko alag karna
  const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'Analysis';
  const content = fileContents.split('---').pop();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', border: '1px solid #eee' }}>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>← Back to Library</a>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginTop: '20px', lineHeight: '1.2' }}>{title}</h1>
        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />
        <div style={{ lineHeight: '1.8', color: '#333', fontSize: '18px', whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
      </div>
    </div>
  );
}

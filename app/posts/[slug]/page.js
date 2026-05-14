import fs from 'fs';
import path from 'path';

export default function Post({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Analysis Not Found</h1>
        <a href="/">Go Back Home</a>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Title aur Content extract karna
  const titleMatch = fileContents.match(/title: '(.*?)'/);
  const title = titleMatch ? titleMatch[1] : 'Strategic Analysis';
  const content = fileContents.split('---').pop();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafaf9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
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
        <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '14px', color: '#888' }}>
          © 2026 The Brightway Library • Strategic Vision AI Analysis
        </footer>
      </div>
    </div>
  );
}

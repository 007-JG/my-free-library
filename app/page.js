import fs from 'fs';
import path from 'path';

export default function Home() {
  // 1. Automated Articles Fetching Logic
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

  // 2. Newspaper Data (Tera purana content)
  const newspapers = [
    { name: 'The New York Times', lang: 'English' },
    { name: 'Le Monde', lang: 'French' },
    { name: 'Dainik Jagran', lang: 'Hindi' },
    { name: 'The Guardian', lang: 'UK' }
  ];

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans">
      {/* Header / Brand */}
      <nav className="border-b border-black/10 py-6 px-8 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter">THE BRIGHTWAY <span className="text-blue-600">LIBRARY</span></h1>
          <div className="space-x-6 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">AI Book DNA</a>
            <a href="#" className="hover:text-blue-600">Global News</a>
            <a href="#" className="bg-black text-white px-4 py-2 rounded">Subscribe</a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Content: AI Insights (Left & Center) */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-blue-600">Latest Strategic Analysis</h2>
            <div className="space-y-12">
              {posts.length > 0 ? posts.map((post) => (
                <article key={post.slug} className="group cursor-pointer">
                  <p className="text-sm font-medium text-gray-400 mb-2">{post.date} • BEHAVIORAL PSYCHOLOGY</p>
                  <h3 className="text-3xl font-bold group-hover:text-blue-600 transition-colors leading-tight mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Exploring the intersection of habit formation and financial literacy through the lens of modern AI analysis.
                  </p>
                  <div className="h-[1px] w-full bg-black/5 group-hover:bg-blue-600/20 transition-colors"></div>
                </article>
              )) : (
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <p className="text-gray-400 italic">AI Engine is processing "The Psychology of Money"...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Newspapers & Categories (Right) */}
          <div className="space-y-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 border-b-2 border-black pb-2">Global Newspapers</h2>
              <div className="grid grid-cols-1 gap-3">
                {newspapers.map((paper) => (
                  <div key={paper.name} className="flex justify-between items-center p-3 bg-white border border-black/5 rounded hover:border-blue-600 transition-colors cursor-pointer">
                    <span className="font-bold text-sm">{paper.name}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase">{paper.lang}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 p-8 text-white rounded-2xl">
              <h3 className="text-xl font-bold mb-4">AI BOOK DNA</h3>
              <p className="text-sm opacity-80 mb-6">Get 10-minute deep dives into the world's most influential books. Personalized for your growth.</p>
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">Start Reading</button>
            </div>
          </div>

        </div>
      </div>

      <footer className="border-t border-black/5 py-12 px-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 THE BRIGHTWAY LIBRARY • POWERED BY STRATEGIC VISION AI
      </footer>
    </main>
  );
}

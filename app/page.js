import fs from 'fs';
import path from 'path';

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let posts = [];

  // Agar folder exist karta hai toh files read karo
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Markdown se title aur date nikalne ka simple tarika
      const title = fileContents.match(/title: '(.*?)'/)?.[1] || 'New Strategy';
      const date = fileContents.match(/date: '(.*?)'/)?.[1] || 'Recent';
      
      return { slug: fileName.replace(/\.md$/, ''), title, date };
    });
  }

  return (
    <main className="min-h-screen bg-white p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4">THE BRIGHTWAY LIBRARY</h1>
          <p className="text-xl text-gray-500">AI-Powered Book DNA & Strategic Vision</p>
        </header>

        <section>
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-b-2 border-black pb-2">Latest Insights</h2>
          <div className="grid gap-8">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.slug} className="border-l-4 border-black pl-6 py-2 hover:bg-gray-50 transition">
                <h3 className="text-2xl font-bold italic underline cursor-pointer">{post.title}</h3>
                <p className="text-sm text-gray-400 mt-2">ANALYSIS DATE: {post.date}</p>
              </div>
            )) : (
              <div className="p-10 border-2 border-dashed border-gray-200 text-center text-gray-400">
                AI is currently analyzing "Atomic Habits" and "The Psychology of Money"... 
                New insights will appear here automatically.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

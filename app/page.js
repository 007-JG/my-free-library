import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home() {
  // 1. Content folder se files ki list lena
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let posts = [];

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: fileName.replace(/\.md$/, ''),
        ...data,
      };
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">The Brightway Library</h1>
          <p className="text-xl text-gray-600">Master your habits and finance with AI-driven insights.</p>
        </header>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Latest Strategic Insights</h2>
          
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <div key={post.slug} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                  <span className="text-sm font-semibold text-blue-600 uppercase">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">Published on: {post.date}</p>
                  <button className="mt-4 text-black font-medium underline">Read Analysis →</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Analyzing new books... Insights arriving soon.</p>
          )}
        </section>
      </div>
    </main>
  );
}

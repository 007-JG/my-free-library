import React from 'react';

// Mock Data - In a real app, this comes from a database like MongoDB
const BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    summary: "A story of wealth, love, and the American Dream in the 1920s.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with your LibriVox link
    affiliateLink: "https://amazon.com/your-tag-here"
  },
  {
    id: 2,
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    summary: "A deep dive into morality and the philosophy of the 'will to power'.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    affiliateLink: "https://amazon.com/your-tag-here"
  }
];

export default function Library() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-900">Digital Free Library</h1>
        <p className="text-gray-600 mt-2">Listen to classics and read summaries for free.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BOOKS.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-sm text-blue-600 mb-4">by {book.author}</p>
            
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              {book.summary}
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">Listen to Audio</p>
                <audio controls className="w-full h-8">
                  <source src={book.audioUrl} type="audio/mpeg" />
                </audio>
              </div>

              <a 
                href={book.affiliateLink}
                target="_blank"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
              >
                Buy Physical Copy
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
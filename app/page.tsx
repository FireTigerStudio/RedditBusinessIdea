'use client';

import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import OpportunityCard from '@/components/OpportunityCard';
import FeedbackForm from '@/components/FeedbackForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SearchFormData, AnalyzedPost, FeedbackFormData } from '@/types';
import { RateLimiter } from '@/lib/utils';

export default function Home() {
  const [posts, setPosts] = useState<AnalyzedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSearchCount(RateLimiter.getSearchCount());
  }, []);

  const handleSearch = async (formData: SearchFormData) => {
    if (!RateLimiter.canMakeSearch()) {
      setShowFeedback(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPosts([]);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search posts');
      }

      setPosts(data.posts);
      const newCount = RateLimiter.incrementSearchCount();
      setSearchCount(newCount);

      if (data.posts.length === 0) {
        setError(data.message || 'No posts found for your search criteria.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async (feedbackData: FeedbackFormData) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  };

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                RedditBusinessIdea
              </h1>
              <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                BETA
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Searches remaining: {RateLimiter.getRemainingSearches()}/3
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Business Ideas on Reddit with AI Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover startup opportunities from Reddit discussions. Our AI analyzes posts to identify 
            real problems, potential solutions, and business opportunities.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              🔒 <strong>Privacy First:</strong> Your Mistral API key is used only in your browser and never stored on our servers.
            </p>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search Reddit</h3>
              <p className="text-gray-600">
                We fetch the top posts from your chosen subreddit containing your keyword
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Mistral AI analyzes each post to identify problems, solutions, and business opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Discover Ideas</h3>
              <p className="text-gray-600">
                Get actionable business insights with problem analysis and potential solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <LoadingSpinner 
              size="lg" 
              text="Fetching Reddit posts and analyzing with AI... This may take a moment."
            />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {posts.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Business Opportunities Found
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <OpportunityCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RedditBusinessIdea</h3>
              <p className="text-gray-400 text-sm">
                Discover business opportunities from Reddit discussions using AI analysis.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>This is a free beta version</li>
                <li>Bring your own Mistral API key</li>
                <li>No data collection or storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Privacy</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>API keys never stored</li>
                <li>No user tracking</li>
                <li>Open source project</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 RedditBusinessIdea. Built for entrepreneurs, by entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

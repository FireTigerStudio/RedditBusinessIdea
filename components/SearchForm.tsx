'use client';

import { useState } from 'react';
import { SearchFormData } from '@/types';

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    mistralApiKey: '',
    subreddit: '',
    keyword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.mistralApiKey && formData.subreddit && formData.keyword) {
      onSearch(formData);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Mistral API Key *
          </label>
          <input
            type="password"
            id="apiKey"
            value={formData.mistralApiKey}
            onChange={(e) => setFormData({ ...formData, mistralApiKey: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your Mistral API key"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            🔒 Your API key is used only in your browser and never stored
          </p>
        </div>

        <div>
          <label htmlFor="subreddit" className="block text-sm font-medium text-gray-700 mb-2">
            Subreddit *
          </label>
          <input
            type="text"
            id="subreddit"
            value={formData.subreddit}
            onChange={(e) => setFormData({ ...formData, subreddit: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., entrepreneur, SaaS, startups"
            required
          />
        </div>

        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
            Keyword to Search *
          </label>
          <input
            type="text"
            id="keyword"
            value={formData.keyword}
            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., CRM, AI agent, productivity"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.mistralApiKey || !formData.subreddit || !formData.keyword}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing Reddit Posts...' : 'Analyze Reddit Posts'}
        </button>
      </form>
    </div>
  );
}

'use client';

import { AnalyzedPost } from '@/types';

interface OpportunityCardProps {
  post: AnalyzedPost;
}

export default function OpportunityCard({ post }: OpportunityCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getOpportunityBadge = (isOpportunity: boolean, confidence: number) => {
    if (!isOpportunity) {
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Not an Opportunity</span>;
    }
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConfidenceColor(confidence)}`}>
        Business Opportunity ({confidence}% confidence)
      </span>
    );
  };

  if (post.analysisError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            <a 
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              {post.title}
            </a>
          </h3>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>r/{post.subreddit}</span>
          <span>•</span>
          <span>{formatDate(post.created_utc)}</span>
          <span>•</span>
          <span>{post.ups} upvotes</span>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">
            ⚠️ Analysis failed: {post.analysisError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-4">
          <a 
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </a>
        </h3>
        {getOpportunityBadge(post.analysis.isOpportunity, post.analysis.confidence)}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>r/{post.subreddit}</span>
        <span>•</span>
        <span>{formatDate(post.created_utc)}</span>
        <span>•</span>
        <span>{post.ups} upvotes</span>
        <span>•</span>
        <span>{post.num_comments} comments</span>
      </div>

      {post.analysis.isOpportunity && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">🎯 Problem Identified</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{post.analysis.problem}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">💡 Potential Solution</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{post.analysis.solution}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">📝 Summary</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{post.analysis.summary}</p>
          </div>
        </div>
      )}

      {!post.analysis.isOpportunity && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600 text-sm">{post.analysis.summary}</p>
        </div>
      )}
    </div>
  );
}

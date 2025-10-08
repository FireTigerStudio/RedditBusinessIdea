export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  url: string;
  subreddit: string;
  author: string;
  created_utc: number;
  ups: number;
  num_comments: number;
  permalink: string;
}

export interface RedditApiResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export interface BusinessOpportunity {
  isOpportunity: boolean;
  problem: string;
  solution: string;
  summary: string;
  confidence: number;
}

export interface AnalyzedPost extends RedditPost {
  analysis: BusinessOpportunity;
  analysisError?: string;
}

export interface SearchFormData {
  mistralApiKey: string;
  subreddit: string;
  keyword: string;
}

export interface FeedbackFormData {
  email: string;
  feedback: string;
}

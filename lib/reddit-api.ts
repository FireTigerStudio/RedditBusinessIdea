import axios from 'axios';
import { RedditApiResponse, RedditPost } from '@/types';

const REDDIT_CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID || '';
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET || '';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getRedditAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  console.log('Getting Reddit access token...');
  console.log('Reddit Client ID exists:', !!REDDIT_CLIENT_ID);
  console.log('Reddit Client Secret exists:', !!REDDIT_CLIENT_SECRET);

  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    throw new Error('Reddit API credentials not configured. Please check your environment variables.');
  }

  try {
    const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'RedditBusinessIdea/1.0.0',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // Refresh 1 minute early
    
    if (!accessToken) {
      throw new Error('No access token received from Reddit API');
    }
    
    return accessToken;
  } catch (error) {
    console.error('Failed to get Reddit access token:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new Error('Invalid Reddit API credentials. Please check your Client ID and Secret.');
      }
      console.error('Reddit auth error details:', {
        status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    throw new Error('Failed to authenticate with Reddit API');
  }
}

export async function searchRedditPosts(
  subreddit: string, 
  keyword: string, 
  limit: number = 10
): Promise<RedditPost[]> {
  try {
    const token = await getRedditAccessToken();
    
    const response = await axios.get<RedditApiResponse>(
      `https://oauth.reddit.com/r/${subreddit}/search`,
      {
        params: {
          q: keyword,
          sort: 'top',
          t: 'week', // Posts from the last week
          limit: limit,
          restrict_sr: 'true',
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'RedditBusinessIdea/1.0.0',
        },
      }
    );

    const posts = response.data.data.children
      .map(child => child.data)
      .filter(post => 
        post.selftext && 
        post.selftext.length > 50 && // Filter out very short posts
        !post.selftext.includes('[removed]') &&
        !post.selftext.includes('[deleted]')
      )
      .sort((a, b) => b.ups - a.ups) // Sort by upvotes
      .slice(0, 3); // Take top 3

    return posts;
  } catch (error) {
    console.error('Failed to fetch Reddit posts:', error);
    throw new Error('Failed to fetch posts from Reddit. Please check the subreddit name and try again.');
  }
}

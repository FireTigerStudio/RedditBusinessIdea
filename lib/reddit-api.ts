import axios from 'axios';
import { RedditApiResponse, RedditPost } from '@/types';

export async function searchRedditPosts(
  subreddit: string, 
  keyword: string, 
  limit: number = 10
): Promise<RedditPost[]> {
  try {
    console.log('Fetching posts from Reddit using public API...');
    
    // Use Reddit's public JSON API (no authentication required)
    const response = await axios.get<RedditApiResponse>(
      `https://www.reddit.com/r/${subreddit}/search.json`,
      {
        params: {
          q: keyword,
          sort: 'top',
          t: 'week', // Posts from the last week
          limit: limit,
          restrict_sr: 'true',
        },
        headers: {
          'User-Agent': 'RedditBusinessIdea/1.0.0',
        },
      }
    );

    console.log(`Found ${response.data.data.children.length} posts from Reddit`);

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

    console.log(`Filtered to ${posts.length} quality posts`);
    return posts;
  } catch (error) {
    console.error('Failed to fetch Reddit posts:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 403) {
        throw new Error('Subreddit is private or does not exist. Please try a different subreddit.');
      } else if (status === 404) {
        throw new Error('Subreddit not found. Please check the subreddit name.');
      }
    }
    throw new Error('Failed to fetch posts from Reddit. Please check the subreddit name and try again.');
  }
}

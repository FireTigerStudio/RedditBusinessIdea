import axios from 'axios';
import { RedditApiResponse, RedditPost } from '@/types';

export async function searchRedditPosts(
  subreddit: string, 
  keyword: string, 
  limit: number = 10
): Promise<RedditPost[]> {
  try {
    console.log('Fetching posts from Reddit using public API...');
    
    // Use Reddit's public JSON API with CORS proxy
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const redditUrl = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&sort=top&t=week&limit=${limit}&restrict_sr=true`;
    
    const response = await axios.get(
      `${proxyUrl}${encodeURIComponent(redditUrl)}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Parse the response from the proxy
    const redditData = JSON.parse(response.data.contents) as RedditApiResponse;

    console.log(`Found ${redditData.data.children.length} posts from Reddit`);

    const posts = redditData.data.children
      .map((child: any) => child.data)
      .filter((post: any) => 
        post.selftext && 
        post.selftext.length > 50 && // Filter out very short posts
        !post.selftext.includes('[removed]') &&
        !post.selftext.includes('[deleted]')
      )
      .sort((a: any, b: any) => b.ups - a.ups) // Sort by upvotes
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

import { searchRedditPosts } from './reddit-api';
import { analyzePostWithMistral } from './mistral-api';
import { AnalyzedPost } from '@/types';

export async function performSearch(
  subreddit: string,
  keyword: string,
  mistralApiKey: string
): Promise<{ posts: AnalyzedPost[]; message?: string }> {
  try {
    console.log('Client-side search started:', { subreddit, keyword, hasApiKey: !!mistralApiKey });

    // Fetch posts from Reddit
    console.log('Fetching posts from Reddit...');
    const posts = await searchRedditPosts(subreddit, keyword, 10);
    console.log(`Found ${posts.length} posts from Reddit`);

    if (posts.length === 0) {
      return {
        posts: [],
        message: 'No posts found for the given keyword in this subreddit. Try different keywords or subreddit.',
      };
    }

    // Analyze posts with Mistral AI
    const analyzedPosts: AnalyzedPost[] = [];

    for (const post of posts.slice(0, 3)) { // Limit to 3 posts for beta
      try {
        console.log(`Analyzing post: ${post.title.substring(0, 50)}...`);
        const analysis = await analyzePostWithMistral(
          post.title,
          post.selftext,
          mistralApiKey
        );
        console.log(`Analysis completed for post ${post.id}`);

        analyzedPosts.push({
          ...post,
          analysis,
        });
      } catch (error) {
        console.error(`Failed to analyze post ${post.id}:`, error);
        
        analyzedPosts.push({
          ...post,
          analysis: {
            isOpportunity: false,
            problem: '',
            solution: '',
            summary: '',
            confidence: 0,
          },
          analysisError: error instanceof Error ? error.message : 'Analysis failed',
        });
      }
    }

    return { posts: analyzedPosts };

  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

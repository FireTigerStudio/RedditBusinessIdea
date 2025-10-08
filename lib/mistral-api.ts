import axios from 'axios';
import { BusinessOpportunity } from '@/types';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

const ANALYSIS_PROMPT = `
Analyze this Reddit post for business opportunities. Return ONLY a valid JSON object with no additional text or formatting.

Required JSON format:
{
  "isOpportunity": true or false,
  "problem": "Brief problem description (max 80 words)",
  "solution": "Potential business solution (max 80 words)", 
  "summary": "2-3 sentence summary (max 120 words)",
  "confidence": number from 0 to 100
}

Post Title: {title}
Post Content: {content}

Return only the JSON object:`;

export async function analyzePostWithMistral(
  title: string,
  content: string,
  apiKey: string
): Promise<BusinessOpportunity> {
  console.log('Starting Mistral AI analysis...');
  console.log('API Key provided:', !!apiKey);
  console.log('Title length:', title.length);
  console.log('Content length:', content.length);

  if (!apiKey) {
    throw new Error('Mistral API key is required');
  }

  try {
    const prompt = ANALYSIS_PROMPT
      .replace('{title}', title)
      .replace('{content}', content.substring(0, 2000)); // Limit content length

    console.log('Making request to Mistral API...');
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: 'You are a business analyst. Always respond with valid JSON only, no additional text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 400,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );
    
    console.log('Mistral API response received:', response.status);

    const aiResponse = response.data.choices[0].message.content;
    console.log('Raw AI response:', aiResponse);
    
    try {
      // Clean the response - remove any markdown formatting or extra text
      let cleanResponse = aiResponse.trim();
      
      // Extract JSON from response if it's wrapped in markdown or other text
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }
      
      console.log('Cleaned response for parsing:', cleanResponse);
      
      const analysis = JSON.parse(cleanResponse);
      
      // Validate the response structure and provide defaults if needed
      const validatedAnalysis = {
        isOpportunity: typeof analysis.isOpportunity === 'boolean' ? analysis.isOpportunity : false,
        problem: typeof analysis.problem === 'string' ? analysis.problem : 'Problem analysis unavailable',
        solution: typeof analysis.solution === 'string' ? analysis.solution : 'Solution analysis unavailable',
        summary: typeof analysis.summary === 'string' ? analysis.summary : 'Summary unavailable',
        confidence: typeof analysis.confidence === 'number' ? analysis.confidence : 0
      };
      
      console.log('Validated analysis:', validatedAnalysis);
      return validatedAnalysis;
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      console.error('Parse error:', parseError);
      
      // Return a fallback analysis instead of throwing an error
      return {
        isOpportunity: false,
        problem: 'Unable to analyze this post automatically',
        solution: 'Manual review recommended',
        summary: 'The AI analysis could not be completed for this post. This may be due to formatting issues or content complexity.',
        confidence: 0
      };
    }
  } catch (error) {
    console.error('Mistral API error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      
      console.error('Axios error details:', {
        status,
        statusText: error.response?.statusText,
        data: errorData,
        message: error.message
      });
      
      if (status === 401) {
        throw new Error('Invalid Mistral API key. Please check your API key and try again.');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (status && status >= 500) {
        throw new Error('Mistral API is temporarily unavailable. Please try again later.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. The AI analysis took too long. Please try again.');
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw new Error(`API Error (${status}): ${errorData?.message || error.message}`);
    }
    
    throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

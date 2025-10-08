/**
 * Utility functions for the RedditBusinessIdea application
 */

/**
 * Format a timestamp to a readable date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get confidence level color classes for Tailwind
 */
export function getConfidenceColorClasses(confidence: number): string {
  if (confidence >= 80) return 'text-green-600 bg-green-100';
  if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
}

/**
 * Rate limiting utilities for client-side
 */
export class RateLimiter {
  private static readonly STORAGE_KEY = 'reddit_business_idea_searches';
  private static readonly MAX_SEARCHES = 3;

  static getSearchCount(): number {
    if (typeof window === 'undefined') return 0;
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }

  static incrementSearchCount(): number {
    if (typeof window === 'undefined') return 0;
    const current = this.getSearchCount();
    const newCount = current + 1;
    sessionStorage.setItem(this.STORAGE_KEY, newCount.toString());
    return newCount;
  }

  static canMakeSearch(): boolean {
    return this.getSearchCount() < this.MAX_SEARCHES;
  }

  static getRemainingSearches(): number {
    return Math.max(0, this.MAX_SEARCHES - this.getSearchCount());
  }

  static reset(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 100); // Limit length
}

/**
 * Generate a simple hash for caching purposes
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

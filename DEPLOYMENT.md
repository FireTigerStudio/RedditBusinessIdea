# Deployment Guide - RedditBusinessIdea

This guide covers deploying the RedditBusinessIdea application to various platforms, with a focus on Cloudflare Pages.

## 🌟 Cloudflare Pages (Recommended)

Cloudflare Pages offers excellent performance, global CDN, and seamless integration with GitHub.

### Prerequisites

1. GitHub repository with your code
2. Cloudflare account (free tier available)
3. Reddit API credentials

### Step-by-Step Deployment

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

\`\`\`bash
git add .
git commit -m "Initial commit - RedditBusinessIdea MVP"
git push origin main
\`\`\`

#### 2. Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to "Pages" in the sidebar
3. Click "Create a project"
4. Select "Connect to Git"
5. Choose your GitHub repository
6. Click "Begin setup"

#### 3. Configure Build Settings

Set the following build configuration:

- **Project name**: `reddit-business-idea`
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (leave empty)

#### 4. Environment Variables

In the Cloudflare Pages dashboard, add these environment variables:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NEXT_PUBLIC_REDDIT_CLIENT_ID` | Your Reddit Client ID | From Reddit Apps |
| `REDDIT_CLIENT_SECRET` | Your Reddit Client Secret | Keep this secure |
| `NODE_VERSION` | `18` | Specify Node.js version |

#### 5. Deploy

1. Click "Save and Deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your app will be available at `https://reddit-business-idea.pages.dev`

#### 6. Custom Domain (Optional)

To use a custom domain like `redditbusinessidea.com`:

1. In Cloudflare Pages, go to your project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain name
5. Follow DNS configuration instructions

### Build Optimization for Cloudflare

Add this to your `next.config.js` for optimal Cloudflare performance:

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.redditstatic.com', 'external-preview.redd.it'],
  },
  // Optimize for Cloudflare Pages
  trailingSlash: false,
  output: 'standalone',
}

module.exports = nextConfig
\`\`\`

## 🚀 Alternative Deployment Options

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

### Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Docker Deployment

Create a `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \\
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\
  elif [ -f package-lock.json ]; then npm ci; \\
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \\
  else echo "Lockfile not found." && exit 1; \\
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

Build and run:

\`\`\`bash
docker build -t reddit-business-idea .
docker run -p 3000:3000 reddit-business-idea
\`\`\`

## 🔧 Post-Deployment Configuration

### 1. Test the Application

After deployment, test these key features:

- [ ] Landing page loads correctly
- [ ] Search form accepts input
- [ ] Reddit API integration works
- [ ] Mistral AI analysis functions
- [ ] Error handling displays properly
- [ ] Mobile responsiveness
- [ ] SEO meta tags are present

### 2. Monitor Performance

Set up monitoring for:

- **Core Web Vitals**: Use Google PageSpeed Insights
- **API Response Times**: Monitor Reddit and Mistral API calls
- **Error Rates**: Track failed searches and API errors
- **User Feedback**: Monitor beta feedback submissions

### 3. Security Checklist

- [ ] Environment variables are secure
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enforced
- [ ] Rate limiting is working
- [ ] No sensitive data in logs

## 🐛 Troubleshooting Deployment Issues

### Build Failures

**Issue**: Build fails with TypeScript errors
**Solution**: Run `npm run build` locally first to catch errors

**Issue**: Missing environment variables
**Solution**: Verify all required env vars are set in deployment platform

### Runtime Issues

**Issue**: Reddit API authentication fails
**Solution**: Check environment variables and Reddit app configuration

**Issue**: Mistral API errors
**Solution**: Verify API endpoint and user key validation

### Performance Issues

**Issue**: Slow page loads
**Solution**: 
- Enable Cloudflare caching
- Optimize images
- Check bundle size with `npm run build`

## 📊 Monitoring and Analytics

### Recommended Tools

1. **Cloudflare Analytics** (built-in with Cloudflare Pages)
2. **Google Analytics** (add to layout.tsx)
3. **Sentry** (for error tracking)
4. **Uptime monitoring** (UptimeRobot, Pingdom)

### Adding Google Analytics

Add to `app/layout.tsx`:

\`\`\`typescript
import Script from 'next/script'

// Add this to your layout component
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
\`\`\`

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test # if you have tests
\`\`\`

This ensures your app is automatically deployed when you push to the main branch.

---

**Need help?** Check the main README.md or create an issue in the repository.

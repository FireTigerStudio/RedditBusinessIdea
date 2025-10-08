# Quick Start Guide - RedditBusinessIdea

Get your RedditBusinessIdea MVP up and running in 5 minutes!

## 🚀 One-Command Setup

```bash
npm run setup
```

This will:
- Install all dependencies
- Create your environment file
- Set up the project structure

## 📋 Before You Start

You'll need:
1. **Reddit API Credentials** (free)
2. **Mistral API Key** (users provide their own)

### Get Reddit API Credentials

1. Go to [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Click "Create App" → "Web App"
3. Fill in:
   - **Name**: RedditBusinessIdea
   - **Redirect URI**: `http://localhost:3000`
4. Copy your **Client ID** and **Client Secret**

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local

# 3. Add your Reddit credentials to .env.local
NEXT_PUBLIC_REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here

# 4. Start development server
npm run dev
```

## 🎯 Test Your Setup

1. Open [http://localhost:3000](http://localhost:3000)
2. Enter a Mistral API key (get one from [Mistral AI](https://mistral.ai/))
3. Try the sample search:
   - **Subreddit**: entrepreneur
   - **Keyword**: SaaS
4. Click "Analyze Reddit Posts"

## 🚀 Deploy to Production

### Cloudflare Pages (Recommended)

```bash
# 1. Build the project
npm run build

# 2. Push to GitHub
git add .
git commit -m "Initial deployment"
git push origin main

# 3. Connect to Cloudflare Pages
# - Go to Cloudflare Dashboard → Pages
# - Connect your GitHub repo
# - Set build command: npm run build
# - Set output directory: .next
# - Add environment variables
```

## 🔧 Environment Variables for Production

```env
NEXT_PUBLIC_REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
NODE_VERSION=18
```

## 🎉 You're Ready!

Your RedditBusinessIdea MVP is now ready to help users discover business opportunities from Reddit discussions using AI analysis.

### Key Features Working:
- ✅ Reddit post fetching
- ✅ Mistral AI analysis
- ✅ Rate limiting (3 searches per session)
- ✅ Beta feedback collection
- ✅ Responsive design
- ✅ SEO optimization

## 🆘 Need Help?

- Check the full [README.md](./README.md)
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions
- Create an issue if you encounter problems

**Happy building! 🚀**

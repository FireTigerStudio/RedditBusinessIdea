# RedditBusinessIdea - AI-Powered Business Opportunity Discovery

![Beta Version](https://img.shields.io/badge/version-beta-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)

**RedditBusinessIdea** is an MVP web application that helps entrepreneurs discover business opportunities from Reddit discussions using AI analysis. The tool fetches relevant posts from specified subreddits and uses Mistral AI to analyze them for potential business opportunities.

## 🚀 Features

- **AI-Powered Analysis**: Uses Mistral AI to identify business opportunities, problems, and solutions
- **Reddit Integration**: Fetches top posts from any subreddit based on keywords
- **Privacy-First**: User API keys are never stored, only used in browser sessions
- **Rate Limited Beta**: 3 searches per session to manage API costs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **SEO Optimized**: Built with Next.js for excellent search engine visibility

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **APIs**: Reddit API, Mistral AI API
- **Deployment**: Cloudflare Pages (recommended)

## 📋 Prerequisites

Before running this application, you need:

1. **Reddit API Credentials**:
   - Go to [Reddit Apps](https://www.reddit.com/prefs/apps)
   - Create a new app (select "web app")
   - Note your Client ID and Client Secret

2. **Mistral API Key** (for users):
   - Users need their own Mistral API key from [Mistral AI](https://mistral.ai/)
   - The app doesn't require a server-side Mistral key

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd RedditBusinessIdea-Beta-UserInputAPI
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your Reddit API credentials:

\`\`\`env
NEXT_PUBLIC_REDDIT_CLIENT_ID=your_reddit_client_id_here
REDDIT_CLIENT_SECRET=your_reddit_client_secret_here
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Reddit API Setup

1. Visit [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Click "Create App" or "Create Another App"
3. Fill in the form:
   - **Name**: Your app name
   - **App type**: Web app
   - **Description**: Optional
   - **About URL**: Optional
   - **Redirect URI**: `http://localhost:3000` (for development)
4. Copy the Client ID (under the app name) and Client Secret

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_REDDIT_CLIENT_ID` | Reddit API Client ID | Yes |
| `REDDIT_CLIENT_SECRET` | Reddit API Client Secret | Yes |

## 📱 Usage

1. **Enter Mistral API Key**: Users provide their own Mistral API key
2. **Choose Subreddit**: Enter a subreddit name (e.g., "entrepreneur", "SaaS")
3. **Enter Keyword**: Specify what to search for (e.g., "CRM", "AI agent")
4. **Analyze**: Click "Analyze Reddit Posts" to start the process

The app will:
- Fetch top posts from the subreddit containing the keyword
- Analyze each post with Mistral AI
- Display results as opportunity cards with:
  - Problem identification
  - Potential solutions
  - Business opportunity assessment
  - Confidence scores

## 🏗️ Project Structure

\`\`\`
RedditBusinessIdea-Beta-UserInputAPI/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── search/route.ts       # Main search endpoint
│   │   └── feedback/route.ts     # Beta feedback endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page component
│   └── sitemap.ts                # SEO sitemap
├── components/                   # React components
│   ├── SearchForm.tsx            # Search input form
│   ├── OpportunityCard.tsx       # Result display cards
│   └── FeedbackForm.tsx          # Beta feedback form
├── lib/                          # Utility libraries
│   ├── reddit-api.ts             # Reddit API integration
│   └── mistral-api.ts            # Mistral AI integration
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Shared types
├── public/                       # Static assets
│   └── robots.txt                # SEO robots file
└── Configuration files...
\`\`\`

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Build the project**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy to Cloudflare Pages**:
   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Add environment variables in Cloudflare dashboard

3. **Environment Variables in Cloudflare**:
   - `NEXT_PUBLIC_REDDIT_CLIENT_ID`: Your Reddit Client ID
   - `REDDIT_CLIENT_SECRET`: Your Reddit Client Secret

### Alternative Deployment Options

- **Vercel**: `npx vercel --prod`
- **Netlify**: Connect GitHub repo and set build settings
- **Docker**: Use the included Dockerfile (if created)

## 🔒 Security & Privacy

- **API Key Security**: Mistral API keys are only stored in browser session storage
- **No Data Collection**: The app doesn't store user data or search history
- **Rate Limiting**: Limited to 3 searches per session to prevent API abuse
- **HTTPS Only**: All API communications use HTTPS

## 🐛 Troubleshooting

### Common Issues

1. **Reddit API Authentication Failed**:
   - Verify your Client ID and Client Secret
   - Ensure environment variables are set correctly
   - Check that your Reddit app is configured as "web app"

2. **Mistral API Errors**:
   - Verify the user's API key is valid
   - Check Mistral API rate limits
   - Ensure sufficient API credits

3. **No Posts Found**:
   - Try different keywords or subreddits
   - Check if the subreddit exists and is public
   - Verify the keyword appears in recent posts

### Debug Mode

Enable debug logging by setting:
\`\`\`env
NODE_ENV=development
\`\`\`

## 🤝 Contributing

This is an MVP project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- User authentication and saved searches
- Advanced filtering and sorting options
- Integration with more AI providers
- Business opportunity scoring algorithms
- Export functionality for results
- Mobile app version

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the API documentation for Reddit and Mistral

---

**Built for entrepreneurs, by entrepreneurs** 🚀

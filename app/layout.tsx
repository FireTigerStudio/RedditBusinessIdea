import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RedditBusinessIdea - Find Business Ideas on Reddit with AI Analysis',
  description: 'Discover startup opportunities from Reddit. Analyze posts with AI to find problems, solutions, and business ideas. Free beta - bring your own Mistral API key.',
  keywords: 'reddit, business ideas, startup opportunities, AI analysis, mistral, entrepreneur',
  authors: [{ name: 'RedditBusinessIdea Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'RedditBusinessIdea - Find Business Ideas on Reddit with AI Analysis',
    description: 'Discover startup opportunities from Reddit. Analyze posts with AI to find problems, solutions, and business ideas.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RedditBusinessIdea - Find Business Ideas on Reddit with AI Analysis',
    description: 'Discover startup opportunities from Reddit. Analyze posts with AI to find problems, solutions, and business ideas.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tny4h51lk1");
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}

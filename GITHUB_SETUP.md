# GitHub Contributions Setup Guide

This guide will help you configure the GitHub API integration to display your real contribution data instead of sample data.

## Step 1: Update Your GitHub Username

In `src/Pages/HomeScreen/Components/GitHubContributions/GitHubContributions.tsx`, find this line:

```typescript
const GITHUB_USERNAME = 'your-github-username'; // TODO: Replace this with your actual GitHub username
```

Replace `'your-github-username'` with your actual GitHub username.

## Step 2: Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Tokens (classic)" then "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Portfolio Website")
4. Select the following scopes:
   - `read:user` (to read your user profile and contribution data)
5. Click "Generate token"
6. **Important**: Copy the token immediately - you won't be able to see it again!

## Step 3: Add the Token to Your Environment

Create a `.env.local` file in your project root and add:

```bash
# For client-side access (publicly readable)
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here

# OR for server-side only (more secure)
GITHUB_TOKEN=your_token_here
```

**Security Note**: If using `NEXT_PUBLIC_GITHUB_TOKEN`, the token will be visible in your client-side bundle. For production, consider implementing a server-side API route instead.

## Step 4: Alternative - Server-Side API Route (Recommended for Production)

For better security, create an API route to fetch GitHub data server-side:

1. Create `pages/api/github-contributions.ts` (or `app/api/github-contributions/route.ts` for App Router):

```typescript
// pages/api/github-contributions.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
}
```

2. Update the component to use your API route instead of calling GitHub directly.

## Rate Limiting

GitHub's GraphQL API has rate limits:
- **With authentication**: 5,000 points per hour
- **Without authentication**: 60 requests per hour

The contribution query uses approximately 1 point, so you should be well within limits.

## Troubleshooting

### "User not found" Error
- Verify your username is correct
- Make sure your GitHub profile is public

### "API rate limit exceeded"
- Check if your token is properly configured
- Wait for the rate limit to reset (usually 1 hour)

### "Token invalid" Error
- Regenerate your GitHub token
- Make sure you selected the correct scopes (`read:user`)
- Verify the token is properly added to your environment file

### Still showing sample data
- Check the browser console for error messages
- Verify your `.env.local` file is in the project root
- Restart your development server after adding environment variables

## Example Working Configuration

```typescript
// In GitHubContributions.tsx
const GITHUB_USERNAME = 'octocat'; // Your GitHub username

// In .env.local
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

After configuration, restart your development server and you should see your real GitHub contribution data! 
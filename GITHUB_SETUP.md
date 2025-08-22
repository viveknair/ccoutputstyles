# GitHub Actions Setup for Automatic Deployments

This guide explains how to set up GitHub Actions to automatically deploy your Claude Code Output Styles website to Vercel whenever templates are added or updated.

## Prerequisites

1. A GitHub repository for your project
2. A Vercel account with the project deployed
3. A Vercel API token

## Step 1: Get Your Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name like "GitHub Actions Deploy"
4. Copy the token (you won't be able to see it again)

## Step 2: Get Your Vercel Project and Org IDs

Run this command in your project directory:

```bash
cat .vercel/project.json
```

You'll see something like:

```json
{
  "projectId": "prj_xxxxxxxxxxxx",
  "orgId": "team_xxxxxxxxxxxx"
}
```

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these three secrets:

| Secret Name | Value |
|------------|-------|
| `VERCEL_TOKEN` | Your Vercel API token from Step 1 |
| `VERCEL_ORG_ID` | The `orgId` from Step 2 |
| `VERCEL_PROJECT_ID` | The `projectId` from Step 2 |

## Step 4: How It Works

The GitHub Action (`.github/workflows/deploy.yml`) will:

### On Pull Requests:
- Deploy a preview version when templates are added/modified
- Comment on the PR with the preview URL
- Allow testing before merging

### On Push to Main:
- Deploy to production automatically
- Update the live site at ccoutputstyles.vercel.app
- Create a GitHub release if commit message contains `[new-template]` or `[template]`

## Contributing Templates

To contribute a new template:

1. Fork the repository
2. Add your template to both:
   - `/templates/your-template.md` (the markdown file)
   - `/app/data/templates.ts` (add to the templates array)
3. Create a pull request
4. The preview URL will be automatically generated
5. Once merged, it will deploy to production

## Template Format

Templates should follow this format:

```markdown
---
name: template-name
description: Brief description of what this style does
---

Your template instructions here...
```

## Triggering Deployments

Deployments are triggered when:

- Files in `/templates/` directory change
- The `/app/data/templates.ts` file changes
- Any app source files change
- You manually trigger the workflow from GitHub Actions tab

## Manual Deployment

You can also manually trigger a deployment:

1. Go to Actions tab in your GitHub repo
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Select the branch to deploy

## Troubleshooting

If deployments fail:

1. Check that all three secrets are set correctly
2. Verify your Vercel token is still valid
3. Check the Actions tab for error logs
4. Ensure the Vercel project exists and is linked

## Local Testing

Before pushing, test locally:

```bash
# Test the website
npm run dev

# Test the CLI
npm run build:cli
./bin/ccoutputstyle --help
```
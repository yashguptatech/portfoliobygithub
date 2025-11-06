# Deployment Guide

## GitHub Pages Deployment

To deploy this portfolio to GitHub Pages:

### Option 1: Deploy from Settings (Recommended)

1. Go to your repository on GitHub: https://github.com/yashguptatech/portfoliobygithub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select the branch you want to deploy (e.g., `main` or your current branch)
5. Select **/ (root)** as the folder
6. Click **Save**
7. Your portfolio will be available at: `https://yashguptatech.github.io/portfoliobygithub/`

### Option 2: Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the root directory with your domain name
2. Configure your DNS settings with your domain provider
3. Add your custom domain in GitHub Pages settings

## Local Testing

To test the portfolio locally:

```bash
# Navigate to the project directory
cd portfoliobygithub

# Start a simple HTTP server (Python 3)
python3 -m http.server 8080

# Or using Python 2
python -m SimpleHTTPServer 8080

# Or using Node.js (if you have npx)
npx http-server -p 8080
```

Then open your browser and go to: `http://localhost:8080`

## Customization Tips

### Update GitHub Username
Edit `script.js` and change the `GITHUB_USERNAME` constant:
```javascript
const GITHUB_USERNAME = 'your-github-username';
```

### Update LinkedIn Profile
Edit `index.html` and update the LinkedIn URL in two places:
1. Hero section social links
2. Contact section

### Customize Featured Projects
Edit the `FEATURED_REPOS` array in `script.js` to highlight specific repositories:
```javascript
const FEATURED_REPOS = [
    'your-featured-repo-1',
    'your-featured-repo-2',
    // Add more...
];
```

### Modify Skills
Edit the skills section in `index.html` to match your expertise:
- Programming Languages
- Web Development
- Data Science & AI
- Tools & Technologies

### Change Colors/Theme
Edit `styles.css` and modify the CSS custom properties at the top:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* Modify other colors... */
}
```

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dynamic GitHub API integration
- ✅ Smooth animations and transitions
- ✅ Modern gradient design
- ✅ Social media links
- ✅ Project showcase with filtering
- ✅ Skills categorization
- ✅ Zero dependencies (pure HTML/CSS/JS)

## Browser Compatibility

The portfolio is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Projects Not Loading

If projects aren't loading:
1. Check browser console for errors
2. Verify GitHub API is accessible (may have rate limits)
3. Ensure JavaScript is enabled in browser
4. Check if the GitHub username is correct in `script.js`

### GitHub API Rate Limiting

GitHub API has rate limits:
- **Unauthenticated requests**: 60 requests per hour per IP
- **Authenticated requests**: 5,000 requests per hour

For production use, consider adding GitHub API authentication or caching.

## License

Feel free to use this template for your own portfolio!

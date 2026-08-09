# Portfolio Website - Deployment Guide

## 🌐 Custom Domain Setup (vivektailor.me)

### Step 1: Register Your Domain
If you haven't already, register your domain at:
- Namecheap
- GoDaddy
- Google Domains
- Route 53 (AWS)

### Step 2: DNS Configuration

#### For GitHub Pages:
1. Go to your domain registrar's DNS settings
2. Add the following A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Add CNAME record for www:
   ```
   www -> yourusername.github.io
   ```
4. In GitHub repo > Settings > Pages:
   - Set branch to `main`
   - Set custom domain to `vivektailor.me`
   - Enable "Enforce HTTPS"

#### For Netlify:
1. Connect your repository to Netlify
2. Deploy the site
3. In Netlify > Site Settings > Domain Settings:
   - Add your custom domain
4. Follow the DNS configuration instructions

#### For Vercel:
1. Import your project to Vercel
2. Go to Project Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed

### Step 3: SSL Certificate
Most hosting services provide free SSL:
- GitHub Pages: Automatic HTTPS
- Netlify: Automatic SSL with Let's Encrypt
- Vercel: Automatic SSL

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

```bash
# Initialize git if not done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio commit"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main

# Enable GitHub Pages in Settings
# Your site will be live at: https://yourusername.github.io
# And at your custom domain: https://vivektailor.me
```

### Option 2: Netlify (Easiest for Beginners)

1. **Connect Repository**:
   - Go to netlify.com
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your portfolio repository

2. **Configure Settings**:
   - Build command: (leave empty for static site)
   - Publish directory: `.` (root)

3. **Add Custom Domain**:
   - Domain settings > Add domain
   - Update DNS records as instructed

### Option 3: Vercel (Best Performance)

1. **Deploy**:
   - Go to vercel.com
   - Click "Add New Project"
   - Import GitHub repository
   - Click Deploy

2. **Configure Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records

### Option 4: Self-Hosted (Advanced)

#### Using cPanel (if your hosting provider offers it):
```bash
# 1. Connect via SSH
ssh user@yourserver.com

# 2. Navigate to public_html
cd public_html

# 3. Clone or upload your files
git clone https://github.com/YOUR_USERNAME/portfolio.git
# or
# Upload files via FTP/SFTP

# 4. Configure domain in cPanel
# Point domain to /public_html or appropriate directory
```

#### Using Docker:
```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t vivek-portfolio .
docker run -p 80:80 vivek-portfolio
```

## 🔧 Post-Deployment Configuration

### 1. Update Contact Form
In `script.js`, uncomment and configure:

**Option A: Formspree**
```javascript
// Create form at formspree.io and get YOUR_FORM_ID
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: { 'Content-Type': 'application/json' }
});
```

**Option B: Netlify Forms**
```html
<!-- In index.html contact form -->
<form name="contact" method="POST" netlify>
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit">Send Message</button>
</form>
```

**Option C: EmailJS**
```javascript
// Install via npm: npm install emailjs-com
emailjs.init('YOUR_PUBLIC_KEY');
// Configure in script.js
```

### 2. Add Google Analytics
Add to `index.html` in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### 3. Update Social Links
In `index.html`, update:
```html
<!-- LinkedIn -->
<a href="https://www.linkedin.com/in/YOUR_PROFILE" target="_blank">

<!-- GitHub -->
<a href="https://github.com/YOUR_USERNAME" target="_blank">

<!-- Email -->
<a href="mailto:your.email@example.com">
```

### 4. Update Meta Tags
In `index.html`, customize:
```html
<meta name="description" content="Your custom description">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="https://vivektailor.me/og-image.png">
<meta name="twitter:creator" content="@your_twitter">
```

## 📊 Performance Optimization

### Enable Compression
```nginx
# If using Nginx
gzip on;
gzip_types text/plain text/css text/javascript application/javascript;
gzip_min_length 1000;
```

### Cache Headers
```apache
# If using Apache .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/* "access plus 1 year"
</IfModule>
```

### Image Optimization
```bash
# Install ImageMagick or use online tools
# Compress images before uploading
convert input.png -quality 85 output.png

# Or use online tools:
# - TinyPNG
# - Imagemin
# - Squoosh
```

## ✅ Pre-Launch Checklist

- [ ] Update LinkedIn profile URL
- [ ] Update GitHub profile URL
- [ ] Update email address
- [ ] Configure contact form
- [ ] Set up Google Analytics
- [ ] Update meta descriptions
- [ ] Optimize images
- [ ] Test responsive design
- [ ] Test contact form
- [ ] Configure domain DNS
- [ ] Enable HTTPS/SSL
- [ ] Set up redirects (if migrating)
- [ ] Create sitemap.xml
- [ ] Update robots.txt
- [ ] Submit sitemap to Google Search Console
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check page speed
- [ ] Set up email notifications for form submissions
- [ ] Configure CDN (optional)
- [ ] Set up backup strategy

## 🔍 SEO Checklist

- [ ] Add meta descriptions
- [ ] Create and submit sitemap.xml
- [ ] Create and update robots.txt
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Ensure fast page load times
- [ ] Mobile-friendly design
- [ ] Structured data (schema.org)
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add internal links
- [ ] Optimize images with alt text
- [ ] Create XML sitemap
- [ ] Ensure proper heading hierarchy
- [ ] Add breadcrumb navigation

## 🐛 Troubleshooting

### Domain Not Resolving
- Wait 24-48 hours for DNS propagation
- Clear browser cache
- Check DNS records in registrar settings
- Verify CNAME/A records are correct

### HTTPS Not Working
- Enable HTTPS in hosting settings
- Wait for SSL certificate to issue
- Check certificate status at ssllabs.com

### Form Not Submitting
- Check browser console for errors
- Verify form endpoint is correct
- Test form backend service
- Check CORS settings if applicable

### Slow Page Load
- Compress images
- Minify CSS/JS
- Enable caching headers
- Use CDN for static assets
- Check server response time

## 📞 Support Resources

- **GitHub Pages Help**: https://docs.github.com/en/pages
- **Netlify Docs**: https://docs.netlify.com
- **Vercel Documentation**: https://vercel.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **Google Search Central**: https://support.google.com/webmasters

---

Your portfolio is now ready to showcase your professional achievements! 🎉

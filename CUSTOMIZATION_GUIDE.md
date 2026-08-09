# Portfolio Customization Guide

## 📝 How to Personalize Your Portfolio

### 1. Update Personal Information

**In `index.html`:**

#### Hero Section
```html
<!-- Change the hero title and subtitle -->
<h1 class="hero-title">
    <span class="gradient-text">Flutter Developer</span> & <span class="gradient-text">AI Specialist</span>
</h1>
<p class="hero-subtitle">
    Architecting AI-powered mobile applications with 2.5+ years of experience in scaling apps to 500,000+ users
</p>
```

#### Statistics
```html
<div class="hero-stats">
    <div class="stat">
        <h3>2.5+</h3>        <!-- Update years -->
        <p>Years Experience</p>
    </div>
    <!-- Update other stats -->
</div>
```

#### About Section
```html
<p class="about-intro">
    I'm a passionate Flutter developer specializing in building sophisticated AI-integrated mobile applications...
</p>
```

### 2. Update Professional Experience

**Experience Timeline - Edit the experience cards:**

```html
<div class="experience-item">
    <div class="timeline-marker"></div>
    <div class="experience-card">
        <h3>Freelance Mobile Developer</h3>
        <p class="experience-period">Remote | Ongoing</p>
        <p class="experience-description">
            Your description here...
        </p>
        <ul class="experience-details">
            <li><strong>AI Image Generation Apps:</strong> Your details...</li>
            <!-- Update with your experience -->
        </ul>
    </div>
</div>
```

### 3. Update Skills

**In the Skills Section:**

To add new skill categories or modify existing ones:

```html
<div class="skill-category">
    <h3 class="category-title">🤖 AI & Productivity Tools</h3>
    <div class="skill-tags">
        <span class="skill-tag">Cursor</span>
        <span class="skill-tag">GitHub Copilot</span>
        <!-- Add or remove skill tags -->
    </div>
</div>
```

**Add New Category:**
```html
<div class="skill-category">
    <h3 class="category-title">📚 New Category</h3>
    <div class="skill-tags">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
        <span class="skill-tag">Skill 3</span>
    </div>
</div>
```

### 4. Update Projects

**Featured Project:**

```html
<div class="project-card featured">
    <div class="project-header">
        <h3>Your Project Name</h3>
        <span class="project-tag">Featured</span>
    </div>
    <p class="project-description">
        Detailed description of your project...
    </p>
    <div class="project-metrics">
        <div class="metric">
            <h4>500K+</h4>
            <p>Total Users</p>
        </div>
        <!-- Update metrics -->
    </div>
    <!-- Update features and tech stack -->
</div>
```

**Add More Projects:**

Copy the entire `project-card` div and paste it again below, then update the details.

### 5. Update Contact Information

**Contact Links:**

```html
<div class="contact-links">
    <!-- LinkedIn -->
    <a href="https://www.linkedin.com/in/YOUR_PROFILE" target="_blank" class="contact-link">
        <span class="link-icon">in</span>
        <span>LinkedIn</span>
    </a>
    
    <!-- Email -->
    <a href="mailto:your.email@example.com" class="contact-link">
        <span class="link-icon">✉</span>
        <span>Email</span>
    </a>
    
    <!-- GitHub -->
    <a href="https://github.com/YOUR_USERNAME" target="_blank" class="contact-link">
        <span class="link-icon">⚙</span>
        <span>GitHub</span>
    </a>
</div>
```

### 6. Update Meta Tags (SEO)

**In the `<head>` section of `index.html`:**

```html
<title>Your Name | Your Title</title>
<meta name="description" content="Your professional description for search engines">
<meta name="keywords" content="flutter, mobile development, ai, your-keywords">
<meta name="author" content="Your Name">

<!-- Open Graph for Social Media -->
<meta property="og:title" content="Your Name | Your Title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://vivektailor.me/og-image.png">
<meta property="og:url" content="https://vivektailor.me">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Name | Your Title">
<meta name="twitter:description" content="Your description">
<meta name="twitter:image" content="https://vivektailor.me/twitter-image.png">
```

### 7. Customize Colors

**In `styles.css` - Update the CSS variables:**

```css
:root {
    /* Change these colors to match your brand */
    --primary: #0f62fe;        /* Main blue */
    --primary-dark: #0043ce;
    --secondary: #7c3aed;      /* Purple */
    --secondary-dark: #6d28d9;
    --accent: #06b6d4;         /* Cyan */
    --accent-light: #22d3ee;
    
    /* Background colors */
    --bg-dark: #0a0e27;        /* Dark blue-black */
    --bg-darker: #050812;
    --bg-light: #f3f4f6;
    
    /* Text colors */
    --text-primary: #ffffff;
    --text-secondary: #d1d5db;
    --text-muted: #9ca3af;
}
```

**Popular Color Schemes:**

**Tech Blue:**
```css
--primary: #0066ff;
--secondary: #0099ff;
--accent: #00d4ff;
```

**Purple Gradient:**
```css
--primary: #7c3aed;
--secondary: #a855f7;
--accent: #d946ef;
```

**Cyberpunk:**
```css
--primary: #ff006e;
--secondary: #8338ec;
--accent: #3a86ff;
```

### 8. Add Your Logo

Create a logo SVG or image and add to hero section:

```html
<div class="hero-visual">
    <img src="path/to/your-logo.svg" alt="Logo">
</div>
```

### 9. Configure Contact Form

**Option 1: Formspree Integration**

1. Go to formspree.io
2. Create a new form
3. Copy your form ID
4. In `script.js`, uncomment and update:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: { 'Content-Type': 'application/json' }
});
```

**Option 2: EmailJS Integration**

1. Sign up at emailjs.com
2. Get your public key and service ID
3. Update in `script.js`:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
// Send email logic
```

### 10. Add Analytics

**Google Analytics:**

Add to `<head>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 11. Font Customization

Change fonts by updating in `styles.css`:

```css
:root {
    --font-sora: 'Sora', sans-serif;
    --font-inter: 'Inter', sans-serif;
}
```

Or use other Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### 12. Add Social Media Icons

Add to contact links:

```html
<a href="https://twitter.com/YOUR_HANDLE" target="_blank" class="contact-link">
    <span class="link-icon">𝕏</span>
    <span>Twitter</span>
</a>

<a href="https://instagram.com/YOUR_HANDLE" target="_blank" class="contact-link">
    <span class="link-icon">📸</span>
    <span>Instagram</span>
</a>
```

### 13. Favicon Setup

Create favicon and add to `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230f62fe' width='100' height='100'/><text x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'>V</text></svg>">
```

### 14. Resume Download Link

Add to contact section:

```html
<a href="path/to/your-resume.pdf" download class="btn btn-secondary">
    Download Resume
</a>
```

### 15. Add Testimonials Section (Optional)

Add new section after projects:

```html
<section id="testimonials" class="testimonials">
    <div class="container">
        <h2 class="section-title">What Others Say</h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <p class="testimonial-text">"Amazing work on our project..."</p>
                <h4>Client Name</h4>
                <p class="testimonial-role">Company, Position</p>
            </div>
        </div>
    </div>
</section>
```

## 🎨 Design Tips

- **Color Contrast**: Ensure text is readable on backgrounds
- **Whitespace**: Use spacing to avoid cluttered layouts
- **Typography**: Limit to 2-3 font families
- **Mobile First**: Test on mobile while designing
- **Consistency**: Use the same colors, fonts, and spacing throughout
- **Animations**: Don't overuse - keep them subtle
- **Load Times**: Optimize images and minimize code
- **Accessibility**: Use proper heading hierarchy and alt text

## ✅ Final Checklist

- [ ] Update all personal information
- [ ] Update professional experience
- [ ] Add your skills and expertise
- [ ] Add/update projects
- [ ] Update contact information
- [ ] Set custom domain
- [ ] Configure contact form
- [ ] Add analytics
- [ ] Test on all devices
- [ ] Check loading speed
- [ ] Verify all links work
- [ ] Proof-read content
- [ ] Check spelling and grammar
- [ ] Test contact form
- [ ] Update social links
- [ ] Add favicon
- [ ] Optimize images

## 📞 Need Help?

Refer to:
- README.md for general information
- DEPLOYMENT_GUIDE.md for hosting and deployment
- CSS Comments for styling customization
- JavaScript Comments for functionality customization

---

Your portfolio is now fully customizable! Make it your own and showcase your amazing work! 🚀

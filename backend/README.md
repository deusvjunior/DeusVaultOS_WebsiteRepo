# DeusVaultOS Backend API

🚀 **Production-ready Node.js backend for DeusVaultOS website contact forms**

## Quick Deploy to Render

1. **Push this backend folder to a separate GitHub repository**
2. **Connect to Render:**

   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo
   - Use these settings:
     ```
     Build Command: npm install
     Start Command: npm start
     ```

3. **Set Environment Variables in Render:**
   ```
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=hello@deusvault.com
   TO_EMAIL=hello@deusvault.com
   ```

## Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription

## Features

✅ **Production Ready**

- Rate limiting (5 submissions per 15 minutes)
- Input validation and sanitization
- Security headers (Helmet)
- CORS configured for your frontend
- Compression enabled
- Error handling

✅ **Email System**

- Automatic confirmation emails
- Professional email templates
- Multiple SMTP provider support
- Development mode with test emails

✅ **Zero Configuration**

- Works out of the box on Render
- Auto-detects environment
- Graceful fallbacks

## Email Setup Options

### Gmail (Free)

1. Enable 2FA on your Gmail account
2. Generate App Password
3. Use App Password in SMTP_PASS

### SendGrid (Recommended for Production)

1. Sign up for SendGrid
2. Get API key
3. Use `SMTP_USER=apikey` and your API key as password

## Frontend Integration

Your contact form will automatically work once you update the API endpoint:

```javascript
// In your ContactPage.tsx
const response = await fetch("https://your-backend.onrender.com/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting to prevent spam
- Input validation and sanitization
- Request size limits
- Error handling without information leakage

---

**Ready to deploy in 2 minutes! No complex configuration needed.** 🎉

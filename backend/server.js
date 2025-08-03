const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security and performance middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration for your frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
    'https://deusvaultos.netlify.app', // Your production domain
    'https://deusvault.com', // Main domain
    /\.netlify\.app$/, // Any Netlify preview deployments
    /\.vercel\.app$/, // Vercel deployments
    /\.render\.com$/ // Render deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per windowMs
  message: {
    error: 'Too many contact form submissions, please try again in 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email transporter configuration
let transporter;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  // Production email configuration
  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
} else {
  // Development mode - use Ethereal for testing
  console.log('🔧 Development mode: Creating test email account...');
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create test account:', err);
      return;
    }
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    
    console.log('📧 Test email account created:');
    console.log('   User:', account.user);
    console.log('   Pass:', account.pass);
    console.log('   Preview URLs will be logged for sent emails');
  });
}

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must not exceed 100 characters')
    .escape(),
  body('type')
    .isIn(['general', 'support', 'enterprise', 'partnership', 'feedback'])
    .withMessage('Invalid inquiry type'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape()
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'DeusVaultOS Backend API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'DeusVaultOS Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      contact: 'POST /api/contact',
      newsletter: 'POST /api/newsletter'
    },
    documentation: 'https://github.com/deusvault/deusvault-backend'
  });
});

// Contact form submission endpoint
app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, company, type, message } = req.body;

    // Create email content
    const emailSubject = `[DeusVaultOS] New ${type} inquiry from ${name}`;
    
    const emailContent = `
🚀 New Contact Form Submission - DeusVaultOS

📋 CONTACT DETAILS:
• Name: ${name}
• Email: ${email}
• Company: ${company || 'Not specified'}
• Inquiry Type: ${type.toUpperCase()}

💬 MESSAGE:
${message}

🔗 SUBMISSION INFO:
• Timestamp: ${new Date().toISOString()}
• IP Address: ${req.ip}
• User Agent: ${req.get('User-Agent')}

---
DeusVaultOS Contact System
Automated message - do not reply directly to this email
    `.trim();

    // Email options
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'hello@deusvault.com',
      to: process.env.TO_EMAIL || 'hello@deusvault.com',
      subject: emailSubject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
      replyTo: email
    };

    // Send email
    if (transporter) {
      const info = await transporter.sendMail(mailOptions);
      
      // Log preview URL in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('📧 Contact form email sent!');
        console.log('   Message ID:', info.messageId);
        if (nodemailer.getTestMessageUrl(info)) {
          console.log('   Preview URL:', nodemailer.getTestMessageUrl(info));
        }
      }

      // Send confirmation email to user
      const confirmationOptions = {
        from: process.env.FROM_EMAIL || 'hello@deusvault.com',
        to: email,
        subject: 'Thank you for contacting DeusVaultOS',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0891b2, #fbbf24); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">DeusVaultOS</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out!</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h2 style="color: #333; margin-top: 0;">We've received your message</h2>
              <p style="color: #666; line-height: 1.6;">
                Hi ${name},<br><br>
                Thank you for your interest in DeusVaultOS! We've received your ${type} inquiry and our team will review it shortly.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0891b2; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">What's next?</h3>
                <ul style="color: #666; padding-left: 20px;">
                  <li>Our team will review your inquiry within 24 hours</li>
                  <li>For urgent matters, you can reach us on Discord: https://discord.gg/deusvault</li>
                  <li>Check out our documentation while you wait: https://docs.deusvault.com</li>
                </ul>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #999; font-size: 14px;">
              <p>DeusVaultOS - The Future of Development Environments</p>
              <p>🚀 <a href="https://deusvault.com" style="color: #0891b2;">deusvault.com</a> | 💬 <a href="https://discord.gg/deusvault" style="color: #0891b2;">Discord</a> | 📚 <a href="https://docs.deusvault.com" style="color: #0891b2;">Docs</a></p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(confirmationOptions);
    }

    // Success response
    res.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      data: {
        name,
        email,
        type,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many newsletter subscription attempts, please try again later.' }
}), [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    const { email } = req.body;

    // Here you would typically add to your newsletter service
    // For now, we'll just send a notification email
    if (transporter) {
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'hello@deusvault.com',
        to: process.env.TO_EMAIL || 'hello@deusvault.com',
        subject: '[DeusVaultOS] New Newsletter Subscription',
        text: `New newsletter subscription: ${email}\nTimestamp: ${new Date().toISOString()}`
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe. Please try again later.'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: ['/health', '/api', '/api/contact', '/api/newsletter']
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 DeusVaultOS Backend API Started!');
  console.log(`   🌐 Server running on port ${PORT}`);
  console.log(`   📍 Health check: http://localhost:${PORT}/health`);
  console.log(`   📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`   🔒 Security: Helmet, CORS, Rate limiting enabled`);
  console.log(`   📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (!transporter) {
    console.log('⚠️  Email not configured - check environment variables');
  }
});

module.exports = app;

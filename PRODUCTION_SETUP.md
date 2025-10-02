# Production Setup Guide

## Prerequisites
- Domain name configured
- Hosting platform chosen (Vercel, Netlify, etc.)
- Google Cloud Console access

## 1. Google OAuth Configuration

### Create Production OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Create new OAuth 2.0 Client ID (or update existing)
5. Add these Authorized redirect URIs:
   ```
   https://annvaleskiblog.com/api/auth/callback/google
   https://www.annvaleskiblog.com/api/auth/callback/google
   ```

## 2. Environment Variables Setup

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these production variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://sfwmbihdqmxlddygwjog.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
SUPABASE_SERVICE_ROLE_KEY=[your_service_key]
NEXTAUTH_URL=https://annvaleskiblog.com
NEXTAUTH_SECRET=[generate_new_32_char_secret]
GOOGLE_CLIENT_ID=68689229737-ubqlnqrtkl90nb4lhddhjsuevr8vmrj9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
AUTHORIZED_EMAILS=admin@annvaleskiblog.com,other@trusted.com
```

### Generate New NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```
**IMPORTANT:** Never reuse development secrets in production!

### For Other Platforms:
- **Netlify**: Add via Site Settings > Environment Variables
- **Railway**: Add via Variables tab
- **Heroku**: Use `heroku config:set KEY=value`

## 3. Security Checklist

- [ ] Generate NEW NEXTAUTH_SECRET for production
- [ ] Set NEXTAUTH_URL to your actual domain (no trailing slash)
- [ ] Configure AUTHORIZED_EMAILS with real admin emails
- [ ] Remove any test/development credentials
- [ ] Enable HTTPS (usually automatic with hosting platforms)
- [ ] Set up domain verification in Google Console

## 4. Database (Supabase)

Your Supabase instance works for both dev and production. Optionally:
1. Create a separate production Supabase project
2. Run all SQL schemas in the new project
3. Update production env vars with new credentials

## 5. Deployment Steps

### Vercel (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment:
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 6. Post-Deployment

1. **Test Authentication:**
   - Visit `https://annvaleskiblog.com/admin`
   - Sign in with authorized Google account
   - Verify access to admin panel

2. **Monitor:**
   - Check Vercel/hosting logs for errors
   - Verify Supabase connection
   - Test creating/editing posts

## 7. Troubleshooting

### Common Issues:

**"NEXTAUTH_URL mismatch"**
- Ensure NEXTAUTH_URL matches your actual domain
- No trailing slash
- Include https://

**"Redirect URI mismatch"**
- Add all variations to Google OAuth:
  - `https://annvaleskiblog.com/api/auth/callback/google`
  - `https://www.annvaleskiblog.com/api/auth/callback/google`

**"Unauthorized email"**
- Add email to AUTHORIZED_EMAILS env var
- Redeploy after updating env vars

## 8. Maintenance

- Rotate NEXTAUTH_SECRET periodically
- Review AUTHORIZED_EMAILS list regularly
- Monitor Google OAuth quota usage
- Keep dependencies updated
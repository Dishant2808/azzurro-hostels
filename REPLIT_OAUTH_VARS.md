# Replit OAuth Environment Variables

## Required Variables for Replit OAuth Flow

Based on `server/replitAuth.ts`, here are the **required** environment variables:

### 1. `REPLIT_DOMAINS` ⚠️ **REQUIRED**
- **Description**: Comma-separated list of domains that will use Replit Auth
- **Format**: `domain1,domain2,domain3`
- **Example**: 
  ```env
  REPLIT_DOMAINS=localhost,localhost:4000,www.azzurrohostels.com
  ```
- **Important Notes**:
  - Each domain gets its own Passport strategy: `replitauth:${domain}`
  - The callback URL is automatically set to: `https://${domain}/api/callback`
  - For local development, include `localhost` (without port) and `localhost:4000` (with port)
  - The backend uses `req.hostname` to match against these domains

### 2. `REPL_ID` ⚠️ **REQUIRED**
- **Description**: Your Replit OAuth Client ID
- **Format**: String (non-empty)
- **Example**:
  ```env
  REPL_ID=your-replit-client-id-here
  ```
- **Where to get it**: 
  - Replit Dashboard → Your Repl → Settings → OAuth/OpenID Connect
  - Or from your Replit project's environment variables
- **Used for**:
  - OIDC discovery/discovery endpoint
  - Building logout URLs
  - OAuth client identification

### 3. `ISSUER_URL` ✅ **OPTIONAL** (has default)
- **Description**: Replit OIDC issuer URL
- **Default**: `https://replit.com/oidc`
- **Format**: Full URL
- **Example**:
  ```env
  ISSUER_URL=https://replit.com/oidc
  ```
- **Note**: Only set this if you're using a custom Replit OIDC endpoint

### 4. `SESSION_SECRET` ⚠️ **REQUIRED**
- **Description**: Secret key for signing session cookies
- **Format**: Long random string (recommended: 32+ characters)
- **Example**:
  ```env
  SESSION_SECRET=5d6VtIeO/DeFXlnFRpnDtmbFwJvJvGxHIcfevme2nuKeq2T1UQ3yE/He1/c25sFHJDI0GDYqWCH3bgVu4ghrwg==
  ```
- **Security**: Use a strong, randomly generated secret in production

### 5. `DATABASE_URL` ⚠️ **REQUIRED**
- **Description**: PostgreSQL connection string for session storage
- **Format**: PostgreSQL connection URI
- **Example**:
  ```env
  DATABASE_URL=postgresql://postgres:password@host:5432/database
  ```
- **Used for**: Storing user sessions in the `sessions` table

### 6. `FRONTEND_URLS` or `ALLOWED_ORIGINS` ✅ **OPTIONAL** (defaults to allow all)
- **Description**: Comma-separated list of frontend URLs allowed to make CORS requests
- **Format**: Comma-separated URLs or `*` for all origins
- **Example**:
  ```env
  FRONTEND_URLS=https://example.com,https://your-render-app.onrender.com
  ```
  Or to allow all origins:
  ```env
  FRONTEND_URLS=*
  ```
- **Used for**: CORS configuration to prevent cross-origin issues when using Render backend URL or other external frontends
- **Note**: 
  - If not set, all origins are allowed by default (including `http://localhost:4000`)
  - Common localhost origins (`http://localhost:4000`, `http://localhost:3000`, `http://localhost:5173`, `http://localhost:5000`, and their `127.0.0.1` equivalents) are **automatically included** even when you specify custom URLs
  - For production, it's recommended to specify exact frontend URLs (localhost origins will still be included for local testing)

## Complete `.env` Example for Replit OAuth

```env
# Replit OAuth Configuration
REPLIT_DOMAINS=localhost,localhost:4000,www.azzurrohostels.com
REPL_ID=your-actual-replit-client-id
ISSUER_URL=https://replit.com/oidc

# Session Configuration
SESSION_SECRET=your-strong-random-secret-here
DATABASE_URL=postgresql://postgres:password@host:5432/database

# CORS Configuration (optional - defaults to allow all origins)
# For production, specify your frontend URLs to prevent CORS issues
FRONTEND_URLS=http://localhost:3000,https://your-frontend-domain.com,https://your-render-app.onrender.com
# Or use * to allow all origins (not recommended for production)
# FRONTEND_URLS=*

# Optional: Passport secret (if used elsewhere)
PASSPORT_SECRET=your-passport-secret
```

## How It Works

1. **Domain Matching**: When a request comes to `/api/login`, the backend:
   - Extracts `req.hostname` (e.g., `localhost` or `www.azzurrohostels.com`)
   - Looks for a strategy named `replitauth:${req.hostname}`
   - If found, uses that strategy; otherwise, throws "Unknown authentication strategy"

2. **Callback URL**: For each domain in `REPLIT_DOMAINS`, the callback URL is:
   - `https://${domain}/api/callback`
   - Example: `https://localhost:4000/api/callback`

3. **OIDC Discovery**: The backend uses `REPL_ID` and `ISSUER_URL` to:
   - Discover the OIDC configuration from Replit
   - Get authorization, token, and userinfo endpoints
   - Configure the OAuth flow

## Troubleshooting

### Error: "Unknown authentication strategy"
- **Cause**: `req.hostname` doesn't match any domain in `REPLIT_DOMAINS`
- **Fix**: Add the missing domain to `REPLIT_DOMAINS`
- **Example**: If accessing `http://localhost:5000/api/login`, add `localhost` to `REPLIT_DOMAINS`

### Error: "clientId must be a non-empty string"
- **Cause**: `REPL_ID` is missing or empty
- **Fix**: Set `REPL_ID` to your actual Replit client ID

### Error: "Environment variable REPLIT_DOMAINS not provided"
- **Cause**: `REPLIT_DOMAINS` is missing from `.env`
- **Fix**: Add `REPLIT_DOMAINS=localhost,localhost:4000` (or your domains)

## Getting Your Replit Client ID (`REPL_ID`)

1. Go to [Replit](https://replit.com)
2. Open your Repl project
3. Check environment variables in the Replit dashboard
4. Or check your Repl's `.env` file if it exists
5. Look for `REPL_ID` or similar OAuth client ID

**Note**: If you don't have a Replit account or Repl project, you'll need to:
- Create a Replit account
- Create a Repl project
- Set up OAuth/OpenID Connect in Replit settings
- Get your client ID

## Local Development Setup

For local development, your `.env` should have:

```env
REPLIT_DOMAINS=localhost,localhost:4000
REPL_ID=your-replit-client-id
ISSUER_URL=https://replit.com/oidc
SESSION_SECRET=your-session-secret
DATABASE_URL=your-database-url
FRONTEND_URLS=http://localhost:3000,http://localhost:5173
```

For production with Render backend, your `.env` should have:

```env
REPLIT_DOMAINS=your-production-domain.com
REPL_ID=your-replit-client-id
ISSUER_URL=https://replit.com/oidc
SESSION_SECRET=your-strong-session-secret
DATABASE_URL=your-database-url
# Include your frontend URLs (localhost origins are automatically included)
FRONTEND_URLS=https://azzurrohostels.vercel.app,https://your-frontend-domain.com
```

**Important for Render deployment:**
- Make sure to set `FRONTEND_URLS` in your Render environment variables
- Include `https://azzurrohostels.vercel.app` if that's your frontend
- Or set `FRONTEND_URLS=*` to allow all origins (less secure but works for testing)

This allows:
- Backend on `http://localhost:5000` → uses `replitauth:localhost` strategy
- Frontend on `http://localhost:4000` → callback URL is `http://localhost:4000/api/callback`









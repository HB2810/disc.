# CarePulse / Stavya Hospital Discount System — Deployment & Supabase Guide

This guide explains step-by-step how to deploy this application to **GitHub Pages** and connect it to a live **Supabase Realtime Database**.

---

## Part 1: GitHub Deployment Guide

You can deploy the app to GitHub Pages using either **GitHub Actions (Automated)** or **`gh-pages` (Manual CLI)**.

### Option A: Deployment via GitHub Actions (Recommended)

1. **Initialize Git & Push to GitHub**:
   Open terminal in your project folder (`f:\Discount`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with GitHub Pages & Supabase Realtime"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in Repository Settings**:
   - Go to your repository on GitHub: `https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`
   - Click on **Settings** -> **Pages** (under Code and automation).
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - Every time you push changes to `main` branch, the GitHub Action workflow (`.github/workflows/deploy.yml`) will automatically build and deploy your live site.
   - Your site URL will be: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

### Option B: Deployment via `gh-pages` Command

If you prefer deploying directly from your local terminal:

1. Build and deploy:
   ```bash
   npm run deploy
   ```
2. In GitHub repository settings:
   - Go to **Settings** -> **Pages**.
   - Under **Source**, select **Deploy from a branch** -> branch: `gh-pages` -> folder: `/ (root)`.
   - Click **Save**.

---

## Part 2: Supabase Realtime Database Setup Guide

Supabase provides real-time multi-device database sync across all logged-in billing desks, CFOs, and Managing Directors without requiring page refreshes.

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**, enter your project name (e.g. `carepulse-discount-db`), set a database password, and click **Create new project**.

---

### Step 2: Run the SQL Schema Script
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query**, copy & paste the SQL code below, and click **Run**:

```sql
-- CarePulse / Stavya Hospital Billing Discount Database Schema

-- 1. Create User Directory Table
CREATE TABLE IF NOT EXISTS hospital_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  designation TEXT,
  department TEXT,
  email TEXT,
  phone TEXT,
  active BOOLEAN DEFAULT TRUE,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Discount Requests Table
CREATE TABLE IF NOT EXISTS discount_requests (
  id TEXT PRIMARY KEY,
  request_code TEXT NOT NULL UNIQUE,
  patient_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_age INT,
  patient_gender TEXT,
  department TEXT NOT NULL,
  service_name TEXT,
  doctor_name TEXT NOT NULL,
  particulars TEXT,
  reference_name TEXT,
  relative_name TEXT,
  receipt_no TEXT,
  bill_date TEXT,
  opd_ipd_no TEXT,
  total_bill_amount NUMERIC NOT NULL,
  requested_discount_type TEXT NOT NULL DEFAULT 'PERCENTAGE',
  requested_discount_val NUMERIC NOT NULL,
  calculated_discount_amount NUMERIC NOT NULL,
  final_payable_amount NUMERIC NOT NULL,
  reason_category TEXT NOT NULL,
  detailed_reason TEXT NOT NULL,
  proof_file_name TEXT,
  requested_by TEXT NOT NULL,
  required_authority_role TEXT NOT NULL,
  current_approver_role TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING_BMGR',
  is_direct_executive_grant BOOLEAN DEFAULT FALSE,
  approver_comments TEXT,
  approved_by TEXT,
  approval_timestamp TIMESTAMPTZ,
  approval_chain JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Turn ON Row Level Security (RLS) & Grant public access for demo
ALTER TABLE hospital_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select hospital_users" ON hospital_users FOR SELECT USING (true);
CREATE POLICY "Allow public insert hospital_users" ON hospital_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update hospital_users" ON hospital_users FOR UPDATE USING (true);

CREATE POLICY "Allow public select discount_requests" ON discount_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert discount_requests" ON discount_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update discount_requests" ON discount_requests FOR UPDATE USING (true);

-- 4. Enable Realtime Publications for Live Sync across all browsers/devices
ALTER PUBLICATION supabase_realtime ADD TABLE discount_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE hospital_users;
```

---

### Step 3: Connect Supabase to your Web App

You have **two options** to connect Supabase:

#### Option A: In-App UI Configuration (Easiest)
1. Open your web app (locally or on GitHub Pages).
2. Click the **Supabase Realtime Database** status button in the top navigation header bar (or open Settings).
3. Enter your **Project URL** (`https://xyz.supabase.co`) and **Anon Key** (`eyJhbGci...`).
4. Click **Save Configuration**. The app instantly connects and switches to live database sync!

#### Option B: Environment Variables (`.env`)
1. Create a `.env` file in your project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
2. For GitHub Actions deployment, add secrets in GitHub:
   - Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## Features Summary

- ⚡ **Zero-Lag Realtime DB Sync**: Actions taken by a receptionist, billing manager, CFO, or MD sync live across all browsers without page refresh.
- 📱 **Mobile & Desktop Portability**: Supports desktop billing workstations, mobile browser approval tablets, local network Wi-Fi sync, and cloud Supabase sync.
- 🔐 **Fallback Resilience**: Works offline with local storage and auto-connects when Supabase network credentials are available.

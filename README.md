# Pahadi Matrimonial Platform

A premium, clean, and AI-verified matrimonial Progressive Web App (PWA) exclusively for Himachal Pradesh.

## 🏔️ Tech Stack
- **Next.js 16 (App Router)** - Fast, modern React framework
- **TypeScript** - Type safety for robust code
- **Prisma 7** - Modern ORM with PostgreSQL support
- **NextAuth v5 (Auth.js)** - Secure authentication (Phone OTP Mock)
- **Tailwind CSS + shadcn/ui** - Premium design system
- **Framer Motion** - Smooth animations and micro-interactions
- **Sonner** - Modern toast notifications

## 🚀 Features
- **Mobile-First Design**: Optimized for a premium mobile experience.
- **5-Step Onboarding**: Streamlined user profile creation with cascading HP district/tehsil lists.
- **Matchmaking Engine**: Compatibility scoring based on location, community, and age.
- **Kundli Matching**: Integrated 36 Guna Milan tool (simulated).
- **AI Verification**: Simulated profile verification for trust and safety.
- **Freemium Flow**: Premium upgrade path for unlimited matches.

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   Ensure you have a PostgreSQL instance running and update `.env` with your `DATABASE_URL`.
   ```bash
   npx prisma generate
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 📱 PWA Support
The app is installable on Android and iOS. It includes a custom manifest and service worker configuration for offline support.

## 🔒 Security
- **Auth Secret**: Securely signed cookies.
- **Proxy**: Uses the new Next.js 16 `proxy.ts` convention for edge-ready logic.

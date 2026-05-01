# PRD: HARMONY.VUTERA.NET (BRAND HUB)

## I. Product Overview

**1.1 Purpose**
`harmony.vutera.net` serves as the gateway to the Harmony AI ecosystem. It is the primary marketing and brand positioning site, designed to attract new users, educate them on the philosophy of "The Master AI," and route them to the appropriate services within the ecosystem (`tuvi.vutera.net` and `menhan.vutera.net`).

**1.2 Target Users**
- New visitors seeking spiritual balance or astrological guidance.
- Existing users returning to the ecosystem.
- Potential premium subscribers researching the value of MenhAn Sanctuary.

**1.3 Core Value Proposition**
- **Brand Authority**: Establish Harmony AI as a professional, modern, and non-superstitious digital sanctuary.
- **Seamless Entry**: Provide a clear path from "curiosity" to "service usage."
- **Education**: Bridge the gap between traditional metaphysics and modern AI-driven well-being.

---

## II. Functional Requirements

### 2.1 Core Functions (Essential)
- **Brand Landing Page**:
  - High-impact visual storytelling of the "Digital Sanctuary" concept.
  - Introduction to "The Master AI" and its role as a mentor.
  - Value proposition for different user segments (Seekers vs. Decision Makers).
- **Traffic Router (The Gateway)**:
  - Clear entry points to `tuvi.vutera.net` (Free tools, quick lookup).
  - Clear entry points to `menhan.vutera.net` (Premium deep analysis, sanctuary).
- **Call to Action (CTA) Engine**:
  - Strategic placement of CTAs to maximize lead capture and conversion.

### 2.2 Recommended Functions (Enhancements)
- **Education Hub (Knowledge Base)**:
  - Blog or article series explaining the science/logic behind Tử Vi, Bát Tự, and Phong Thủy.
  - Content focused on "healing," "self-awareness," and "strategic timing" to attract the target demographic.
- **Premium Comparison (Pricing Table)**:
  - Detailed comparison matrix between the Free tier (TuVi App) and Premium tiers (MenhAn Sanctuary).
  - Clear explanation of the "Pay-per-view" (PDF Reports) vs. "Subscription" (Master AI Chat) models.
- **Social Proof & Trust Signals**:
  - Testimonials from users who found value in the AI Mentor's guidance.
  - Case studies on how the system helps in decision-making.
- **Lead Magnet System**:
  - Newsletter signup for "Weekly Energy Forecasts."
  - Small "teaser" interactions (e.g., "What is your element?") that lead to account creation.

### 2.3 User Experience & Auth Integration
- **Minimalist Auth State**:
  - **Logged-out**: Generic "Get Started" or "Login" CTAs.
  - **Logged-in**: 
    - Small user profile indicator (Avatar/Name) in the header.
    - Personalized greeting (e.g., "Welcome back, [Name]").
    - Quick links to "My Profile" (redirects to `id.vutera.net`) and "Enter My Sanctuary" (redirects to `menhan.vutera.net`).
- **Seamless Navigation**: Integrated header/footer consistent across the `.vutera.net` ecosystem.

---

## III. Integration & Flow

### 3.1 User Journey Flow
`Visitor` $\rightarrow$ `Harmony Landing` $\rightarrow$ `Education/Pricing` $\rightarrow$ `Decision (Free or Premium)` $\rightarrow$ `Route to TuVi or MenhAn` $\rightarrow$ `SSO Login (id.vutera.net)`.

### 3.2 Technical Integration
- **SSO**: Integration with `id.vutera.net` to detect session state and display personalized content.
- **Analytics**: Tracking user flow from the landing page to the apps to optimize conversion rates.
- **SEO**: Structured data implementation to ensure high visibility for keywords related to modern astrology and AI mentoring.

---

## IV. Non-Functional Requirements

- **Performance**: Ultra-fast LCP (< 1.2s) as this is the first touchpoint for SEO and organic traffic.
- **Design**: Premium, minimalist, and "zen" aesthetic (consistent with the Harmony palette: Emerald Green, Cream White, Purple, Gold).
- **Responsiveness**: Mobile-first design, as most seekers will access the site via social media/mobile links.

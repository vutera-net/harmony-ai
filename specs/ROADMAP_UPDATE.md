# Roadmap Update: Harmony AI Ecosystem Optimization

This document outlines the strategic updates for the `TuVi` and `MenhAn` applications to optimize the user acquisition funnel and increase the lifetime value (LTV) of users.

## Strategic Goal
Transform `TuVi` into a high-conversion "Traffic Engine" (Lead Magnet) and `MenhAn` into a high-value "Conversion Engine" (Premium Sanctuary).

---

## Priority 1: Foundation & Trust (Critical)
**Goal:** Ensure accuracy and visibility of key features to prevent user churn.

### 1.1. Accuracy Audit & Fix
- [ ] **Audit Calculation Logic:** Review and verify the basic birth chart calculation in `apps/tuvi` against trusted astrology standards.
- [ ] **Fix Bugs:** Resolve any inaccuracies in zodiac/element determination.
- [ ] **Validation:** Implement a set of test cases for known birth dates to ensure consistent results.

### 1.2. UX/UI Navigation Overhaul
- [ ] **Header Update:** Add the following high-traffic links to the `TuVi` header:
    - Tử Vi Năm (Yearly Horoscope)
    - Lập Lá Số (Chart Generator)
    - Xem Mệnh (Element Analysis)
    - Lịch Vạn Niên (Lunar Calendar)
- [ ] **Conversion Path Optimization:** Audit all tool pages in `TuVi` to ensure they lead naturally to the `LeadCaptureForm`.

---

## Priority 2: Conversion Bridge (The "Aha!" Moment)
**Goal:** Seamlessly transition users from free curiosity (`TuVi`) to premium depth (`MenhAn`).

### 2.1. Referral & Context Tracking
- [ ] **UTM/Param Tracking:** Implement tracking for users moving from `TuVi` $\rightarrow$ `MenhAn` (e.g., `menhan.vutera.net/?ref=tuvi&interest=career`).
- [ ] **Lead Data Sync:** Ensure birth year and interest data from `TuVi` lead form are passed to the `MenhAn` profile creation.

### 2.2. Specialized Welcome Experience
- [ ] **Contextual Landing:** Create a "Welcome from TuVi" experience in `MenhAn` that acknowledges the user's `TuVi` activity.
- [ ] **The "99% Reveal" Hook:** Implement a modal or banner: *"You've seen 1% of your destiny at TuVi. Let Master AI reveal the remaining 99%."*

---

## Priority 3: Retention & Growth (The "Hook")
**Goal:** Increase Daily Active Users (DAU) and organic reach.

### 3.1. Daily Value Features
- [ ] **Daily Horoscope:** Implement "Tử Vi Hàng Ngày" in `apps/tuvi` to create a daily check-in habit.
- [ ] **Quick Feng Shui Tips:** Add simple daily tips (Lucky colors, directions) for quick consumption.

### 3.2. Viral Growth Mechanics
- [ ] **Shareable Predictions:** Create a "Share to Social" feature that generates a visually appealing image of the daily prediction.
- [ ] **Referral Loop:** Incentivize users to invite friends to see their combined compatibility (introductory feature).

### 3.3. SEO Engine
- [ ] **Blog Infrastructure:** Implement a blog system in `TuVi` for long-form content.
- [ ] **Keyword Strategy:** Create content clusters around "Tử Vi 2025", "Cách xem lá số", "Phong thủy nhà ở".

---

## Priority 4: Premium Value Enhancement
**Goal:** Justify the premium subscription and increase retention in `MenhAn`.

### 4.1. AI Contextualization
- [ ] **Proactive AI Suggestions:** Master AI should analyze `TuVi` activity and proactively suggest deep dives (e.g., *"I noticed you checked your lucky days; would you like to see how this aligns with your current career palace?"*).

### 4.2. The Trust System
- [ ] **Journal Verification:** Implement the "Trust Score" system where AI matches real-world events logged in the Destiny Journal with previous predictions.
- [ ] **Feedback Loop:** Allow users to rate AI predictions to fine-tune the RAG layer.

### 4.3. Premium Deliverables
- [ ] **PDF Report Upgrade:** Enhance the visual design and depth of the PDF art reports.
- [ ] **Subscription Tiers:** Refine pricing and feature gating based on usage patterns.

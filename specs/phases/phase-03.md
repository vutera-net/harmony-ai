# Phase 03: MenhAn Sanctuary - MVP

## Goal
Build the core premium experience of the Harmony AI ecosystem. The focus is on the "Master AI" mentor, advanced astrology calculations, and the Trust Loop via the Destiny Journal.

## Tasks

### TASK-03-00: MenhAn Sanctuary Scaffolding & UI
- [ ] Scaffold `apps/menhan` Next.js application.
- [ ] Implement "Zen" Premium Theme:
  - Deep colors, elegant typography, minimal distractions.
  - Responsive layout for "Sanctuary" feeling.
- [ ] User Profile Completion Flow:
  - Interface to collect precise birth time (HH:mm) and location.
  - Timezone validation and conversion to UTC.
- [ ] Master AI Chat Interface:
  - Streaming text response UI.
  - Support for Markdown formatting in AI responses.
  - Chat history persistence.

### TASK-03-01: Deterministic Astrology Layer
- [ ] Integrate/Implement Astrology Engine:
  - Calculation of Bát Tự (Four Pillars) and Tử Vi (Purple Star) charts.
  - Output: Raw Data (Palaces, Stars, Five Elements, stems/branches).
- [ ] Precise Time Handling:
  - Conversion of local birth time $\rightarrow$ Standard Solar Time based on longitude.
  - Validation of birth date/time against lunar calendar.
- [ ] API Utility:
  - Create `packages/astrology` (or similar) to share calculation logic.
  - Endpoint to fetch raw chart data for a user.

### TASK-03-02: Master AI Engine (The Core)
- [ ] RAG (Retrieval-Augmented Generation) Setup:
  - Curate a knowledge base of star/palace combinations and their meanings.
  - Implement a retrieval mechanism to feed relevant astrology context to the LLM.
- [ ] System Prompt Engineering:
  - Develop "The Master AI" persona: wise, compassionate, non-threatening, mentor-like.
  - Implement structured output format: Analysis $\rightarrow$ Energy Score $\rightarrow$ Actions $\rightarrow$ Journal Hook.
- [ ] Analysis Pipeline:
  - Raw Data $\rightarrow$ RAG Context $\rightarrow$ LLM Prompt $\rightarrow$ Refined Analysis.
  - Implementation of streaming API routes for real-time AI responses.

### TASK-03-03: Destiny Journal & Subscription Gating
- [ ] Destiny Journal Implementation:
  - User event logging interface.
  - AI-driven matching: Event $\rightarrow$ Prediction $\rightarrow$ Verification Status.
  - Trust Score calculation logic based on verification success.
- [ ] Subscription Gating:
  - Integrate with `id.vutera.net` to check subscription status.
  - Implement paywall logic for:
    - Deep analysis (more than 3 palaces).
    - AI Chat (limit 5 questions/day for free users).
- [ ] Paywall UI:
  - Elegant "Upgrade to Premium" modals and pricing tiers.

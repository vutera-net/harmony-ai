# Test Plan — Phased: Harmony AI Ecosystem

## Overview
- **Total phases**: 5
- **Test strategy**: 
  - **Unit**: Focus on Deterministic Layer (Chart calculations) and Utils.
  - **Integration**: Focus on SSO $\rightarrow$ App Auth and Database persistence.
  - **E2E**: Full flows from Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn $\rightarrow$ Payment $\rightarrow$ Journal.
  - **Manual**: AI personality check (The Master AI) and Zen UI/UX feel.

## Phase Test Roadmap

| Phase | Focus | Test Types | Entry Criteria |
|-------|-------|-----------|----------------|
| 01 | Foundation & Identity | Unit, E2E | — |
| 02 | TuVi App (Traffic) | Unit, E2E | Phase 01 passed |
| 03 | MenhAn MVP (Core AI) | Unit, Integration, Manual | Phase 02 passed |
| 04 | MenhAn Advanced (Monetization) | E2E, Integration | Phase 03 passed |
| 05 | Harmony Landing & Polish | E2E, Manual | Phase 04 passed |

## Phase Details
Chi tiết từng phase nằm trong `specs/test-phases/`.

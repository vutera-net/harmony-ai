# 🔌 API Documentation

This document describes the API endpoints for the Harmony AI Ecosystem.

## 🔑 Authentication
All protected endpoints require a valid JWT token in the `Authorization: Bearer <token>` header or an `auth_token` cookie.

---

## 🆔 Identity System (`id.vutera.net`)

### `/api/auth/register`
- **Method**: `POST`
- **Purpose**: User registration.
- **Request Body**: `{ email, password, name? }`
- **Response**: `201 Created` with user data.

### `/api/auth/login`
- **Method**: `POST`
- **Purpose**: User authentication.
- **Request Body**: `{ email, password }`
- **Response**: `200 OK` with JWT token and user info.

### `/api/auth/me`
- **Method**: `GET`
- **Purpose**: Fetch current session user.
- **Response**: `{ user: { id, email, name } }`

### `/api/auth/profile`
- **Method**: `POST`
- **Purpose**: Create or update user profile (astrology data).
- **Request Body**: `{ fullName?, gender?, birthDate?, birthTime?, birthTimezone?, birthLocation? }`
- **Response**: Updated `Profile` object.

---

## 🌙 TuVi App (`tuvi.vutera.net`)

### `/api/leads`
- **Method**: `POST`
- **Purpose**: Capture leads and generate an AI hook.
- **Request Body**: `{ email, birthYear, zodiac, source }`
- **Response**: `{ success: true, aiHook: string, redirectUrl: string }`

---

## 🏯 MenhAn Sanctuary (`menhan.vutera.net`)

### `/api/chat`
- **Method**: `POST`
- **Purpose**: Converse with Master AI.
- **Request Body**: `{ message: string }`
- **Response**: Streaming text response from AI.

### `/api/journal`
- **Method**: `GET` | `POST`
- **Purpose**: Manage destiny journal entries.
- **POST Body**: `{ content, eventDate }`

### `/api/journal/[id]/verify`
- **Method**: `POST`
- **Purpose**: Trigger AI verification of a journal entry against predictions.
- **Response**: `{ success: true, result: { status, verification, trustScore, predictionId } }`

### `/api/pdf/generate`
- **Method**: `POST`
- **Purpose**: Generate a premium PDF art report.
- **Response**: PDF file stream.

### `/api/subscription`
- **Method**: `GET` | `POST`
- **Purpose**: Manage user plan and billing.

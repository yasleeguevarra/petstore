# Authentication API Contract

**Version**: 1.0.0  
**Base Path**: `/api/guevarra/auth`  
**Authentication**: None required for login/register

## Overview

The Authentication API provides endpoints for user registration, login, and token management.

## Endpoints

### POST /api/guevarra/auth/register

Register a new user account.

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**: 201 Created
```json
{
  "user": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2026-05-07T08:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-05-08T08:00:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Invalid input data
- 409 Conflict: Username or email already exists

### POST /api/guevarra/auth/login

Authenticate user and return JWT token.

**Request Body**:
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response**: 200 OK
```json
{
  "user": {
    "id": 123,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-05-08T08:00:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Invalid credentials
- 401 Unauthorized: Incorrect username/password

### POST /api/guevarra/auth/refresh

Refresh an expired JWT token using a valid refresh token.

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**: 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-05-08T08:00:00Z"
}
```

**Error Responses**:
- 401 Unauthorized: Invalid refresh token

### GET /api/guevarra/auth/me

Get current authenticated user information.

**Authentication**: Required (JWT Bearer token)

**Response**: 200 OK
```json
{
  "id": 123,
  "username": "johndoe",
  "email": "john@example.com",
  "createdAt": "2026-05-07T08:00:00Z"
}
```

**Error Responses**:
- 401 Unauthorized: Invalid or missing token

## Data Types

### User
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "createdAt": "string (ISO 8601)"
}
```

### AuthResponse
```json
{
  "user": "User",
  "token": "string",
  "expiresAt": "string (ISO 8601)"
}
```

## Security

1. Passwords are hashed using BCrypt
2. JWT tokens expire after 24 hours
3. Refresh tokens are supported for seamless authentication
4. Failed login attempts are rate-limited (future enhancement)
5. Password requirements: minimum 8 characters

## Business Rules

1. Usernames must be unique and 3-50 characters
2. Emails must be unique and valid format
3. Registration automatically logs in the user
4. Tokens include user ID and roles in payload</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\contracts\auth-api.md
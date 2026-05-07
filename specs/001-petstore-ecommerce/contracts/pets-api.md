# API Contracts: PetStore E-commerce

**Date**: 2026-05-06
**Plan**: [specs/001-petstore-ecommerce/plan.md](specs/001-petstore-ecommerce/plan.md)

## Base URL
```
https://petstore-backend.onrender.com/api/guevarra
```

## Authentication
None required for MVP (public read access)

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### GET /api/guevarra/pets
Get all available pets with optional filtering and pagination.

**Query Parameters**:
- `type` (optional): Filter by pet type (DOG, CAT, BIRD, FISH)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `minAge` (optional): Minimum age in months
- `maxAge` (optional): Maximum age in months
- `search` (optional): Search term for name/description
- `page` (optional): Page number (0-based), default 0
- `size` (optional): Page size, default 20, max 100

**Response**: 200 OK
```json
{
  "success": true,
  "data": {
    "pets": [
      {
        "id": 1,
        "name": "Buddy",
        "type": "DOG",
        "age": 24,
        "price": 299.99,
        "description": "Friendly golden retriever...",
        "imageUrl": "https://example.com/buddy.jpg",
        "isAvailable": true,
        "careRequirements": "Daily walks required..."
      }
    ],
    "totalElements": 150,
    "totalPages": 8,
    "currentPage": 0,
    "size": 20
  }
}
```

### GET /api/guevarra/pets/{id}
Get detailed information for a specific pet.

**Path Parameters**:
- `id`: Pet ID (Long)

**Response**: 200 OK
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Buddy",
    "type": "DOG",
    "age": 24,
    "price": 299.99,
    "description": "Friendly golden retriever, great with kids",
    "imageUrl": "https://example.com/buddy.jpg",
    "isAvailable": true,
    "careRequirements": "Daily walks required, loves playing fetch",
    "createdAt": "2026-05-06T10:00:00Z",
    "updatedAt": "2026-05-06T10:00:00Z"
  }
}
```

**Error Responses**:
- 404 Not Found: Pet not found
- 400 Bad Request: Invalid ID format

### GET /api/guevarra/pets/types
Get available pet types.

**Response**: 200 OK
```json
{
  "success": true,
  "data": {
    "types": ["DOG", "CAT", "BIRD", "FISH"]
  }
}
```

## Data Types

### Pet
```typescript
interface Pet {
  id: number;
  name: string;
  type: 'DOG' | 'CAT' | 'BIRD' | 'FISH';
  age: number; // months
  price: number; // USD
  description: string;
  imageUrl?: string;
  isAvailable: boolean;
  careRequirements?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### PaginatedPets
```typescript
interface PaginatedPets {
  pets: Pet[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}
```

## Error Codes
- `PET_NOT_FOUND`: Pet with specified ID does not exist
- `INVALID_REQUEST`: Request parameters are invalid
- `INTERNAL_ERROR`: Unexpected server error

## Rate Limiting
- 100 requests per minute per IP address
- Exceeding limit returns 429 Too Many Requests

## CORS
- Allow-Origin: Configured for frontend domain
- Allow-Methods: GET, OPTIONS
- Allow-Headers: Content-Type, Authorization
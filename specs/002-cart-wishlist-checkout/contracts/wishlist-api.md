# Wishlist API Contract

**Version**: 1.0.0  
**Base Path**: `/api/guevarra/wishlist`  
**Authentication**: Required (JWT Bearer token)

## Overview

The Wishlist API provides endpoints for managing a user's saved pets for future consideration.

## Endpoints

### GET /api/guevarra/wishlist

Retrieve the current user's wishlist with all saved pets.

**Response**: 200 OK
```json
{
  "id": 1,
  "userId": 123,
  "items": [
    {
      "id": 20,
      "petId": 5,
      "petName": "Buddy",
      "petPrice": 299.99,
      "addedAt": "2026-05-07T10:30:00Z"
    }
  ],
  "totalItems": 1,
  "createdAt": "2026-05-07T09:00:00Z",
  "updatedAt": "2026-05-07T10:30:00Z"
}
```

**Error Responses**:
- 401 Unauthorized: Invalid or missing authentication
- 404 Not Found: User has no wishlist (should create one)

### POST /api/guevarra/wishlist/items

Add a pet to the user's wishlist. Duplicates are not allowed.

**Request Body**:
```json
{
  "petId": 5
}
```

**Response**: 201 Created
```json
{
  "id": 20,
  "petId": 5,
  "petName": "Buddy",
  "petPrice": 299.99,
  "addedAt": "2026-05-07T10:30:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Invalid petId
- 404 Not Found: Pet not found
- 409 Conflict: Pet already in wishlist

### DELETE /api/guevarra/wishlist/items/{itemId}

Remove an item from the wishlist.

**Response**: 204 No Content

**Error Responses**:
- 404 Not Found: Wishlist item not found

### DELETE /api/guevarra/wishlist

Clear all items from the wishlist.

**Response**: 204 No Content

## Data Types

### WishlistItem
```json
{
  "id": "integer",
  "petId": "integer",
  "petName": "string",
  "petPrice": "number",
  "addedAt": "string (ISO 8601)"
}
```

### Wishlist
```json
{
  "id": "integer",
  "userId": "integer",
  "items": "array of WishlistItem",
  "totalItems": "integer",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

## Business Rules

1. Wishlist is automatically created when user first saves an item
2. Duplicate pets are not allowed in wishlist
3. Items are removed without affecting cart
4. Wishlist persists across sessions</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\contracts\wishlist-api.md
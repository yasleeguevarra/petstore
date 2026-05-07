# Cart API Contract

**Version**: 1.0.0  
**Base Path**: `/api/guevarra/cart`  
**Authentication**: Required (JWT Bearer token)

## Overview

The Cart API provides endpoints for managing a user's shopping cart, including adding pets, updating quantities, and removing items.

## Endpoints

### GET /api/guevarra/cart

Retrieve the current user's shopping cart with all items.

**Response**: 200 OK
```json
{
  "id": 1,
  "userId": 123,
  "items": [
    {
      "id": 10,
      "petId": 5,
      "petName": "Buddy",
      "petPrice": 299.99,
      "quantity": 2,
      "lineTotal": 599.98,
      "addedAt": "2026-05-07T10:30:00Z"
    }
  ],
  "totalItems": 2,
  "totalPrice": 599.98,
  "createdAt": "2026-05-07T09:00:00Z",
  "updatedAt": "2026-05-07T10:30:00Z"
}
```

**Error Responses**:
- 401 Unauthorized: Invalid or missing authentication
- 404 Not Found: User has no cart (should create one)

### POST /api/guevarra/cart/items

Add a pet to the user's cart. If the pet already exists in cart, increases quantity.

**Request Body**:
```json
{
  "petId": 5,
  "quantity": 1
}
```

**Response**: 201 Created
```json
{
  "id": 10,
  "petId": 5,
  "petName": "Buddy",
  "petPrice": 299.99,
  "quantity": 1,
  "lineTotal": 299.99,
  "addedAt": "2026-05-07T10:30:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Invalid petId or quantity
- 404 Not Found: Pet not found
- 409 Conflict: Pet is out of stock

### PUT /api/guevarra/cart/items/{itemId}

Update the quantity of a cart item.

**Request Body**:
```json
{
  "quantity": 3
}
```

**Response**: 200 OK
```json
{
  "id": 10,
  "petId": 5,
  "petName": "Buddy",
  "petPrice": 299.99,
  "quantity": 3,
  "lineTotal": 899.97,
  "addedAt": "2026-05-07T10:30:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Invalid quantity
- 404 Not Found: Cart item not found

### DELETE /api/guevarra/cart/items/{itemId}

Remove an item from the cart.

**Response**: 204 No Content

**Error Responses**:
- 404 Not Found: Cart item not found

### DELETE /api/guevarra/cart

Clear all items from the cart.

**Response**: 204 No Content

## Data Types

### CartItem
```json
{
  "id": "integer",
  "petId": "integer",
  "petName": "string",
  "petPrice": "number",
  "quantity": "integer",
  "lineTotal": "number",
  "addedAt": "string (ISO 8601)"
}
```

### Cart
```json
{
  "id": "integer",
  "userId": "integer",
  "items": "array of CartItem",
  "totalItems": "integer",
  "totalPrice": "number",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

## Business Rules

1. Cart is automatically created when user first adds an item
2. Adding existing pet increases quantity instead of creating duplicate
3. Quantity must be positive integer
4. Line total is calculated as quantity * petPrice
5. Cart total is sum of all line totals
6. Out-of-stock pets cannot be added (future enhancement)</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\contracts\cart-api.md
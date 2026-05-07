# Order API Contract

**Version**: 1.0.0  
**Base Path**: `/api/guevarra/orders`  
**Authentication**: Required (JWT Bearer token)

## Overview

The Order API provides endpoints for completing checkout and viewing order history.

## Endpoints

### POST /api/guevarra/orders

Create a new order from the current cart contents.

**Request Body**: None (uses current cart)

**Response**: 201 Created
```json
{
  "id": 100,
  "orderNumber": "ORD-2026-001",
  "userId": 123,
  "items": [
    {
      "id": 50,
      "petId": 5,
      "petName": "Buddy",
      "petPrice": 299.99,
      "quantity": 2,
      "lineTotal": 599.98
    }
  ],
  "totalPrice": 599.98,
  "status": "PENDING",
  "createdAt": "2026-05-07T11:00:00Z",
  "updatedAt": "2026-05-07T11:00:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Empty cart or invalid cart contents
- 409 Conflict: Cart contains out-of-stock items

### GET /api/guevarra/orders

Retrieve the user's order history.

**Query Parameters**:
- `status` (optional): Filter by order status
- `limit` (optional): Maximum number of orders to return (default 20)
- `offset` (optional): Number of orders to skip (default 0)

**Response**: 200 OK
```json
{
  "orders": [
    {
      "id": 100,
      "orderNumber": "ORD-2026-001",
      "totalPrice": 599.98,
      "status": "PENDING",
      "itemCount": 2,
      "createdAt": "2026-05-07T11:00:00Z"
    }
  ],
  "totalCount": 1,
  "hasMore": false
}
```

### GET /api/guevarra/orders/{orderId}

Retrieve detailed information for a specific order.

**Response**: 200 OK
```json
{
  "id": 100,
  "orderNumber": "ORD-2026-001",
  "userId": 123,
  "items": [
    {
      "id": 50,
      "petId": 5,
      "petName": "Buddy",
      "petPrice": 299.99,
      "quantity": 2,
      "lineTotal": 599.98
    }
  ],
  "totalPrice": 599.98,
  "status": "PENDING",
  "createdAt": "2026-05-07T11:00:00Z",
  "updatedAt": "2026-05-07T11:00:00Z"
}
```

**Error Responses**:
- 404 Not Found: Order not found or doesn't belong to user

## Data Types

### OrderItem
```json
{
  "id": "integer",
  "petId": "integer",
  "petName": "string",
  "petPrice": "number",
  "quantity": "integer",
  "lineTotal": "number"
}
```

### Order
```json
{
  "id": "integer",
  "orderNumber": "string",
  "userId": "integer",
  "items": "array of OrderItem",
  "totalPrice": "number",
  "status": "string",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

### OrderSummary
```json
{
  "id": "integer",
  "orderNumber": "string",
  "totalPrice": "number",
  "status": "string",
  "itemCount": "integer",
  "createdAt": "string (ISO 8601)"
}
```

## Business Rules

1. Order creation clears the cart
2. Order items are snapshots of cart contents at checkout time
3. Order numbers are unique and human-readable
4. Users can only view their own orders
5. Orders are immutable once created
6. Initial status is PENDING (future workflow may change this)</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\contracts\order-api.md
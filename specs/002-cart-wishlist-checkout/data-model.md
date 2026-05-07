# Data Model: Cart, Wishlist, and Checkout Functionality

**Date**: May 7, 2026  
**Feature**: specs/002-cart-wishlist-checkout/spec.md  
**Research**: specs/002-cart-wishlist-checkout/research.md

This document defines the data entities, relationships, and validation rules for the cart, wishlist, and checkout feature.

## Entity Relationship Diagram

```
User (1) ---- (1) Cart
User (1) ---- (1) Wishlist
User (1) ---- (*) Order

Cart (1) ---- (*) CartItem
Wishlist (1) ---- (*) WishlistItem

CartItem (*) ---- (1) Pet
WishlistItem (*) ---- (1) Pet

Order (1) ---- (*) OrderItem
OrderItem (*) ---- (1) Pet
```

## Entities

### User
Represents an authenticated user of the pet store.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `username` (String, Unique, Not Null): User's login username
- `email` (String, Unique, Not Null): User's email address
- `passwordHash` (String, Not Null): Hashed password for authentication
- `createdAt` (LocalDateTime, Not Null): Account creation timestamp
- `updatedAt` (LocalDateTime, Not Null): Last update timestamp

**Validation Rules**:
- Username: 3-50 characters, alphanumeric + underscore
- Email: Valid email format
- Password: Minimum 8 characters (enforced at registration)

**Relationships**:
- One-to-One with Cart
- One-to-One with Wishlist
- One-to-Many with Order

### Cart
Represents a user's shopping cart containing selected pets for purchase.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `userId` (Long, Foreign Key to User, Not Null): Owner of the cart
- `createdAt` (LocalDateTime, Not Null): Cart creation timestamp
- `updatedAt` (LocalDateTime, Not Null): Last update timestamp

**Validation Rules**:
- Each user can have only one active cart

**Relationships**:
- One-to-Many with CartItem
- One-to-One with User

### CartItem
Represents an individual pet item in a shopping cart with quantity.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `cartId` (Long, Foreign Key to Cart, Not Null): Parent cart
- `petId` (Long, Foreign Key to Pet, Not Null): Selected pet
- `quantity` (Integer, Not Null, Default 1): Number of this pet to purchase
- `addedAt` (LocalDateTime, Not Null): When item was added to cart

**Validation Rules**:
- Quantity: Must be > 0
- Pet must exist and be available
- Unique combination of cartId + petId (prevent duplicates, update quantity instead)

**Relationships**:
- Many-to-One with Cart
- Many-to-One with Pet

### Wishlist
Represents a user's saved pets for future consideration.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `userId` (Long, Foreign Key to User, Not Null): Owner of the wishlist
- `createdAt` (LocalDateTime, Not Null): Wishlist creation timestamp
- `updatedAt` (LocalDateTime, Not Null): Last update timestamp

**Validation Rules**:
- Each user can have only one active wishlist

**Relationships**:
- One-to-Many with WishlistItem
- One-to-One with User

### WishlistItem
Represents an individual saved pet in a wishlist.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `wishlistId` (Long, Foreign Key to Wishlist, Not Null): Parent wishlist
- `petId` (Long, Foreign Key to Pet, Not Null): Saved pet
- `addedAt` (LocalDateTime, Not Null): When item was added to wishlist

**Validation Rules**:
- Unique combination of wishlistId + petId (prevent duplicates)

**Relationships**:
- Many-to-One with Wishlist
- Many-to-One with Pet

### Order
Represents a completed purchase order.

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `userId` (Long, Foreign Key to User, Not Null): Customer who placed the order
- `orderNumber` (String, Unique, Not Null): Human-readable order identifier (e.g., "ORD-2026-001")
- `totalPrice` (BigDecimal, Not Null): Total order amount
- `status` (String, Not Null, Default "PENDING"): Order status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
- `createdAt` (LocalDateTime, Not Null): Order placement timestamp
- `updatedAt` (LocalDateTime, Not Null): Last update timestamp

**Validation Rules**:
- Total price must equal sum of order item prices
- Status must be one of allowed values

**Relationships**:
- One-to-Many with OrderItem
- Many-to-One with User

### OrderItem
Represents a snapshot of a pet in an order (to preserve historical data).

**Fields**:
- `id` (Long, Primary Key): Unique identifier
- `orderId` (Long, Foreign Key to Order, Not Null): Parent order
- `petId` (Long, Foreign Key to Pet, Not Null): Ordered pet
- `petName` (String, Not Null): Pet name at time of order
- `petPrice` (BigDecimal, Not Null): Pet price at time of order
- `quantity` (Integer, Not Null): Quantity ordered
- `lineTotal` (BigDecimal, Not Null): Quantity * petPrice

**Validation Rules**:
- Quantity must be > 0
- Line total must equal quantity * petPrice

**Relationships**:
- Many-to-One with Order
- Many-to-One with Pet (for reference, but data is snapshot)

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Carts table
CREATE TABLE carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Cart items table
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, pet_id)
);

-- Wishlists table
CREATE TABLE wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Wishlist items table
CREATE TABLE wishlist_items (
    id BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(wishlist_id, pet_id)
);

-- Orders table
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
    pet_name VARCHAR(255) NOT NULL,
    pet_price DECIMAL(10,2) NOT NULL CHECK (pet_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(10,2) NOT NULL CHECK (line_total >= 0)
);
```

## State Transitions

### Cart Lifecycle
- **Created**: When user first adds item to cart
- **Updated**: When items are added, removed, or quantities changed
- **Converted**: When cart items are used to create an order
- **Abandoned**: When cart exists but user doesn't complete purchase (handled by business logic)

### Order Status Flow
```
PENDING → CONFIRMED → SHIPPED → DELIVERED
    ↓
CANCELLED
```

## Business Rules

1. **Cart Persistence**: Cart contents persist across user sessions via database storage
2. **Wishlist Uniqueness**: Same pet cannot be added to wishlist twice
3. **Stock Validation**: Cannot add out-of-stock pets to cart (future enhancement)
4. **Order Immutability**: Once created, order items cannot be modified (historical record)
5. **User Isolation**: Users can only access their own cart, wishlist, and orders
6. **Price Consistency**: Order items capture pet prices at time of order to prevent changes affecting historical orders</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\data-model.md
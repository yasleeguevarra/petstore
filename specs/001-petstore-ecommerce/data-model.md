# Data Model: PetStore E-commerce Website

**Date**: 2026-05-06
**Plan**: [specs/001-petstore-ecommerce/plan.md](specs/001-petstore-ecommerce/plan.md)

## Entity: Pet

Represents an available pet for sale in the PetStore marketplace.

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| id | Long | Auto | Unique identifier | Primary key, auto-generated |
| name | String | Yes | Pet's name (e.g., "Buddy", "Whiskers") | 2-50 characters, alphanumeric + spaces |
| type | String | Yes | Pet type | Enum: DOG, CAT, BIRD, FISH |
| age | Integer | Yes | Age in months | 1-240 months (20 years) |
| price | BigDecimal | Yes | Price in USD | Positive, max 99999.99 |
| description | String | Yes | Detailed description | 10-1000 characters |
| imageUrl | String | No | Image URL | Valid URL format, optional |
| isAvailable | Boolean | Yes | Availability status | Default: true |
| careRequirements | String | No | Special care instructions | 0-500 characters, optional |
| createdAt | LocalDateTime | Auto | Creation timestamp | Auto-generated |
| updatedAt | LocalDateTime | Auto | Last update timestamp | Auto-generated |

**Relationships**:
- None (standalone entity for MVP)

**Business Rules**:
- Pets must have unique names within same type (soft constraint)
- Price must be greater than 0
- Age must be positive
- Only available pets are shown in gallery
- Image URL must be accessible if provided

**Indexes**:
- type (for filtering)
- isAvailable (for gallery queries)
- price (for price range filtering)
- name (for search)

## Entity: Cart (Future)

Represents a user's shopping cart for tracking selected pets.

*Note: Initially implemented as browser localStorage, database entity for future authenticated users*

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | Auto | Session/cart identifier |
| petIds | List<Long> | No | List of selected pet IDs |
| createdAt | LocalDateTime | Auto | Creation timestamp |
| updatedAt | LocalDateTime | Auto | Last update timestamp |

## Entity: Wishlist (Future)

Represents a user's saved pets for later consideration.

*Note: Initially implemented as browser localStorage, database entity for future authenticated users*

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | Auto | Session/wishlist identifier |
| petIds | List<Long> | No | List of saved pet IDs |
| createdAt | LocalDateTime | Auto | Creation timestamp |
| updatedAt | LocalDateTime | Auto | Last update timestamp |

## Database Schema

```sql
-- Pet table
CREATE TABLE pet (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('DOG', 'CAT', 'BIRD', 'FISH')),
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 240),
    price DECIMAL(8,2) NOT NULL CHECK (price > 0),
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN NOT NULL DEFAULT true,
    care_requirements TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_pet_type ON pet(type);
CREATE INDEX idx_pet_available ON pet(is_available);
CREATE INDEX idx_pet_price ON pet(price);
CREATE INDEX idx_pet_name ON pet(name);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pet_updated_at BEFORE UPDATE ON pet
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Data Validation Rules

- **Pet Name**: Required, 2-50 chars, letters/spaces/hyphens only
- **Pet Type**: Required, must be one of: DOG, CAT, BIRD, FISH
- **Age**: Required, 1-240 months
- **Price**: Required, positive decimal with 2 decimal places, max 99999.99
- **Description**: Required, 10-1000 characters
- **Image URL**: Optional, must be valid URL if provided
- **Care Requirements**: Optional, max 500 characters

## Initial Data

Sample pets for development/testing:

```sql
INSERT INTO pet (name, type, age, price, description, image_url, care_requirements) VALUES
('Buddy', 'DOG', 24, 299.99, 'Friendly golden retriever, great with kids', 'https://example.com/buddy.jpg', 'Daily walks required, loves playing fetch'),
('Whiskers', 'CAT', 12, 149.99, 'Playful tabby cat, very affectionate', 'https://example.com/whiskers.jpg', 'Indoor only, litter box trained'),
('Tweety', 'BIRD', 6, 79.99, 'Colorful parakeet, sings beautifully', 'https://example.com/tweety.jpg', 'Needs large cage, social bird'),
('Goldie', 'FISH', 3, 29.99, 'Beautiful goldfish, easy to care for', 'https://example.com/goldie.jpg', '20 gallon tank minimum, filtered water');
```
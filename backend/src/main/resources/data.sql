-- Create pet table
CREATE TABLE IF NOT EXISTS pets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('DOG', 'CAT', 'BIRD', 'FISH')),
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 240),
    price DECIMAL(9,2) NOT NULL CHECK (price > 0),
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN NOT NULL DEFAULT true,
    care_requirements TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, pet_id)
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Wishlist items table
CREATE TABLE IF NOT EXISTS wishlist_items (
    id BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(wishlist_id, pet_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    pet_id BIGINT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
    pet_name VARCHAR(50) NOT NULL,
    pet_price DECIMAL(9,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(10,2) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pets_type ON pets(type);
CREATE INDEX IF NOT EXISTS idx_pets_available ON pets(is_available);
CREATE INDEX IF NOT EXISTS idx_pets_price ON pets(price);
CREATE INDEX IF NOT EXISTS idx_pets_name ON pets(name);

-- Sample users
INSERT INTO users (username, email, password_hash) VALUES
('testuser', 'test@example.com', '$2a$10$example.hash.for.test.user'),
('johndoe', 'john@example.com', '$2a$10$another.hash.for.john.doe');

-- Sample data
INSERT INTO pets (name, type, age, price, description, image_url, care_requirements) VALUES
('Buddy', 'DOG', 24, 299.99, 'Friendly golden retriever, great with kids', 'https://example.com/buddy.jpg', 'Daily walks required, loves playing fetch'),
('Whiskers', 'CAT', 12, 149.99, 'Playful tabby cat, very affectionate', 'https://example.com/whiskers.jpg', 'Indoor only, litter box trained'),
('Tweety', 'BIRD', 6, 79.99, 'Colorful parakeet, sings beautifully', 'https://example.com/tweety.jpg', 'Needs large cage, social bird'),
('Goldie', 'FISH', 3, 29.99, 'Beautiful goldfish, easy to care for', 'https://example.com/goldie.jpg', '20 gallon tank minimum, filtered water'),
('Max', 'DOG', 36, 199.99, 'Loyal beagle, excellent family dog', 'https://example.com/max.jpg', 'Regular exercise, loves treats'),
('Luna', 'CAT', 8, 129.99, 'Graceful siamese cat, very vocal', 'https://example.com/luna.jpg', 'Prefers quiet environment, needs scratching post'),
('Rio', 'BIRD', 4, 89.99, 'Vibrant macaw, talks and mimics sounds', 'https://example.com/rio.jpg', 'Large cage required, needs toys for stimulation'),
('Bubbles', 'FISH', 2, 24.99, 'Peaceful betta fish, beautiful colors', 'https://example.com/bubbles.jpg', '5 gallon tank, avoid other bettas');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_pets_updated_at ON pets;
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
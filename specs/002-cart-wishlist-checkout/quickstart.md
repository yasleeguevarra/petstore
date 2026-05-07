# Quick Start: Cart, Wishlist, and Checkout Feature

**Date**: May 7, 2026  
**Feature**: specs/002-cart-wishlist-checkout/spec.md  
**Plan**: specs/002-cart-wishlist-checkout/plan.md

This guide provides step-by-step instructions to set up and run the cart, wishlist, and checkout functionality.

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL database
- Docker and Docker Compose (for containerized deployment)

## Local Development Setup

### 1. Database Setup

Create a PostgreSQL database for the application:

```sql
CREATE DATABASE petstore;
CREATE USER petstore_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE petstore TO petstore_user;
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure application properties in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/petstore
   spring.datasource.username=petstore_user
   spring.datasource.password=password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   # JWT Configuration
   app.jwt.secret=mySecretKey12345
   app.jwt.expiration=86400000

   # Server configuration
   server.port=8080
   ```

3. Run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoint in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api/guevarra';
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## Docker Deployment

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed

2. From the project root, run:
   ```bash
   docker-compose up --build
   ```

This will start:
- PostgreSQL database on port 5432
- Spring Boot backend on port 8080
- React frontend on port 80

### Manual Docker Build

#### Backend
```bash
cd backend
docker build -t petstore-backend .
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/petstore petstore-backend
```

#### Frontend
```bash
cd frontend
docker build -t petstore-frontend .
docker run -p 80:80 petstore-frontend
```

## Testing the Feature

### 1. User Registration and Login

1. Open the application in your browser
2. Click "Register" and create a new account
3. Login with your credentials

### 2. Adding Pets to Cart

1. Browse the pet gallery
2. Click on a pet to view details
3. Click "Add to Cart"
4. Verify the cart icon shows the item count

### 3. Managing Cart

1. Click the cart icon to view cart contents
2. Update quantities or remove items
3. Verify total price calculations

### 4. Using Wishlist

1. From pet details, click "Add to Wishlist"
2. Navigate to wishlist page
3. Remove items from wishlist

### 5. Checkout Process

1. Ensure cart has items
2. Click "Checkout"
3. Review order summary
4. Complete checkout
5. Verify order appears in order history

## API Testing

Use curl or Postman to test APIs:

### Register User
```bash
curl -X POST http://localhost:8080/api/guevarra/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/guevarra/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Add to Cart (use token from login)
```bash
curl -X POST http://localhost:8080/api/guevarra/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"petId":1,"quantity":1}'
```

## Troubleshooting

### Backend Issues

- **Database connection failed**: Verify PostgreSQL is running and credentials are correct
- **Port already in use**: Change `server.port` in application.properties
- **JWT errors**: Check `app.jwt.secret` configuration

### Frontend Issues

- **API calls failing**: Verify backend is running and API_BASE_URL is correct
- **CORS errors**: Ensure backend CORS configuration allows frontend origin
- **Build errors**: Run `npm install` to ensure all dependencies are installed

### Database Issues

- **Migrations failing**: Ensure user has CREATE TABLE permissions
- **Data not persisting**: Check hibernate ddl-auto setting

## Development Workflow

1. Make changes to backend/frontend code
2. Run tests: `mvn test` (backend) or `npm test` (frontend)
3. Restart services to see changes
4. Use browser developer tools to debug frontend issues
5. Check backend logs for API errors

## Production Deployment

For Render deployment:

1. Push code to GitHub
2. Connect Render to repository
3. Create PostgreSQL database service
4. Create web services for backend and frontend
5. Configure environment variables
6. Deploy services

Ensure all services are within Render free-tier limits (512MB RAM, 750 hours/month).</content>
<parameter name="filePath">C:\petstore\PetStore\specs\002-cart-wishlist-checkout\quickstart.md
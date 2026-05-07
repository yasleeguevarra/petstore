# Quickstart: PetStore E-commerce Website

**Date**: 2026-05-06
**Plan**: [specs/001-petstore-ecommerce/plan.md](specs/001-petstore-ecommerce/plan.md)

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ and npm
- Java 17+ and Maven (for backend development)
- Git

## Local Development Setup

### 1. Clone and Setup

```bash
git clone <repository-url>
cd petstore
```

### 2. Start Backend + Database

```bash
# From project root
docker-compose -f docker/docker-compose.yml up -d
```

This starts:
- PostgreSQL database on port 5432
- Backend API on port 8080

### 3. Setup Frontend

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Frontend runs on http://localhost:5173

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/guevarra
- **Database**: localhost:5432 (user: petstore, password: petstore, db: petstore)

## Development Workflow

### Backend Development

```bash
# Run with hot reload
cd backend
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build JAR
./mvnw clean package
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### Database Management

```bash
# Connect to database
docker exec -it petstore-postgres psql -U petstore -d petstore

# View tables
\d

# View sample data
SELECT * FROM pet LIMIT 5;
```

## Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### End-to-End Tests
```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npx playwright test
```

## API Testing

### Get All Pets
```bash
curl http://localhost:8080/api/guevarra/pets
```

### Search Pets
```bash
curl "http://localhost:8080/api/guevarra/pets?search=dog&type=DOG"
```

### Get Pet Details
```bash
curl http://localhost:8080/api/guevarra/pets/1
```

## Deployment

### Build Docker Images

```bash
# Backend
docker build -f docker/backend.Dockerfile -t petstore-backend .

# Frontend
docker build -f docker/frontend.Dockerfile -t petstore-frontend .
```

### Deploy to Render

1. Connect GitHub repository to Render
2. Create two services:
   - **Backend**: Docker service using `docker/backend.Dockerfile`
   - **Frontend**: Static site using `frontend/dist` (after build)
3. Configure environment variables
4. Set up PostgreSQL database on Render
5. Update CORS settings for production domain

## Troubleshooting

### Backend Won't Start
- Check PostgreSQL container is running: `docker ps`
- Verify database connection in `application.properties`
- Check logs: `docker logs petstore-backend`

### Frontend Won't Load
- Verify backend is running on port 8080
- Check CORS configuration
- Clear browser cache

### Database Connection Issues
- Ensure PostgreSQL container is healthy
- Check connection string in application.properties
- Verify database exists: `docker exec -it petstore-postgres psql -U petstore -l`

### Port Conflicts
- Backend: Change port in application.properties
- Frontend: Change port in vite.config.js
- Database: Change port in docker-compose.yml

## Sample Data

The application includes sample pet data for testing. After startup, you should see pets like:
- Buddy (Dog, $299.99)
- Whiskers (Cat, $149.99)
- Tweety (Bird, $79.99)
- Goldie (Fish, $29.99)
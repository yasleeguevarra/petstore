import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Mock pet data
const mockPets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'DOG',
    breed: 'Golden Retriever',
    price: 599.99,
    age: 2,
    description: 'Friendly and loyal family dog',
    isAvailable: true,
    imageUrl: 'https://loremflickr.com/300/200/animal?random=1',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'CAT',
    breed: 'Persian',
    price: 350.00,
    age: 1,
    description: 'Elegant and calm Persian cat',
    isAvailable: true,
    imageUrl: 'https://loremflickr.com/300/200/animal?random=2',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Tweety',
    type: 'BIRD',
    breed: 'Parakeet',
    price: 75.00,
    age: 3,
    description: 'Colorful and talkative parakeet',
    isAvailable: true,
    imageUrl: 'https://loremflickr.com/300/200/animal?random=3',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Fluffy',
    type: 'RABBIT',
    breed: 'Lop-eared',
    price: 125.00,
    age: 1,
    description: 'Cute and soft lop-eared rabbit',
    isAvailable: true,
    imageUrl: 'https://picsum.photos/300/200?random=4',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Spike',
    type: 'HAMSTER',
    breed: 'Syrian',
    price: 25.00,
    age: 1,
    description: 'Small and active hamster',
    isAvailable: false,
    imageUrl: 'https://picsum.photos/300/200?random=5',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Max',
    type: 'DOG',
    breed: 'Labrador',
    price: 499.99,
    age: 3,
    description: 'Energetic and loyal Labrador',
    isAvailable: true,
    imageUrl: 'https://picsum.photos/300/200?random=6',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 7,
    name: 'Luna',
    type: 'CAT',
    breed: 'Siamese',
    price: 275.00,
    age: 2,
    description: 'Sleek and vocal Siamese cat',
    isAvailable: true,
    imageUrl: 'https://picsum.photos/300/200?random=7',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 8,
    name: 'Nemo',
    type: 'FISH',
    breed: 'Clownfish',
    price: 45.00,
    age: 1,
    description: 'Colorful clownfish for aquariums',
    isAvailable: true,
    imageUrl: 'https://picsum.photos/300/200?random=8',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

// GET /api/guevarra/pets - Get all pets with filtering
app.get('/api/guevarra/pets', (req, res) => {
  let results = [...mockPets];

  // Filter by type
  if (req.query.type) {
    results = results.filter(pet => pet.type === req.query.type.toUpperCase());
  }

  // Filter by search (name or description)
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    results = results.filter(
      pet =>
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.description.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by price range
  if (req.query.minPrice) {
    results = results.filter(pet => pet.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    results = results.filter(pet => pet.price <= parseFloat(req.query.maxPrice));
  }

  // Filter by age range
  if (req.query.minAge) {
    results = results.filter(pet => pet.age >= parseInt(req.query.minAge));
  }
  if (req.query.maxAge) {
    results = results.filter(pet => pet.age <= parseInt(req.query.maxAge));
  }

  // Handle pagination
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 10;
  const start = page * size;
  const end = start + size;
  const paginatedResults = results.slice(start, end);

  res.json({
    success: true,
    data: {
      pets: paginatedResults,
      totalElements: results.length,
      totalPages: Math.ceil(results.length / size),
      currentPage: page,
      pageSize: size
    }
  });
});

// GET /api/guevarra/pets/{id} - Get pet by ID
app.get('/api/guevarra/pets/:id', (req, res) => {
  const pet = mockPets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    return res.status(404).json({
      success: false,
      error: 'Pet not found'
    });
  }
  res.json({
    success: true,
    data: pet
  });
});

// GET /api/guevarra/pets/types - Get all pet types
app.get('/api/guevarra/pets/types', (req, res) => {
  const types = [...new Set(mockPets.map(p => p.type))].sort();
  res.json({
    success: true,
    data: types
  });
});

// Health check
app.get('/api/guevarra/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running'
  });
});

app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         🐕 PetStore Backend Mock Server                   ║
║                                                            ║
║         API running at: http://localhost:${port}        ║
║         Endpoints:                                        ║
║           GET /api/guevarra/pets                          ║
║           GET /api/guevarra/pets/:id                      ║
║           GET /api/guevarra/pets/types                    ║
║                                                            ║
║         Frontend: http://localhost:5173                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
